import data from "../recipes.js";
import { Recipes } from "./recipes.class.js";

let searchBar = document.querySelector("#mainSearchInput");

///display all Recipes (without filter) ///
displayRecipes("#recipes", data.recipes);

function displayRecipes(container, recipes) {
  let recipesContainer = document.querySelector(container);

  recipesContainer.innerHTML = `${recipes
    .map((recipe) => {
      let recipes = new Recipes(recipe).displayRecipes();
      return recipes;
    })
    .join("")}`;
}

/// filtering recipes in the main seach bar ///
function recipeFiltered(search) {
  let filteredRecipes = data.recipes.filter((recipe) => {
    if (
      recipe.name.toLowerCase().includes(search) ||
      ingredientsUsedInRecipe(search, recipe) ||
      recipe.description.toLowerCase().includes(search)
    ) {
      return recipe;
    }
  });
  emptyAll();
  getUniqueItems(filteredRecipes);
  dropDownSelectedItems(
    ".recipeIng",
    "bg-primary",
    "ingredientsTagList",
    "#ingredientsTags"
  );
  dropDownSelectedItems(
    ".recipeApp",
    "bg-success",
    "appareilTagList",
    "#appareilTags"
  );
  dropDownSelectedItems(
    ".recipeUst",
    "bg-danger",
    "ustensilTagList",
    "#ustensilesTags"
  );
  return filteredRecipes;
}

/// filter all recipes in the main search according to the input ///
filterAllRecipesInMainSearch();

function filterAllRecipesInMainSearch() {
  let recipesContainer = document.querySelector("#recipes");
  searchBar.addEventListener("keyup", (e) => {
    let searchString = e.target.value.toLowerCase().replace(/( )+/g, " ");
    if (searchString.value === "" || searchString.length < 3) {
      removeErrorMessage(".recipeMessage");
      displayRecipes("#recipes", data.recipes);
      emptyAll();
      getUniqueItems(data.recipes);
    } else {
      removeErrorMessage(".recipeMessage");
      recipesContainer.childNodes.length > 0
        ? displayRecipes("#recipes", recipeFiltered(searchString))
        : addErrorMessage(".recipeMessage");
    }
  });
}

/// add error message ///
function addErrorMessage(container) {
  let errorMessage = document.querySelector(container);
  errorMessage.style.display = "flex";
}

/// remove error message ///
function removeErrorMessage(container) {
  let errorMessage = document.querySelector(container);
  errorMessage.style.display = "none";
}

///get Ingredients to filter them ///
function ingredientsUsedInRecipe(ingredient, recipe) {
  let ingredients = recipe.ingredients;
  let ingredientList = ingredients
    .map((element) => element.ingredient.toLowerCase())
    .join(" ");
  return ingredientList.includes(ingredient.toLowerCase());
}

///get unique ingredients, appliances and ustensils to display in the secondary dropdown list ///
getUniqueItems(data.recipes);

