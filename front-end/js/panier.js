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
let totalPriceHtml = document.getElementById("priceTotal");
let totalPrice = 0;

for (const product in productArray) {
    useTemplate(productArray[product]);
    totalPrice += productArray[product].prodPrice;
}
totalPriceHtml.textContent = totalPrice + " €";

function useTemplate(input) {
    var template = document.querySelector("#cartTemplate");

    var td = template.content.querySelectorAll(".main__table__body__row__cell");
    td[0].textContent = input.prodName;
    td[1].textContent = input.prodColor;
    td[3].textContent = input.prodPrice + " €";

    var quant = template.content.querySelector(
        ".main__table__body__row__cell__quantity"
    );
    quant.value = input.prodQuantity;

    var clone = document.importNode(template.content, true);
    document.getElementById("tableBody").appendChild(clone);
}

let priceArray = [];
for (const index in productArray) {
    priceArray.push(
        productArray[index].prodPrice / productArray[index].prodQuantity
    );
}

const quantity = document.querySelectorAll(
    ".main__table__body__row__cell__quantity"
);
const price = document.querySelectorAll(".price");

for (const element in quantity) {
    quantity[element].addEventListener("change", function (input) {
        let value = Number(quantity[element].value);
        let priceModif = priceArray[element] * value;
        console.log(priceModif);
        price[element].textContent = priceModif + " €";

        let storage = JSON.parse(localStorage.getItem("produits"));
        console.log(
            storage[element].prodQuantity + " " + storage[element].prodPrice
        );
        storage[element].prodQuantity = value;
        storage[element].prodPrice = priceModif;
        console.log(
            storage[element].prodQuantity + " " + storage[element].prodPrice
        );

        if (value === 0) {
            let row = document.querySelectorAll(".main__table__body__row");
            row[element].remove();
            storage.splice(element, 1);
        }

        totalPrice = 0;
        for (const price in storage) {
            totalPrice += storage[price].prodPrice;
        }
        totalPriceHtml.textContent = totalPrice + " €";

        localStorage.setItem("produits", JSON.stringify(storage));

        cartAmount();
    });
}
