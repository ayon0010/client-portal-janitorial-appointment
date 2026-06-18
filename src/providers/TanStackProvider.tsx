"use client"; // Mark this as a client component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    // Creating the QueryClient inside a useState hook ensures it stays isolated 
    // per user session and doesn't share state between different requests on the server.
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // Consider data fresh for 1 minute
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}