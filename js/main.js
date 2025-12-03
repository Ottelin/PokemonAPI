import { searchPokemon } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Etusivu: haku
    const searchBox = document.getElementById("searchBox");
    if (searchBox) {
        let timer;
        searchBox.addEventListener("keyup", () => {
            clearTimeout(timer);
            timer = setTimeout(searchPokemon, 400);
        });
    }
});



