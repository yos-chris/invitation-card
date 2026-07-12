import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const wishes = await prisma.wish.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(wishes);
  } catch (error) {
    console.error("Failed to fetch wishes:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || !name.trim() || !message || !message.trim()) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim().slice(0, 60);
    const trimmedMessage = message.trim().slice(0, 400);

    const newWish = await prisma.wish.create({
      data: {
        name: trimmedName,
        message: trimmedMessage,
      },
    });

    return NextResponse.json(newWish);
  } catch (error) {
    console.error("Failed to save wish:", error);
    return NextResponse.json(
      { error: "Failed to save wish" },
      { status: 500 }
    );
  }
}
