import './style.css';
import './mobile.css';
const loader = (size) => `<div class="loader" style="width:${size}px; height:${size}px"></div>`;
document.querySelector('#app').innerHTML = `
  <div class="flex col justify align h-fill">
    <div id="joke" class="flex col justify align">Joke</div>
    <button id="fetch-joke" class="flex justify align">Get New</button>
  </div>
`;
const button = document.querySelector('#fetch-joke');
const jokeContainer = document.querySelector('#joke');
const updateJoke = (joke) => {
    let innerHTML = '';
    if (joke.type === 'twopart') {
        innerHTML = `<div class="setup joke-content">${joke.setup}</div> <div class="joke-content">${joke.delivery}</div>`;
    }
    if (joke.type === 'single') {
        innerHTML = `<div class="joke-content">${joke.joke}</div>`;
    }
    jokeContainer.innerHTML = innerHTML;
};
button.addEventListener('click', async () => {
    button.setAttribute('disabled', '');
    const prevText = button.innerHTML;
    button.innerHTML = loader(20);
    const response = await fetch('https://v2.jokeapi.dev/joke/Any');
    const json = await response.json();
    console.log(json);
    updateJoke(json);
    button.removeAttribute('disabled');
    button.innerHTML = prevText;
});
