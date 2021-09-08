import data from "../recipes.js";
import { Recipes } from "./recipes.class.js";

let ingTagArray = [];
let appTagArray = [];
let ustTagArray = [];
let allFilteredRecipes = [...data.recipes];
let arrayIngredients = [];
let arrayAppareil = [];
let arrayUstensils = [];

/// calling functions///
displayRecipes("#recipes", allFilteredRecipes);
filterAllRecipesInMainSearch();
getUniqueItems(allFilteredRecipes);
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

/// display all Recipes (without filter) ///
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
function recipeFiltered(search, data) {
  let filteredRecipes = data.filter((recipe) => {
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
  allFilteredRecipes = [...filteredRecipes];
  return filteredRecipes;
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

/// get Ingredients to filter them using a search word or tag ///
function ingredientsUsedInRecipe(ingredient, recipe) {
  let ingredients = recipe.ingredients;
  let ingredientList = ingredients
    .map((element) => element.ingredient.toLowerCase())
    .join(" ");
  return ingredientList.includes(ingredient.toLowerCase());
}

/// get ustensils to filter them using a search word or tag ///
function ustensilsUsedInRecipe(ustensil, recipe) {
  let ustensils = recipe.ustensils;
  let ustensilList = ustensils
    .map((element) => element.toLowerCase())
    .join(" ");
  return ustensilList.includes(ustensil.toLowerCase());
}

///display ingredients, appliances and ustensiles in secondary search dropdownList ///
function displayItemsInDropDown(itemList, filteredItems, itemClass) {
  filteredItems.forEach(
    (item) =>
      (itemList.innerHTML += `<li><a class="${itemClass} dropdown-item text-white" data-tag="${item}" href="#">${item}</a></li>`)
  );
}

/// get unique ingredients, appliances and ustensils to display in the secondary dropdown list ///
function getUniqueItems(MainSearchResult) {
  getIngredients(MainSearchResult);
  getAppareil(MainSearchResult);
  getUstensiles(MainSearchResult);

  let appareilSearchList = document.querySelector("#appareilSearchList");
  let ingredientsSearchList = document.querySelector("#ingredientsSearchList");
  let ustensilesSearchList = document.querySelector("#ustensilesSearchList");

  displayItemsInDropDown(ingredientsSearchList, arrayIngredients, "recipeIng");
  displayItemsInDropDown(appareilSearchList, arrayAppareil, "recipeApp");
  displayItemsInDropDown(ustensilesSearchList, arrayUstensils, "recipeUst");

  displayRecipesByIngredients("#ingredients", arrayIngredients);
  displayRecipesByAppareil("#appareil", arrayAppareil);
  displayRecipesByUstensils("#ustensiles", arrayUstensils);
}

/// filter ingredients in dropdown when typing in input///
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
    ingredientsSearchList.innerHTML = "";
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

/// filter appliances in dropdown when typing in input///
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
    appareilSearchList.innerHTML = "";
    displayItemsInDropDown(appareilSearchList, filteredByAppareil, "recipeApp");
    dropDownSelectedItems(
      ".recipeApp",
      "bg-success",
      "appareilTagList",
      "#appareilTags"
    );
  });
}

/// filter ustensils in dropdown when typing in input///
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
    ustensilesSearchList.innerHTML = "";
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

/// get unique Ingredients to display in secondary search list ///
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
function getAppareil(MainSearchResult) {
  let appareilSet = new Set();
  MainSearchResult.forEach((dataRecipe) => {
    appareilSet.add(dataRecipe.appliance);
  });
  arrayAppareil = [...appareilSet];
  return arrayAppareil;
}

/// get unique ustensiles to display in secondary search list ///
function getUstensiles(MainSearchResult) {
  let ustensilsSet = new Set();
  MainSearchResult.forEach((dataRecipe) => {
    dataRecipe.ustensils.map((ustensil) => ustensilsSet.add(ustensil));
  });
  arrayUstensils = [...ustensilsSet];
  return arrayUstensils;
}

