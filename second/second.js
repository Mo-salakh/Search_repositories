let input = document.querySelector('#getPost');
let repositoriesList = document.querySelector('.repositories_list');
let errorMessage = document.querySelector('.error-message');

async function getPosts(api) {

    if (!api) {
        repositoriesList.innerHTML = '';
        return;
    }

    try {
        let response = await fetch(`https://api.github.com/search/repositories?q=${api}`);
        let repository = await response.json();

        repositoriesList.innerHTML = '';

        let fiveRepositories = [];
        for (let i = 0; i < 5; i++) {
            if (i < repository.items.length) {
                fiveRepositories.push(repository.items[i]);
            }
        }

        for (let repository of fiveRepositories) {
            let repositoriesListItem = document.createElement('li');
            repositoriesListItem.classList.add('repositories_item');
            repositoriesListItem.textContent = repository.name;
            repositoriesList.appendChild(repositoriesListItem);
        }
    } catch (error) {
        console.error(error.message);
    }
}

function debounce(fun, delay = 500) {
    let timeout;
    return function (...args) {
        const fnCall = () => { fun.apply(this, args); }
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, delay);
    };
}

input.addEventListener('input', event => {
    debounce(() => {
        getPosts(event.target.value || null);
    })();
});

