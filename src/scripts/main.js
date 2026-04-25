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

let resultDiv = document.querySelector("#resultDiv");
let resultTable = document.querySelector("#resultTable");
let emptyTable = resultTable.innerHTML

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
        
        resultTable.classList.toggle("hidden", true);

        resultDiv.innerHTML = "";

        element.innerHTML = `Alterar para o valor: ${formatToCurrency(result)}`;
        element.classList.add("bigText");
        
        resultDiv.appendChild(element);

        resultTable.classList.toggle("hidden", true);
    }   
})

genListButton.addEventListener("click", () => {
   if (isFormValid()) {
        generateList();
   } 
})

cleanButton.addEventListener('click', () => {
    clearResults();
});

// Functions

function clearResults() {
    resultDiv.innerHTML = "";
    resultTable.classList.toggle("hidden", true);
    resultTable.innerHTML = emptyTable;
}

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

    clearResults();
    resultTable.classList.toggle("hidden", false);

    for (let i = 1; i <= counter; i++) {
        let { valuePerUnit, finalValue } = calculate(i);

        resultTable.innerHTML += `
            <tr>
                <td>${i}</td>
                <td>${formatToCurrency(valuePerUnit)}</td>
                <td>${formatToCurrency(finalValue)}</td>
            </tr>
        `
    }
    
    navigator.clipboard.writeText(resultDiv.innerText);
}