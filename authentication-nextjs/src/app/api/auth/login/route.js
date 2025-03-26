import { connectToDB } from "@/lib/mongodb";
import UserAuth from "@/models/UserAuth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    await connectToDB();
    const { email, password } = await req.json();

    const user = await UserAuth.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // ✅ استخدام Set-Cookie بشكل مباشر
    const response = NextResponse.json({ message: "Login successful" });

    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=${
        60 * 60 * 24
      }; SameSite=Strict`
    );

    return response;
  } catch (error) {
    console.error("🔥 Login error:", error.message);
    return NextResponse.json(
      { message: "Login failed", error: error.message },
      { status: 500 }
    );
  }
}
