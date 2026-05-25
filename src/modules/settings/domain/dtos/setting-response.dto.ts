import { z } from "@hono/zod-openapi";

export type SettingsResponse = z.infer<typeof settingsResponseSchema>;

export const settingsResponseSchema = z.object({
    id: z.number(),
    title: z.string().nullable(),
    slug: z.string().nullable(),
    logo: z.string().nullable(),
    favicon: z.string().nullable(),
    contactInfo: z.object({
        phone: z.string().nullable(),
        email: z.string().nullable(),
        address: z.string().nullable(),
    }),
    socialLinks: z.object({
        facebook: z.string().nullable(),
        instagram: z.string().nullable(),
        twitter: z.string().nullable(),
        whatsapp: z.string().nullable(),
    })
});
