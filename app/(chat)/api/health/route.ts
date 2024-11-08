import { type NextRequest, NextResponse } from 'next/server';

import { getPackageInfo, getRuntimeInfo, getSystemInfo } from './health-utils';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Form the response object
  const response = {
    package: getPackageInfo(),
    services: {},
    request: {
      headers: Object.fromEntries(req.headers), // Simplified for readability
    },
    runtime: getRuntimeInfo(),
    system: getSystemInfo(),
    variables: {
      ...process.env,
    },
  };

  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Expires: '0',
      Pragma: 'no-cache',
      'Surrogate-Control': 'no-store',
    },
  });
}
