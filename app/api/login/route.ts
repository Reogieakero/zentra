import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.PRINCIPAL_EMAIL;
    const adminHash = process.env.PRINCIPAL_PASSWORD_HASH;

    console.log("Input Email:", email);
    console.log("Env Email:", adminEmail);
    console.log("Has Hash?:", !!adminHash);

    if (email === adminEmail && adminHash) {
      const isMatch = await bcrypt.compare(password, adminHash);

      console.log("Comparing:", password, "against", adminHash); // ADD THIS
      console.log("Match Result:", isMatch);

      if (isMatch) {
        return NextResponse.json({ 
          success: true, 
          role: "principal", 
          redirectTo: "/principal" 
        });
      }
    }

    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}