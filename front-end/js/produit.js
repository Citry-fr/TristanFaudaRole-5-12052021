let urlProd = sessionStorage.getItem("urlProd");
console.log(urlProd);

fetch(urlProd)
    .then(function (result) {
        if (result.ok) {
            return result.json();
        }
    })
    .then(function (produit) {
        showProduct(produit);
        console.log(produit.name);
    })
    .catch(function (error) {
        console.log(error);
    });

function showProduct(response) {
    const prodName = (document.getElementById("prodName").textContent =
        response.name);
    const prodDesc = (document.getElementById("prodDesc").textContent =
        response.description);
    const prodImg = document.getElementById("prodImg");
    prodImg.src = response.imageUrl;
    prodImg.alt = "Photo de " + response.name;
    const prodPrice = (document.getElementById("prodPrice").textContent =
        "Prix : " + response.price + " €");
}
