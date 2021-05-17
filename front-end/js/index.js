//Récuperation de l'api
fetch("http://localhost:3000/api/teddies")
    .then(function (result) {
        if (result.ok) {
            return result.json();
        }
    })
    .then(function (prod) {
        showProduit(prod);
        const test = Promise.resolve(prod[0]._id);
        test.then((value) => {
            console.log("id : " + value);
        });
        module.exports = { test };
    })
    .catch(function (error) {
        console.log(error);
    });

//Fuction utilisation de l'api
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

    var clone = document.importNode(template.content, true);
    document.getElementById("prodCards").appendChild(clone);
}
