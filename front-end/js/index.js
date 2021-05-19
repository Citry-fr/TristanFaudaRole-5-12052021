//Fetch de l'api
fetch("http://localhost:3000/api/teddies")
    //Check de la réponse du serveur
    .then(function (result) {
        if (result.ok) {
            return result.json();
        }
    })
    //Utilisation des fonctions qui utilise l'api
    .then(function (prod) {
        showProduit(prod);
    })
    //Check les erreurs possibles
    .catch(function (error) {
        console.log(error);
    });

//Fonction utilisation de l'api
function showProduit(response) {
    for (const i in response) {
        useTemplate(response[i]);
    }
}

//Fonction remplissage template
function useTemplate(element) {
    //Récuperation du template
    var template = document.querySelector("#prodTemplate");

    //Source et alt pour l'image
    var img = template.content.querySelector("img");
    img.src = element.imageUrl;
    img.alt = "Photo de " + element.name;

    //Nom du produit
    template.content.querySelector(
        ".main__article__anchor__card__infos__name"
    ).textContent = element.name;

    //Ajout de l'id du produit dans l'href du lien
    template.content.querySelector(".main__article__anchor").href =
        "./produit.html?id=" + element._id;

    //Ajout du template remplis dans le html
    var clone = document.importNode(template.content, true);
    document.getElementById("prodCards").appendChild(clone);
}
