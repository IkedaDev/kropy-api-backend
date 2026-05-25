import { z } from "@hono/zod-openapi";
import { ContactInfo, SocialLinks } from "../entities/Setting.entity.js";


export const clientResponseSchema = z.object({
    id: z.number(),
    title: z.string().nullable(),
    slug: z.string().nullable(),
    logo: z.string().nullable(),
    rufavicont: z.string().nullable(),
    contactInfo: z.instanceof(ContactInfo),
    socialLinks: z.instanceof(SocialLinks),
});
