(function (win, doc) {
  'use strict';
  /*
  Já temos as funcionalidades de adicionar e remover um carro. Agora, vamos persistir esses dados, 
  salvando-os temporariamente na memória de um servidor.
  
  Nesse diretório do `challenge-32` tem uma pasta `server`. É um servidor simples, em NodeJS, para 
  que possamos utilizar para salvar as informações dos nossos carros.
  
  Para utilizá-lo, você vai precisar fazer o seguinte:
  
  - Via terminal, acesse o diretório `server`;
  - execute o comando `npm install` para instalar as dependências;
  - execute `node app.js` para iniciar o servidor.
  
  Ele irá ser executado na porta 3000, que pode ser acessada via browser no endereço: 
  `http://localhost:3000`
  
  O seu projeto não precisa estar rodando junto com o servidor. Ele pode estar em outra porta.
  As mudanças que você irá precisar fazer no seu projeto são:
  
  - Para listar os carros cadastrados ao carregar o seu projeto, faça um request GET no endereço
  `http://localhost:3000/car`
  - Para cadastrar um novo carro, faça um POST no endereço `http://localhost:3000/car`, enviando
  os seguintes campos:
    - `image` com a URL da imagem do carro;
    - `brandModel`, com a marca e modelo do carro;
    - `year`, com o ano do carro;
    - `plate`, com a placa do carro;
    - `color`, com a cor do carro.
  
  Após enviar o POST, faça um GET no `server` e atualize a tabela para mostrar o novo carro cadastrado.
  
  Crie uma branch `challenge-32` no seu projeto, envie um pull request lá e cole nesse arquivo a URL
  do pull request.
  */

  var app = (function () {

    var ajax;

    var $tableCar = $('[data-js="table-car"]').get();
    var $companyName = $('[data-js="company-name"]').get();
    var $companyPhone = $('[data-js="company-phone"]').get();

    return {
      init: function init() {
        this.companyInfo();
        this.loadCars();
        this.initEvents();
      },

      initEvents: function initEvents() {
        $('[data-js="form-register"]').on('submit', this.handleSubmit);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
        $tableCar.appendChild(app.createNewCar());
      },

      createNewCar: function createNewCar() {
        this.saveData(
          $('[data-js="image"]').get().value,
          $('[data-js="brand-model"]').get().value,
          $('[data-js="year"]').get().value,
          $('[data-js="plate"]').get().value,
          $('[data-js="color"]').get().value
        );

        return this.fillTable(
          $('[data-js="image"]').get().value,
          $('[data-js="brand-model"]').get().value,
          $('[data-js="year"]').get().value,
          $('[data-js="plate"]').get().value,
          $('[data-js="color"]').get().value
        );
      },

      fillTable: function fillTable(image, brand, year, plate, color) {
        var $fragment = doc.createDocumentFragment();
        var $tr = doc.createElement('tr');
        var $tdImage = doc.createElement('td');
        var $image = doc.createElement('img');
        var $tdBrand = doc.createElement('td');
        var $tdYear = doc.createElement('td');
        var $tdPlate = doc.createElement('td');
        var $tdColor = doc.createElement('td');
        var $tdRemove = doc.createElement('td');
        var $btnRemove = doc.createElement('button');

        $image.src = image;

        $tdImage.appendChild($image);
        $tdBrand.textContent = brand;
        $tdYear.textContent = year;
        $tdPlate.textContent = plate;
        $tdColor.textContent = color;
        $btnRemove.textContent = 'Remover';
        $btnRemove.setAttribute('data-js', 'remove');
        $btnRemove.setAttribute('data-id', plate);
        $tdRemove.appendChild($btnRemove);

        $tdRemove.addEventListener('click', this.deleteCar, false);

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdRemove);

        return $fragment.appendChild($tr);
      },

      saveData: function saveData(image, brand, year, plate, color) {
        var req = {
          image: image,
          brandModel: brand,
          year: year,
          plate: plate,
          color: color
        }

        ajax = new XMLHttpRequest();
        ajax.open('POST', 'http://localhost:3000/car', true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(req));

      },

      loadData: function loadData() {
        if( app.isRequestOk() ) { 
          var cars = JSON.parse(ajax.response)
          cars.forEach((car) => {
            var {image, brandModel, year, plate, color} = car;
            $tableCar.appendChild(app.fillTable(image, brandModel, year, plate, color));
          });
        }
      },

      isRequestOk: function isRequestOk() {
        return ajax.readyState === 4 && ajax.status === 200;
      },

      loadCars: function loadCars() {
        ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:3000/car', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.loadData, false)
      },

      deleteCar: function deleteCar(e) {
        e.preventDefault();
        console.log('delete')
        this.parentNode.remove();
      },

      companyInfo: function companyInfo() {
        ajax = new XMLHttpRequest();
        ajax.open('GET', '/challenge-30/company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },

      getCompanyInfo: function getCompanyInfo() {
        if (!app.isReady.call(this))
          return;

        var data = JSON.parse(this.responseText);
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      }
    };
  })();

  app.init();

})(window, document);

