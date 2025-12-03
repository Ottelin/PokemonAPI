// Luo Pokemon-kortti
export function pokemonCard(p) {
    return `
        <div class="pokemon-card">
            <h3>${p.name.toUpperCase()}</h3>
            <img src="${p.sprites.front_default}" alt="${p.name}" />
            <p><strong>ID:</strong> ${p.id}</p>
            <p><strong>Tyypit:</strong> ${p.types.map(t => t.type.name).join(", ")}</p>
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






