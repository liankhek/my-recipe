



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
  let modalContainer = document.querySelector('#modal-container');


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
// --------------------------Loading----------------
  function showLoadingMessage() {
    let loadingMsg = document.createElement("div");
    loadingMsg.innerText = "LOADING...Please Wait";
    loadingMsg.classList.add("loading_message");
    document.body.appendChild(loadingMsg);
  }

  function hideLoadingMessage() {
    let loadingMsg = document.querySelector(".loading_message");
    if (loadingMsg) {
      loadingMsg.remove();
    }
  }

  // ------------------- Modal ---------------------------
  function showModal(title, description, image) {
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let descriptionElement = document.createElement('p');
    descriptionElement.innerText = description;

    let imageElement = document.createElement("img");
    imageElement.setAttribute("src", image);
    imageElement.setAttribute("width", "304");
    imageElement.setAttribute("height", "228");
    imageElement.setAttribute("alt", title);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(descriptionElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //------------------- Load Lists & Details from API --------------------------
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (json) {
        json.categories.forEach(function (item) {
          let recipe = {
            strCategory: item.strCategory,
            strCategoryDescription: item.strCategoryDescription,
            strCategoryThumb: item.strCategoryThumb
          };
          add(recipe);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }
  
  function loadDetails(item) {
    showLoadingMessage();
    //let apiUrlDetails = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${item.strCategory}`;
    return fetch(apiUrl)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (details) {
        showModal(item.strCategory, item.strCategoryDescription, item.strCategoryThumb);
        console.log(item);
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }


  function showDetails(item) {
    recipeRepository.loadDetails(item);
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
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
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