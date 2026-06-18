"use client"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { User } from "@prisma/client"

import { useQuery } from "@tanstack/react-query"
import React from "react"

const AllLeads = () => {

    const { data: users, refetch, isLoading } = useQuery({
        queryKey: ['Users'],
        queryFn: async () => {
            const response = await fetch('/api/all-users');
            const data = await response.json();
            return data;
        }
    })

    if (isLoading) {
        return <p>Loading...</p>
    }

    const TableHeadData = ['Lead Id', 'Client Name', 'Company Name', 'Email', 'Phone Number', 'Primary State', 'Primary City', 'zip', 'Status', 'Action'];

    console.log(users);


    return (
        <div>
            <Table className="overflow-x-auto overflow-y-hidden">
                <TableHeader>
                    <TableRow>
                        {
                            TableHeadData.map((t, i) => (
                                <TableHead className="text-xs!" key={i}>{t}</TableHead>
                            ))
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        users?.data?.map((singleUSer: User, i: number) => (
                            <TableRow key={i} className="text-xs">
                                <TableCell>{singleUSer.id.slice(-4)}</TableCell>
                                <TableCell>{singleUSer.firstName} {singleUSer.lastName}</TableCell>
                                <TableCell>{singleUSer.companyName}</TableCell>
                                <TableCell>{singleUSer.email}</TableCell>
                                <TableCell>{singleUSer.contactNumber}</TableCell>
                                <TableCell className="capitalize">{singleUSer.additionalStates[0].state}</TableCell>
                                <TableCell className="capitalize">{singleUSer.additionalStates[0].city}</TableCell>
                                <TableCell className="capitalize">{singleUSer.additionalStates[0].city}</TableCell>
                                <TableCell className="capitalize">{singleUSer.status}</TableCell>
                                <TableCell className="capitalize">
                                    Not Yet
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AllLeads