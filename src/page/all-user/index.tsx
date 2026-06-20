/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


export type UserWithRelations = Prisma.UserGetPayload<{
    include: {
        leads: true;
    };
}>;

const AllUser = () => {

    const { data: users, refetch, isLoading } = useQuery({
        queryKey: ['Users'],
        queryFn: async () => {
            const response = await fetch('/api/all-users');
            const data = await response.json();
            return data;
        }
    })

    const TableHeadData = [
        { key: "id", label: "Client ID" },
        { key: "name", label: "Client Name" },
        { key: "companyName", label: "Company Name" },
        { key: "email", label: "Email" },
        { key: "contactNumber", label: "Contact Name" },
        { key: "whatsappNumber", label: "Whatsapp" },
        { key: "state", label: "Primary State" },
        { key: "city", label: "Primary City" },
        { key: "zipCodes", label: "Service Area" },
        { key: "additionalStates", label: "Additional States" },
        { key: "years", label: "Years in Business" },
        { key: "licensed", label: "Licensed" },
        { key: "leadCount", label: "Lead Count" },
        { key: "payment", label: "Upfront" },
        { key: "status", label: "Status" },
        { key: "dncList", label: "DNC List" },
        { key: "business", label: "Business Covers" },
        { key: "receiveLeads", label: "Receive Leads By" },
        { key: "leadNumber", label: "Lead Demand" },
        { key: "requirment", label: "Min Requirement" },
        { key: "max", label: "Max Requirement" },
        { key: "note", label: "Note" },
    ];


    const [selectedColumns, setSelectedColumns] = useState(
        TableHeadData.map((c) => c.key)
    );

    if (isLoading) {
        return <p>Loading...</p>
    }

    const exportToExcel = () => {
        const data = users?.data || [];
        const formatted = data.map((user: any) => {
            const row: any = {};

            selectedColumns.forEach((key) => {
                switch (key) {
                    case "id":
                        row["Client ID"] = user.id?.slice(-4);
                        break;

                    case "name":
                        row["Client Name"] = `${user.firstName} ${user.lastName}`;
                        break;

                    case "state":
                        row["Primary State"] = user.additionalStates?.[0]?.state;
                        break;

                    case "city":
                        row["Primary City"] = user.additionalStates?.[0]?.city;
                        break;

                    case "zipCodes":
                        row["Service Area"] =
                            user.additionalStates?.[0]?.zipCodes?.join(", ");
                        break;

                    case "additionalStates":
                        row["Additional States"] = user.additionalStates?.length;
                        break;

                    case "leadCount":
                        row["Lead Count"] = user.leads?.length;
                        break;

                    case "licensed":
                        row["Licensed"] = user.licensed ? "Yes" : "No";
                        break;

                    case "payment":
                        row["Upfront"] = user.payment ? "Yes" : "No";
                        break;

                    default:
                        const label =
                            TableHeadData.find((c) => c.key === key)?.label || key;

                        row[label] = user[key];
                }
            });

            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(formatted);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const file = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(file, "users.xlsx");
    };


    return (
        <div className="space-y-5">
            {/* COLUMN SELECTOR */}
            <div className="flex flex-wrap gap-2 text-xs">
                {TableHeadData.map((col) => (
                    <label key={col.key} className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            checked={selectedColumns.includes(col.key)}
                            onChange={(e) => {
                                setSelectedColumns((prev) =>
                                    e.target.checked
                                        ? [...prev, col.key]
                                        : prev.filter((k) => k !== col.key)
                                );
                            }}
                        />
                        {col.label}
                    </label>
                ))}
            </div>

            {/* EXPORT BUTTON */}
            <button
                onClick={exportToExcel}
                className="bg-blue-500 text-white px-3 py-2 text-lg"
            >
                Export Excel
            </button>

            {/*  */}
            <Table className="overflow-x-auto overflow-y-hidden">
                <TableHeader>
                    <TableRow>
                        {
                            TableHeadData.map((t, i) => (
                                <TableHead className="text-xs!" key={i}>{t.label}</TableHead>
                            ))
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        users?.data?.map((singleUSer: UserWithRelations, i: number) => (
                            <TableRow key={i} className="text-xs">
                                <TableCell>{singleUSer.id.slice(-4)}</TableCell>
                                <TableCell>{singleUSer.firstName} {singleUSer.lastName}</TableCell>
                                <TableCell>{singleUSer.companyName}</TableCell>
                                <TableCell>{singleUSer.email}</TableCell>
                                <TableCell>{singleUSer.contactNumber}</TableCell>
                                <TableCell>{singleUSer.whatsappNumber}</TableCell>
                                <TableCell className="capitalize">{singleUSer.additionalStates[0].state}</TableCell>
                                <TableCell className="capitalize">{singleUSer.additionalStates[0].city}</TableCell>
                                <TableCell className="capitalize max-w-xs! whitespace-normal! break-words!">{singleUSer.additionalStates[0].zipCodes.join(",")}</TableCell>
                                <TableCell className="capitalize">{singleUSer.additionalStates?.length}</TableCell>
                                <TableCell className="capitalize">{singleUSer.years}</TableCell>
                                <TableCell className="capitalize">{singleUSer.licensed ? 'Yes' : 'No'}</TableCell>
                                <TableCell className="capitalize">{singleUSer.leads?.length}</TableCell>
                                <TableCell className="capitalize">{singleUSer.payment ? 'Yes' : 'No'}</TableCell>
                                <TableCell className="capitalize">{singleUSer.status}</TableCell>
                                <TableCell className="capitalize max-w-xs! whitespace-normal! break-words!">{singleUSer.dncList}</TableCell>
                                <TableCell className="capitalize max-w-xs! whitespace-normal! break-words!">{singleUSer.business}</TableCell>
                                <TableCell className="capitalize">{singleUSer.receiveLeads}</TableCell>
                                <TableCell className="capitalize">{singleUSer.leadNumber}</TableCell>
                                <TableCell className="capitalize  max-w-xs! whitespace-normal! break-words!">{singleUSer.requirment}</TableCell>
                                <TableCell className="capitalize  max-w-xs! whitespace-normal! break-words!">{singleUSer.max}</TableCell>
                                <TableCell className="capitalize  max-w-xs! whitespace-normal! break-words!">{singleUSer.note}</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AllUser