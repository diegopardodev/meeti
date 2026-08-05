import z from "zod";

export const CommunitySchema = z.object({
    name: z.string().trim().min(3, { error: "The title must be at least 3 characters" }),
    description: z.string().trim().min(10, { error: "The description must be at least 10 characters" }),
    image: z.url({
        protocol: /^https?$/,
        hostname: z.regexes.domain,
        error: "The image is required"
    })
});

export type CommunityInput = z.infer<typeof CommunitySchema>;