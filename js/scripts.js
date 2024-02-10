

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
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal content
    let nameElement = $("<h1>" + item.strCategory + "</h>");
    // creating img in modal content
    let imageElement = $('<img class ="modal-img" style="width:50%">');
    imageElement.attr("src", item.strCategoryThumb);
    
    let descripElement = $("<p>" + "height : " + item.strCategoryDescription + "</p>");
    
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(descripElement);

  }  

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

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    showDetails: showDetails
  };
})();

recipeRepository.loadList().then(function () {
  recipeRepository.getAll().forEach(function (recipe) {
    recipeRepository.addListItem(recipe);
  });
});