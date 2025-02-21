// cart close and open action

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cartpage');
let closecart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.classList.add("active");
};
closecart.onclick = () => {
    cart.classList.remove("active");
};

// cart working js

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// remove items form cart

function ready(){
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i=0; i<removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItems);

    }

    //quantity change
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i=0; i<quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // add to cart
    var addCart = document.getElementsByClassName("cart");
    for (var i=0; i<addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // buy button work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);

}


function buyButtonClicked() {
    // Check if cart is empty
    const cartItems = document.getElementsByClassName("cart-box");
    if (cartItems.length === 0) {
        alert("Your cart is empty. Please add some items before placing an order.");
        return;
    }

    // Show order placed message
    alert("Your order is placed. The receipt will be sent out to your email.");

    //reset the basket number to zero
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = 0;

    // Clear only the cart items, leaving the total price intact
    const cartItemsContainer = document.querySelector('.cart-content');
    while (cartItems.length > 0) {
        cartItemsContainer.removeChild(cartItems[0]);
    }

    // Update the total price to 0 after clearing the cart
    document.getElementsByClassName('total-price')[0].innerText = '$0';
}

function removeCartItems(event){
   var buttonClicked = event.target;
   buttonClicked.parentElement.remove();
   
   var cartCount = document.getElementById('cart-count');
   cartCount.innerText = parseInt(cartCount.innerText) - 1;
   updateTotal();
}



//quantity change

function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}

// add to cart function
var cartShopBox;
var cartBoxContent;
var cartItems;

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.closest('.itemscontent1'); // Locate the closest parent element with class "itemscontent1"
    var title = shopProducts.querySelector(".name").innerText;
    var price = shopProducts.querySelector(".price1").innerText;
    var image = shopProducts.querySelector(".product-image").src;
    addProductToCart(title, price, image);
    updateTotal();
    var cartCount = document.getElementById('cart-count');
    cartCount.innerText = parseInt(cartCount.innerText) + 1;
}

function addProductToCart(title, price, image) {
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartItems.getElementsByClassName('cart-box');

    var cartItemExists = false;

    // Check if the item already exists in the cart
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var cartProductTitle = cartBox.getElementsByClassName('cart-product-title')[0].innerText;

        if (cartProductTitle === title) {
            cartItemExists = true;
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            var currentQuantity = parseInt(quantityElement.value);
            quantityElement.value = currentQuantity + 1;
            break;
        }
    }

    // If the item doesn't exist in the cart, add it as a new item
    if (!cartItemExists) {
        var cartBoxContent = `
            <img src="${image}" alt=" sleeping Hammock" class="cart-image">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class="fa-solid fa-trash fa-sm cart-remove"></i>`;

        var cartShopBox = document.createElement('div');
        cartShopBox.classList.add("cart-box");
        cartShopBox.innerHTML = cartBoxContent;

        cartItems.appendChild(cartShopBox);

        var totalElement = document.getElementsByClassName('total')[0];
        cartItems.insertBefore(cartShopBox, totalElement);

        cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener("click", removeCartItems);
        cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
    }

    updateTotal();
}


// Update Total

function updateTotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i=0; i<cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total = total +(price * quantity);
        //if price contain decimal
        total = Math.round(total*100)/100;

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
       

    }
}
//--------------------------Search box--------------------------------//
let searchBTN = document.querySelector('.searchBTN');
let closeBTN = document.querySelector('.closeBTN');
let userSearchBox = document.querySelector('.userSearchBox');

searchBTN.onclick = function(){
  userSearchBox.style.display = "flex";
  userSearchBox.classList.add('active');
  
}
closeBTN.onclick = function(){
  
  userSearchBox.classList.remove('active');
  userSearchBox.style.display = "none";
  
  
  
}
// ---------------------Drop down nav bar---------------------//
const optionMenu = document.querySelector(".select-menu"),
  selectBtn = optionMenu.querySelector(".select-btn"),
  options = optionMenu.querySelectorAll(".option"),
  sBtnText = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach(option => {
  option.addEventListener("click", () => {
    let selectedOption = option.querySelector(".option-text").innerText;
    sBtnText.innerText = selectedOption;
    console.log(selectedOption);
  });
});







