import { z } from "zod";

export const createUserSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    companyName: z.string().min(1, "Company name is required"),

    website: z.string().optional(),

    primaryState: z.string().min(1, "Primary state is required"),

    primaryCity: z.string().optional(),

    zipCodes: z.array(z.string().min(1)).min(1, "At least one zip code required"),

    dncList: z.string().optional(),

    contactNumber: z.string().min(1, "Contact number is required"),

    whatsappNumber: z.string().optional(),

    receiveLeads: z.enum(["email", "whatsapp"]),

    years: z.number().min(0, "Years must be 0 or greater"),

    email: z.string().email("Invalid email"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    avatar: z.string().url().optional(),

    note: z.string().optional(),

    leadNumber: z.number().min(0, "Lead number must be greater than 3"),

    payment: z.boolean(),

    contract: z.boolean(),

    requirment: z.string().optional(),

    max: z.string().optional()
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;