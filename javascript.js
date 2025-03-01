
"use strict"; // Declaração de variáveis

const label_from_currency = document.getElementById('from_currency'); // Cria uma variável referente ao primeira label-->
const input_from_ammount = document.getElementById('from_ammount'); // Cria uma variável referente a primeira caixa de texto-->
const label_to_currency = document.getElementById('to_currency'); // Cria uma variável referente ao segunda label-->
const input_to_ammount = document.getElementById('to_ammount'); // Cria uma variável referente a segunda caixa de texto-->
const tax_info = document.getElementById('tax_info'); // Cria uma variável referente a taxa de conversão-->
const swap = document.getElementById('swap');  // Cria uma variável referente ao botão de troca de moeda-->

label_from_currency.addEventListener('change', calculate); // Executa a função calculate quando escolher a moeda na lista na prieira lista de seleção.
input_from_ammount.addEventListener('input', calculate); // Executa a função calculate quando digitar um valor na primeira caixa de texto.
label_to_currency.addEventListener('change', calculate); // Executa a função calculate quando escolher a moeda na lista na segunda lista de seleção.
input_to_ammount.addEventListener('input', calculate); // Executa a função calculate quando digitar um valor na segunda caixa de texto.
swap.addEventListener('click', infoSwap); // Executa a função infoSwap quando clicar no botão de troca de moeda.

main(); // Executa a função main.

function main() { // Função main
    
    let currency = { "BRL": "Real", "EUR": "Euro", "USD": "Dollar" }; // Cria uma variável com as moedas e seus valores
    let options = []; // Cria uma variável com uma lista de opções
    for (var [key, value] of Object.entries(currency)) { // Cria uma variável com a chave e o valor da variável currency
      options.push(`<option value='${key}'>${value}</option>`); // Adiciona o valor da chave e do valor na lista de opções
    }
    label_from_currency.innerHTML = options.join('\n'); //Coloca o valor da lista de opções 1 na opção
    label_to_currency.innerHTML = options.join('\n'); //Coloca o valor da lista de opções 2 na opção
    calculate(); // Executa a função calculate 
  }
  
  function infoSwap() { // Função infoSwap
    let temp = label_from_currency.value; // Cria uma variável com o valor selecionado na lista de opções 1
    label_from_currency.value = label_to_currency.value; // Coloca o valor da lista de opções 2 na lista de opções 1
    label_to_currency.value = temp;  // Coloca o valor da variável temp na lista de opções 2
    calculate(); // Executa a função calculate
  }
  async function getURL(url) { // Função getURL
    return (await fetch(url)).json(); // Retorna a url
  }

function getInfoSelect(select) { // Função getInfoSelect
  return select.options[select.selectedIndex].text;   // Retorna o valor selecionado na lista de opções
}

async function calculate() { // Função calculate
  let from = label_from_currency.value;   // Cria uma variável com o valor selecionado na lista de opções 1
  let to = label_to_currency.value;  // Cria uma variável com o valor selecionado na lista de opções 2
  let { rates } = await getURL(`https://api.exchangerate-api.com/v4/latest/${from}`);    // Cria uma variável com a taxa de conversão
  let rate = rates[to]; // Cria uma variável com a taxa de conversão  
 
  tax_info.innerText = `1 ${getInfoSelect(label_from_currency)} = ${rate} ${getInfoSelect(label_to_currency)}`  // Coloca o valor da taxa de conversão na tela
  input_to_ammount.value = (input_from_ammount.value * rate).toFixed(2); // Coloca o valor da conversão na segunda caixa de texto
}

  