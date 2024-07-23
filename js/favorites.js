const charsContainer = document.querySelector('.charsContainer');
const buttonHome = document.querySelector('.home')
const buttonSearch = document.querySelector('.search')

// Função para obter os favoritos do localStorage
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Função para salvar os favoritos no localStorage
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Função para remover um personagem dos favoritos
function removeFromFavorites(characterId) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.id !== characterId);
    saveFavorites(favorites);
    renderFavorites(); // Re-renderizar após remoção
}

// Função para renderizar os favoritos na tela
function renderFavorites() {
    const favorites = getFavorites();
    charsContainer.innerHTML = '';
    favorites.forEach((character) => {
        const charElement = document.createElement('div');
        charElement.classList.add('char');
        charElement.innerHTML = `
            <img src="${character.image}" alt="rick">
            <button class="fav" data-id="${character.id}">
                <img src="icons/red.svg" alt="">
            </button>
            <div class="data">
                <h2 class="name">${character.name}</h2>
                <h3 class="type">${character.species}</h3>
                <h3 class="status">${character.status}</h3>
            </div>
        `;
        // Adiciona evento de clique ao botão de remoção
        charElement.querySelector('.fav').addEventListener('click', () => {
            removeFromFavorites(character.id); // Chama função para remover dos favoritos
        });
        charsContainer.appendChild(charElement);
    });
}


// Chama a função para renderizar os favoritos ao carregar a página
renderFavorites();


buttonHome.addEventListener('click', function () {
    window.location.href = '../index.html'
})

buttonSearch.addEventListener('click', function(){
    window.location.href = '../search.html'
})