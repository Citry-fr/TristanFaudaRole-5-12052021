import { cartAmount } from "./fonctionsPanier.js";

// Récupérer l'id dans la barre de recherche
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const id = urlParams.get("id");
// const urlProd = "http://localhost:3000/api/teddies/" + id;

function getProductId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const urlProd = "http://localhost:3000/api/teddies/" + id;
    return urlProd;
}

function getProductInfos(url) {
    //Fetch de l'api du produit
    fetch(url)
        //Check de la réponse du serveur
        .then(function (result) {
            if (result.ok) {
                return result.json();
            }
        })
        //Utilisation des fonctions qui utilise l'api
        .then(function (produit) {
            showProduct(produit);
            for (const color in produit.colors) {
                fillColor(produit, color);
            }
            fillCart(produit);
        })

        .catch(function (error) {
            console.log(error);
        });
}

/**
 * Remplis le html avec les données du produit
 * @param {object} response
 */
function showProduct(response) {
    // Nom du produit
    const prodName = (document.getElementById("prodName").textContent =
        response.name);
    // Description du produit
    const prodDesc = (document.getElementById("prodDesc").textContent =
        response.description);
    // Image du produit
    const prodImg = document.getElementById("prodImg");
    prodImg.src = response.imageUrl;
    prodImg.alt = "Photo de " + response.name;
    // Prix du produit
    const prodPrice = (document.getElementById("priceAmount").textContent =
        response.price + " €");
}

function fillColor(element, index) {
    var template = document.querySelector("#colorTemplate");

    var option = template.content.querySelector("option");
    option.textContent = element.colors[index];
    option.value = element.colors[index];

    const select = document.getElementById("colorSelect");
    var clone = document.importNode(template.content, true);

    select.appendChild(clone);
}

function string(input) {
    localStorage.setItem("produits", JSON.stringify(input));
}

function fillCart(input) {
    const addToCart = document.getElementById("addCart");

    addToCart.addEventListener("click", function () {
        const select = document.getElementById("colorSelect");
        let parse = JSON.parse(localStorage.getItem("produits"));

        let product = {
            prodName: input.name,
            prodPrice: input.price,
            prodId: input._id,
            prodColor: document.getElementById("colorSelect").value,
            prodQuantity: 1,
        };

        let productArray = [];

        if (localStorage.getItem("produits") === null) {
            productArray.push(product);
            string(productArray);
            console.log(localStorage.getItem("produits"));
        } else {
            productArray = parse;
            let isPresent = false;

            for (const index in productArray) {
                if (product.prodId === productArray[index].prodId) {
                    console.log(true + "ID");
                    isPresent = true;
                    if (product.prodColor === productArray[index].prodColor) {
                        console.log(true + "COLOR");
                        productArray[index].prodQuantity++;
                        productArray[index].prodPrice += product.prodPrice;
                        string(productArray);
                    } else {
                        isPresent = false;
                    }
                }
            }
            if (!isPresent) {
                productArray.push(product);
                string(productArray);
            }
        }

        cartAmount();
    });
}
getProductInfos(getProductId());
cartAmount();
