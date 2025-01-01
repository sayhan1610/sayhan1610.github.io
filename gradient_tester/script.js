const gradientPreview = document.getElementById('gradientPreview');
const angleInput = document.getElementById('angle');
const angleValue = document.getElementById('angleValue');
const gradientType = document.getElementById('gradientType');
const colorList = document.getElementById('colorList');
const addColorButton = document.getElementById('addColor');
const copyCodeButton = document.getElementById('copyCode');
const gradientSizeInput = document.getElementById('gradientSize');
const gradientSizeValue = document.getElementById('gradientSizeValue');
const sizeUnit = document.getElementById('sizeUnit');

const linearOptions = document.getElementById('linearOptions');
const radialOptions = document.getElementById('radialOptions');
const conicOptions = document.getElementById('conicOptions');

const radialShape = document.getElementById('radialShape');
const radialPosition = document.getElementById('radialPosition');
const conicPosition = document.getElementById('conicPosition');

let colors = ['#ff0000', '#0000ff']; 
let gradientAngle = 90;
let gradientStyle = 'linear-gradient';
let gradientSize = 200; // default size in px
let sizeUnitValue = 'px'; // default unit

function updateGradient() {
  let gradientCSS;
  const gradientColors = colors.join(', ');

  // Determine the size of the gradient
  const sizeValue = `${gradientSize}${sizeUnitValue}`;

  if (gradientStyle === 'linear-gradient') {
    gradientCSS = `${gradientStyle}(${gradientAngle}deg, ${gradientColors})`;
  } else if (gradientStyle === 'radial-gradient') {
    const shape = radialShape.value;
    const position = radialPosition.value;
    gradientCSS = `${gradientStyle}(${shape} at ${position}, ${gradientColors})`;
  } else if (gradientStyle === 'conic-gradient') {
    const position = conicPosition.value;
    gradientCSS = `${gradientStyle}(from ${gradientAngle}deg at ${position}, ${gradientColors})`;
  }

  // Apply the gradient to the preview with the size modification
  gradientPreview.style.background = gradientCSS;
  gradientPreview.style.backgroundSize = sizeValue;
}

function addColorInput(color = '#ffffff') {
  const colorItem = document.createElement('div');
  colorItem.className = 'color-item';

  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.value = color;

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.onclick = () => {
    colorList.removeChild(colorItem);
    colors = colors.filter((c) => c !== colorInput.value);
    updateGradient();
  };

  colorInput.oninput = () => {
    const index = colors.indexOf(color);
    if (index !== -1) {
      colors[index] = colorInput.value;
      updateGradient();
    }
  };

  colorItem.appendChild(colorInput);
  colorItem.appendChild(removeButton);
  colorList.appendChild(colorItem);

  colors.push(color);
}

angleInput.oninput = () => {
  gradientAngle = angleInput.value;
  angleValue.textContent = `${gradientAngle}°`;
  updateGradient();
};

gradientType.onchange = () => {
  gradientStyle = gradientType.value;

  linearOptions.classList.add('hidden');
  radialOptions.classList.add('hidden');
  conicOptions.classList.add('hidden');
  if (gradientStyle === 'linear-gradient') linearOptions.classList.remove('hidden');
  if (gradientStyle === 'radial-gradient') radialOptions.classList.remove('hidden');
  if (gradientStyle === 'conic-gradient') conicOptions.classList.remove('hidden');

  updateGradient();
};

radialShape.onchange = updateGradient;
radialPosition.onchange = updateGradient;
conicPosition.onchange = updateGradient;

addColorButton.onclick = () => addColorInput();

copyCodeButton.onclick = () => {
  const gradientColors = colors.join(', ');
  let gradientCSS;

  if (gradientStyle === 'linear-gradient') {
    gradientCSS = `${gradientStyle}(${gradientAngle}deg, ${gradientColors})`;
  } else if (gradientStyle === 'radial-gradient') {
    const shape = radialShape.value;
    const position = radialPosition.value;
    gradientCSS = `${gradientStyle}(${shape} at ${position}, ${gradientColors})`;
  } else if (gradientStyle === 'conic-gradient') {
    const position = conicPosition.value;
    gradientCSS = `${gradientStyle}(from ${gradientAngle}deg at ${position}, ${gradientColors})`;
  }

  const cssCode = `background: ${gradientCSS};`;
  navigator.clipboard.writeText(cssCode).then(() => alert('CSS code copied!'));
};

gradientSizeInput.oninput = () => {
  gradientSize = gradientSizeInput.value;
  gradientSizeValue.textContent = ``;
  updateGradient();
};

sizeUnit.onchange = () => {
  sizeUnitValue = sizeUnit.value;
  gradientSizeValue.textContent = `${gradientSize}${sizeUnitValue}`;
  updateGradient();
};

colors.forEach(addColorInput);
updateGradient();
