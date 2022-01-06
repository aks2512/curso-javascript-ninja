(function(win, doc) {
  'use strict';
  
  function DOM(elements) {
    if(!(this instanceof DOM)) 
      return new DOM(elements);
    this.elements = doc.querySelectorAll(elements);
  }

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

  DOM.prototype.get = function get(index) {
    if(!index)
      return this.elements[0];
    return this.elements[index];
  }

  win.$ = DOM;

})(window, document);