"use client"

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

export function NextThemeProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
    }, []);
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            value={{
                light: "light",
                dark: "dark"
            }}
        >
            {children}
        </ThemeProvider>
    );
}