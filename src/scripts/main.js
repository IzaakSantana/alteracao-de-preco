let form = document.querySelector("#mainForm");
let checkbox = document.querySelector("#checkboxInput");
let calculateButton = document.querySelector("#calculateButton");
let discountInput = document.querySelector("#discount");
let valueOnSaleInput = document.querySelector("#valueOnSale");
let originalValueDiv = document.querySelector("#originalValueDiv");
let originalValueInput = document.querySelector("#originalValue");

let discountDiv = document.querySelector("#discountDiv");
let valueOnSaleDiv = document.querySelector("#valueOnSaleDiv");

let resultDiv = document.querySelector("#result")

checkbox.addEventListener("change", () => {
    discountDiv.classList.toggle("hidden");
    valueOnSaleDiv.classList.toggle("hidden");
    originalValueDiv.classList.toggle("hidden");

    discountInput.disabled = checkbox.checked;
    valueOnSaleInput.disabled = !checkbox.checked;
    originalValueInput.disabled = !checkbox.checked;


});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    resultDiv.querySelector("h1").classList.remove("hidden");

    calculate(new FormData(form));


});

function calculate(formData) {
    let counter = formData.get("itemsToCalculate");
    let onSaleQuantity = formData.get("onSaleQuantity");
    let desiredValue = formData.get("desiredValue");

    let discount;
    let finalDiscount;
    let finalValue;
    let valuePerUnit;

    if (!discountInput.disabled) {
        discount = formData.get("discount")
    } else {
        let valueOnSale = formData.get("valueOnSale");
        let originalValue = formData.get("originalValue");

        let onSaleTotalValue = valueOnSale * onSaleQuantity;
        let rawTotalValue = originalValue * onSaleQuantity;

        discount = rawTotalValue - onSaleTotalValue;
    }

    for (let i = 1; i <= counter; i++) {
        let element = document.createElement("p")

        finalDiscount = discount * Math.floor(i / onSaleQuantity);
        valuePerUnit = ((i * desiredValue + finalDiscount) / i).toFixed(2);
        finalValue = desiredValue * i;

        console.log(`${i} --- ${valuePerUnit} --- ${finalValue}`)
        element.innerText = `${i} --- R$ ${valuePerUnit} --- R$ ${finalValue}`;
        resultDiv.appendChild(element)
    }
}