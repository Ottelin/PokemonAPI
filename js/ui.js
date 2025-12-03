// Luo Pokemon-kortti

// Määrittele regionit
const regions = [
    { name: 'Kanto', start: 1, end: 151 },
    { name: 'Johto', start: 152, end: 251 },
    { name: 'Hoenn', start: 252, end: 386 },
    { name: 'Sinnoh', start: 387, end: 493 },
    { name: 'Unova', start: 494, end: 649 },
    { name: 'Kalos', start: 650, end: 721 },
    { name: 'Alola', start: 722, end: 809 },
    { name: 'Galar', start: 810, end: 898 },
    { name: 'Paldea', start: 899, end: 1010 } // esimerkki uudesta alueesta
];

// Funktio alueen määrittämiseen ID:n perusteella
function getRegionById(id) {
    const region = regions.find(r => id >= r.start && id <= r.end);
    return region ? region.name : "Unknown";
}

export function pokemonCard(p) {
    const region = getRegionById(p.id);

    return `
        <div class="pokemon-card">
            <h3>${p.name.toUpperCase()}</h3>
            <img src="${p.sprites.front_default}" alt="${p.name}" />
            <p><strong>ID:</strong> ${p.id}</p>
            <p><strong>Type:</strong> ${p.types.map(t => t.type.name).join(", ")}</p>
            <p><strong>Region:</strong> ${region}</p>
        </div>
    `;
}

// Virheviesti kortti
export function errorCard(msg) {
    return `
        <div class="pokemon-card" style="border: 2px solid #e53935;">
            <p><strong>${msg}</strong></p>
        </div>
    `;
}

// Näytä loader tiettyyn containeriin
export function showLoader(container) {
    if (!container) return;
    container.innerHTML = '<div class="loader"></div>';
}






