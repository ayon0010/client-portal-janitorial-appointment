import RegisterPage from "@/page/register";
import React, { Suspense } from "react";

const page = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <RegisterPage />
        </Suspense>
    )
}

export default page