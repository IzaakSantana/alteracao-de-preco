let form = document.querySelector("#mainForm");
let checkbox = document.querySelector("#checkboxInput");
let calculateButton = document.querySelector("#calculateButton");
let genListButton = document.querySelector("#generateListButton");
let cleanButton = document.querySelector("#cleanButton");
let discountInput = document.querySelector("#discount");
let valueOnSaleInput = document.querySelector("#valueOnSale");
let originalValueDiv = document.querySelector("#originalValueDiv");
let originalValueInput = document.querySelector("#originalValue");

let discountDiv = document.querySelector("#discountDiv");
let valueOnSaleDiv = document.querySelector("#valueOnSaleDiv");

let resultTittle = document.querySelector("#resultTittle");
let resultDiv = document.querySelector("#result");

checkbox.addEventListener("change", () => {
    discountDiv.classList.toggle("hidden");
    valueOnSaleDiv.classList.toggle("hidden");
    originalValueDiv.classList.toggle("hidden");

    discountInput.disabled = checkbox.checked;
    valueOnSaleInput.disabled = !checkbox.checked;
    originalValueInput.disabled = !checkbox.checked;
});


calculateButton.addEventListener("click", () => {
    if (isFormValid()) {
        let result = calculate(getFormData("itemsToCalculate")).valuePerUnit;
        let element = document.createElement("p");
        
        resultDiv.innerHTML = "";

        element.innerHTML = `Alterar para o valor: ${formatToCurrency(result)}`;
        element.classList.add("bigText");
        
        resultDiv.appendChild(element);
    }
})

genListButton.addEventListener("click", () => {
   if (isFormValid()) {
        generateList();
   } 
})

cleanButton.addEventListener('click', () => {
    resultDiv.innerHTML = "";
    resultTittle.classList.toggle("hidden");
});

function formatToCurrency(value) {
    return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
}

function getFormData(value) {
    return Number(new FormData(form).get(value));
}

function isFormValid() {
    return form.reportValidity();
}

function calculate(itemsToCalculate) {
    let onSaleQuantity = getFormData("onSaleQuantity");
    let desiredValue = getFormData("desiredValue");

    let discount;
    let finalDiscount;
    let finalValue;
    let valuePerUnit;

    if (!discountInput.disabled) {
        discount = getFormData("discount")
    } else {
        let valueOnSale = getFormData("valueOnSale");
        let originalValue = getFormData("originalValue");

        let onSaleTotalValue = valueOnSale * onSaleQuantity;
        let rawTotalValue = originalValue * onSaleQuantity;

        discount = rawTotalValue - onSaleTotalValue;
    }

    finalDiscount = discount * Math.floor(itemsToCalculate / onSaleQuantity);
    valuePerUnit = (itemsToCalculate * desiredValue + finalDiscount) / itemsToCalculate;
    finalValue = desiredValue * itemsToCalculate;

    return {
        valuePerUnit,
        finalValue
    }
}

function generateList() {
    let counter = getFormData("itemsToCalculate");

    resultDiv.innerHTML = "";
    resultTittle.classList.toggle("hidden");

    for (let i = 1; i <= counter; i++) {
        let element = document.createElement("p")
        let { valuePerUnit, finalValue } = calculate(i);

        element.innerText = `${i} - R$ ${valuePerUnit.toFixed(2)} - R$ ${finalValue.toFixed(2)}`;
        element.classList.add("bigText");
        resultDiv.appendChild(element);
    }
    
    navigator.clipboard.writeText(resultDiv.innerText);
}