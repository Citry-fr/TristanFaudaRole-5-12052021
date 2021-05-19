// Récupérer l'id dans la barre de recherche
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
const urlProd = "http://localhost:3000/api/teddies/" + id;

let produitArray = [];

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

string = (input) => {
    localStorage.setItem("produits", JSON.stringify(input));
};

function fillCart(element) {
    const btn = document
        .getElementById("addCart")
        .addEventListener("click", function () {
            const parse = JSON.parse(localStorage.getItem("produits"));
            const select = document.getElementById("colorSelect");

            let produitModif;
            let produit = {
                prodName: element.name,
                prodPrice: element.price,
                prodId: element._id,
                prodColor: document.getElementById("colorSelect").value,
                prodQuantity: 1,
            };

            if (localStorage.getItem("produits") === null) {
                produitArray.push(produit);
                localStorage.setItem("produits", JSON.stringify(produitArray));
                console.log(localStorage);
            } else {
                for (const prod in parse) {
                    if (
                        produit.prodId === parse[prod].prodId &&
                        produit.prodColor === parse[prod].prodColor
                    ) {
                        produitModif = parse[prod];
                        console.log(produitModif);
                        produitModif.prodQuantity++;
                        string(produitModif);
                        console.log("Incrémente");
                        break;
                    } else {
                        produitArray.push(produit);
                        string(produitArray);
                        console.log("ADD");
                    }
                    console.log(parse[prod]);
                }

                console.log(localStorage);
            }
            console.log(localStorage.getItem("produits"));
        });
}
