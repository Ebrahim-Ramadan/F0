// app/api/addUser/route.ts
import { addUser } from "@/app/actions";
import { generateHashString } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Call the addUser function from your server-side logic
    await addUser(username, generateHashString(password));

    return NextResponse.json({ message: "User added successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "Error adding user" },
      { status: 500 }
    );
  }
}
