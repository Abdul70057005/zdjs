// создание элементов HTML
const app = document.getElementById('app')
const title = createElement('h1', 'title')
title.textContent = 'Github Search Users'

const input = createElement('input', 'search-input')
const usersList = createElement('ul', 'users-list')
const repasitoreList = createElement('ul', 'repasitore-list')

let userElement
let repasitoreUser

//dobavlenie в разметку
app.append(title)
app.append(input)
app.append(usersList)
app.append(repasitoreList)

// функция создания элемента 
function createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag)
    if(elementClass) {
        element.classList.add(elementClass)
    }
    return element
}

// функция создания пользователя
function createUser(user) {
    userElement = createElement('div', 'users-list__user')
    userElement.innerHTML =  `<div class='users-list__user--remove'> ${user.name}</div>`
    usersList.append(userElement)
    
    // слушатель добавления репазитория в список
    userElement.addEventListener('click', function() {
        appRepasitore(user)
        usersList.innerHTML = ''
        input.value = ''
    })
}

// функция добавления репазитория в список 
function appRepasitore(repositore) {
    repasitoreUser = createElement('div', 'repasitore-list__user')
    repasitoreUser.innerHTML =  `
    <div>
        <div>Имя репозитория ${repositore.name}</div>
        <div>Владелец ${repositore.owner.login}</div>
        <div>Рейтинг ${repositore.stargazers_count}</div>
    </div>
    <button class="button-remove">Удалить репозиторий</button>
    `
    repasitoreList.append(repasitoreUser)
    // удаление репозитория 
    repasitoreList.onclick = function (event) {
        let target = event.target.closest('button')
        if(!target) return
       
        target.parentElement.remove()
    }
} 
function debounce(fn, debounceTime) {
  let time
  return function (...args) {
    clearTimeout(time)
    time = setTimeout(() => {
      fn(...args)
    }, debounceTime)
  }
};

const myFc = debounce(searchUsers, 400)
/////

async function searchUsers() {
    return await fetch (`https://api.github.com/search/repositories?q=${input.value}&per_page=5`).then(res => {
            if(res.ok) {
                res.json().then(res => {
                    res.items.forEach(user => {
                        createUser(user)
                        
                    })
                    
                })
            }
        })
}

input.addEventListener('keyup', function () {
    usersList.innerHTML = ''
    myFc()

})
