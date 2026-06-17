"use client"
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { states } from '@/lib/states'
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import placeHolder from "../../../public/images.png"
import Image from 'next/image'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserFormValues, createUserSchema } from '@/lib/schema/register'
import { uploadToImageBB } from '@/lib/uploadToImgBB'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'


const CreateUser = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [image, setImage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        setImage(URL.createObjectURL(file));
    }

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateUserFormValues>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            companyName: "",
            website: "",
            primaryState: "",
            primaryCity: "",
            zipCodes: [],
            dncList: "",
            contactNumber: "",
            whatsappNumber: "",
            receiveLeads: "email",
            years: 0,
            email: "",
            password: "",
            note: "",
            leadNumber: 0,
            contract: true,
            payment: true,
            requirment: ""
        },
    });

    const onSubmit = async (data: CreateUserFormValues) => {
        let avatar = "";

        if (selectedFile) {
            avatar = await uploadToImageBB(selectedFile);
        }

        await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                avatar,
            }),
        });
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex items-start justify-between gap-6'>
            <div className='w-[65%]'>
                <Card>
                    <div className='flex items-start justify-between'>
                        <CardHeader className='w-[30%]'>
                            <CardTitle className='text-[12px]'>User Information</CardTitle>
                        </CardHeader>
                        <CardContent className='flex-1'>
                            <div>
                                <FieldGroup className='gap-5!'>
                                    <div className='flex items-center gap-2'>
                                        <Field>
                                            <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                                            <Input
                                                id="firstName"
                                                type="text"
                                                placeholder="John"
                                                {...register("firstName")}
                                            />

                                            {errors.firstName && (
                                                <p className="text-sm text-red-500">
                                                    {errors.firstName.message}
                                                </p>
                                            )}
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="lastName">last Name</FieldLabel>
                                            <Input
                                                id="lastName"
                                                type="text"
                                                placeholder="Doe"
                                                {...register("lastName")}
                                            />

                                            {errors.lastName && (
                                                <p className="text-sm text-red-500">
                                                    {errors.lastName.message}
                                                </p>
                                            )}
                                        </Field>
                                    </div>
                                    <Field>
                                        <FieldLabel htmlFor="companyName">Company Name</FieldLabel>
                                        <Input
                                            id="companyName"
                                            type="text"
                                            placeholder="ABC cleaning Company"
                                            {...register("companyName")}
                                        />
                                        {errors.companyName && (
                                            <p className="text-sm text-red-500">
                                                {errors.companyName.message}
                                            </p>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="website">Website (optional)</FieldLabel>
                                        <Input
                                            id="website"
                                            type="text"
                                            placeholder="www.janitorialappointment.com"
                                            {...register("website")}
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="primaryState">Primary State</FieldLabel>
                                        <Controller
                                            control={control}
                                            name="primaryState"
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select state" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {states.map((state) => (
                                                            <SelectItem
                                                                key={state}
                                                                value={state
                                                                    .toLowerCase()
                                                                    .replace(" ", "-")}
                                                            >
                                                                {state}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {
                                            errors.primaryState && (
                                                <p className="text-sm text-red-500">
                                                    {errors.primaryState.message}
                                                </p>
                                            )
                                        }
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor='primaryCity'>Primary City</FieldLabel>
                                        <Input
                                            id="primaryCity"
                                            type="text"
                                            placeholder="Dallas"
                                            {...register("primaryCity")}
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="zipCodes">Service States (Zip Code)</FieldLabel>
                                        <Controller
                                            control={control}
                                            name="zipCodes"
                                            render={({ field }) => (
                                                <>
                                                    <Textarea
                                                        placeholder="10001,10002"
                                                        value={field.value.join(",")}
                                                        onChange={(e) => {
                                                            field.onChange(
                                                                e.target.value
                                                                    .split(",")
                                                                    .map((z) => z.trim())
                                                                    .filter(Boolean)
                                                            );
                                                        }}
                                                    />
                                                </>
                                            )}
                                        />

                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="dncList">DNC List</FieldLabel>
                                        <Textarea
                                            placeholder="ABC company,Restaurants...etc"
                                            {...register("dncList")}
                                        />
                                        {
                                            errors.dncList && (
                                                <p className="text-sm text-red-500">
                                                    {errors.dncList.message}
                                                </p>
                                            )
                                        }
                                    </Field>
                                    <div className='flex items-center justify-between gap-2'>
                                        <Field>
                                            <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
                                            <Input
                                                id="contactNumber"
                                                type="tel"
                                                placeholder="+1-(702)...."
                                                {...register("contactNumber")}
                                            />
                                            {
                                                errors.contactNumber && (
                                                    <p className="text-sm text-red-500">
                                                        {errors.contactNumber.message}
                                                    </p>
                                                )
                                            }
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="whatsappNumber">Whatsapp Number</FieldLabel>
                                            <Input
                                                id="whatsappNumber"
                                                type="tel"
                                                placeholder="+1-(702)...."
                                                {...register("whatsappNumber")}
                                            />
                                        </Field>
                                    </div>
                                    <Field>
                                        <FieldLabel htmlFor="recieveLeads">How would you like to recieve leads?</FieldLabel>
                                        <Controller
                                            control={control}
                                            name="receiveLeads"
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        <SelectItem value="email">
                                                            Email
                                                        </SelectItem>

                                                        <SelectItem value="whatsapp">
                                                            Whatsapp
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {
                                            errors.receiveLeads && (
                                                <p className="text-sm text-red-500">
                                                    {errors.receiveLeads.message}
                                                </p>
                                            )
                                        }
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor='years'>How many years are you into this business?</FieldLabel>
                                        <Input
                                            id="years"
                                            type="text"
                                            placeholder="5"
                                            {...register("years", {
                                                valueAsNumber: true
                                            })}
                                        />
                                        {
                                            errors.years && (
                                                <p className="text-sm text-red-500">
                                                    {errors.years.message}
                                                </p>
                                            )
                                        }
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor='leadNumber'>Number Of leads can handle</FieldLabel>
                                        <Input
                                            id="leadNumber"
                                            type="text"
                                            placeholder="Number Of leads can handle."
                                            {...register("leadNumber", {
                                                valueAsNumber: true
                                            })}
                                        />
                                        {
                                            errors.leadNumber && (
                                                <p className="text-sm text-red-500">
                                                    {errors.leadNumber.message}
                                                </p>
                                            )
                                        }
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor='requirment'>Minimum Requirment</FieldLabel>
                                        <Textarea id='requirment' {...register("requirment")} placeholder='Your minimum requirement' />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor='max'>Maximum Requirment</FieldLabel>
                                        <Textarea id='max' {...register("max")} placeholder='Your Maximum requirement' />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor='note'>Additional Note</FieldLabel>
                                        <Textarea
                                            id="note"
                                            placeholder="Aditional Note..."
                                            {...register("note")}
                                        />
                                    </Field>
                                </FieldGroup>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </div>
            <div className='flex-1 sticky top-10'>
                <Card>
                    <CardHeader>
                        <label htmlFor="avatar" className="cursor-pointer">
                            <Avatar className="h-20 w-20 mx-auto">
                                <AvatarImage src={image} />
                                <AvatarFallback>
                                    <Image
                                        src={placeHolder}
                                        alt="placeHolder-logo"
                                        width={80}
                                        height={80}
                                        className="w-20 h-20 rounded-full"
                                    />
                                </AvatarFallback>
                                {
                                    image && <Trash onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setImage("");
                                    }} className='w-4 h-4 absolute top-0 text-red-400 right-0 z-10! cursor-pointer' />
                                }
                            </Avatar>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="avatar"
                            className="hidden z-0!"
                            onChange={handleChange}
                        />
                    </CardHeader>
                    <CardContent>
                        <FieldGroup className='gap-4!'>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="johnDoe@gmail.com"
                                    {...register("email")}
                                />
                                {
                                    errors.email && (
                                        <p className="text-sm text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )
                                }
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="***********"
                                    {...register("password")}
                                />
                                {
                                    errors.password && (
                                        <p className="text-sm text-red-500">
                                            {errors.password.message}
                                        </p>
                                    )
                                }
                            </Field>

                            <Controller
                                control={control}
                                name="payment"
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <Label>Agreed to pay?</Label>
                                    </div>
                                )}
                            />
                            <Controller
                                control={control}
                                name="contract"
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <Label>Have Contract?</Label>
                                    </div>
                                )}
                            />

                            <Button className='' type='submit'>
                                Create User
                            </Button>
                        </FieldGroup>
                    </CardContent>
                </Card>
            </div>
        </form>
    )
}

export default CreateUser