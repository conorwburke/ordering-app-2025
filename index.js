import { menuArray } from "./data.js"

const orderItems = document.getElementById('order-items')
const cartSection = document.getElementById('cart-section')
const orderBtn = document.getElementById('order-btn')
const payBtn = document.getElementById('payment-btn')
const paymentModal = document.getElementById('payment-modal')
const paymentForm = document.querySelector('form')
const nameInput = document.getElementById('name-input')
const thankYouSection = document.getElementById('thank-you-section')
const orderTotalTxt = document.getElementById('order-total-price')

let itemHtml = ''
let orderTotalPrice = 0
let removeId = 3

document.addEventListener('click', function(event){
    if (event.target.dataset.add) {
        handleAddItemClick(event.target.dataset.add)
    } else if(event.target.dataset.remove) {
        handleRemoveItemClick(event.target)
    } else if (event.target === orderBtn) {
        handleOrderClick()
    } else if (event.target === payBtn) {
        handlePayClick()
    }
})

function handleAddItemClick(itemId){
    const targetMenuObj = menuArray.filter(function(item){
        return item.id === itemId
    })[0]
    itemHtml +=  `
        <div class="order-item" data-price="${targetMenuObj.price}"> 
            <div class="order-item-btn">
                <p class="menu-item-name">${targetMenuObj.name}</p>
                <button class="remove-btn" data-remove="${removeId}">remove</button>
            </div>
            <p class="menu-item-price">$${targetMenuObj.price}</p>
        </div>`
    orderItems.innerHTML = itemHtml
    orderTotalPrice += targetMenuObj.price
    orderTotalTxt.textContent = '$' + orderTotalPrice
    cartSection.style.display = 'block'
    thankYouSection.innerHTML = ''
    thankYouSection.classList.add('display-none')
    removeId++ 
}

function handleRemoveItemClick(itemRemove) {
    orderTotalPrice -= itemRemove.parentElement.parentElement.dataset.price
    orderTotalTxt.textContent = '$' + orderTotalPrice
    console.log(orderTotalPrice)
    itemRemove.parentElement.parentElement.remove()
}

function handleOrderClick() {
    paymentModal.classList.remove('display-none')
}

function handlePayClick() {
    paymentForm.addEventListener('submit', function(event){
        event.preventDefault()
    })
    const valid = paymentForm.reportValidity()
    if (valid) { 
        paymentModal.classList.add('display-none')
        itemHtml = ''
        orderTotalPrice = 0
        cartSection.style.display = 'none'
        thankYouSection.innerHTML = `
            <div class="thank-you">
                <p class="thank-you-txt">Thanks, ${nameInput.value}! Your order is on its way!</p> 
            </div>
        `
        thankYouSection.classList.remove('display-none')
        paymentForm.reset()
    }
}

function getMenuHtml() {
    const menuSectionHtml = menuArray.map(function(menuItem){
        return `
            <div class="menu-item-block">
                <div class="img-item-block">
                    <div class="emoji">${menuItem.emoji}</div>
                    <div class="item-details-block">
                        <p class="menu-item-name">${menuItem.name}</p>
                        <p class="ingredients">${menuItem.ingredients}</p>
                        <p class="menu-item-price">$${menuItem.price}</p>
                    </div>
                </div>
                <button class="add-item-btn" data-add="${menuItem.id}">+</button>
            </div>`
    }).join('')
    return menuSectionHtml
}

function render() {
    document.getElementById('menu-section').innerHTML = getMenuHtml()
}

render()