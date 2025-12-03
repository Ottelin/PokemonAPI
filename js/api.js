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
            results.innerHTML = errorCard(`Ei löydy hakusanalla: ${name}`);
            return;
        }

        const p = await res.json();
        results.innerHTML = pokemonCard(p);
    } catch (err) {
        results.innerHTML = errorCard("Virhe haussa.");
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
            cards += errorCard(`Virhe Pokémonissa #${i}`);
        }
    }

    results.innerHTML = cards;
}



