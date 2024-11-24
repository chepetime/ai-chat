import { Client } from 'minio';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { auth } from '@/app/(auth)/auth';

// File validation schema
const FileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File size should be less than 5MB',
    })
    .refine((file) => ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type), {
      message: 'File type should be JPEG, PNG, or PDF',
    }),
});

// MinIO client configuration
const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: Number.parseInt(process.env.MINIO_PORT || '9100', 10),
  useSSL: false,
  accessKey: process.env.MINIO_ROOT_USER || 'minioadmin',
  secretKey: process.env.MINIO_ROOT_PASSWORD || 'minioadmin',
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!request.body) {
    return new Response('Request body is empty', { status: 400 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const validation = FileSchema.safeParse({ file });
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => err.message).join(', ');
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    const bucketName = process.env.MINIO_BUCKET || 'my-app-bucket';
    const filename = file.name;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    try {
      // Ensure bucket exists
      const bucketExists = await minioClient.bucketExists(bucketName);
      if (!bucketExists) {
        await minioClient.makeBucket(bucketName, 'us-east-1');
      }

      // Upload the file
      await minioClient.putObject(bucketName, filename, fileBuffer);

      const fileUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${filename}`;
      return NextResponse.json({ url: fileUrl });
    } catch (err) {
      console.error('MinIO upload failed:', err);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
  } catch (err) {
    console.error('Request processing failed:', err);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
