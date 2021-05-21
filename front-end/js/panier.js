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

for (const product in productArray) {
    useTemplate(productArray[product]);
}

function useTemplate(input) {
    var template = document.querySelector("#cartTemplate");

    var td = template.content.querySelectorAll(".main__table__body__row__cell");
    td[0].textContent = input.prodName;
    td[1].textContent = input.prodColor;
    td[2].textContent = input.prodQuantity;
    td[3].textContent = input.prodPrice;

    var clone = document.importNode(template.content, true);
    document.getElementById("tableBody").appendChild(clone);
}
