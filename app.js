let input = document.querySelector('#getPost');
let repositoriesList = document.querySelector('.repositories_list');


async function getPosts(api) {
    if (!api) {
        repositoriesList.innerHTML = '';
        return;
    }

    try {
        let response = await fetch(`https://api.github.com/search/repositories?q=${api}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let repository = await response.json();
        repositoriesList.innerHTML = '';

        let fiveRepositories = repository.items.slice(0, 5);

        console.log(fiveRepositories);

        for (let repo of fiveRepositories) {
            let repositoriesListItem = document.createElement('li');
            repositoriesListItem.classList.add('repositories_item');
            repositoriesListItem.textContent = repo.name;

            let closeIcContainer = document.createElement('div');
            closeIcContainer.classList.add('close_ic');
            let closeIc = document.createElement('i');
            closeIc.classList.add('fa', 'fa-times');
            closeIcContainer.appendChild(closeIc);

            repositoriesListItem.appendChild(closeIcContainer);
            repositoriesList.appendChild(repositoriesListItem);
        }

    } 
    catch (error) {
        console.error('Ошибка при получении репозиториев:', error.message);
    }
}


repositoriesList.addEventListener('click', e => {
    if (e.target.classList.contains('fa-times') || 
        (e.target.parentElement && e.target.parentElement.classList.contains('close_ic'))) {
        
        const listItem = e.target.closest('.repositories_item');
        
        if (listItem) {
            listItem.hidden = true;
        }

        
    }
});


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

