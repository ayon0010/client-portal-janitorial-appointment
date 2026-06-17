"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {

    // const { themes } = useTheme();

    // React.useEffect(() => {
    //     if (themes.length === 0) {
    //         document.documentElement.classList.add("dark");
    //         document.documentElement.style.colorScheme = "dark";
    //     }
    // }, [themes])



    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}