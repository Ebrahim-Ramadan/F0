// app/api/addUser/route.ts
import { addUser, createUserSession } from "@/app/actions";
import { generateHashString } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  const url = new URL(req.url);
  try {
    const { username, password, pic } = await req.json();

    if (!username) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }
    // @ts-ignore
    const {id} = await addUser(username, generateHashString(password), pic);
    console.log('userReturnedID', id);

    if(id.error){
      return NextResponse.json(
        { message: id.error  },
        { status: 500 }
      );
    }
    
    await createUserSession(id, false)
    revalidatePath('/')
    // revalidatePath('/images')
    const redirectUrl = new URL('/', url.origin); // Redirect to home page
    return NextResponse.redirect(redirectUrl); // Redirect response
    // return NextResponse.json({ id: id }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "Error adding user" },
      { status: 500 }
    );
  }
}
