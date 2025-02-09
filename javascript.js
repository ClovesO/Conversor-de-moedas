
"use strict";

const label_from_currency = document.getElementById('from_currency');
const input_from_ammount = document.getElementById('from_ammount');
const label_to_currency = document.getElementById('to_currency');
const input_to_ammount = document.getElementById('to_ammount');

const tax_info = document.getElementById('tax_info');
const swap = document.getElementById('swap');

label_from_currency.addEventListener('change', calculate);
input_from_ammount.addEventListener('input', calculate);
label_to_currency.addEventListener('change', calculate);
input_to_ammount.addEventListener('input', calculate);
swap.addEventListener('click', infoSwap);

main();

function main() {
    let currency = { "BRL": "Real", "EUR": "Euro", "USD": "Dollar" };
    let options = [];
    for (var [key, value] of Object.entries(currency)) {
      options.push(`<option value='${key}'>${value}</option>`);
    }
    label_from_currency.innerHTML = options.join('\n');
    label_to_currency.innerHTML = options.join('\n');
    calculate();
  }
  
  function infoSwap() {
    let temp = label_from_currency.value;
    label_from_currency.value = label_to_currency.value;
    label_to_currency.value = temp;
    calculate();
  }
  async function getURL(url) {
  return (await fetch(url)).json();
}

function getInfoSelect(select) {
  return select.options[select.selectedIndex].text;
}

async function calculate() {
  let from = label_from_currency.value;
  let to = label_to_currency.value;
  let { rates } = await getURL(`https://api.exchangerate-api.com/v4/latest/${from}`);
  // cria a variável rates = aguarda pegar os dados na url descrita acima.
  let rate = rates[to]; 
  // cria variável rate(variação) = rates preparado para enviar para algum lugar.
  tax_info.innerText = `1 ${getInfoSelect(label_from_currency)} = ${rate} ${getInfoSelect(label_to_currency)}` 
  // Pega a informação da primeira caixa(label) coloca o valor 1 = pega a taxa(rate) coloca na caixa(label) 2
  input_to_ammount.value = (input_from_ammount.value * rate).toFixed(2);
}

  