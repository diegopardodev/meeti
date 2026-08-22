import z from "zod";

export const GeoCodeSchema = z.object({
    LongLabel: z.string(),
    City: z.string(),
    CntryName: z.string(),
    InputX: z.number(),
    InputY: z.number(),
});

const BaseSchema = z.object({
    title: z.string().min(1, { message: "The name is required" }),
    details: z.string().min(50, { message: "Add more details about the event" }),
    image: z.url({ protocol: /^https?$/, hostname: z.regexes.domain, error: "The image is required" }),
    communityId: z.uuid({ message: "Choose a community" }),
    availableSeats: z.preprocess(Number, z.number().min(1, { error: "The capacity must be greater than 0" })),
    date: z.iso.date({ message: "Add a date" }),
    time: z.string().min(1, { message: "The time is required" }),
    categoryId: z.uuid({ message: "Choose a category" }),
});

const MeetiLocationSchema = z.object({
    placeName: z.string().min(1, { message: "The place name is required" }),
    address: z.string().min(1, { message: "The place address is required" }),
    city: z.string().min(1, { message: "The city is required" }),
    country: z.string().min(1, { message: "The country is required" }),
    lat: z.number({ error: "Invalid location" }).min(-90, { error: "Invalid location" }).max(90, { error: "Invalid location" }),
    lng: z.number({ error: "Invalid location" }).min(-90, { error: "Invalid location" }).max(90, { error: "Invalid location" })
});

const VirtualMeetiSchema = BaseSchema.extend({
    virtual: z.literal(true),
});

const PhysicalMeetiSchema = BaseSchema.extend({
    virtual: z.literal(false),
    location: MeetiLocationSchema,
});
 
export const MeetiSchema = z.discriminatedUnion("virtual", [
    VirtualMeetiSchema,
    PhysicalMeetiSchema,
]);

export type MeetiInput = z.infer<typeof MeetiSchema>;