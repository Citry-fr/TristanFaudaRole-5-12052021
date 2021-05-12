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

    //Source pour l'image
    template.content.querySelector("img").src = element.imageUrl;

    //Nom du produit
    template.content.querySelector("p").textContent = element.name;

    var clone = document.importNode(template.content, true);
    document.getElementById("prodCards").appendChild(clone);
}
