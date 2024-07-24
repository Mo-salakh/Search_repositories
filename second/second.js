let input = document.querySelector('#getPost');
let repositoriesList = document.querySelector('.repositories_list') 


async function getPosts(api) {
    let response = await fetch(`https://api.github.com/search/repositories?q=${api}`)
    let repository = await response.json();

    if (!response.ok) {
        throw new Error('Сетевая ошибка');
    }

    if(!api) {
        throw new Error('поле пусто!')
    }

    let fiveRepositories = [];
    for(let i = 0; i < 5; i++) {
        if(i < repository.items.length) {
            fiveRepositories.push(repository.items[i])
        }
    }
    console.log(fiveRepositories);
    console.log(fiveRepositories[1].name);
    for(let repository of fiveRepositories) {
        let closeBtn = document.createElement('div');
        closeBtn.classList.add('close_ic');
        closeBtn.textContent = '[X]';
        let repositoriesListItem = document.createElement('li');
        repositoriesListItem.classList.add('repositories_item');
        repositoriesListItem.insertAdjacentElement('beforeend',closeBtn )
        let nameOfRepository = repository.name;
        repositoriesListItem.textContent = nameOfRepository;
        repositoriesList.appendChild(repositoriesListItem);
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
        getPosts(event.target.value);
    })();
});

