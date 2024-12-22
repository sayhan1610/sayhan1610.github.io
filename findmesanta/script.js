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

function typeWriter(element, text, speed) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

async function fetchClientInfo() {
  // Use the new API for geolocation
  const ipResponse = await fetch("https://get.geojs.io/v1/ip/geo.json");
  const ipData = await ipResponse.json();

  const locationData = await new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject("Geolocation not supported");
    }
  }).catch(() => null);

  const userAgent = navigator.userAgent;
  const browserInfo = getBrowserInfo(userAgent);
  const osInfo = getOSInfo(userAgent);

  const terminalDiv = document.createElement("div");
  terminalDiv.classList.add("terminal");
  const infoContainer = document.getElementById("info");
  infoContainer.appendChild(terminalDiv);

  const ipInfoText = [
    `IP Address: ${ipData.ip}`,
    `Country: ${ipData.country}`,
    `Region: ${ipData.region}`,
    `City: ${ipData.city}`,
    `Browser: ${browserInfo}`,
    `Operating System: ${osInfo}`,
    `User Agent: ${userAgent}`,
    `Hostname: ${ipData.as || "Not available"}`,
    `ISP: ${ipData.isp || "Not available"}`,
    `Location: ${
      locationData
        ? `${locationData.latitude}, ${locationData.longitude}`
        : "Location not shared"
    }`
  ];

  ipInfoText.forEach((text, index) => {
    const paragraph = document.createElement("p");
    terminalDiv.appendChild(paragraph);
    setTimeout(() => {
      typeWriter(paragraph, text, 50);
    }, index * 3000);  
  });
}

function getBrowserInfo(userAgent) {
  const browserRegex =
    /(chrome|safari|firefox|edge|opera|msie|trident)\/?\s*(\d+)/i;
  const match = userAgent.match(browserRegex);
  if (match) {
    const browser = match[1].toLowerCase();
    const version = match[2];
    return `${capitalizeFirstLetter(browser)} (${version})`;
  }
  return "Unknown Browser";
}

function getOSInfo(userAgent) {
  if (userAgent.includes("Windows NT 10.0")) {
    if (userAgent.includes("Win64; ARM64")) {
      return "Windows 11 (ARM64)";
    }
    return "Windows 10 / 11";
  }
  if (userAgent.includes("Windows NT 6.3")) return "Windows 8.1";
  if (userAgent.includes("Windows NT 6.2")) return "Windows 8";
  if (userAgent.includes("Windows NT 6.1")) return "Windows 7";
  if (userAgent.includes("Windows NT 6.0")) return "Windows Vista";
  if (userAgent.includes("Windows NT 5.1") || userAgent.includes("Windows XP")) return "Windows XP";

  if (userAgent.includes("Mac OS X")) {
    const macVersionMatch = userAgent.match(/Mac OS X (\d+[_\.]\d+(_\d+)?)/);
    if (macVersionMatch) return `Mac OS X ${macVersionMatch[1]}`;
    return "Mac OS";
  }

  if (userAgent.includes("Linux")) {
    return "Linux OS";
  }

  return "Unknown OS";
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function startFlyingSanta() {
  const santa = document.getElementById("santa");
  const hohoho1 = document.getElementById("hohoho1");
  const hohoho2 = document.getElementById("hohoho2");

  // Function to play random hohoho sound
  function playRandomSound() {
    const sounds = [hohoho1, hohoho2];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound.play();
  }

  // Function to calculate angle based on movement direction
  function calculateRotation(dx, dy) {
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }

  // Function to make Santa fly across the page
  function flySanta() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Random direction (diagonal or horizontal)
    const randomDirection = Math.random() < 0.5; // true for diagonal, false for horizontal
    let dx, dy;

    if (randomDirection) {
      dx = Math.random() * 4 - 2; // Random horizontal speed between -2 and 2
      dy = Math.random() * 4 - 2; // Random vertical speed between -2 and 2
    } else {
      dx = Math.random() * 4 - 2; // Random horizontal speed between -2 and 2
      dy = 0; // No vertical movement for horizontal motion
    }

    // Set initial position and display Santa
    santa.style.left = randomDirection ? `${Math.random() * screenWidth}px` : `0px`;
    santa.style.top = randomDirection ? `${Math.random() * screenHeight}px` : `${Math.random() * screenHeight}px`;
    santa.style.display = "block";

    // Animate Santa's movement
    const moveInterval = setInterval(() => {
      let left = parseFloat(santa.style.left);
      let top = parseFloat(santa.style.top);

      // Calculate new position
      left += dx;
      top += dy;

      // Check if Santa is off-screen and reset position
      if (left < -100 || left > screenWidth || top < -100 || top > screenHeight) {
        clearInterval(moveInterval);
        santa.style.display = "none";
        flySanta(); // Restart the flying process
      } else {
        // Update position and rotation
        santa.style.left = `${left}px`;
        santa.style.top = `${top}px`;
        santa.style.transform = `rotate(${calculateRotation(dx, dy)}deg)`;
      }
    }, 20);
  }

  // Start flying after a random interval between 10 and 30 seconds
  setInterval(() => {
    playRandomSound();
    flySanta();
  }, Math.random() * 20000 + 10000); // 10-30 seconds

  // Show Santa on 'Hohoho' button click
  document.getElementById("accept").addEventListener("click", () => {
    flySanta(); // Start flying Santa immediately
  });
}

function showPopup() {
  const modal = document.getElementById("modal");
  const acceptBtn = document.getElementById("accept");
  const declineBtn = document.getElementById("decline");
  const infoContainer = document.getElementById("info");

  modal.style.display = "flex";

  acceptBtn.addEventListener("click", () => {
    const audio = new Audio("static/christmas.mp3");
    audio.loop = true;
    audio.play();
    modal.style.display = "none";
    createSnowfall();
    const terminalDiv = document.createElement("div");
    terminalDiv.classList.add("terminal");
    infoContainer.appendChild(terminalDiv);
    terminalDiv.innerHTML = "<p>Connected to santaclause@north.pole</p>";
    typeWriter(terminalDiv, "Printing Santa's delivery info for you...", 100);
    fetchClientInfo();
    startFlyingSanta(); 
  });

  declineBtn.addEventListener("click", () => {
    const audio = new Audio("static/christmas2.mp3");
    audio.loop = true;
    audio.play();
    modal.style.display = "none";
    const terminalDiv = document.createElement("div");
    terminalDiv.classList.add("terminal");
    infoContainer.appendChild(terminalDiv);
    terminalDiv.innerHTML = '<p style="color: red;">Could not connect to santaclause@north.pole</p>';
    typeWriter(terminalDiv, "You have declined the request. Merry Christmas anyway!", 100);
  });
}

document.addEventListener("DOMContentLoaded", showPopup);
