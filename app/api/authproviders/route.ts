import { addUser, createUserSession } from "@/app/actions";
import { generateHashString, generateRandomString } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    // const state = url.searchParams.get("state");
    if (!code) {
        return NextResponse.json({ error: "Authorization code is missing" }, { status: 400 });
      }
      try {
        // Exchange the authorization code for an access token
        const response = await fetch("https://github.com/login/oauth/access_token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json", // Get the response in JSON format
          },
          body: JSON.stringify({
            client_id: process.env.GH_CLIENT_ID,
            client_secret: process.env.GH_CLIENT_SECRET,
            code,
          }),
        });
    
        const data = await response.json();
    
        if (data.error) {
          // Handle error in exchanging code
          return NextResponse.json({ error: data.error }, { status: 400 });
        }
    
        // GitHub returns the access token
        const accessToken = data.access_token;
    
        // You can now use this access token to fetch the user's GitHub profile
        const userResponse = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
    
        const userData = await userResponse.json();
        console.log('userData', userData);
        // @ts-ignore
        const result = await addUser(userData.login.replace(/[^a-zA-Z0-9]/g, ' '), generateHashString(generateRandomString()), userData.avatar_url, true);
    console.log('result', result);
    
        if('error' in result){
            return NextResponse.json(
              { message: result.error  },
              { status: 500 }
            );
          }
        // @ts-ignore
        await createUserSession(result.id, false)
        revalidatePath('/')
        const redirectUrl = process.env.NODE_ENV === 'development'
        ? new URL('http://localhost:3001/')
        : new URL('/', url.origin); 

        return NextResponse.redirect(redirectUrl); // Redirect response
      } catch (error) {
        // Handle any unexpected errors
        console.error("Error during GitHub OAuth flow:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      }
}