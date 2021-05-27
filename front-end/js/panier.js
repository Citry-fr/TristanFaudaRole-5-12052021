function cartAmount() {
    let cart = JSON.parse(localStorage.getItem("produits"));
    let amount = 0;
    for (const index in cart) {
        amount += cart[index].prodQuantity;
    }
    document.getElementById("amount").textContent = amount;
}

document
    .getElementById("orderButton")
    .addEventListener("click", function (event) {
        event.preventDefault();
        let product_id = [];
        const cart = JSON.parse(localStorage.getItem("produits"));
        for (const product in cart) {
            product_id.push(cart[product].prodId);
        }

        let contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("adress").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        };

        let myJson = {
            contact: contact,
            products: product_id,
        };

        console.log(JSON.stringify(myJson));

        fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(myJson),
        })
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
    });

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

    var tr = template.content.querySelector("tr");
    tr.dataset.id = input.prodId;
    tr.dataset.color = input.prodColor;

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

document
    .querySelectorAll(".main__table__body__row__cell__delete")
    .forEach((item) => {
        item.addEventListener("click", function (e) {
            let row = item.closest("tr");
            let id = row.dataset.id;
            let color = row.dataset.color;
            let tempArray = JSON.parse(localStorage.getItem("produits"));
            console.log(tempArray);
            for (const prod in tempArray) {
                if (
                    tempArray[prod].prodId === id &&
                    tempArray[prod].prodColor === color
                ) {
                    tempArray.splice(prod, 1);
                }
            }
            console.log(tempArray);
            localStorage.setItem("produits", JSON.stringify(tempArray));
            location.reload();
        });
    });

document
    .querySelectorAll(".main__table__body__row__cell__quantity")
    .forEach((input) => {
        input.addEventListener("change", function (e) {
            let tempArray = JSON.parse(localStorage.getItem("produits"));
            let tempQuantity = input.value;
            let row = input.closest("tr");
            let id = row.dataset.id;
            let color = row.dataset.color;
            for (const prod in tempArray) {
                if (
                    tempArray[prod].prodId === id &&
                    tempArray[prod].prodColor === color
                ) {
                    let initialPrice =
                        tempArray[prod].prodPrice /
                        tempArray[prod].prodQuantity;
                    console.log(initialPrice);
                    row.querySelector(".price").textContent =
                        initialPrice * tempQuantity + " €";
                    tempArray[prod].prodPrice = initialPrice * tempQuantity;
                    tempArray[prod].prodQuantity = parseInt(tempQuantity);
                }
            }
            refreshPrice(tempArray);
            localStorage.setItem("produits", JSON.stringify(tempArray));
            console.log(JSON.parse(localStorage.getItem("produits")));
            cartAmount();
        });
    });

function refreshPrice(prodArray) {
    totalPrice = 0;
    for (const prod in prodArray) {
        totalPrice += prodArray[prod].prodPrice;
    }
    totalPriceHtml.textContent = totalPrice + " €";
}
