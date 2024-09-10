import { generateHashString, generateRandomString } from "@/utils/utils";
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
        
        const res = await fetch("/api/addUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userData.login.replace(/[^a-zA-Z0-9]/g, ''),
            password: generateRandomString(),
            pic: userData.avatar_url
          }),
        });
  
        if (!res.ok) {
          const errMessage = await res.json();
          throw new Error(errMessage.message || "Error adding user");
        }
        // Do something with the user data, e.g., create a session, save to database, etc.
        return NextResponse.json({
          message: "GitHub Authentication successful",
          user: userData,
        });
      } catch (error) {
        // Handle any unexpected errors
        console.error("Error during GitHub OAuth flow:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      }
}