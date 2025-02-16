(function(win, doc) {
  'use strict';
  /*
  Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
  métodos semelhantes aos que existem no array, mas que sirvam para os
  elementos do DOM selecionados.
  Crie os seguintes métodos:
  - forEach, map, filter, reduce, reduceRight, every e some.

  Crie também métodos que verificam o tipo do objeto passado por parâmetro.
  Esses métodos não precisam depender de criar um novo elemento do DOM, podem
  ser métodos estáticos.

  Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
  no objeto, como nos exemplos abaixo:
  DOM.isArray([1, 2, 3]); // true
  DOM.isFunction(function() {}); // true
  DOM.isNumber('numero'); // false

  Crie os seguintes métodos para verificação de tipo:
  - isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
  O método isNull deve retornar `true` se o valor for null ou undefined.
  */

  function DOM(elements) {
    this.elements = doc.querySelectorAll(elements);
  };

  DOM.prototype.forEach = function forEach() {
    return Array.prototype.forEach.apply( this.elements, arguments );
  }
  
  DOM.prototype.map = function map() {
    return Array.prototype.map.apply( this.elements, arguments );
  }

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply( this.elements, arguments );
  }

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply( this.elements, arguments );
  }

  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply( this.elements, arguments );
  }

  DOM.prototype.every = function every() {
    return Array.prototype.every.apply( this.elements, arguments );
  }

  DOM.prototype.some = function some() {
    return Array.prototype.some.apply( this.elements, arguments );
  }

  DOM.isArray = function isArray(value) {
    return Object.prototype.toString.call( value ) === '[object Array]';
  }

  DOM.isObject = function isObject(value) {
    return Object.prototype.toString.call( value ) === '[object Object]';
  }

  DOM.isFunction = function isFunction(value) {
    return Object.prototype.toString.call( value ) === '[object Function]';
  }

  DOM.isNumber = function isNumber(value) {
    return Object.prototype.toString.call( value ) === '[object Number]';
  }

  DOM.isString = function isString(value) {
    return Object.prototype.toString.call( value ) === '[object String]';
  }

  DOM.isBoolean = function isBoolean(value) {
    return Object.prototype.toString.call( value ) === '[object Boolean]';
  }

  DOM.isNull = function isNull(value) {
    return Object.prototype.toString.call( value ) === '[object Undefined]';
  }

  DOM.prototype.on = function on(eventType, callback) {
    this.elements.forEach((element) => {
      element.addEventListener(eventType, callback, false);
    });
  }

  DOM.prototype.off = function off(eventType, callback) {
    this.elements.forEach((element) => {
      element.removeEventListener(eventType, callback, false);
    });
  }

  DOM.prototype.get = function get() {
    return this.elements;
  }

})(window, document);

var $a = new DOM('[data-js="link"]');
$a.on('click', function(e) {
  e.preventDefault();
  console.log('clicou');
});

console.log('Elementos selecionados:', $a.get());
console.log('$a é filho de body?', $a.get()[0].parentNode === document.body);