function getUniqueItems(MainSearchResult) {
  /// get unique Ingredients to display in secondary search list ///

  let arrayIngredients = [];

  getIngredients(MainSearchResult);

  function getIngredients(MainSearchResult) {
    let ingredientsSet = new Set();
    MainSearchResult.forEach((dataRecipe) => {
      dataRecipe.ingredients.map((recipe) =>
        ingredientsSet.add(recipe.ingredient)
      );
    });
    arrayIngredients = [...ingredientsSet];
    return arrayIngredients;
  }

  /// get unique appliances to display in secondary search list ///
  let arrayAppareil = [];

  getAppareil(MainSearchResult);

  function getAppareil(MainSearchResult) {
    let appareilSet = new Set();
    MainSearchResult.forEach((dataRecipe) => {
      appareilSet.add(dataRecipe.appliance);
    });
    arrayAppareil = [...appareilSet];
    return arrayAppareil;
  }

  /// get unique ustensiles to display in secondary search list ///
  let arrayUstensils = [];

  getUstensiles(MainSearchResult);

  function getUstensiles(MainSearchResult) {
    let ustensilsSet = new Set();
    MainSearchResult.forEach((dataRecipe) => {
      dataRecipe.ustensils.map((ustensil) => ustensilsSet.add(ustensil));
    });
    arrayUstensils = [...ustensilsSet];
    return arrayUstensils;
  }

  ///display ingredients, appliances andustensiles in secondary search dropdownList ///
  let appareilSearchList = document.querySelector("#appareilSearchList");
  let ingredientsSearchList = document.querySelector("#ingredientsSearchList");
  let ustensilesSearchList = document.querySelector("#ustensilesSearchList");

  function displayItemsInDropDown(itemList, filteredItems, itemClass) {
    filteredItems.forEach(
      (item) =>
        (itemList.innerHTML += `<li><a class="${itemClass} dropdown-item text-white" data-tag="${item}" href="#">${item}</a></li>`)
    );
  }

  displayItemsInDropDown(ingredientsSearchList, arrayIngredients, "recipeIng");
  displayItemsInDropDown(appareilSearchList, arrayAppareil, "recipeApp");
  displayItemsInDropDown(ustensilesSearchList, arrayUstensils, "recipeUst");

  displayRecipesByIngredients("#ingredients", arrayIngredients);
  displayRecipesByAppareil("#appareil", arrayAppareil);
  displayRecipesByUstensils("#ustensiles", arrayUstensils);

  function displayRecipesByIngredients(container, arrayIngredients) {
    let ingSearchBar = document.querySelector(container);
    ingSearchBar.addEventListener("keyup", (e) => {
      manageDropdownVisibility("#ingredients", "#ingredientsSearchList");
      let ingSearchString = e.target.value.toLowerCase().replace(/( )+/g, " ");
      let filteredByIngredients = arrayIngredients.filter((recipe) => {
        if (recipe.toLowerCase().includes(ingSearchString)) {
          return recipe;
        }
      });
      emptyAll();
      displayItemsInDropDown(
        ingredientsSearchList,
        filteredByIngredients,
        "recipeIng"
      );
      dropDownSelectedItems(
        ".recipeIng",
        "bg-primary",
        "ingredientsTagList",
        "#ingredientsTags"
      );
    });
  }

  function displayRecipesByAppareil(container, arrayAppareil) {
    let appSearchBar = document.querySelector(container);
    appSearchBar.addEventListener("keyup", (e) => {
      manageDropdownVisibility("#appareil", "#appareilSearchList");
      let appSearchString = e.target.value.toLowerCase().replace(/( )+/g, " ");
      let filteredByAppareil = arrayAppareil.filter((recipe) => {
        if (recipe.toLowerCase().includes(appSearchString)) {
          return recipe;
        }
      });
      emptyAll();
      displayItemsInDropDown(
        appareilSearchList,
        filteredByAppareil,
        "recipeApp"
      );
      dropDownSelectedItems(
        ".recipeApp",
        "bg-success",
        "appareilTagList",
        "#appareilTags"
      );
    });
  }

  function displayRecipesByUstensils(container, arrayUstensils) {
    let ustSearchBar = document.querySelector(container);
    ustSearchBar.addEventListener("keyup", (e) => {
      manageDropdownVisibility("#ustensiles", "#ustensilesSearchList");
      let ustSearchString = e.target.value.toLowerCase().replace(/( )+/g, " ");
      let filteredByUstensil = arrayUstensils.filter((recipe) => {
        if (recipe.toLowerCase().includes(ustSearchString)) {
          return recipe;
        }
      });
      emptyAll();
      displayItemsInDropDown(
        ustensilesSearchList,
        filteredByUstensil,
        "recipeUst"
      );
      dropDownSelectedItems(
        ".recipeUst",
        "bg-danger",
        "ustensilTagList",
        "#ustensilesTags"
      );
    });
  }
}

/// display selected ingredients as a tag ///

dropDownSelectedItems(
  ".recipeIng",
  "bg-primary",
  "ingredientsTagList",
  "#ingredientsTags"
);
dropDownSelectedItems(
  ".recipeApp",
  "bg-success",
  "appareilTagList",
  "#appareilTags"
);
dropDownSelectedItems(
  ".recipeUst",
  "bg-danger",
  "ustensilTagList",
  "#ustensilesTags"
);

function dropDownSelectedItems(
  eltList,
  itemColorClass,
  itemTypeClass,
  tagContainer
) {
  let recipeElt = document.querySelectorAll(eltList);
  recipeElt.forEach((elt) => {
    elt.addEventListener("click", (e) => {
      let targetedItem = e.target.dataset.tag.toLowerCase();
      let itemTagList = document.querySelector(tagContainer);
      itemTagList.innerHTML += `
            <div class="selectedTag ${itemColorClass} text-white rounded mr-2 rounded">
            <button type="button" class="${itemTypeClass} close border-0 rounded ${itemColorClass} text-white" aria-label="Close">${targetedItem}
            </button>
            <span aria-hidden="true" class="closeTag"><i class="fas fa-times"></i></span>
          </div>`;
    });
  });
}

/// make visible and invisible the dropdownlist ///

function manageDropdownVisibility(inputContainer, itemList) {
  let container = document.querySelector(inputContainer);
  let dropContainer = document.querySelector(itemList);
  container.addEventListener("input", () => {
    if (container.value.length > 0) {
      dropContainer.style.display = "block";
    } else if (container.value.length == 0) {
      dropContainer.style.display = "";
    }
  });
  window.addEventListener("mouseup", (e) => {
    if (!dropContainer.contains(e.target)) {
      dropContainer.style.display = "";
    }
  });
}

/// empty all containers to be filled by items from selected recipes ///
function emptyAll() {
  appareilSearchList.innerHTML = "";
  ingredientsSearchList.innerHTML = "";
  ustensilesSearchList.innerHTML = "";
}


/// remove tag from list/// 

xxx("#ingredientsTags", ".closeTag")

function xxx(TagContainer, closingBtn) {
  let container = document.querySelector(TagContainer);
  let closeTag = document.querySelectorAll(closingBtn);
    if (container.length > 0) {
      console.log(closeTag);
    }
  }