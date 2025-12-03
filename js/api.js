import { pokemonCard, showLoader, errorCard } from './ui.js';

export async function searchPokemon() {
    const searchBox = document.getElementById("searchBox");
    const results = document.getElementById("results");
    if (!searchBox || !results) return;

    const name = searchBox.value.toLowerCase().trim();
    if (!name) {
        results.innerHTML = "";
        return;
    }

    showLoader(results);

    if (!isNaN(name)) {
        return loadList(Number(name));
    }

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) {
            results.innerHTML = errorCard(`Oops! No results found for: ${name}`);
            return;
        }

        const p = await res.json();
        results.innerHTML = pokemonCard(p);
    } catch (err) {
        results.innerHTML = errorCard("Error.");
    }
}

export async function loadList(startId) {
    const results = document.getElementById("results");
    if (!results) return;

    showLoader(results);
    let cards = "";

    for (let i = startId; i < startId + 20; i++) {
        try {
            const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            if (!r.ok) continue;
            const p = await r.json();
            cards += pokemonCard(p);
        } catch (err) {
            cards += errorCard(`Pokémon error #${i}`);
        }
    }

    results.innerHTML = cards;
}


//HUOM!
// Pokemoneja haettaessa IDllä niin hakee väärin pokemoneja
// esim 1 on bulbasaur mutta hakee muitakin nro 1 idllä