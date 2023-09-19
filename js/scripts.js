let recipeList = [];

let recipe1 = {
    name: 'Fried rice',
    ingredients: ['Cooked rice', '1egg', 'garlic', 'blackpepper', 'salt', 'oil'],
    instructions: 'fry garlic and egg, add rice and salt after that and finish up with blackpepper'
};

let recipe2 = {
    name: 'Vegetable',
    ingredients: ['any Vege', 'garlic','onion', 'salt', 'oyster sauce', 'oil'],
    instructions: 'stir-fry garlic and onion , add oyster sauce and serve'
};

let recipe3 = {
    name: 'Egg-Drop soup',
    ingredients: ['1egg', 'water', 'blackpepper', 'salt'],
    instructions: 'boil water, add egg and salt, finish up with blackpepper'
};

recipeList.push(recipe1,recipe2,recipe3);

// Loop through recipeList and display recipes with ingredients and instructions
for (let i = 0; i < recipeList.length; i++) {
    let recipe = recipeList[i];
    let recipeInfo = recipe.name + ' (Ingredients: ' + recipe.ingredients.join(', ') + ') <br>- Instructions: ' + recipe.instructions + ' Ready to serve!';
    // Display the recipe information using document.write
    document.write(recipeInfo + '<br>');
    
    // Add a conditional to highlight recipes with 'egg' in the ingredients
    if (recipe.ingredients.some(ingredient => ingredient.includes('egg'))) {
        document.write(" - Yes, the recipe contains egg!<br>");
    }
}
