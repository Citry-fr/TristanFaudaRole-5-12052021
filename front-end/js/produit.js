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

//Remplisage du html avec l'api
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

//Fonction remplissage template
function useTemplate(element, index) {
    //Récuperation du template
    var template = document.querySelector("#persoTemplate");

    //Ajout des id au radio bouton
    template.content.querySelector(
        ".main__prod__infos__perso__liste__element__check"
    ).id = element.colors[index];

    //Création d'un label
    var label = document.createElement("label");
    label.setAttribute(
        "class",
        "main__prod__infos__perso__liste__element__label"
    );
    label.setAttribute("for", element.colors[index]);
    label.textContent = element.colors[index];

    //Ajout du template remplis dans le html
    var clone = document.importNode(template.content, true);
    document.getElementById("ulColor").appendChild(clone);

    //Insertion du label dans le html
    var appendLabel = document.getElementsByClassName(
        "main__prod__infos__perso__liste__element"
    );
    appendLabel[index].appendChild(label);
}

//test en cours
const btn = document
    .getElementById("addCart")
    .addEventListener("click", function () {
        console.log("Bouton clické !");
    });
