import query from "@/lib/query";
import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { adminDB } from "@/firebaseAdmin";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { prompt, id, model, session } = body;
    if (!prompt) {
      return NextResponse.json(
        {
          message: "Please provide a prompt.",
        },
        { status: 400 }
      );
    }
    if (!id) {
      return NextResponse.json(
        {
          message: "provide a valid chat ID.",
        },
        { status: 400 }
      );
    }
    const response = await query(prompt, id, model);

    const message = {
      text: response || "Chat GPT was unable to find chat for that.",
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        _id: "ChatGPT",
        name: "ChatGPT",
        avatar: "https://res.cloudinary.com/diuf2wkef/image/upload/v1729832899/logo_leoytz.png",
      },
    };

    await adminDB
      .collection("users")
      .doc(session)
      .collection("chats")
      .doc(id)
      .collection("messages")
      .add(message);

    return NextResponse.json(
      {
        answer: message?.text,
        success: true,
        message: "api is connected.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
        message: "Error in chat.",
      },
      { status: 500 }
    );
  }
}
