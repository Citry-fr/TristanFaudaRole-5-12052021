// Récupérer l'id dans la barre de recherche
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
const urlProd = "http://localhost:3000/api/teddies/" + id;

//Fetch de l'api du produit
fetch(urlProd)
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

    var clone = document.importNode(template.content, true);
    document.getElementById("colorSelect").appendChild(clone);
}

function string(input) {
    localStorage.setItem("produits", JSON.stringify(input));
}

function fillCart(input) {
    const btn = document
        .getElementById("addCart")
        .addEventListener("click", function () {
            const select = document.getElementById("colorSelect");
            let parse = JSON.parse(localStorage.getItem("produits"));

            let produit = {
                prodName: input.name,
                prodPrice: input.price,
                prodId: input._id,
                prodColor: document.getElementById("colorSelect").value,
                prodQuantity: 1,
            };

            let productArray = [];

            if (localStorage.getItem("produits") === null) {
                productArray.push(produit);
                string(productArray);
                console.log(localStorage.getItem("produits"));
            } else {
                productArray = parse;
                let isPresent = false;

                for (const index in productArray) {
                    if (produit.prodId === productArray[index].prodId) {
                        console.log(true + "ID");
                        isPresent = true;
                        if (
                            produit.prodColor === productArray[index].prodColor
                        ) {
                            console.log(true + "COLOR");
                            productArray[index].prodQuantity++;
                            string(productArray);
                        } else {
                            isPresent = false;
                        }
                    }
                }
                if (!isPresent) {
                    productArray.push(produit);
                    string(productArray);
                }
            }

            cartAmount();
        });
}

function cartAmount() {
    let cart = JSON.parse(localStorage.getItem("produits"));
    let amount = 0;
    for (const index in cart) {
        amount += cart[index].prodQuantity;
    }
    document.getElementById("amount").textContent = amount;
}

cartAmount();
