import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const principalEmail = process.env.PRINCIPAL_EMAIL;
    const principalHashBase64 = process.env.PRINCIPAL_PASSWORD_HASH_BASE64;

    if (!principalEmail || !principalHashBase64) {
      return NextResponse.json(
        {
          success: false,
          message: "Server misconfiguration: env vars missing.",
        },
        { status: 500 }
      );
    }

    const principalHash = Buffer.from(
      principalHashBase64,
      "base64"
    ).toString("utf8");

    if (email !== principalEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials.",
        },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, principalHash);

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials.",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      role: "principal",
      redirectTo: "/principal",
    });

    response.cookies.set("principal_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Principal login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error.",
      },
      { status: 500 }
    );
  }
}