import data from "../recipes.js";

export class Recipes {
  constructor(elt) {
    this.elt = data.recipes;
    this.name = elt.name;
    this.servings = elt.servings;
    this.time = elt.time;
    this.quantity, this.unit;
    this.description = elt.description;
    this.appliance = elt.appliance;
    this.ustensils = elt.ustensils;
    this.ingredients = elt.ingredients
      .map((recipe) => {
        return `<li><strong>${
          recipe.ingredient ? recipe.ingredient : ""
        }: </strong> ${recipe.quantity ? recipe.quantity : ""}
                  ${recipe.unit ? recipe.unit : ""}</li>`;
      })
      .join("");
  }

  displayRecipes(elt) {
    const repices = ` <div class="col col-lg-4 col-md-6">
      <div class="recipeItem card mb-4">
        <img class="card-img-top" src="./image/recipes img.jpg" alt="Card image cap">
        <div class="card-body bg-light">
          <div class="d-flex justify-content-between">
            <h5 class="card-title" data-appliances="${this.appliance}" data-ustensils="${this.ustensils}">${this.name}</h5>
            <div class="recipeTimeSec d-flex">
              <i class="far fa-clock"></i>
              <h5 class="recipeTime card-text">${this.time} min</h5>
            </div>
          </div>
          <div class="d-flex justify-content-between mt-2">
            <div class="row">
              <div class="recipePreperation d-flex flex-column col col-6">
                <ul class="recipeIngredients">
                ${this.ingredients}
               </ul>
              </div>
              <div class="recipeDescription d-flex flex-column col col-6"> 
                <p class="card-description">${this.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
  `;
    return repices;
  }

}
