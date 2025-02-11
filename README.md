This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

### Prerequisites
- Node.js 18+ installed
- OpenAI API key ([Get it here](https://platform.openai.com/api-keys))

### Environment Setup
1. Clone this repository
2. Create a `.env.local` file in the root directory
3. Add your OpenAI API key:
```bash
OPENAI_API_KEY=your_api_key_here
```

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `pages/` - Contains all pages and API routes
- `components/` - Reusable React components
- `styles/` - CSS and styling files
- `lib/` - Utility functions and configurations

## Features

- Integration with OpenAI API
- Next.js 13+ framework
- TypeScript support
- API routes for backend functionality

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Deployment

Deploy on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) with these steps:

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your environment variables
4. Deploy

For more details, check the [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying).
