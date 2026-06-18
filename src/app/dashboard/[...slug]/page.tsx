import AllLeads from '@/page/All-leads';
import AllUser from '@/page/all-user';
import CreateUser from '@/page/Create-user';
import LeadUpload from '@/page/LeadUpload';
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

    if (slug.includes('all-users')) {
        return (
            <AllUser />
        )
    }

    if (slug.includes('create-leads')) {
        return (
            <LeadUpload />
        )
    }

    if (slug.includes('all-leads')) {
        return (
            <AllLeads />
        )
    }

    return (
        <div>
            test
        </div>
    )
}

export default page