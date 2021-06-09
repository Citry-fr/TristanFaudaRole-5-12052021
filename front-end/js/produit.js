import { cartAmount } from "./fonctionsPanier.js";

/**
 * Récupère l'id du produit dans l'url puis l'ajoute a l'url de l'api
 * @returns {string} L'url du produit
 */
function getProductId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const urlProd = "http://localhost:3000/api/teddies/" + id;
    return urlProd;
}

/**
 * Fetch l'api en fonction de l'url pour affiché récupéré les élément du produit
 * @param {string} url Url du produit
 */
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

/**
 * Utilise un les couleurs du produit pour remplir le template
 * @param {string[]} element Tableau de couleur
 * @param {number} index Index de l'élément
 */
function fillColor(element, index) {
    var template = document.querySelector("#colorTemplate");

    var option = template.content.querySelector("option");
    option.textContent = element.colors[index];
    option.value = element.colors[index];

    const select = document.getElementById("colorSelect");
    var clone = document.importNode(template.content, true);

    select.appendChild(clone);
}
/**
 * Stock l'argument dans le localstorage en JSON
 * @param {object[]} input Tableau d'objet de produits
 */
function string(input) {
    localStorage.setItem("produits", JSON.stringify(input));
}

/**
 *
 * @param {object} response Promise du Fetch de l'api
 * @returns {object} Retourne un objet qui contient tout les éléments du produit.
 */
function getProductObject(response) {
    let productObject = {
        prodName: response.name,
        prodPrice: response.price,
        prodId: response._id,
        prodColor: document.getElementById("colorSelect").value,
        prodQuantity: 1,
    };
    return productObject;
}

function fillCart(input) {
    const addToCart = document.getElementById("addCart");

    addToCart.addEventListener("click", function () {
        const select = document.getElementById("colorSelect");

        let product = getProductObject(input);

        let productArray = [];

        if (localStorage.getItem("produits") === null) {
            productArray.push(product);
            string(productArray);
            console.log(localStorage.getItem("produits"));
        } else {
            productArray = JSON.parse(localStorage.getItem("produits"));
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
                        break;
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
