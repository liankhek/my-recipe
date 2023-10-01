



// Loop through recipeList and display recipes with ingredients and instructions
/*
for (let i = 0; i < recipeList.length; i++) {
    let recipe = recipeList[i];
    let recipeInfo = recipe.name + ' (Ingredients: ' + recipe.ingredients.join(', ') + ') <br>- Instructions: ' + recipe.instructions + ' Ready to serve!';
    // Display the recipe information using document.write
    document.write(recipeInfo + '<br>');
    
    //-------- Add a conditional to highlight recipes with 'egg' in the ingredients example -------------
    /* 
    //let hasEgg = recipe.ingredients.some(function(ingredient) {
        return ingredient.includes('egg');
    });
    //if (hasEgg) {
        document.write(" - Yes, the recipe contains egg!<br>");
    }
    
    if (recipe.ingredients.some(ingredient => ingredient.includes('egg'))) { // arrow function
        document.write(" - Yes, the recipe contains egg!<br>");
    }
}
*/
let recipeRepository = (function () {
    let recipeList = [];
  
    let recipe1 = {
      name: 'Fried rice',
      ingredients: ['Cooked rice', '1 egg', 'garlic', 'black pepper', 'salt', 'oil'],
      instructions: 'Fry garlic and egg, add rice and salt after that, and finish up with black pepper'
    };
  
    let recipe2 = {
      name: 'Vegetable',
      ingredients: ['any Vege', 'garlic', 'onion', 'salt', 'oyster sauce', 'oil'],
      instructions: 'Stir-fry garlic and onion, add oyster sauce, and serve'
    };
  
    let recipe3 = {
      name: 'Egg-Drop soup',
      ingredients: ['1 egg', 'water', 'black pepper', 'salt'],
      instructions: 'Boil water, add egg and salt, finish up with black pepper'
    };
    
    recipeList.push(recipe1, recipe2, recipe3);
  
    return {
      add: function (recipe) {
        recipeList.push(recipe);
      },
      getAll: function () {
        return recipeList;
      }
    }
  })();
  
  recipeRepository.getAll().forEach(function (recipe) {
    document.write('Name: ' + recipe.name + '<br>' + 
      'Ingredients: ' + recipe.ingredients.join(', ') + '<br>' + 
      'Instructions: ' + recipe.instructions + '<br><br>');
  });



