
import { NextRequest, NextResponse } from "next/server";
import { Guestbook, db } from "../../../../../drizzle";



export const GET = async (request: NextRequest) => {
  try {
    const result = await db.select().from(Guestbook);
    return NextResponse.json({ data: result });
  } catch (error) {
    console.log("Error Fetching", error);
  }
};

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  try {
    if (req.name) {
      const res = await db
        .insert(Guestbook)
        .values({ name: req.name })
        .returning();
      return NextResponse.json({ message: "Data Added", data: res });
    }
  } catch (error) {
    console.log("Error Inserting", error);
  }
};
