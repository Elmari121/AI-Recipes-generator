let apiKey = "2046c535afeb092fo82f1d306d8a2b2t";


function generateRecipe() {
let recipeName = document.getElementById("recipe-name").value.trim();
if (!recipeName) {
 alert("Please enter a recipe name.");
        return;
    }
         let prompt = recipeName;
    let context = "Generate a detailed recipe with ingredients and steps.";
    let apiURL = `https://api.shecodes.io/ai/v1/generate?key=${apiKey}`;
    let url = `${apiURL}&prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}`;
     document.getElementById("recipe-title").innerText = "Loading...";
      axios.get(url)
        .then((response) => {
             document.getElementById("recipe-title").innerText = "";
            document.getElementById("ingredients").innerHTML = "";
            document.getElementById("steps").innerHTML = "";
            if (response.data && response.data.result) {
                let result = response.data.result;
                document.getElementById("recipe-title").innerText = result.title || "No title available";
                if (result.ingredients) {
                    let ingredientsList = result.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("");
                    document.getElementById("ingredients").innerHTML = `<h3>Ingredients</h3><ul>${ingredientsList}</ul>`;
                }
                    if (result.steps) {
                    let stepsList = result.steps.map(step => `<li>${step}</li>`).join("");
                    document.getElementById("steps").innerHTML = `<h3>Steps</h3><ol>${stepsList}</ol>`;
                } } else {
                document.getElementById("recipe-title").innerText = "Error: No recipe found.";
            }
        })
        .catch((error) => {
            console.error("Error fetching recipe:", error);
            document.getElementById("recipe-title").innerText = "Error: Unable to fetch recipe.";
        });
}