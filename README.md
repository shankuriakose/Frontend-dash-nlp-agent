# Natural Language Database Query Dashboard (Frontend)

## Introduction and Goals

This project is a modern, responsive frontend dashboard built with Next.js. It provides a user-friendly interface for interacting with a backend API that translates natural language questions into SQL queries and executes them against a database. The primary goal is to make data access easier for non-technical users through an intuitive query interface and clear results presentation.

## Key Features

*   **Core Querying Interface:**
    *   Prominent text input for natural language questions.
    *   "Submit" button to send queries to the backend.
    *   Loading indicator during API calls.
    *   Dynamic display area for tabular data and plain text results.
    *   Clear display of API error messages.
*   **User Experience Enhancements:**
    *   Display of recent query history.
    *   Option to clear query history.
    *   Display of suggested/example queries.
*   **Backend Integration:**
    *   Seamless integration with the `/query` POST endpoint of the FastAPI backend.
    *   Handling of `QueryRequest` and `QueryResponse` models.

## Technology Stack

*   **Framework:** Next.js (React Framework)
*   **Language:** TypeScript
*   **Styling:** CSS Modules / Tailwind CSS / Styled Components / Emotion / UI Component Library (e.g., Material UI, Ant Design, Chakra UI)
*   **Data Fetching:** `fetch` API or Axios (potentially React Query/SWR)
*   **State Management:** React `useState`/`useReducer`/Context or Zustand/Jotai/Redux Toolkit
*   **Data Table:** React Table / Ag-Grid Community / TanStack Table


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
