"use client";
import { useState } from "react";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [diet, setDiet] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [subs, setSubs] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: ingredients.split(",").map((i) => i.trim()),
          diet,
        }),
      });

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();

      setRecipes(data.recipes || []);
      setSubs(data.substitutions || "");
    } catch (err) {
      alert("Failed to generate recipes");
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    const form = new FormData();
    form.append("image", file);

    const res = await fetch("/api/recognize", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setIngredients(data.ingredients || "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 text-slate-800">
      
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-600">
            🍳 RecipeAI
          </h1>
          <span className="text-sm text-slate-500">
            Smart Cooking Assistant
          </span>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-16 px-6">
        <h2 className="text-4xl font-extrabold mb-4">
          Turn Ingredients Into Recipes
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto">
          Upload ingredients or images and let AI suggest the best recipes,
          substitutions, and dietary-friendly meals.
        </p>
      </section>

      {/* MAIN CARD */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* INPUTS */}
          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Ingredients (comma separated)"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />

            <input
              placeholder="Diet (vegan, keto, vegetarian)"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">
              Upload ingredient image
            </label>
            <input
              type="file"
              className="block w-full text-sm"
              onChange={(e) =>
                e.target.files && uploadImage(e.target.files[0])
              }
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={generate}
            disabled={loading}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Recipes"}
          </button>
        </div>
      </section>

      {/* RESULTS */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* RECIPES */}
        <div className="grid md:grid-cols-2 gap-6">
          {recipes.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-2">{r.title}</h3>
              <ul className="list-disc ml-5 text-slate-600">
                {r.instructions.map((step: string, idx: number) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SUBSTITUTIONS */}
        {subs && (
          <div className="mt-10 bg-yellow-100 border border-yellow-200 rounded-xl p-6">
            <h4 className="font-bold mb-2">
              🔁 Substitution Suggestions
            </h4>
            <p className="text-slate-700">{subs}</p>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-sm text-slate-500">
        © {new Date().getFullYear()} RecipeAI — Built by Aditya Kumar jha 
      </footer>
    </div>
  );
}
