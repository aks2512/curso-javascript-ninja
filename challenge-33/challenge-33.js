(function (win, doc) {
  'use strict';
  /*
  Hora de finalizar nosso projeto!
  
  Já temos o cadastro funcionando e persistindo em memória;
  Já estamos deletando o carro da tabela (no frontend).
  
  Mas se você perceber, se você recarregar a tela, o carro ainda vai estar lá.
  Agora você precisa fazer com que, ao clicar no botão de deletar, o carro seja
  removido da tabela e também seja deletado do servidor.
  
  Para fazer isso, você precisa enviar o verbo HTTP "DELETE" para a mesma URL
  que você faz o POST para cadastrar o carro:
  `http://localhost:3000/car`, só que, ao invés de enviar todas as informações
  do carro, como você faz para cadastrar, você deve enviar somente a placa
  do carro.
  
  Fazendo isso, ao recarregar a tela, a tabela deve mostrar os carros atualizados.
  
  A lógica do servidor que está criada nesso diretório desse desafio é o mesmo
  do desafio anterior, com a diferença que, nesse desafio, nós temos a
  implementação da regra para a deleção do carro =)
  
  A regra é a mesma das anteriores: crie uma branch `challenge-33` no seu
  repositório do GitHub, e envie o pull request para lá.
  
  Depois, envie um pull request no repositório do curso, colocando no console.log
  abaixo a URL do pull request no seu repositório.
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
        if (app.isRequestOk()) {
          var cars = JSON.parse(ajax.response)
          cars.forEach((car) => {
            var { image, brandModel, year, plate, color } = car;
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
        app.deleteData(e.target.getAttribute('data-id'))
      },

      deleteData: function deleteData(plate) {
        var req = {plate: plate};

        ajax = new XMLHttpRequest();
        ajax.open('DELETE', 'http://localhost:3000/car', true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(req));
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
