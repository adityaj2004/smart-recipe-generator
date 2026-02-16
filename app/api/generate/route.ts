import { NextResponse } from "next/server";
import { recipes } from "@/app/data/recipes";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { ingredients, diet } = await req.json();

  // ⭐ Matching algorithm
  const matches = recipes.filter((recipe) => {
    const matchCount = recipe.ingredients.filter((i) =>
      ingredients.includes(i)
    ).length;

    const dietMatch = !diet || recipe.diet.includes(diet);

    return matchCount >= 1 && dietMatch;
  });

  // ⭐ Gemini substitution suggestions
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const result = await model.generateContent(
    `Suggest ingredient substitutions for: ${ingredients.join(", ")}`
  );

  const substitutions = result.response.text();

  return NextResponse.json({
    recipes: matches.slice(0, 5),
    substitutions,
  });
}
