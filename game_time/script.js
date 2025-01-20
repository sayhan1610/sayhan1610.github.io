document.addEventListener("DOMContentLoaded", () => {
    const currentDateElement = document.getElementById("currentDate");
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    currentDateElement.textContent = formattedDate;
    const codeForm = document.getElementById("codeForm");
    const codeInput = document.getElementById("codeInput");
    const errorMessage = document.getElementById("errorMessage");

    codeForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const enteredCode = codeInput.value.trim();
        try {
            const response = await fetch("pages.json");
            const data = await response.json();

            if (data[enteredCode]) {
                window.location.href = `pages/${data[enteredCode]}.html`;
            } else {
                errorMessage.classList.remove("hidden");
            }
        } catch (err) {
            console.error("Error loading the pages.json file:", err);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const fallingImagesContainer = document.createElement("div");
    fallingImagesContainer.classList.add("falling-images");
    document.body.appendChild(fallingImagesContainer);
  
    const images = ["/static/1.png", "/static/2.png"];
  
    function createFallingImage() {
      const img = document.createElement("img");
      img.src = images[Math.floor(Math.random() * images.length)];
      img.classList.add("falling-image");
  
      const startX = Math.random() * window.innerWidth;
      const duration = Math.random() * 5 + 5; 
      const delay = Math.random() * 5; 

      img.style.left = `${startX}px`;
      img.style.animationDuration = `${duration}s`;
      img.style.animationDelay = `${delay}s`;
  
      fallingImagesContainer.appendChild(img);
  
      img.addEventListener("animationend", () => {
        fallingImagesContainer.removeChild(img);
      });
    }
  
    setInterval(createFallingImage, 500);
  });
  