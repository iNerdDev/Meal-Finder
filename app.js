const searchbtn = document.getElementById('searchBtn')
searchbtn.addEventListener('click', getMealList)
const mealList = document.getElementById('show-recipe')
mealList.addEventListener('click', showingFullRecipe)


// get meal that match with search input
function getMealList() {
    const mealInput = document.getElementById("getMealInput").value.trim()
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}
    `)
        .then(response => response.json())
        .then(data => {
            let html = ''
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                 <div class="col-12 col-sm-6 mx-auto col-md-4 col-lg-4 col-xl-4 meal-card">
                 <div class="card mt-3 mx-auto "  data-id="${meal.idMeal}">
                 <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                 <div class="card-body text-center">
                 <h5 class="card-title meal-title">${meal.strMeal}</h5>
                 <button type="button" class="btn recipe-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                     View Recipe
                 </button> 
                 </div>
                 </div>
                 </div>
        `
                })
            } else {
                html =
                    document.getElementById('show-recipe').innerHTML = `<h1 class="no-found">No Recipe Found For Your Search!!!</h1>`
            }
            document.getElementById('show-recipe').innerHTML = html
        })
}

// get meal recipe
function showingFullRecipe(e) {
    e.preventDefault()
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement
        fetch(`
        https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}
        `)
            .then(response => response.json())
            .then(data =>
                fullRecipeModal(data.meals)
            )
    }
}

function fullRecipeModal(meal) {
    const myMeal = meal[0]
    const ingredients = myMeal.strInstructions
    const ingredientsLines = ingredients.split(/\r\n/)
    let ingredientText = ``
    ingredientsLines.forEach(elem => {
        ingredientText += elem
        ingredientText += '<br>'
    })
    const ytLink = myMeal.strYoutube
    const yt = ytLink.slice(32, 43)
    // ingredients
    const { strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15, strIngredient16, strIngredient17, strIngredient18, strIngredient19, strIngredient20 } = myMeal
    const arrIngredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15, strIngredient16, strIngredient17, strIngredient18, strIngredient19, strIngredient20]
    // ingredients qt
    const { strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12, strMeasure13, strMeasure14, strMeasure15, strMeasure16, strMeasure17, strMeasure18, strMeasure19, strMeasure20 } = myMeal
    const arrMeasure = [strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12, strMeasure13, strMeasure14, strMeasure15, strMeasure16, strMeasure17, strMeasure18, strMeasure19, strMeasure20]
    let ightml=''
   for(let i=0;i<arrIngredients.length;i++){
    if(arrIngredients[i].length>0 && arrMeasure[i].length>0){
        ightml+=`
        <tr>
        <th scope="row">
        <p>${arrIngredients[i]}</p>
        </th>
        <td>
        <p>${arrMeasure[i]}</p>
        </td>
    </tr>
        `
    }
   }

    let html = `
    <div class="modal-header">
    <h1 class="modal-title fs-3" id="exampleModalLabel"></h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
<div class="modal-body">
    <div class="text-center">
    <div class="row main-meal-title-bg">
		<div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center justify-content-center">
        <h1 class="main-meal-title">${myMeal.strMeal}</h1>
        </div>
		<div class="col-12 main-meal-img col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <img src="${myMeal.strMealThumb}" class="" alt="">
        </div>
	</div>
    </div>
</div>

<div class="text-center">
<div class="dropdown-center">
<button class="btn dropdown-toggle mb-2" type="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
  Wanna Cook?
</button>
<ul class="dropdown-menu w-100 mt-2">
<table class="table">
<thead>
    <tr>
        <th scope="col">Ingredients</th>
        <th scope="col">Measures</th>
    </tr>
</thead>
<tbody class="ingredient-data">
   ${ightml}
</tbody>
</table>
<h4 class="card-title mx-2 mb-2">Instructions</h4>
<p class="card-text mx-2 instructions">${ingredientText}</p>
<div class="YTiframe mx-2">
<iframe width="100%" height="345" src="https://www.youtube.com/embed/${yt}" allowfullscreen>
</iframe>
</div>
</ul>
</div>
</div>
    `
    document.getElementById('recipe-modal').innerHTML = html
}





