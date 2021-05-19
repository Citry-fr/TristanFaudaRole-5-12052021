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
            useTemplate(produit, color);
        }
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

//test en cours
const btn = document
    .getElementById("addCart")
    .addEventListener("click", function () {
        console.log("Bouton clické !");
    });
