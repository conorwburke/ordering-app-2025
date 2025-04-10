import { menuArray } from "./data.js"

const menuSectionHtml = menuArray.map(function(menuItem){
        return `
            <div class="menu-item-block" id="${menuItem.id}">
                <div class="img-item-block">
                    <div class="emoji">${menuItem.emoji}</div>
                    <div class="item-details-block">
                        <p class="menu-item-name">${menuItem.name}</p>
                        <p class="ingredients">${menuItem.ingredients}</p>
                        <p class="menu-item-price">$${menuItem.price}</p>
                    </div>
                </div>
                <button class="add-item-btn" id="add-item-btn">+</button>
            </div>`
    }).join('')

document.getElementById('menu-section').innerHTML = menuSectionHtml

