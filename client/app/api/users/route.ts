import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@/lib/auth";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
    }

    await connectToDB()

    let user = await User.findById(userId)

    if (!user) {
      user = await User.findByIdAndUpdate(userId, { clerkId: userId }, { new: true })
    }

    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    console.log("[users_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}