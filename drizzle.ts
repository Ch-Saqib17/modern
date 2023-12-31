import { pgTable, integer, varchar, serial } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const Guestbook = pgTable("guestbook", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
});

export type Guest = InferModel<typeof Guestbook>;
export type NewGuest = InferModel<typeof Guestbook, "insert">;



export const db = drizzle(sql);