



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
  let apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';

  function add(recipe) {
    if (
      typeof recipe === "object" &&
      "strCategory" in recipe
    ) {
      recipeList.push(recipe);
    } else {
      console.log("Recipe is not correct");
    }
  }

  function getAll() {
    return recipeList;
  }

/* creating Category lists with button */
  function addListItem(recipe) {
    let recipeListContainer = document.querySelector(".recipe-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = recipe.strCategory;
    button.classList.add("button-list");
    listItem.appendChild(button);
    recipeListContainer.appendChild(listItem);
      // Add event listener to the button
    button.addEventListener("click", function(event) {
      showDetails(recipe);
    });
  }
  // OR use the following method instead

  /* Call the new function to add the event listener
  btnEventListener(button, recipe);  */

/** Create button event listener function 
 * 
function btnEventListener (button, recipe){
  button.addEventListener('click', function(){
    showDetails(recipe);
  });
}
*/

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.categories.forEach(function (item) {
          let recipe = {
            strCategory: item.strCategory,
            strCategoryDescription: item.strCategoryDescription
          };
          add(recipe);
          console.log(recipe);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  
  function loadDetails(item) {
    let apiUrlDetails = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=${item.strCategory}';
    return fetch(apiUrlDetails)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // add the details to the item
        item.meals = details.meals;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(item) {
    recipeRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

/*
  function findByName(name) {
    return mealsList.find(function (meal){
      return meal.strCategory === name;
    });
  }
  
  function filterByProperty(property, value) {
    return mealsList.filter(function (meal) {
      return meal[property] === value;
    });
  } */

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

recipeRepository.loadList().then(function () {
  recipeRepository.getAll().forEach(function (recipe) {
    recipeRepository.addListItem(recipe);
  });
});