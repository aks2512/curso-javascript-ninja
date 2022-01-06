(function(win, doc){
  'use strict';
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
  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */

  var input_cep = new DOM('[data-js="input_cep"]');
  var form_cep = new DOM('[data-js="form_cep"]');
  var logradouro = new DOM('[data-js="logradouro"]');
  var bairro = new DOM('[data-js="bairro"]');
  var cidade = new DOM('[data-js="cidade"]');
  var estado = new DOM('[data-js="estado"]');
  var cep = new DOM('[data-js="cep"]');
  var status = new DOM('[data-js="status"');
  var ajax = new XMLHttpRequest();
  
  form_cep.on('submit', handleSubmitFormCEP);
  
  function handleSubmitFormCEP(event) {
    event.preventDefault();
    var url = getUrl();
    ajax.open("GET", url);
    ajax.send();
    ajax.addEventListener('readystatechange', handleReadyStateChange, false);
    getMessage('loading');
  }

  function getUrl() {
    return replaceCEP("https://ws.apicep.com/cep/[CEP].json");
  }

  function replaceCEP(text) {
    return text.replace('[CEP]', returnCEP());
  }

  function returnCEP() {
    return input_cep.get()[0].value; 
  }

  function handleReadyStateChange() {
    if( isRequestOk() ) {
      getMessage('ok');
      fillCEPFields();
    }
  }

  function isRequestOk() {
    return ajax.readyState === 4 && ajax.status === 200;
  }

  function fillCEPFields() {
    var data = parseData();
    console.log(data.status)
    if (data.status !== 200) {
      getMessage('error');
      clearData();
    }
    logradouro.get()[0].textContent = data.address;
    bairro.get()[0].textContent = data.district;
    cidade.get()[0].textContent = data.city;
    estado.get()[0].textContent = data.state;
    cep.get()[0].textContent = data.code;
  }

  function clearData() {
    return {
      address: '',
      district: '',
      city: '',
      state: '',
      code: ''
    }
  }
  
  function parseData() {
    return JSON.parse(ajax.responseText);
  }

  function getMessage(type) {
    var messages = {
      'loading': replaceCEP('Buscando informações para o CEP [CEP]...'),
      'ok': replaceCEP('Endereço referente ao CEP [CEP]:'),
      'error': replaceCEP('Não encontramos o endereço para o CEP [CEP].')
    };
    status.get()[0].textContent = messages[type];
  }

})(window, document);