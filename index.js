import { menuArray } from "./data.js"

const orderItems = document.getElementById('order-items')
const cartSection = document.getElementById('cart-section')

let itemHtml = ''
let orderTotalPrice = 0


document.addEventListener('click', function(event){
    if (event.target.dataset.add) {
        handleAddItemClick(event.target.dataset.add)
    }
})

function handleAddItemClick(itemId){
    const targetMenuObj = menuArray.filter(function(item){
        return item.id === itemId
    })[0]
    itemHtml +=  `
        <div class="order-item"> 
            <div class="order-item-btn">
                <p class="menu-item-name">${targetMenuObj.name}</p>
                <button class="remove-btn" data-remove="">remove</button>
            </div>
            <p class="menu-item-price">$${targetMenuObj.price}</p>
        </div>`
    orderItems.innerHTML = itemHtml
    orderTotalPrice += targetMenuObj.price
    document.getElementById('order-total-price').textContent = '$' + orderTotalPrice
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