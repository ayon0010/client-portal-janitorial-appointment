import { z } from "zod";

export const createUserSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    companyName: z.string().min(1, "Company name is required"),

    website: z.string().optional(),

    dncList: z.string().optional(),

    contactNumber: z.string().min(1, "Contact number is required"),

    whatsappNumber: z.string().optional(),

    receiveLeads: z.enum(["email", "whatsapp"]),

    years: z.number().positive("Years must be greater than 0"),

    leadNumber: z.number().positive("Number of leads must be greater than 3"),

    email: z.string().email("Invalid email"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    avatar: z.string().url().optional(),

    note: z.string().optional(),

    payment: z.boolean(),

    contract: z.boolean(),

    requirment: z.string().optional(),

    max: z.string().optional(),

    additionalStates: z.array(
        z.object({
            state: z.string().min(1, "State is required"),
            city: z.string().min(1, "City is required"),
            zipCodes: z.array(z.string())
                .transform((val) => val.filter((zip) => zip.trim() !== ""))
                .pipe(z.array(z.string().min(1)).min(1, "At least one zip required")),
        })
    ).min(1, "At least one state is required"),

    licensed: z.boolean(),

    business: z.string().optional()
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;