function displayRecipe(response) {
    
    document.getElementById("recipe-title").innerText = "Recipe for: " + response.data.result.title || "No title available";

    
    if (response.data.result.ingredients) {
        let ingredientsList = response.data.result.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("");
        document.getElementById("ingredients").innerHTML = `<h3>Ingredients:</h3><ul>${ingredientsList}</ul>`;
    }

    
    if (response.data.result.steps) {
        let stepsList = response.data.result.steps.map(step => `<li>${step}</li>`).join("");
        document.getElementById("steps").innerHTML = `<h3>Steps:</h3><ol>${stepsList}</ol>`;
    }
}

function generateRecipe(event) {
    event.preventDefault(); 

    let recipeNameInput = document.querySelector("#recipe-name");
    let apiKey = "2046c535afeb092fo82f1d306d8a2b2t";
    let context = "You are a culinary expert. Your task is to create a detailed recipe including ingredients and steps. Please provide a title, a list of ingredients, and step-by-step instructions. Make sure to follow the user's recipe request exactly.";
    let prompt = `User instructions: Generate a recipe for ${recipeNameInput.value}`;
    let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

    let recipeElement = document.querySelector("#recipe-display");
    recipeElement.classList.remove("hidden");
    recipeElement.innerHTML = `<div class="generating">⏳ Generating a recipe for "${recipeNameInput.value}"</div>`;

    axios.get(apiURL).then(displayRecipe);
}

// Ensure the form exists before adding the event listener
let recipeFormElement = document.querySelector("#recipe-generator-form");

if (recipeFormElement) {
    recipeFormElement.addEventListener("submit", generateRecipe);
} else {
    console.error("Form element not found!");
}

