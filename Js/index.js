import data from "../recipes.js";
import { Recipes } from "./recipes.class.js";

let allDropdownSelectedItems = new Array();
console.log(allDropdownSelectedItems);

///display Recipes ///
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

/// filter recipes in main searchBar ///
filterRecipesByInput("#mainSearchInput");

function filterRecipesByInput(container) {
  let errorMessage = document.querySelector(".recipeMessage");
  let recipesContainer = document.querySelector("#recipes");
  let searchBar = document.querySelector(container);
  searchBar.addEventListener("keyup", (e) => {
    let searchString = e.target.value.toLowerCase().replace(/( )+/g, " ");
    if (searchBar.value.length == "" || searchBar.value.length < 3) {
      errorMessage.style.display = "none";
      displayRecipes("#recipes", data.recipes);
    } else {
      errorMessage.style.display = "none";
      let filteredRecipes = data.recipes.filter((recipe) => {
        return (
          recipe.name.toLowerCase().includes(searchString) ||
          recipe.ingredients
            .map((recipe) => recipe.ingredient)
            .includes(searchString) ||
          recipe.description.toLowerCase().includes(searchString)
        );
      });
      recipesContainer.childNodes.length > 0
        ? displayRecipes("#recipes", filteredRecipes)
        : (errorMessage.style.display = "flex");
    }
  });
}

///display Ingredients in secondary search list ///
let ingredients = getIngredients(data.recipes);
displayIngredients("#ingredientsSearchList", ingredients);
dropDownSelectedIngredients(".recipeIng");
displayRecipesByIngredients("#ingredients");

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

function displayIngredients(container, filteredIngredients) {
  let ingredientsList = document.querySelector(container);
  filteredIngredients.forEach(
    (ingredient) =>
      (ingredientsList.innerHTML += `<li><a class="recipeIng dropdown-item text-white" data-tag="${ingredient}" href="#">${ingredient}</a></li>`)
  );
}

function displayRecipesByIngredients(container) {
  let ingSearchBar = document.querySelector(container);
  ingSearchBar.addEventListener("keyup", (e) => {
    let ingSearchString = e.target.value.toLowerCase().replace(/( )+/g, " ");
    let filteredByIngredients = data.recipes
      .filter((recipe) => recipe.ingredients)
      .map((recipe) => {
        return recipe.ingredients.map((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(ingSearchString)
        );
      });
    console.log(filteredByIngredients);
    displayRecipes("#recipes", filteredByIngredients);
  });
}

function dropDownSelectedIngredients(ingList) {
  let recipeIng = document.querySelectorAll(ingList);
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

      allDropdownSelectedItems.push(targetedIng);
    });
  });
}

/// displayAppareil in secondary search list ///
let appareil = getAppareil(data.recipes);
displayAppareil("#appareilSearchList", appareil);
dropDownSelectedAppareil(".recipeApp");
displayRecipesByAppareil("#appareil");

function getAppareil(dataRecipes) {
  let appareilSet = new Set();
  dataRecipes.forEach((dataRecipe) => {
    let unfilteredAppliancesList = dataRecipe.appliance;
    appareilSet.add(unfilteredAppliancesList);
  });
  const arrayAppareil = [...appareilSet];
  return arrayAppareil;
}

function displayAppareil(container, filteredAppareil) {
  let appareilList = document.querySelector(container);
  filteredAppareil.forEach(
    (appareil) =>
      (appareilList.innerHTML += `<li><a class="recipeApp dropdown-item text-white" data-tag="${appareil}" href="#">${appareil}</a></li>`)
  );
}

function displayRecipesByAppareil(container) {
  let appSearchBar = document.querySelector(container);
  appSearchBar.addEventListener("keyup", (e) => {
    let appSearchString = e.target.value.toLowerCase().replace(/( )+/g, " ");
    let filteredByAppareil = data.recipes.filter((recipe) => {
      return recipe.appliance.toLowerCase().includes(appSearchString);
    });
    console.log(filteredByAppareil);
    displayRecipes("#recipes", filteredByAppareil);
  });
}

function dropDownSelectedAppareil(appList) {
  let recipeApp = document.querySelectorAll(appList);
  filterRecipesByInput("#appareil");
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
      allDropdownSelectedItems.push(targetedApp);
    });
  });
}

/// displayUstensiles in secondary search list ///
let ustensiles = getUstensiles(data.recipes);
displayUstensiles("#ustensilesSearchList", ustensiles);
dropDownSelectedUstensils(".recipeUst");
displayRecipesByUstensils("#ustensiles");

function getUstensiles(dataRecipes) {
  let ustensilsSet = new Set();
  dataRecipes.forEach((dataRecipe) => {
    let unfilteredUstensilsList = dataRecipe.ustensils;
    unfilteredUstensilsList.map((ustensil) => ustensilsSet.add(ustensil));
  });
  const arrayUstensils = [...ustensilsSet];
  return arrayUstensils;
}

function displayUstensiles(container, filteredUstensils) {
  let ustensilsList = document.querySelector(container);
  filteredUstensils.forEach(
    (ustensils) =>
      (ustensilsList.innerHTML += `<li><a class="recipeUst dropdown-item text-white" data-tag="${ustensils}" href="#">${ustensils}</a></li>`)
  );
}

function displayRecipesByUstensils(container) {
  let ustSearchBar = document.querySelector(container);
  ustSearchBar.addEventListener("keyup", (e) => {
    let ustSearchString = e.target.value.toLowerCase().replace(/( )+/g, " ");
    console.log(ustSearchString);
    let filteredByUstensil = data.recipes
      .filter((recipe) => recipe.ustensils)
      .map((recipe) => {
        return recipe.ustensils.map((ustensil) =>
          ustensil.toLowerCase().includes(ustSearchString)
        );
      });

    displayRecipes("#recipes", filteredByUstensil);
  });
}

function dropDownSelectedUstensils(ustList) {
  let recipeUst = document.querySelectorAll(ustList);
  filterRecipesByInput("#ustensiles");
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
      allDropdownSelectedItems.push(targetedUst);
    });
  });
}

