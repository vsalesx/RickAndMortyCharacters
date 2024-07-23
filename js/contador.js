// Seleciona o span do contador de favoritos
const favoritesCountSpan = document.querySelector('.count');

function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function updateFavoritesCount() {
    const favorites = getFavorites();
    if (favoritesCountSpan) {
        favoritesCountSpan.textContent = favorites.length;
    }
}

function toggleFavorite(character, heartIcon, redIcon) {
    let favorites = getFavorites();
    if (!favorites.some(fav => fav.id === character.id)) {
        favorites.push(character);
        saveFavorites(favorites);
        if (heartIcon && redIcon) {
            heartIcon.style.display = 'none'; // Oculta o coração vazio
            redIcon.style.display = 'block'; // Exibe o coração preenchido
        }
    } else {
        favorites = favorites.filter(fav => fav.id !== character.id);
        saveFavorites(favorites);
        if (heartIcon && redIcon) {
            heartIcon.style.display = 'block'; // Exibe o coração vazio
            redIcon.style.display = 'none'; // Oculta o coração preenchido
        }
    }
    updateFavoritesCount(); // Atualiza o contador após adicionar/remover
}

// Atualiza o contador ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateFavoritesCount();
});
updateFavoritesCount();
