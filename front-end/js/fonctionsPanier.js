/**
 * Gère l'affichage html du nombre de produits dans le panier.
 */
export function cartAmount() {
    const cart = JSON.parse(localStorage.getItem("produits"));
    const cartAmount = document.getElementById("amount");
    let amount = 0;
    for (const index in cart) {
        amount += cart[index].prodQuantity;
    }
    cartAmount.textContent = amount;
}
