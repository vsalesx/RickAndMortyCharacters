
const buttonHome = document.querySelector('.home');
const buttonFavorite = document.querySelector('.favorite');
const favoritesCountSpan = document.querySelector('.count')
const buttonLoad = document.querySelector('#loadMore');

const charsContainer = document.querySelector('.charsContainer');

const filterByName = document.querySelector('#name');
const filterSpecies = document.querySelector('#species');
const filterGenders = document.querySelector('#gender');
const filterStatus = document.querySelector('#status');

const API = 'https://rickandmortyapi.com/api';

const defaultFilters = {
    name: '',
    species: '',
    gender: '',
    status: '',
    page: 1
};

async function getCharacters({ name, species, gender, status, page = 1 }) {
    const response = await fetch(`${API}/character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`);
    const characters = await response.json();
    return characters.results;
}

async function render({ characters, append = false }) {
    if (!append) {
        charsContainer.innerHTML = '';
    }
    characters.forEach((character) => {
        const charElement = document.createElement('div');
        charElement.classList.add('char');
        charElement.innerHTML = `
            <img src="${character.image}" alt="rick">
            <button class="fav">
                <img src="/icons/heart.svg" alt="not favorite" class="heart-icon">
                <img src="/icons/red.svg" alt="favorite" class="red-icon">
            </button>
            <div class="data">
                <h2 class="name">${character.name}</h2>
                <h3 class="type">${character.species}</h3>
                <h3 class="status">${character.status}</h3>
            </div>
        `;
        // Define o estado do botão com base no status de favoritos
        const isFavorite = getFavorites().some(fav => fav.id === character.id);
        const heartIcon = charElement.querySelector('.heart-icon');
        const redIcon = charElement.querySelector('.red-icon');
        heartIcon.style.display = isFavorite ? 'none' : 'block';
        redIcon.style.display = isFavorite ? 'block' : 'none';

        // Adiciona evento de clique ao botão de favorito
        charElement.querySelector('.fav').addEventListener('click', () => {
            toggleFavorite(character, heartIcon, redIcon); // Chama função para alternar favoritos e passar as imagens clicadas
        });

        charsContainer.appendChild(charElement);
    });
}

function handleFilterChange(type, event) {
    return async () => {
        defaultFilters[type] = event.target.value;
        defaultFilters.page = 1;
        charsContainer.innerHTML = '';
        const characters = await getCharacters(defaultFilters);
        render({ characters });
    };
}

async function handleLoadMore() {
    defaultFilters.page += 1;
    const characters = await getCharacters(defaultFilters);
    render({ characters, append: true });
}

function addListeners() {
    filterSpecies.addEventListener('change', async function (event) {
        handleFilterChange('species', event)();
    });
    filterGenders.addEventListener('change', async function (event) {
        handleFilterChange('gender', event)();
    });
    filterStatus.addEventListener('change', async function (event) {
        handleFilterChange('status', event)();
    });
    filterByName.addEventListener('keyup', async function (event) {
        handleFilterChange('name', event)();
    });

    buttonLoad.addEventListener('click', handleLoadMore);
}

async function main() {
    const characters = await getCharacters(defaultFilters);
    addListeners();
    render({ characters });
}

main();

buttonHome.addEventListener('click', function () {
    window.location.href = '../index.html';
});

buttonFavorite.addEventListener('click', function () {
    window.location.href = '../favorites.html';
});

function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Função para salvar os favoritos no localStorage
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
function updateFavoritesCount() {
    const favorites = getFavorites();
    favoritesCountSpan.textContent = favorites.length;
}
// Função para adicionar/remover um personagem dos favoritos e alterar a visibilidade das imagens
function toggleFavorite(character, heartIcon, redIcon) {
    let favorites = getFavorites();
    if (!favorites.some(fav => fav.id === character.id)) {
        favorites.push(character);
        saveFavorites(favorites);
        heartIcon.style.display = 'none'; // Oculta o coração vazio
        redIcon.style.display = 'block'; // Exibe o coração preenchido
    } else {
        favorites = favorites.filter(fav => fav.id !== character.id);
        saveFavorites(favorites);
        heartIcon.style.display = 'block'; // Exibe o coração vazio
        redIcon.style.display = 'none'; // Oculta o coração preenchido
    }
    updateFavoritesCount(); // Atualiza o contador após adicionar/remover
}
updateFavoritesCount()