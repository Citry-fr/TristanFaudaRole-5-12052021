//Récupère les paramètres de l'url est les stock dans l'objet urlInfos
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlInfos = {
    orderId: urlParams.get("orderid"),
    orderPrice: urlParams.get("price"),
    clientFirstName: urlParams.get("fname"),
    clientLastName: urlParams.get("lname"),
};

//Stock les élément html dans un objet
const htmlElement = {
    thankingTitle: document.getElementById("thanking"),
    orderIdSpan: document.getElementById("orderID"),
    orderPriceSpan: document.getElementById("orderPrice"),
};

/**
 * Supprime l'item "produits" du localStorage
 */
function deleteLocalStorage() {
    localStorage.removeItem("produits");
}

//Modifie le text des éléments html en utilisant les infos du client
htmlElement.thankingTitle.textContent = `Mr/Mme ${urlInfos.clientLastName} ${urlInfos.clientFirstName}, merci pour votre commande sur Orinoco.`;
htmlElement.orderIdSpan.textContent = urlInfos.orderId;
htmlElement.orderPriceSpan.textContent = urlInfos.orderPrice;

deleteLocalStorage();
