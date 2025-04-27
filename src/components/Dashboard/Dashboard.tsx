'use client'

import React, { useState } from 'react';

export const Dashboard = () => {
    const [query, setQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [results, setResults] = useState<string | { columns: string[]; data: any[][] } | null>(null); // Updated type
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([
        "SELECT * FROM users LIMIT 5;",
        "SELECT COUNT(*) FROM orders;",
        "DESCRIBE TABLE products;",
    ]);

    // Function Implementations
    const handleSubmit = async () => {
        if (!query.trim()) return; // Don't submit empty queries

        setIsLoading(true);
        setResults(null);
        setError(null);

        const requestBody: QueryRequest = { query };

        try {
            const response = await fetch('/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                // Handle HTTP errors (e.g., 404, 500)
                throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
            }

            const data: QueryResponse = await response.json();

            if (data.error) {
                // Handle application-level errors from backend
                setError(data.error);
            } else if (data.result !== undefined) { // Check if result exists (could be empty string)
                setResults(data.result);
                // Add to history only on success
                setHistory(prevHistory => [query, ...prevHistory.slice(0, 9)]); // Keep last 10
            } else {
                 // Handle cases where response is ok but has neither result nor error
                 setError("Received an unexpected response format from the server.");
            }

        } catch (err) {
            // Handle fetch/network errors or JSON parsing errors
            console.error("Query submission failed:", err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearHistory = () => {
        setHistory([]);
    };

    const handleSuggestionClick = (suggestedQuery: string) => {
        setQuery(suggestedQuery);
    };


    return (
        <div className='bg-white rounded-lg pb-6 shadow min-h-[calc(100vh-100px)] p-6'> {/* Increased padding */}
            <h2 className="text-xl font-semibold mb-6">Query Interface</h2> {/* Increased margin */}

            {/* Query Input and Submit */}
            <div className="mb-6"> {/* Increased margin */}
                <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter your SQL query here..."
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                />
                <button
                    onClick={handleSubmit}
                    disabled={isLoading || !query.trim()}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {isLoading ? 'Submitting...' : 'Submit Query'}
                </button>
            </div>

            {/* Loading Indicator */}
            {isLoading && <div className="my-6 text-center text-gray-600">Loading...</div>} {/* Increased margin, added color */}

            {/* Results Display */}
            {results !== null && (
                <div className="mb-6 p-4 border rounded bg-gray-50"> {/* Increased margin */}
                    <h3 className="text-lg font-semibold mb-3">Results:</h3> {/* Increased size/margin */}
                    {typeof results === 'string' ? (
                        <pre className="whitespace-pre-wrap break-words text-sm bg-white p-3 rounded border"> {/* Added background/border */}
                            {results || '(Empty result)'}
                        </pre>
                    ) : (
                        <div className="overflow-x-auto mt-2"> {/* Wrapper for horizontal scroll */}
                             <table className="w-full text-sm text-left border-collapse border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        {results.columns.map((col) => (
                                            <th key={col} className="border border-gray-300 p-2 font-semibold">
                                                {col}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.data.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="hover:bg-gray-50">
                                            {results.columns.map((col, colIndex) => (
                                                <td key={`${rowIndex}-${colIndex}`} className="border border-gray-300 p-2">
                                                    {/* Display various data types cleanly */}
                                                    {typeof row[colIndex] === 'object'
                                                        ? JSON.stringify(row[colIndex])
                                                        : String(row[colIndex])}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    {results.data.length === 0 && (
                                         <tr>
                                            <td colSpan={results.columns.length} className="text-center p-4 text-gray-500 italic">
                                                No rows returned.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
            {/* Error Display */}
            {error && (
                 <div className="mb-6 p-4 border border-red-300 rounded bg-red-50 text-red-800"> {/* Adjusted colors/border */}
                    <h3 className="font-semibold mb-2">Error:</h3>
                    <p className="text-sm">{error}</p> {/* Smaller text */}
                </div>
            )}

             {/* Suggestions Section */}
             <div className="mb-6 p-4 border rounded bg-blue-50"> {/* Increased margin */}
                <h3 className="text-lg font-semibold mb-3">Suggestions</h3> {/* Increased size/margin */}
                <ul className="list-none pl-0 mt-2 space-y-1"> {/* Removed bullets, added spacing */}
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="text-blue-600 hover:text-blue-800 hover:underline text-left text-sm w-full p-1 rounded hover:bg-blue-100 transition-colors duration-150" /* Improved styling */
                            >
                                {suggestion}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* History Section */}
            <div className="mb-6 p-4 border rounded bg-gray-50"> {/* Increased margin */}
                <div className="flex justify-between items-center mb-3"> {/* Increased margin */}
                    <h3 className="text-lg font-semibold">History</h3> {/* Increased size */}
                    <button
                        onClick={handleClearHistory}
                        disabled={history.length === 0}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-150" /* Added transition/disabled style */
                    >
                        Clear History
                    </button>
                </div>
                {history.length > 0 ? (
                    <ul className="list-none pl-0 mt-2 space-y-1 max-h-48 overflow-y-auto"> {/* Removed bullets, added spacing, increased height */}
                        {history.map((histQuery, index) => (
                            <li key={index} className="text-sm text-gray-700 truncate p-1 rounded hover:bg-gray-100" title={histQuery}> {/* Added padding/hover/title */}
                                {histQuery}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500 italic mt-2">No query history yet.</p> {/* Added italic/margin */}
                )}
            </div>

        </div>
    )
}
