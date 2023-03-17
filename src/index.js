require('./styles/reset.css');
require('./styles/styles.scss');

if (process.env.NODE_ENV === 'development') {
    require('../index.html');
}

let form = document.getElementById('form');

let results = [];

function renderResults() {
    const resultsContainer = document.getElementById("results")
    resultsContainer.innerHTML = '';
    if (results.length === 0) {
        resultsContainer.innerHTML = 'Ничего не найдено';
    }
    for (let result of results) {
        let resultsItem = renderResult(result);
        resultsContainer.append(resultsItem);
    }
}

function renderResult(item) {
    let itemContainer = document.createElement('div');
    itemContainer.classList.add('results__item');
    itemContainer.innerHTML = `
    <div class='item'>
        <div class="item__top">
            <p>Автор: <span class="item__data">${item.owner.login}</span></p>
            <p>Язык: <span class="item__data">${item.language}</span></p>
        </div>
        <div class="item__middle">
            <p class="item__name">Название репозитория:</p>
            <a href=${item.html_url} target="_blank" class="item__link"> ${item.name}</a>
        </div>
        <div class="item__bottom">
1            <p>Описание: <span class="item__data">${item.description}</span></p>
        </div>
    </div>
    `
    return itemContainer;
}

function getRepo(searchInput) {
    fetch(`https://api.github.com/search/repositories?q=${searchInput}&per_page=10`)
        .then(response => response.json())
        .then(data => {
            results = data.items;
            renderResults();
        })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchInput = document.getElementById('search-input').value.trim();
    getRepo(searchInput);
})