# English Vocabulary Web App

Welcome to the **English Vocabulary Web App**! This is a modern dashboard for learning and managing English vocabulary, built with performance and aesthetics in mind.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone <repository-url>
cd english-vocabulary-wa
```

### 2. Install dependencies

This project uses `pnpm`. If you don't have it installed, run `npm install -g pnpm`.

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env` file in the root directory (you can copy from `.env.example` if available).

```bash
cp .env.example .env
```

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `src/app`: Next.js App Router (pages and layouts)
- `src/components`: Reusable UI components
- `src/hooks`: Custom React hooks
- `src/lib`: Utility functions and third-party configurations
- `src/messages`: Translation files (JSON)
- `src/types`: TypeScript definitions

## 🤝 Team Collaboration

For details on how to contribute and our branching strategy, please see [CONTRIBUTING.md](./CONTRIBUTING.md).
