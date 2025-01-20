
document.addEventListener("DOMContentLoaded", () => {
    const emojiList = ["🍪", "🍰", "🥐", "🍞", "🥖", "🥪", "🥚", "🍮"];

    function createFallingEmoji() {
      const emoji = document.createElement("div");
      emoji.className = "emoji";
      emoji.innerText =
        emojiList[Math.floor(Math.random() * emojiList.length)];
      emoji.style.left = `${Math.random() * 100}vw`;
      emoji.style.animationDuration = `${Math.random() * 3 + 3}s`;
      document.body.appendChild(emoji);
      setTimeout(() => emoji.remove(), 10000);
    }

    setInterval(createFallingEmoji, 300);

    const loadButton = document.getElementById("load-recipes");
    const submitButton = document.getElementById("submit-recipe");
    const recipesContainer = document.getElementById("recipes-container");
    const recipeDetails = document.getElementById("recipe-details");
    const backButton = document.getElementById("back-button");
    const submitForm = document.getElementById("submit-form");
    const formResponse = document.getElementById("form-response");

    loadButton.addEventListener("click", async () => {
      recipesContainer.innerHTML = "Loading recipes...";
      recipesContainer.classList.remove("hidden");
      submitForm.classList.add("hidden");
      recipeDetails.classList.add("hidden");

      try {
        const response = await fetch(
          "https://bakebook-xn4v.onrender.com/recipes"
        );
        const data = await response.json();
        recipesContainer.innerHTML =
          "<ul>" +
          data.endpoints.map((recipe) => `<li>${recipe}</li>`).join("") +
          "</ul>";

        document.querySelectorAll("li").forEach((item) => {
          item.addEventListener("click", async () => {
            recipesContainer.classList.add("hidden");
            recipeDetails.innerHTML = "Loading recipe...";
            recipeDetails.classList.remove("hidden");

            const recipeName = item.textContent;
            const recipeResponse = await fetch(
              `https://bakebook-xn4v.onrender.com/recipes/${recipeName}`
            );
            const recipeData = await recipeResponse.json();
            recipeDetails.innerHTML = `
                            <h2>${recipeData.name}</h2>
                            <p><strong>Description:</strong> ${
                              recipeData.description
                            }</p>
                            <p><strong>Ingredients:</strong> ${recipeData.ingredients.join(
                              ", "
                            )}</p>
                            <p><strong>Procedure:</strong> ${
                              recipeData.procedure
                            }</p>
                            <p><strong>Hardness:</strong> ${
                              recipeData.hardness
                            }/10</p>
                        `;
          });
        });
      } catch (error) {
        recipesContainer.innerHTML = "Failed to load recipes.";
      }
    });

    submitButton.addEventListener("click", () => {
      recipesContainer.classList.add("hidden");
      recipeDetails.classList.add("hidden");
      submitForm.classList.remove("hidden");
    });

    backButton.addEventListener("click", () => {
      recipesContainer.classList.remove("hidden");
      recipeDetails.classList.add("hidden");
      submitForm.classList.add("hidden");
    });

    submitForm.querySelector("form").addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("recipe-name").value;
      const description = document.getElementById("recipe-description").value;
      const ingredients = document
        .getElementById("recipe-ingredients")
        .value.split(",");
      const procedure = document.getElementById("recipe-procedure").value;
      const hardness = document.getElementById("recipe-hardness").value;

      try {
        const response = await fetch(
          "https://bakebook-xn4v.onrender.com/submit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              description,
              ingredients,
              procedure,
              hardness,
            }),
          }
        );

        const result = await response.json();
        formResponse.innerText = result.message || "Recipe submitted!";
      } catch (error) {
        formResponse.innerText = "Failed to submit recipe.";
      }
    });
  });



