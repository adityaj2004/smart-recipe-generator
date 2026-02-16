import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const form = await req.formData();
  const image = form.get("image") as File;

  const bytes = await image.arrayBuffer();

  const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
  });

  const result = await model.generateContent([
    {
      inlineData: {
        data: Buffer.from(bytes).toString("base64"),
        mimeType: image.type,
      },
    },
    "List all food ingredients visible in this image.",
  ]);

  return NextResponse.json({
    ingredients: result.response.text(),
  });
}
