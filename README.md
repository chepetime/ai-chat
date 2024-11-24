<a href="https://chat.vercel.ai/">
  <img alt="Next.js 14 and App Router-ready AI chatbot." src="app/(chat)/opengraph-image.png">
  <h1 align="center">Next.js AI Chatbot</h1>
</a>

<p align="center">
  An Open-Source AI Chatbot Template Built With Next.js and the AI SDK by Vercel.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [AI SDK](https://sdk.vercel.ai/docs)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - Supports OpenAI (default), Anthropic, Cohere, and other model providers
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Persistence
  - [Vercel Postgres powered by Neon](https://vercel.com/storage/postgres) for saving chat history and user data
  - [Vercel Blob](https://vercel.com/storage/blob) for efficient file storage
- [NextAuth.js](https://github.com/nextauthjs/next-auth)
  - Simple and secure authentication

## Model Providers

This template ships with OpenAI `gpt-4o` as the default. However, with the [AI SDK](https://sdk.vercel.ai/docs), you can switch LLM providers to [OpenAI](https://openai.com), [Anthropic](https://anthropic.com), [Cohere](https://cohere.com/), and [many more](https://sdk.vercel.ai/providers/ai-sdk-providers) with just a few lines of code.

## Starting the Project from Scratch

Follow these steps to set up and run the project from scratch:

### 1. Install Dependencies

First, ensure you have all the required dependencies installed:

```sh
pnpm install
```

### 2. Set Up Docker

Start the required services (e.g., PostgreSQL and MinIO) using Docker:

```sh
pnpm docker:up
```

#### Optional: Reset Docker Environment

If you want to start with a clean slate (removing all containers, volumes, and networks), run:

```sh
pnpm docker:reset
```

You will be prompted to confirm before the reset.

### 3. Configure the Environment

Ensure you have a `.env` file in the root of your project with the required variables. For example:

```.env
POSTGRES_URL=postgres://postgres:postgres@localhost:5432/ai_chatbot
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin
MINIO_BUCKET=my-app-bucket
```

### 4. Set Up the Database

Run the database migrations and generate the necessary files:

```sh
pnpm db:migrate
```

```sh
pnpm db:generate
```

### 5. Start the Development Server

Start the Next.js development server:

```sh
pnpm dev
```

You can now access the project at &<http://localhost:3000&>.

### Additional Commands

- **View Docker logs**:

```sh
pnpm docker:logs
```

----
