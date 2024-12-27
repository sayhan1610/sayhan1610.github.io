    document.addEventListener('DOMContentLoaded', () => {
        const terminal = document.getElementById('terminal');
        const outputContainer = document.getElementById('output');
        const inputContainer = document.getElementById('input-container');
        const inputField = document.getElementById('input');

        const routes = {
            home: 'home',
            about: 'about',
            experience: 'experience',
            education: 'education',
            skills: 'skills',
            languages: 'languages',
            projects: 'projects',
            gallery: 'gallery',
            contact: 'contact',
            help: 'help',
            clear: 'clear',
        };

        const renderHomePage = () => {
            appendOutput(`
Welcome to My Terminal Portfolio!
  _      _      _ 
>(.)__ <(.)__ =(.)__
 (___/  (___/  (___/

Type 'help' to see all available commands.
Type 'clear' to clear the terminal.
            `);
        };

        const renderHelp = () => {
            appendOutput(`
    Available Commands:
    - 🏡 home: Go back to the main menu.
    - ℹ️ about: Learn more about me.
    - ♟️ experience: See my experience.
    - 📝 education: See my educational background.
    - 📊 skills: See my skills.
    - 🌐 languages: See the languages I know.
    - 🧑‍🔬 projects: Explore my GitHub projects.
    - 🖼️ gallery: View the image gallery.
    - 📞 contact: Get in touch with me.
    - 🚫 clear: Clear the terminal screen.
    - 💁‍♂️ help: Show this help menu.
    `);
        };

        const fetchDataAndRender = async (page) => {
            try {
                const response = await fetch(`/pages/${page}.json`);
                const data = await response.json();
                appendOutput(data.content.join('\n'));
            } catch (error) {
                appendOutput(`Error loading the ${page} page.`);
            }
        };

        const appendOutput = (text) => {
            const commandOutput = document.createElement('div');
            commandOutput.textContent = text;
            outputContainer.appendChild(commandOutput);
            terminal.appendChild(inputContainer); 
            inputField.focus(); 
        };

        const appendCommand = (command) => {
            const commandLine = document.createElement('div');
            commandLine.innerHTML = `<span class="prompt">root@sayhanrahman:~$</span> ${command}`;
            outputContainer.appendChild(commandLine);
        };

        inputField.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const command = inputField.value.trim().toLowerCase();
                appendCommand(command);
                inputField.value = '';

                if (command in routes) {
                    if (command === 'home') renderHomePage();
                    else if (command === 'help') renderHelp();
                    else if (command === 'clear') outputContainer.innerHTML = '';
                    else fetchDataAndRender(routes[command]);
                } else {
                    appendOutput(`Command '${command}' not recognized. Type 'help' for a list of available commands.`);
                }
            }
        });

        document.addEventListener("keydown", (event) => {
            inputField.focus();
        })
        

        renderHomePage();
    })
