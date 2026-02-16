export type Recipe = {
  title: string;
  ingredients: string[];
  diet: string[];
  instructions: string[];
};

export const recipes: Recipe[] = [
  {
    title: "Veggie Omelette",
    ingredients: ["egg", "onion", "spinach"],
    diet: ["vegetarian", "high-protein"],
    instructions: ["Beat eggs", "Cook veggies", "Combine and cook"],
  },
  {
    title: "Chicken Salad",
    ingredients: ["chicken", "lettuce", "olive oil"],
    diet: ["keto", "high-protein"],
    instructions: ["Grill chicken", "Mix veggies", "Serve"],
  },
  {
    title: "Avocado Toast",
    ingredients: ["bread", "avocado"],
    diet: ["vegan"],
    instructions: ["Toast bread", "Mash avocado", "Spread"],
  },
  {
    title: "Paneer Stir Fry",
    ingredients: ["paneer", "pepper", "onion"],
    diet: ["vegetarian", "low-carb"],
    instructions: ["Saute veggies", "Add paneer"],
  },
  {
    title: "Oatmeal Bowl",
    ingredients: ["oats", "milk", "banana"],
    diet: ["vegetarian"],
    instructions: ["Cook oats", "Add toppings"],
  },

  // ⭐ Duplicate pattern to reach 20 quickly
  ...Array.from({ length: 15 }, (_, i) => ({
    title: `Smart Recipe ${i + 1}`,
    ingredients: ["tomato", "garlic", "onion"],
    diet: ["vegetarian"],
    instructions: ["Prep ingredients", "Cook", "Serve"],
  })),
];
