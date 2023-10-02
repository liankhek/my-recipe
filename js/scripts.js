



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
    let recipeList = [
  
      {
        name: 'Fried rice',
        ingredients: ['Cooked rice', '1 egg', 'garlic', 'black pepper', 'salt', 'oil'],
        instructions: 'Fry garlic and egg, add rice, finish up with black pepper and ready to be served.'
      },
    
      {
        name: 'Vegetable',
        ingredients: ['any Vege', 'garlic', 'onion', 'salt', 'oyster sauce', 'oil'],
        instructions: 'Stir-fry garlic and onion, add oyster sauce, and ready to be served.'
      },
    
      {
        name: 'Egg-Drop soup',
        ingredients: ['1 egg', 'water', 'black pepper', 'salt'],
        instructions: 'Boil water, add egg and salt, finish up with black pepper and ready to be served.'
      }
    ];
  
    return {
      add: function (recipe) {
        recipeList.push(recipe);
      },

      addn: function (recipe){
        if (typeof recipe === 'object'){
          let expectedKeys = ['name', 'ingredients', 'instructions'];
          let keyMatch = expectedKeys.every(function(key){
            return Object.keys(recipe).includes(key);
          });
          if (keyMatch) {
            recipeList.push(recipe);
          }
          else {
            console.error ('Invalid recipe! Please provide a recipe(object) with the keys: names, ingredients, instructions.');
          }
        }
        else {
          console.error('Invalid input! Please provide a valid recipe object.');
        }
      },

      getAll: function () {
        return recipeList;
      },

      findByName: function () {
        return recipeList.find(function (recipe){
          return recipe.name === name;
        });
      },
      
      filterByProperty: function (property, value) {
        return recipeList.filter(function (recipe) {
          return recipe[property] === value;
        });
      }
    }
  })();

  let newRecipe = {
    name: 'Alfredo spaghetti',
    ingredients: ['Spaghetti', 'chicken', 'cheese', 'Alfredo'],
    instructions: 'Cook spaghetti, grill chicken, cheese, add alfredo and ready to be served.'
  }

  recipeRepository.addn(newRecipe);

  let filteredRecipes = recipeRepository.filterByProperty ('name', 'Fried rice');
  console.log ('Filtered Recipes:', filteredRecipes);
  
  recipeRepository.getAll().forEach(function (recipe) {
    document.write('Name: ' + recipe.name + '<br>' + 
      'Ingredients: ' + recipe.ingredients.join(', ') + '<br>' + 
      'Instructions: ' + recipe.instructions + '<br><br>');
  });



