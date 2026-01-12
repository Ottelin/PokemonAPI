import { regions } from './regions.js';
import { pokemonCard, showLoader, errorCard } from './ui.js';

// -------------------- HAKU --------------------
export async function searchPokemon() {
    const searchBox = document.getElementById("searchBox");
    const results = document.getElementById("results");

    if (!searchBox || !results) return; // turvallisuus, jos elementtiä ei ole

    const query = searchBox.value.toLowerCase().trim();
    if (!query) {
        results.innerHTML = "";
        return;
    }

    showLoader(results);

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!res.ok) {
            results.innerHTML = errorCard(`Oh no! Pokémon not found for "${query}"`);
            return;
        }

        const p = await res.json();
        results.innerHTML = pokemonCard(p);

    } catch (err) {
        results.innerHTML = errorCard("Error fetching Pokémon.");
    }
}

// -------------------- ALUELISTAUS --------------------
export async function loadRegion(regionName) {
    const list = document.getElementById("pokemon-list");
    if (!list) return;

    const cleanName = regionName.trim();
    const region = regions[cleanName];

    if (!region) {
        list.innerHTML = errorCard(`Oh no! Region not found: ${cleanName}`);
        return;
    }

    showLoader(list);

    const startId = region.start;
    const endId = region.end;
    const fetchPromises = [];

    // Luodaan kaikki fetch-promiseet
    for (let i = startId; i <= endId; i++) {
        const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(res => res.ok ? res.json() : null)
            .catch(() => null);
        fetchPromises.push(promise);
    }

    try {
        const results = await Promise.all(fetchPromises);
        let html = "";

        results.forEach((p, index) => {
            if (p) {
                html += pokemonCard(p);
            } else {
                html += errorCard(`Pokémon error #${startId + index}`);
            }
        });

        list.innerHTML = html;

    } catch (err) {
        list.innerHTML = errorCard("Error fetching Pokémon.");
    }
}









