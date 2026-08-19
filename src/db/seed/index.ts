import { drizzle } from "drizzle-orm/node-postgres";
import { categories } from "./data/categories";
import { category } from "../schema";
import "dotenv/config";

async function seed() {
    const db = drizzle(process.env.DATABASE_URL!);
    await db.insert(category).values(categories);
    console.log("Database seeded");
}

seed();