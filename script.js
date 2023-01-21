import { menuArray } from './data.js'

const menu = document.getElementById('menu')

function getMenu() {
  let menuItems = ''

  menuArray.forEach(function (item) {
    menuItems += `
    <div class="menu-inner">
        <h1 class="menu-emoji">${item.emoji}</h1>
        <div class="menu-details">
            <p class="menu-title">${item.name}</p>
            <p class="menu-ingredients">${item.ingredients}</p>
            <p class="menu-item-price">${item.price}</p>
        </div>
        <i class="fa-solid fa-circle-plus add-item"></i>
    </div>
    `
  })
  return menuItems
}

function render() {
  document.getElementById('menu').innerHTML = getMenu()
}
render()
