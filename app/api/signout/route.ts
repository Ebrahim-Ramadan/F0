import { logout } from "@/app/actions";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
const logoutres = await logout()
revalidatePath("/");
if(logoutres){
    return NextResponse.json({ message: 'Signed out successfully' });
}
else{
    return NextResponse.json({ message: 'Failed to sign out' });
}
}