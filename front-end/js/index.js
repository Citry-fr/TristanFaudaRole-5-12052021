fetch("http://localhost:3000/api/teddies")
    .then(function (result) {
        if (result.ok) {
            return result.json();
        }
    })
    .then(function (prod) {
        showProduit(prod);
    })
    .catch(function (error) {
        console.log(error);
    });

function showProduit(response) {
    for (const i in response) {
        useTemplate(response[i]);
    }
}

function useTemplate(element) {
    //Récuperation du template
    var template = document.querySelector("#prodTemplate");

    //Source et alt pour l'image
    var img = template.content.querySelector("img");
    img.src = element.imageUrl;
    img.alt = "Photo de " + element.name;

    //Nom du produit
    template.content.querySelector(
        ".main__article__card__infos__name"
    ).textContent = element.name;

    //Description produit
    template.content.querySelector(
        ".main__article__card__infos__desc"
    ).textContent = element.description;

    //Prix produit
    template.content.querySelector(
        ".main__article__card__infos__price"
    ).textContent = "Prix : " + element.price + " €";

    var clone = document.importNode(template.content, true);
    document.getElementById("prodCards").appendChild(clone);
}