

let recipeRepository = (function () {
  let recipeList = [];

  let apiUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";


  function add(item) {
    if (
      typeof item === "object" &&
      "strCategory" in item
    ) {
      recipeList.push(item);
    } else {
      console.log("Category is not correct");
    }
  }

  // return an Array of categories
  function getAll() {
    return recipeList;
  }

  // Function to filter categories by name
  function filterByName(name) {
    let containerElement = document.querySelector(".row");
    let itemNames = recipeList.map(item => item.name);

    itemNames.forEach((element) => {
        let containerChild = document.querySelector(`[id=${element}]`);
        if (containerChild) {
         if (!element.match(name)) {
           containerElement.removeChild(containerChild);
         }
        }
    });
  }

  function removeAll(){
    let recipeList = document.querySelector(".menu-list");
    recipeList.innerHTML="";
  }

/* creating Category lists with button & Event listener */
  function addListItem(recipe) {
    let recipeList = document.querySelector(".menu-list");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.classList.add("col-12","col-sm-6","col-md-4","col-lg-4");

    let button = document.createElement("button");
    button.innerHTML = recipe.strCategory;
    button.classList.add("btn","btn-lg","btn-block", "list-btn");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    
    listItem.appendChild(button);
    recipeList.appendChild(listItem);

    addEventListenerToButton(recipe, button);
  }

  function addEventListenerToButton(recipe, button) {
    button.addEventListener("click", function() {
      showModal(recipe);
    })
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
    let nameElement = $("<h1>" + item.strCategory + "</h1>");
    // creating img in modal content
    let imageElement = $("<img class =\"modal-img\" style=\"width:50%\">");
    imageElement.attr("src", item.strCategoryThumb);
    
    let descripElement = $("<p>" + "Description : " + item.strCategoryDescription + "</p>");
    
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(descripElement);

  }

  //------------------- Load Lists & Details from API --------------------------
  function loadList(offset, limit) {
    showLoadingMessage();
    let currentApi = apiUrl + "?offset=" + offset + "&limit=" + limit;
    return fetch(currentApi)
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

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    loadList: loadList,
    filterByName: filterByName,
    removeAll: removeAll,
  };
})();

recipeRepository.loadList().then(function () {
  recipeRepository.getAll().forEach(function (recipe) {
    recipeRepository.addListItem(recipe);
  });
});

// find the element with an id(#search) everytime the key is inputed
document.querySelector("#search").addEventListener("input", (e) => {
  const searchText = e.target.value; // rearch the texts typed in
  console.log("input", searchText);

  recipeRepository.removeAll(); // then, remove all the categories

  recipeRepository.getAll().forEach(function (recipe) { // get only math the categories
    if (recipe.strCategory.toLowerCase().includes(searchText.toLowerCase())){
    recipeRepository.addListItem(recipe);
    }
  });
})
