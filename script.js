import { menuArray } from './data.js'

const form = document.getElementById('form')
const modal = document.getElementById('modal')

let orderDetails = ''
let orderItems = []

form.addEventListener('submit', function (e) {
  e.preventDefault()
  console.log('first')
  const formData = new FormData(form)
  console.log()
  orderDetails = `
    <p class="order-complete">
    Thanks, ${formData.get('fullName')}! Your order is on its way!
    </p>
  `
  modal.classList.add('hidden')

  render(orderItems)
})

document.addEventListener('click', function (e) {
  if (e.target.dataset.food) getFoodDetails(e.target.dataset.food)
  else if (e.target.dataset.remove) removeOrderItem(e.target.dataset.remove)
  else if (e.target.id === 'complete-order-btn') showModal()
})

function removeOrderItem(id) {
  id = Number(id)
  const targetObj = menuArray.filter(function (foodObj) {
    return foodObj.id === id
  })[0]
  for (let index = 0; index < orderItems.length; index++) {
    if (JSON.stringify(orderItems[index]) === JSON.stringify(targetObj)) {
      console.log(index)
      orderItems.splice(index, 1)
      break
    }
  }
  console.log(orderItems)
  ren(orderItems)
}

function getFoodDetails(id) {
  id = Number(id)
  const targetObj = menuArray.filter(function (foodObj) {
    return foodObj.id === id
  })[0]
  orderItems.push(targetObj)

  ren(orderItems)
}

function getMenu() {
  let menuItems = ''

  menuArray.forEach(function (item) {
    menuItems += `
    <div class="menu-inner">
          <div class="menu-left">
            <h1 class="menu-emoji">${item.emoji}</h1>
            <div id="${item.id}" class="menu-details">
                <p class="menu-title" >${item.name}</p>
                <p class="menu-ingredients">${item.ingredients}</p>
                <p class="menu-item-price">$${item.price}</p>
            </div>
          </div>
          <button><i data-food="${item.id}" class="fa-solid fa-circle-plus add-item"></i></button>
    </div>
    `
  })

  return menuItems
}

function ren(orderArray) {
  let total = 0
  let et = ''
  orderArray.forEach(function (order) {
    total += order.price
    et += `
      <div id="${order.id}" class="order-details">
        <p class="order-item">
            ${order.name}
            <span data-remove="${order.id}" class="order-item-remove">
              remove
            </span>
            <span class="order-item-price">$${order.price}</span></p>
      </div>
     
      `
  })
  orderDetails = `
      <div id="order" class="order">
          <p class="order-details-heading">Your Order</p>
          ${et}
          <hr>
          <p class="order-total">Total: <span class="total-price">$${total}</span></p>
          <button id="complete-order-btn" class="btn complete-order-btn">Complete order</button>
      </div>
  `

  render(orderArray)
}

function render(orderArray) {
  document.getElementById('menu').innerHTML = getMenu()
  if (orderArray !== []) {
    document.getElementById('menu').innerHTML = getMenu() + orderDetails
  }
}
render()

function showModal() {
  console.log('first')
  console.log(modal.classList)
  modal.classList.remove('hidden')
  render(orderItems)
}
