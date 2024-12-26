function createSnowfall() {
  const snowflakes = ["❄️", "🍫", "🛷", "🎁", "🎅", "🦌"];
  const snowContainer = document.createElement("div");
  snowContainer.classList.add("snow");
  document.body.appendChild(snowContainer);

  setInterval(() => {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.innerText = snowflakes[Math.floor(Math.random() * snowflakes.length)];
    snowflake.style.fontSize = `${Math.random() * 20 + 10}px`;
    snowflake.style.left = `${Math.random() * window.innerWidth}px`;
    snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
    snowflake.style.animationDelay = `${Math.random() * 5}s`;
    snowContainer.appendChild(snowflake);
  }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
  createSnowfall();
});
