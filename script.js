const shape = document.getElementById('shape');
const input = document.getElementById('command-input');
const button = document.getElementById('execute-button');

button.addEventListener('click', () => {
    const command = input.value.trim();
    if (command) {
        executeCommand(command);
    }
});

function executeCommand(command) {
    const [type, args] = command.split(';');

    if (type === 'shape') {
        handleShapeCommands(args);
    } else if (type === 'background') {
        handleBackgroundCommands(args);
    } else if (type === 'page') {
        handlePageCommands(args);
    } else {
        console.error('Unknown command type!');
    }
}

function handleShapeCommands(args) {
    const [property, value] = args.split("=");

    if (property === "reset") {
        resetShape();
    } else if (property === "text") {
        shape.textContent = value || "";
    } else if (property === "background-color") {
        shape.style.background = value;
    } else if (property === "sides") {
        const sides = parseInt(value, 10);
        if (sides < 3) {
            console.error("A polygon must have at least 3 sides.");
            alert("A polygon must have at least 3 sides.");
            return;
        }
        if (sides > 300) {
            console.warn("More than 300 sides might cause performance issues.");
            alert("Warning: A polygon with more than 300 sides might crash the browser!");
        }
        setPolygonSides(sides);
    } else {
        shape.style[property] = value;
    }
}

function setPolygonSides(sides) {
    const angleStep = (2 * Math.PI) / sides;
    const points = Array.from({ length: sides }, (_, i) => {
        const x = 50 + 50 * Math.cos(i * angleStep); 
        const y = 50 + 50 * Math.sin(i * angleStep);
        return `${x}% ${y}%`;
    }).join(", ");
    shape.style.clipPath = `polygon(${points})`;
}


function handleBackgroundCommands(args) {
    const [property, value] = args.split('=');

    if (property === 'background-color') {
        document.body.style.background = value;
    } 
    else {
        document.body.style[property] = value;
    }
}

function handlePageCommands(args) {
    if (args === 'reset') {
        document.body.style = '';
        resetShape();
    } else {
        console.error('Unknown page command!');
    }
}

function resetShape() {
    shape.style = '';
    shape.textContent = '';
    shape.style.width = '10px';
    shape.style.height = '10px';
    shape.style.backgroundColor = 'black';
    shape.style.color = 'white';
}

let isDragging = false;
let offsetX, offsetY;

function startDrag(e) {
    isDragging = true;
    const rect = shape.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
    shape.style.cursor = 'grabbing';
}

function drag(e) {
    if (isDragging) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = clientX - offsetX;
        const y = clientY - offsetY;
        shape.style.position = 'absolute';
        shape.style.left = `${clientX - offsetX}px`;
        shape.style.top = `${clientY - offsetY}px`;
    }
}

function stopDrag() {
    if (isDragging) {
    isDragging = false;
    shape.style.cursor = 'grab';
    }
}

shape.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDrag);

shape.addEventListener('touchstart', startDrag);
document.addEventListener('touchmove', drag);
document.addEventListener('touchend', stopDrag);

shape.addEventListener('mouseover', () => {
    if (!isDragging) {
        shape.style.cursor = 'grab';
    }
});



const dropdownButton = document.getElementById('dropdown-button');
const commandList = document.getElementById('command-list');
const commandInput = document.getElementById('command-input');
    
dropdownButton.addEventListener('click', (event) => {
  event.stopPropagation();
  if (commandList.style.display === 'none' || !commandList.style.display) {
    commandList.style.display = 'block';
  } else {
    commandList.style.display = 'none';
  }
});

document.addEventListener('click', () => {
  commandList.style.display = 'none';
});

commandList.addEventListener('click', (event) => {
  event.stopPropagation();
});

fetch('commands.json')
  .then((response) => response.json())
  .then((commands) => {
    commands.forEach((cmd) => {
      const commandItem = document.createElement('div');
      commandItem.classList.add('command-item');
      commandItem.textContent = cmd.label;
      commandItem.dataset.command = cmd.command;


      commandItem.addEventListener('click', () => {
        commandInput.value = commandItem.dataset.command;
        commandList.style.display = 'none'; 
      });

      commandList.appendChild(commandItem);
    });
  })
  .catch((error) => console.error('Error loading commands:', error));
