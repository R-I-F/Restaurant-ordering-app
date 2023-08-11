import { menuArray } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const mainEl = document.getElementById("main-el")
const checkoutEl = document.getElementById("checkout-el")
const totalOrderEl = document.getElementById("total-order-el")
const orderItemsEl = document.getElementById("order-items-el")
const modalEl = document.getElementById("modal-el")
const formEl = document.getElementById("form-el")
let orderItemsArray = []





function feedHtml(){
    menuArray.forEach(function(item){
        mainEl.innerHTML += `  
                                    <section class="item-section" id="${item.id}">
                                        <div class = "emoji">
                                            ${item.emoji}
                                        </div>
                                        <div class = "item-data">
                                            <p>${item.name}</p>
                                            <p class = "ing">${item.ingredients}</p>
                                            <p>${item.price}</p>
                                        </div>
                                        <div class = "button" data-addbtn="${item.id}">
                                            <p class = "unclickable">+</p>
                                        </div>
                                    </section>
                                `       
    })   
}
feedHtml()

document.addEventListener("click", function(e){
    if(e.target.dataset.addbtn)
    {handleAddClicks(e.target.dataset.addbtn)}
    else if(e.target.dataset.removebtn)
    {handleRemoveClicks(e.target.dataset.removebtn)}
    else if (e.target.id === "order-btn-el")
    {handleCompleteOrderClick() }

})

formEl.addEventListener("submit", function(e){
    e.preventDefault()
    renderThanksNote(handleFormSubmit())
})

function handleAddClicks(itemId){
    let selectedItem = [menuArray.filter(function(i){
        return i.id.toString() === itemId
    })[0]]
    if (selectedItem.length > 0) {
        const copiedSelectedItem = { ...selectedItem[0] }; // Use spread operator to copy object properties
        copiedSelectedItem.id = uuidv4();
        orderItemsArray.push(copiedSelectedItem);
        renderOrderedItems();
    }
}

function handleRemoveClicks(itemId){
    const removedItemArray = orderItemsArray.filter(function(rItem){
        return (rItem.id.toString() !== itemId)
    })
    orderItemsArray = removedItemArray
    renderOrderedItems()
}

function handleCompleteOrderClick(){
    modalEl.classList.remove("hidden")
}

function handleFormSubmit(){
    const cardData = new FormData(formEl)
    modalEl.classList.add("hidden")
    return(cardData.get("name"))
}

function renderOrderedItems(){
    //LOGIC TO HIDE AND UNHIDE checkoutEl
    if(orderItemsArray.length){
        checkoutEl.classList.remove("hidden")
        orderItemsEl.innerHTML = ""
        let  totalPrice = 0
        orderItemsArray.forEach(function(item){
            totalPrice += parseInt(item.price)
            orderItemsEl.innerHTML +=`  <div class="order-test" id = "order-${uuidv4()}">
                                        <p>${item.name}</p>
                                        <button data-removebtn= "${item.id}">remove</button>
                                        <p class="price">${item.price}</p>
                                    </div>
                                 `
        })
        totalOrderEl.innerHTML =`   <p>Total price</p>
                                    <p class="price" id="total-price">${totalPrice} $</p>
                                `
    }
    else
        {checkoutEl.classList.add("hidden")}
}

function renderThanksNote(name){
    checkoutEl.classList.add("hidden")
    let nameEl = document.getElementById("thanks-note")
    nameEl.style.display = "flex"
    nameEl.innerHTML =  `
                            <p>
                            Thanks, ${name}! Your order is on the way
                            </p>
                        `

}
