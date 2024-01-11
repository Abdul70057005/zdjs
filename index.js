class View {
    constructor () {
        this.app = document.getElementById('app')
        this.title = this.createElement('h1', 'title')
        this.title.textContent = 'Github Search Users'

        this.searchLine = this.createElement('div', 'search-line')
        this.searchInput = this.createElement('input', 'search-input')
        this.searchLine.append(this.searchInput)

        

        this.usersWrapper = this.createElement('div', 'users-wrapper')
        this.usersList = this.createElement('ul', 'users')
        this.usersWrapper.append(this.usersList)

        this.main = this.createElement('div', 'main')
        this.main.append(this.usersWrapper)

        this.app.append(this.title)
        this.app.append(this.searchLine)
        this.app.append(this.main)
     

    }

    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag)
        if(elementClass) {
            element.classList.add(elementClass)
        }
        return element
    }

    createUser(userData) {
        const userElement = this.createElement('div', 'user-prew')
        userElement.innerHTML = `<div> ${userData.name}</div>`

        this.usersList.append(userElement)
    }
}


class Search {
    constructor(view) {
        this.view = view

        this.view.searchInput.addEventListener('keyup', this.searchUsers.bind(this))
    }

    async searchUsers() {
        return await fetch (`https://api.github.com/search/repositories?q=${this.view.searchInput.value}&per_page=5`).then(res => {
            if(res.ok) {
                res.json().then(res => {
                    res.items.forEach(user => this.view.createUser(user))
                })
            }
        })
    }



}

new Search(new View())


































/*const input = document.querySelector('input')
input.addEventListener('keyup', getUsers)
console.log(input.value)

async function getUsers () {
    const res = await fetch(`https://api.github.com/users?per_page=5`)
    const users = await res.json()
    console.log(users)
    users.forEach(e => repToHTML(e))
}

window.addEventListener('DOMContentLoaded', getUsers)


function repToHTML({id, completed, title}) {
    const appList = document.getElementById('app__list')
    console.log(title)
    /*appList.insertAdjacentElement('beforeend',`
    <div id = "rep${id}" >
        <div class="nameRep">${completed}</div>
        <div class="nameAuthor">${title}</div>
        <div class="raiting">gg</div>
    </div>
    `)
}
*/
