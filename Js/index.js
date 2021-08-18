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
  getUniqueItems(filteredRecipes);
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
    } else {
      removeErrorMessage(".recipeMessage");
      displayRecipes("#recipes", recipeFiltered(searchString));

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

  let ingredients = [];

  ingredients = getIngredients(MainSearchResult);

  function getIngredients(MainSearchResult) {
    let ingredientsSet = new Set();
    MainSearchResult.forEach((dataRecipe) => {
      dataRecipe.ingredients.map((recipe) =>
        ingredientsSet.add(recipe.ingredient)
      );
    });
    const arrayIngredients = [...ingredientsSet];
    return arrayIngredients;
  }

  /// get unique appliances to display in secondary search list ///
  let appareil = [];

  appareil = getAppareil(MainSearchResult);

  function getAppareil(MainSearchResult) {
    let appareilSet = new Set();
    MainSearchResult.forEach((dataRecipe) => {
      appareilSet.add(dataRecipe.appliance);
    });
    const arrayAppareil = [...appareilSet];
    return arrayAppareil;
  }

  /// get unique ustensiles to display in secondary search list ///
  let ustensiles = [];

  ustensiles = getUstensiles(MainSearchResult);

  function getUstensiles(MainSearchResult) {
    let ustensilsSet = new Set();
    MainSearchResult.forEach((dataRecipe) => {
      dataRecipe.ustensils.map((ustensil) => ustensilsSet.add(ustensil));
    });
    const arrayUstensils = [...ustensilsSet];
    return arrayUstensils;
  }

  ///display ingredients, appliances andustensiles in secondary search dropdownList ///

  function displayItemsInDropDown(container, filteredItems, itemClass) {
    let ItemList = document.querySelector(container);
    filteredItems.forEach(
      (item) =>
        (ItemList.innerHTML += `<li><a class="${itemClass} dropdown-item text-white" data-tag="${item}" href="#">${item}</a></li>`)
    );
  }

  displayItemsInDropDown("#appareilSearchList", appareil, "recipeApp");
  displayItemsInDropDown("#ingredientsSearchList", ingredients, "recipeIng");
  displayItemsInDropDown("#ustensilesSearchList", ustensiles, "recipeUst");
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

/// make visible and invisible the dropdownlist ///

visibleDropdownList("#ingredientsSearchList");
visibleDropdownList("#appareilSearchList");
visibleDropdownList("#ustensilesSearchList");


function visibleDropdownList(container) {
  let dropContainer = document.querySelector(container);

  dropContainer.classList.remove("invisible");
  dropContainer.classList.add("visible");
}

function InvisibleDropdownList(container) {
  let dropContainer = document.querySelector(container);

  dropContainer.classList.remove("visible");
  dropContainer.classList.add("invisible");
}






///display Ingredients in secondary search list ///
// displayRecipesByIngredients("#ingredients");

// function displayRecipesByIngredients(container) {
//   let ingSearchBar = document.querySelector(container);
//   ingSearchBar.addEventListener("keyup", (e) => {
//     let ingSearchString = e.target.value.toLowerCase().replace(/( )+/g, " ");
//     let filteredByIngredients = filteredRecipes.filter((recipe) => {
//       recipe.ingredients.map((recipeIng) => {
//         return recipeIng.includes(ingSearchString);
//       });
//     });

//     console.log(filteredByIngredients);
//     displayRecipes("#recipes", filteredByIngredients);
//   });
// }

// /// displayAppareil in secondary search list ///
// displayRecipesByAppareil("#appareil");

// function displayRecipesByAppareil(container) {
//   let appSearchBar = document.querySelector(container);
//   appSearchBar.addEventListener("keyup", (e) => {
//     let appSearchString = e.target.value.toLowerCase().replace(/( )+/g, " ");
//     let filteredByAppareil = filteredRecipes.filter((recipe) => {
//       return recipe.appliance.toLowerCase().includes(appSearchString);
//     });
//     console.log(filteredByAppareil);
//     displayRecipes("#recipes", filteredByAppareil);
//   });
// }

// /// displayUstensiles in secondary search list ///
// displayRecipesByUstensils("#ustensiles");

// function displayRecipesByUstensils(container) {
//   let ustSearchBar = document.querySelector(container);
//   ustSearchBar.addEventListener("keyup", (e) => {
//     let ustSearchString = e.target.value.toLowerCase().replace(/( )+/g, " ");
//     console.log(ustSearchString);
//     let filteredByUstensil = filteredRecipes
//       .filter((recipe) => recipe.ustensils)
//       .map((recipe) => {
//         return recipe.ustensils.map((ustensil) =>
//           ustensil.toLowerCase().includes(ustSearchString)
//         );
//       });

//     displayRecipes("#recipes", filteredByUstensil);
//   });
// }

///get ustensils to filter them ///
// function ustensilsUsedInRecipe (ustensils, recipe){
//   let ustensiles = recipe.ustensils;
//   let ustensilsList = ustensiles.map((element)=>element.ustensils.toLowerCase()).join(" ");
//   return ustensilsList.includes(ustensils.toLowerCase())
//   }