/// display selected ingredients as a tag ///
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
      pushTagsToArray(tagContainer, targetedItem);
      let itemTagList = document.querySelector(tagContainer);
      itemTagList.innerHTML += `
            <div class="selectedTag ${itemColorClass} text-white rounded mr-2 rounded" data-tag="${targetedItem}">
            <button type="button" class="${itemTypeClass} close border-0 rounded ${itemColorClass} text-white">${targetedItem}
            </button>
            <span aria-hidden="true" aria-label="Close" class="closeTag"><i class="fas fa-times"></i></span>
          </div>`;
      removeTag(ingTagArray, "ingredient");
      removeTag(appTagArray, "appliance");
      removeTag(ustTagArray, "ustensil");
    });
  });
}

/// when clicking on an item form the dropdown , the item will be pushed to an empty array specific to its category///
function pushTagsToArray(tagContainer, targetedItem) {
  switch (tagContainer) {
    case "#ingredientsTags":
      ingTagArray.push(targetedItem);
      recipesFilteredByTags("ingredient", targetedItem, allFilteredRecipes);
      break;
    case "#appareilTags":
      appTagArray.push(targetedItem);
      recipesFilteredByTags("appliance", targetedItem, allFilteredRecipes);
      break;
    case "#ustensilesTags":
      ustTagArray.push(targetedItem);
      recipesFilteredByTags("ustensil", targetedItem, allFilteredRecipes);
      break;
  }
}

/// make visible or invisible the dropdownlist ///
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

/// empty all dropdownlist to be filled by items from selected recipes ///
function emptyAll() {
  appareilSearchList.innerHTML = "";
  ingredientsSearchList.innerHTML = "";
  ustensilesSearchList.innerHTML = "";
}

/// manage all secondary search containers to be filled by items from selected recipes ///
function manageAllSecondarySearchContainers(filteredData) {
  displayRecipes("#recipes", filteredData);
  emptyAll();
  getUniqueItems(filteredData);
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
}

/// remove tag from list///
function removeTag(container, category) {
  let tagContainer = document.querySelector("#searchTags");
  if (tagContainer.hasChildNodes()) {
    let closeTag = document.querySelectorAll(".closeTag");
    closeTag.forEach((closeBtn) => {
      closeBtn.addEventListener("click", () => {
        closeBtn.parentNode.style.display = "none";
        let selectedTag = closeBtn.parentNode.dataset.tag;
        var index = container.findIndex(function (item) {
          return item == selectedTag;
        });
        container.splice(index, 1);
        allFilteredRecipes = [...data.recipes];
        if (container.length > 0) {
          container.forEach((tag) => {
            recipesFilteredByTags(category, tag, allFilteredRecipes);
          });
        }
        if (container.length == 0) {
          manageAllSecondarySearchContainers(allFilteredRecipes);
        }
      });
    });
  }
}

/// filter recipes using tags ///
function recipesFilteredByTags(category, tag, data) {
  switch (category) {
    case "ingredient":
      let recipesIng = data.filter((recipe) => {
        return ingredientsUsedInRecipe(tag, recipe);
      });
      allFilteredRecipes = [...recipesIng];
      manageAllSecondarySearchContainers(allFilteredRecipes);
      break;
    case "appliance":
      let recipesApp = data.filter((recipe) => {
        return recipe.appliance.toLowerCase().includes(tag.toLowerCase());
      });
      allFilteredRecipes = [...recipesApp];
      manageAllSecondarySearchContainers(allFilteredRecipes);
      break;
    case "ustensil":
      let recipesUst = data.filter((recipe) => {
        return ustensilsUsedInRecipe(tag, recipe);
      });
      allFilteredRecipes = [...recipesUst];
      manageAllSecondarySearchContainers(allFilteredRecipes);
      break;
  }
}

/// filter and display all recipes in the main search according to the input ///
function filterAllRecipesInMainSearch() {
  let recipesContainer = document.querySelector("#recipes");
  let searchBar = document.querySelector("#mainSearchInput");
  searchBar.addEventListener("keyup", (e) => {
    let searchString = e.target.value.toLowerCase().replace(/( )+/g, " ");
    if (searchString.value === " " || searchString.length < 3) {
      allFilteredRecipes = [...data.recipes];
      removeErrorMessage(".recipeMessage");
      manageAllSecondarySearchContainers(allFilteredRecipes);
    } else {
      removeErrorMessage(".recipeMessage");
      recipesContainer.childNodes.length > 0
        ? displayRecipes(
            "#recipes",
            recipeFiltered(searchString, allFilteredRecipes)
          )
        : addErrorMessage(".recipeMessage");
    }
  });
}
