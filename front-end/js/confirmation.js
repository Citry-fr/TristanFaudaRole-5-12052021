const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlInfos = {
    orderId: urlParams.get("orderid"),
    orderPrice: urlParams.get("price"),
    clientFirstName: urlParams.get("fname"),
    clientLastName: urlParams.get("lname"),
};

const htmlElement = {
    thankingTitle: document.getElementById("thanking"),
    orderIdSpan: document.getElementById("orderID"),
    orderPriceSpan: document.getElementById("orderPrice"),
};

function deleteLocalStorage() {
    localStorage.removeItem("produits");
}

htmlElement.thankingTitle.textContent = `Mr/Mme ${urlInfos.clientLastName} ${urlInfos.clientFirstName}, merci pour votre commande sur Orinoco.`;
htmlElement.orderIdSpan.textContent = urlInfos.orderId;
htmlElement.orderPriceSpan.textContent = urlInfos.orderPrice;

deleteLocalStorage();
