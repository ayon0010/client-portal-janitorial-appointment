"use client"
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadUploadSchema, LeadUploadValues } from '@/lib/schema/Lead'
import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'


const LeadUpload = () => {

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LeadUploadValues>({
        resolver: zodResolver(leadUploadSchema),
        defaultValues: {
            assignUser: "",
            lead: "",
            paymentStatus: "pending",
        },
    });



    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await fetch('/api/all-users');
            const data = await response.json();
            return data;
        }
    })

    if (isLoading) {
        return <p>Loading...</p>
    }



    const onSubmit = async (data: LeadUploadValues) => {
        const response = await fetch('/api/upload-leads', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    };



    return (
        <Card className='p-4'>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>

                        {/* Assign User */}
                        <Field>
                            <FieldLabel>Assign User</FieldLabel>

                            <Controller
                                control={control}
                                name="assignUser"
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Assign User" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {users?.data?.map((user: User) => (
                                                <SelectItem
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.additionalStates?.[0]?.state ?? "No State"} ({user.companyName})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            {errors.assignUser && (
                                <p className="text-sm text-red-500">
                                    {errors.assignUser.message}
                                </p>
                            )}
                        </Field>

                        {/* Lead */}
                        <Field>
                            <FieldLabel>Lead Info</FieldLabel>

                            <Textarea
                                className="w-full min-w-0 break-all whitespace-pre-wrap"
                                placeholder="Upload your lead here"
                                {...register("lead")}
                            />

                            {errors.lead && (
                                <p className="text-sm text-red-500">
                                    {errors.lead.message}
                                </p>
                            )}
                        </Field>

                        {/* Payment Status */}
                        <Field>
                            <FieldLabel>Payment Status</FieldLabel>
                            <Controller
                                control={control}
                                name="paymentStatus"
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Payment Status" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="paid">
                                                Paid
                                            </SelectItem>

                                            <SelectItem value="unpaid">
                                                Unpaid
                                            </SelectItem>

                                            <SelectItem value="pending">
                                                Pending
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            {errors.paymentStatus && (
                                <p className="text-sm text-red-500">
                                    {errors.paymentStatus.message}
                                </p>
                            )}
                        </Field>

                        <Button type="submit" className=''>
                            Upload Lead
                        </Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}

export default LeadUpload