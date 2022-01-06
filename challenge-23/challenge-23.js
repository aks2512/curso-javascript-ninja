(function(win, doc) {
  'use strict';
  /*
  Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
  As regras são:

  - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
  diretamente;
  - O input deve iniciar com valor zero;
  - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
  - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
  multiplicação(x) e divisão(÷);
  - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
  que irá limpar o input, deixando-o com valor 0;

  - A cada número pressionado, o input deve atualizar concatenando cada valor
  digitado, como em uma calculadora real;
  - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
  operação no input. Se o último caractere no input já for um símbolo de alguma
  operação, esse caractere deve ser substituído pelo último pressionado.
  Exemplo:
  - Se o input tem os valores: "1+2+", e for pressionado o botão de
  multiplicação (x), então no input deve aparecer "1+2x".
  - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
  input;
  - Ao pressionar o botão "CE", o input deve ficar zerado.
  */

  var visor = doc.querySelector('[data-js="visor"]');
  var buttonsNumbers = doc.querySelectorAll('[data-js="button-number"]');
  var buttonsOperations = doc.querySelectorAll('[data-js="button-operation"]');
  var buttonEqual = doc.querySelector('[data-js="button-equal"]');
  var buttonCe = doc.querySelector('[data-js="button-ce"]');

  function initialize() {
    initEvents();
  }

  function initEvents() {
    buttonsNumbers.forEach((button) => {
      button.addEventListener('click',handleClickNumber , false);
    });
    buttonsOperations.forEach((button) => {
      button.addEventListener('click',handleClickOperation , false);
    });
    buttonEqual.addEventListener('click',handleClickEqual, false);
    buttonCe.addEventListener('click',handleClickCE, false);
  }

  function handleClickNumber() {
    if (visor.value == '0') 
      visor.value = this.value
    else
      visor.value += this.value
  }

  function handleClickOperation() {
    removeLastItemIfItIsAnOperator();
    visor.value += this.value;
  }

  function handleClickEqual() {
    removeLastItemIfItIsAnOperator();
    var newValue = eval(replaceOperators());
    visor.value = newValue;
  }

  function handleClickCE() {
    visor.value = '0';
  }

  function removeLastItemIfItIsAnOperator() {
    if(lastItemIsOperator() === true)
      visor.value = visor.value.slice(0, -1);
  }

  function lastItemIsOperator() {
    var operators = ['+', '-', 'x', '÷'];
    return operators.some((operator) => {
      return (visor.value[visor.value.length - 1] === operator);
    });
  }

  function replaceOperators() {
    var replacedValue = visor.value;
    replacedValue = replacedValue.replace(/x/g, '*');
    replacedValue = replacedValue.replace(/÷/g, '/');
    return replacedValue;
  }

  initialize();

})(window, document);