let checkbox = document.getElementById("checkboxInput");

let elementsToHide = [
    document.querySelector("#discountDiv"),
    document.querySelector("#valueOnSaleDiv")
]

checkbox.addEventListener("change", () => {
    discountDiv.classList.toggle("hidden");
    valueOnSaleDiv.classList.toggle("hidden");

});
