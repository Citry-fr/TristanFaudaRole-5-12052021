import { cartAmount } from "./fonctionsPanier.js";

//Stock le bouton de confirmation de commande
const buttonOrderConfirmation = document.getElementById("orderButton");
//Stock l'objet "produits" du localStorage
let productArray = JSON.parse(localStorage.getItem("produits"));
//Stock l'élément html de l'affiche du prix du panier
let totalPriceHtml = document.getElementById("priceTotal");

/**
 * Remplis est utilise le template html grâce aux données des produits
 * @param {object[]} input Tableau d'objet contenant les produits
 */
function useTemplate(input) {
    //Stock le template
    var template = document.querySelector("#cartTemplate");

    //Stock les "tr" et asigne les dataset
    var tr = template.content.querySelector("tr");
    tr.dataset.id = input.prodId;
    tr.dataset.color = input.prodColor;

    //Stock les "td" dans un tableau puis les remplits
    var td = template.content.querySelectorAll(".main__table__body__row__cell");
    td[0].textContent = input.prodName;
    td[1].textContent = input.prodColor;
    td[3].textContent = input.prodPrice + " €";

    //Stock l'input de la quantité puis assigne sa valeur
    var quant = template.content.querySelector(
        ".main__table__body__row__cell__quantity"
    );
    quant.value = input.prodQuantity;

    //Clone le template rempli
    var clone = document.importNode(template.content, true);

    //Insère le template rempli a l'endroit voulu
    document.getElementById("tableBody").appendChild(clone);
}

/**
 * Acutalise le prix total du panier
 * @param {object} prodArray - Objet Produit
 */
function refreshPrice(prodArray) {
    let totalPrice = 0;

    for (const product in productArray) {
        totalPrice += productArray[product].prodPrice;
    }
    totalPriceHtml.textContent = totalPrice + " €";
}
/**
 * Crée l'objet clientInfos qui contient les valeurs des élément du formulaire.
 * @returns {object} - Retourne l'objet clientInfos.
 */
function getCientInfos() {
    let clientInfos = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("adress").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    };
    return clientInfos;
}
/**
 * Fait une requête POST puis passe le résultat de la requête en paramètre d'url
 * @param {object} jsonObject - Objet servant au body de la requête
 * @param {object} clientObject - Objet contenant les infos du clients
 */
function sendOrder(jsonObject, clientObject) {
    fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonObject),
    })
        .then(function (response) {
            return response.json();
        })
        .then((data) => {
            document.location = `./confirmation.html?orderid=${data.orderId}&price=${totalPriceHtml.textContent}&fname=${clientObject.firstName}&lname=${clientObject.lastName}`;
            console.log(data);
        });
}
/**
 *
 * @param {object} productObject Object contenant les produits dans le panier
 * @returns {string[]} Tableau contenant les ids des produits
 */
function createIdArray(productObject) {
    let product_id = [];
    for (const product in productObject) {
        product_id.push(productObject[product].prodId);
    }
    return product_id;
}
/**
 * Crée l'objet qui servira de body à la requête
 * @returns {object} Objet contenant les infos client et le tableau des ID
 */
function createJsonBody() {
    let jsonBody = {
        contact: getCientInfos(),
        products: createIdArray(productArray),
    };
    return jsonBody;
}

// Utilise le template pour chaque produit présent dans "productArray"
for (const product in productArray) {
    useTemplate(productArray[product]);
}

// AddEventListener pour confirmer et passer la commande
buttonOrderConfirmation.addEventListener("click", function (event) {
    if (document.getElementById("orderForm").checkValidity()) {
        event.preventDefault();
        sendOrder(createJsonBody(), getCientInfos());
    }
});

cartAmount();
refreshPrice(productArray);

/*
let deleteCross = document.querySelectorAll(
    ".main__table__body__row__cell__delete"
);

let quantityInput = document.querySelectorAll(
    ".main__table__body__row__cell__quantity"
);
*/

//AddEventListener pour supprimer un produit du panier
document
    .querySelectorAll(".main__table__body__row__cell__delete")
    .forEach((item) => {
        item.addEventListener("click", function (e) {
            console.log("click");
            let row = item.closest("tr");
            let id = row.dataset.id;
            let color = row.dataset.color;
            let tempArray = productArray;
            for (const prod in tempArray) {
                if (
                    tempArray[prod].prodId === id &&
                    tempArray[prod].prodColor === color
                ) {
                    tempArray.splice(prod, 1);
                }
            }
            localStorage.setItem("produits", JSON.stringify(tempArray));
            location.reload();
        });
    });

//AddEventListener pour changer la quantité d'un produit dans le panier
document
    .querySelectorAll(".main__table__body__row__cell__quantity")
    .forEach((input) => {
        input.addEventListener("change", function (e) {
            let tempArray = productArray;
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
            cartAmount();
        });
    });
