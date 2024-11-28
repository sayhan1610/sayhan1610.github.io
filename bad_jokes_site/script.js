const jokeOut = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');
const body = document.querySelector('.body');

jokeBtn.addEventListener('click', () => {
    generateJoke();
    changeBackgroundColor();
});

generateJoke();

async function generateJoke() {
    const config = {
        headers: {
            Accept: 'application/json',
        },
    };

    const response = await fetch('https://icanhazdadjoke.com', config);
    const data = await response.json();

    jokeOut.innerHTML = "";
    typeWriterEffect(data.joke, jokeOut, 20);
}

function typeWriterEffect(text, element, delay) {
    let index = 0;

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, delay);
        }
    }
    type();
}

const colors = ["black", "white", "red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "gray", "cyan", "magenta", "olive", "lime", "teal", "navy", "maroon", "aqua", "fuchsia", "silver", "lime", "crimson", "coral", "gold", "indigo", "ivory", "khaki", "lavender", "magenta", "orchid", "plum", "salmon", "sienna", "tan", "thistle", "tomato", "turquoise", "violet", "wheat", "azure", "beige", "bisque", "blanchedalmond", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "gainsboro", "ghostwhite", "gold", "goldenrod", "greenyellow", "honeydew", "hotpink", "indianred", "khaki", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "linen", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite",]

function changeBackgroundColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    body.style.transition = 'background-color 1s ease';
    body.style.backgroundColor = randomColor;
}

jokeOut.addEventListener('click', () => {
    const jokeText = jokeOut.innerText;
    if (jokeText && jokeText !== "Loading...") {
        navigator.clipboard.writeText(jokeText).then(() => {
            const originalText = jokeOut.innerText;
            jokeOut.innerText = "Copied to clipboard!";
            setTimeout(() => {
                jokeOut.innerText = originalText;
            }, 1000);
        }).catch(err => {
            console.error('Failed to copy the joke:', err);
        });
    }
});
