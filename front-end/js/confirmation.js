const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const price = urlParams.get("price");

console.log(price);
console.log(urlParams.get("orderid"));
