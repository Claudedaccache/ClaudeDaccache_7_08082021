import data from "../recipes.js";
import { Recipes } from "./recipes.class.js";


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


/// get filtered recipes according to the search ///
function AllfilteredRecipes(search){
return data.recipes.filter((recipe) => {
  return (
    recipe.name.toLowerCase().includes(search) ||
    ingredientsUsedInRecipe (search, recipe) ||
    recipe.description.toLowerCase().includes(search)
  );
  });
}

/// filter recipes in main searchBar ///
filterRecipesInMainSearch("#mainSearchInput");

function filterRecipesInMainSearch(container) {
  let recipesContainer = document.querySelector("#recipes");
  let searchBar = document.querySelector(container);
  searchBar.addEventListener("input", () => {
    if (searchBar.value.length == "" || searchBar.value.length < 3) {
      removeErrorMessage(".recipeMessage")
      displayRecipes("#recipes", data.recipes);
    } else {
      removeErrorMessage(".recipeMessage")
      AllfilteredRecipes(searchBar.value)
      recipesContainer.childNodes.length > 0
        ? displayRecipes("#recipes", AllfilteredRecipes(searchBar.value))
        : addErrorMessage(".recipeMessage")
    }
  });
}
/// add error message ///
function addErrorMessage(container){
  let errorMessage = document.querySelector(container);
  errorMessage.style.display = "flex"
}

/// remove error message ///
function removeErrorMessage(container){
  let errorMessage = document.querySelector(container);
  errorMessage.style.display = "none"
}

///get Ingredients to filter them ///
function ingredientsUsedInRecipe (ingredient, recipe){
let ingredients = recipe.ingredients;
let ingredientList = ingredients.map((element)=>element.ingredient.toLowerCase()).join(" ");
return ingredientList.includes(ingredient.toLowerCase())
}

/// get unique Ingredients to display in secondary search list ///
  let ingredients = getIngredients(data.recipes);

  function getIngredients(dataRecipes) {
    let ingredientsSet = new Set();
    dataRecipes.forEach((dataRecipe) => {
      dataRecipe.ingredients.map((recipe) =>
        ingredientsSet.add(recipe.ingredient)
      );
    });
    const arrayIngredients = [...ingredientsSet];
    return arrayIngredients;
  }

  /// get unique appareil to display in secondary search list ///
let appareil = getAppareil(data.recipes);

function getAppareil(dataRecipes) {
  let appareilSet = new Set();
  dataRecipes.forEach((dataRecipe) => {
    let unfilteredAppliancesList = dataRecipe.appliance;
    appareilSet.add(unfilteredAppliancesList);
  });
  const arrayAppareil = [...appareilSet];
  return arrayAppareil;
}

  /// get unique ustensiles to display in secondary search list ///
let ustensiles = getUstensiles(data.recipes);

function getUstensiles(dataRecipes) {
  let ustensilsSet = new Set();
  dataRecipes.forEach((dataRecipe) => {
    let unfilteredUstensilsList = dataRecipe.ustensils;
    unfilteredUstensilsList.map((ustensil) => ustensilsSet.add(ustensil));
  });
  const arrayUstensils = [...ustensilsSet];
  return arrayUstensils;
}

///display Ingredients in secondary search dropdownList ///
displayIngredients("#ingredientsSearchList", ingredients);

function displayIngredients(container, filteredIngredients) {
  let ingredientsList = document.querySelector(container);
  filteredIngredients.forEach(
    (ingredient) =>
      (ingredientsList.innerHTML += `<li><a class="recipeIng dropdown-item text-white" data-tag="${ingredient}" href="#">${ingredient}</a></li>`)
  );
}

///display appliances in secondary search dropdownList ///
displayAppareil("#appareilSearchList", appareil);

function displayAppareil(container, filteredAppareil) {
  let appareilList = document.querySelector(container);
  filteredAppareil.forEach(
    (appareil) =>
      (appareilList.innerHTML += `<li><a class="recipeApp dropdown-item text-white" data-tag="${appareil}" href="#">${appareil}</a></li>`)
  );
}

///display ustensiles in secondary search dropdownList ///
displayUstensiles("#ustensilesSearchList", ustensiles);

function displayUstensiles(container, filteredUstensils) {
  let ustensilsList = document.querySelector(container);
  filteredUstensils.forEach(
    (ustensils) =>
      (ustensilsList.innerHTML += `<li><a class="recipeUst dropdown-item text-white" data-tag="${ustensils}" href="#">${ustensils}</a></li>`)
  );
}

/// display selected ingredients as a tag /// 
dropDownSelectedIngredients(".recipeIng");

function dropDownSelectedIngredients(ingList) {
  let recipeIng = document.querySelectorAll(ingList);
  filterRecipesInMainSearch("#ingredients");
  recipeIng.forEach((ingredient) => {
    ingredient.addEventListener("click", (e) => {
      let targetedIng = e.target.dataset.tag.toLowerCase();
      let ingredientsTagList = document.querySelector("#ingredientsTags");
      ingredientsTagList.innerHTML += `
             <div class="selectedTag bg-primary text-white rounded mr-2 rounded">
             <button type="button" class="ingredientsTagList close border-0 rounded bg-primary text-white" aria-label="Close">${targetedIng}
             </button>
             <span aria-hidden="true" class="closeTag"><i class="fas fa-times"></i></span>
           </div>`;
    });
  });
}

/// display selected appliances as a tag /// 
dropDownSelectedAppareil(".recipeApp");

function dropDownSelectedAppareil(appList) {
  let recipeApp = document.querySelectorAll(appList);
  filterRecipesInMainSearch("#appareil");
  recipeApp.forEach((appareil) => {
    appareil.addEventListener("click", (e) => {
      let targetedApp = e.target.dataset.tag.toLowerCase();
      let appareilTagList = document.querySelector("#appareilTags");
      appareilTagList.innerHTML += `
          <div class="selectedTag bg-success text-white rounded mr-2 rounded">
          <button type="button" class="appareilTagList close border-0 rounded bg-success text-white" aria-label="Close">${targetedApp}
          </button>
          <span aria-hidden="true" class="closeTag"><i class="fas fa-times"></i></span>
        </div>`;
    });
  });
}

/// display selected appliances as a tag /// 
dropDownSelectedUstensils(".recipeUst");

function dropDownSelectedUstensils(ustList) {
    let recipeUst = document.querySelectorAll(ustList);
    filterRecipesInMainSearch("#ustensiles");
    recipeUst.forEach((ustensil) => {
      ustensil.addEventListener("click", (e) => {
        let targetedUst = e.target.dataset.tag.toLowerCase();
        let ustensilTagList = document.querySelector("#ustensilesTags");
        ustensilTagList.innerHTML += `
          <div class="selectedTag bg-danger text-white rounded mr-2 rounded">
          <button type="button" class="ustensilTagList close border-0 rounded bg-danger text-white" aria-label="Close">${targetedUst}
          </button>             
          <span aria-hidden="true" class="closeTag"><i class="fas fa-times"></i></span>
        </div>`;
      });
    });
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
