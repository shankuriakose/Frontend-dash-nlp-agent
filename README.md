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

## Setup and Running

Details on setting up and running the project will be added here.

## Contributing

Contribution guidelines will be added here.
