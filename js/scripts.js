



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
  

    function add (recipe) {
      recipeList.push(recipe);
    }

    function addn (recipe){
      if (
        typeof recipe === 'object' &&
        'name' in recipe &&
        'ingredients' in recipe &&
        'instructions' in recipe
        ) {
        recipeList.push(recipe);
      } else {
        console.log('Invalid recipe! Please provide a recipe (object) with the keys: name, ingredients, instructions.');
      }
    }  

    function getAll() {
      return recipeList;
    }

    function findByName(name) {
      return recipeList.find(function (recipe){
        return recipe.name === name;
      });
    }
    
    function filterByProperty(property, value) {
      return recipeList.filter(function (recipe) {
        return recipe[property] === value;
      });
    }

    /* creating name lists with button */
    function btnRecipeList (recipe){
      let unorderlist = document.querySelector ('.recipe_list');
      let list = document.createElement ('li');
      let button = document.createElement ('button');
      button.innerText = recipe.name;
      button.classList.add('button_list');
      list.appendChild(button);
      unorderlist.appendChild(list);

      // Add event listener to the button
      button.addEventListener('click', function(){
        showDetails(recipe);
      });
      // OR use the following method instead

      /* Call the new function to add the event listener
      btnEventListener(button, recipe);  */
    }

    /** Create button event listener function 
   
    function btnEventListener (button, recipe){
      button.addEventListener('click', function(){
        showDetails(recipe);
      });
    }
    */

    function showDetails(recipe) {
      console.log(recipe);
    }


    return {
      add: add,
      addn: addn,
      getAll: getAll,
      findByName: findByName,
      filterByProperty: filterByProperty,
      btnRecipeList: btnRecipeList
    };
  })();

  /** add new recipe */
  let newRecipe = {
    name: 'Alfredo spaghetti',
    ingredients: ['Spaghetti', 'chicken', 'cheese', 'Alfredo'],
    instructions: 'Cook spaghetti, grill chicken, cheese, add alfredo and ready to be served.'
  };

  recipeRepository.addn(newRecipe);
/** recipeRepository.addn ({ name: "Spaghetti", ingredients: ["chicken", "cheese"], instructions: "Coock and ready" })
 * console.log(recipeRepository.getAll());
 */

  let filteredRecipes = recipeRepository.filterByProperty('name', 'Alfredo spaghetti');
  document.write('<Strong>Filtered Recipes</Strong><br>');
  filteredRecipes.forEach(function (recipe) {
    document.write('Name: ' + recipe.name + '<br>' +
    'Ingredients: ' + recipe.ingredients.join(', ') + '<br>' +
    'Instructions: ' + recipe.instructions + '<br><br>');
});
  
  recipeRepository.getAll().forEach(function (recipe) {
    recipeRepository.btnRecipeList(recipe);
  });



