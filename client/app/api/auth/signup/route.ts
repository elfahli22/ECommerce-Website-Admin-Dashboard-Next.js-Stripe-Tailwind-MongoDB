import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDB } from "@/lib/mongoDB"
import User from "@/lib/models/User"

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      )
    }

    await connectToDB()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      email,
      password: hashedPassword,
      name: name || "",
      clerkId: "",
      wishlist: [],
    })

    return NextResponse.json(
      { message: "User created", userId: user._id },
      { status: 201 }
    )
  } catch (err) {
    console.log("[signup_POST]", err)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
