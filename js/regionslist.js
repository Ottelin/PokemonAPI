import { loadRegion } from './api.js';

let currentRegion = null;
let currentIndex = 0;
const count = 20;

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.region-btn');
    const listContainer = document.getElementById("pokemon-list");
    const nextBtn = document.getElementById("next-page");

    if (buttons.length > 0 && listContainer) {
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                currentRegion = btn.textContent.trim();
                currentIndex = 0;
                loadRegion(currentRegion, currentIndex, count);

                if (nextBtn) nextBtn.style.display = "inline-block";
            });
        });

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (!currentRegion) return;
                currentIndex += count;
                loadRegion(currentRegion, currentIndex, count);
            });
        }
    }
});

