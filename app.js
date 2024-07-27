let input = document.querySelector('#getPost');
let repositoriesList = document.querySelector('.repositories_list');
let repository_info = document.querySelector('.repository_info');

async function getPosts(api, cb1, cb2) {
    if (!api) {
        repositoriesList.innerHTML = '';
        return;
    }
    try {
        let response = await fetch(`https://api.github.com/search/repositories?q=${api}&per_page=5`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let repositories = await response.json();
        repositoriesList.innerHTML = '';
        cb1(repositories);
        cb2(repositories);
    } 
    catch (error) {
        console.error('Ошибка при получении репозиториев:', error.message);
    }
}

async function searchResult(repositories) {
    repositoriesList.innerHTML = '';
    for (let repo of repositories.items) {
        let repositoriesListItem = document.createElement('li');
        repositoriesListItem.classList.add('repositories_item');
        repositoriesListItem.textContent = repo.name;
        repositoriesListItem.addEventListener('click', () => {
            displayRepositoryInfo(repo);
        });
        repositoriesList.appendChild(repositoriesListItem);
    }
}

function displayRepositoryInfo(repo) {

    let card = document.createElement('div');
    card.classList.add('card');
    let card_body = document.createElement('div');
    card_body.classList.add('card_body');

    let repoName = document.createElement('h3');
    repoName.textContent = `Repository name: ${repo.name}`;
    repoName.classList.add('repo_name', 'card-title');

    let repoUserName = document.createElement('p');
    repoUserName.textContent = `Repository owner name: ${repo.owner.login}`;
    repoUserName.classList.add('repo_userName');

    let repoStars = document.createElement('p');
    repoStars.textContent = `Repository's stars: ${repo.stargazers_count}`;
    repoStars.classList.add('repo_stars');

    let closeIcContainer = document.createElement('div');
    closeIcContainer.classList.add('close_ic');
    let closeIc = document.createElement('i');
    closeIc.classList.add('fa', 'fa-times');
    closeIcContainer.appendChild(closeIc);

    card_body.appendChild(repoName);
    card_body.appendChild(repoUserName);
    card_body.appendChild(repoStars);
    card.appendChild(card_body);
    card.appendChild(closeIcContainer);
    repository_info.appendChild(card);
}

repository_info.addEventListener('click', e => {
    if (e.target.classList.contains('fa-times') || 
    (e.target.parentElement && e.target.parentElement.classList.contains('close_ic'))) {
        const repoCard = e.target.closest('.card');
        if(repoCard) {
            repoCard.hidden = true;
        }
    }
})


function debounce(fun, delay = 800) {
    let timeout;
    return function (...args) {
        const fnCall = () => { fun.apply(this, args); }
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, delay);
    };
}

input.addEventListener('input', event => {
    debounce(() => {getPosts(event.target.value || null, searchResult, displayRepositoryInfo);})();
});

