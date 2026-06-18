import { z } from "zod";

export const leadUploadSchema = z.object({
    assignUser: z.string().min(1, "User is required"),
    lead: z.string().min(1, "Lead info is required"),
    paymentStatus: z.enum(["paid", "unpaid", "pending"]),
});

export type LeadUploadValues = z.infer<typeof leadUploadSchema>;