let url = "http://localhost:3000/api/teddies";

//Récuperation de l'api
fetch("http://localhost:3000/api/teddies")
    .then(function (result) {
        if (result.ok) {
            return result.json();
        }
    })
    .then(function (prod) {
        showProduit(prod);
        const elt = document.getElementsByClassName("main__article__anchor");
        for (const anchor in elt) {
            elt[anchor].addEventListener("click", function (event) {
                url = url + "/" + prod[anchor]._id;
                sessionStorage.setItem("urlProd", url);
            });
        }
    })
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

    var clone = document.importNode(template.content, true);
    document.getElementById("prodCards").appendChild(clone);
}
