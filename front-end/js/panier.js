function cartAmount() {
    let cart = JSON.parse(localStorage.getItem("produits"));
    let amount = 0;
    for (const index in cart) {
        amount += cart[index].prodQuantity;
    }
    document.getElementById("amount").textContent = amount;
}

cartAmount();

let productArray = JSON.parse(localStorage.getItem("produits"));
