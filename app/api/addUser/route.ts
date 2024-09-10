// app/api/addUser/route.ts
import { addUser, createUserSession } from "@/app/actions";
import { generateHashString } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password, pic } = await req.json();

    if (!username) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }
    console.log('Received data:', { username, password, pic });
    // Call the addUser function from your server-side logic
    const {id} = await addUser(username, generateHashString(password), pic);
    console.log('userReturnedID', id);

    if(id.error){
      return NextResponse.json(
        { message: id.error  },
        { status: 500 }
      );
    }
    
    const newSession = await createUserSession(id, false, '/')
    console.log('newSession', newSession);
    
    return NextResponse.json({ id: id }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "Error adding user" },
      { status: 500 }
    );
  }
}
