import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.PRINCIPAL_EMAIL;
    const adminHash = process.env.PRINCIPAL_PASSWORD_HASH;

    if (!adminEmail || !adminHash) {
      return NextResponse.json(
        { success: false, message: "Server misconfiguration: env vars missing." },
        { status: 500 }
      );
    }

    if (email === adminEmail) {
      const isMatch = await bcrypt.compare(password, adminHash);

      if (isMatch) {
        return NextResponse.json({
          success: true,
          role: "principal",
          redirectTo: "/principal",
        });
      }
    }

    return NextResponse.json(
      { success: false, message: "Invalid credentials." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Principal login error:", error);
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 }
    );
  }
}