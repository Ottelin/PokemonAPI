import { searchPokemon } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById("searchBox");
    if (!searchBox) return;

    let timer;
    searchBox.addEventListener("keyup", () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            searchPokemon(); // funktio hakee itse searchBoxin arvon
        }, 400);
    });
});
