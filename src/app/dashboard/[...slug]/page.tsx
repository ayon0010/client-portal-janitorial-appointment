import CreateUser from '@/page/Create-user';
import React from 'react'

const page = async ({
    params,
}: {
    params: { slug: string[] };
}) => {
    const { slug } = await params;

    if (slug.includes('create-user')) {
        return (
            <CreateUser />
        )
    }

    return (
        <div>
            test
        </div>
    )
}

export default page