( function() {
  /*
  1. Envolva todo o conteúdo desse desafio em uma IIFE.
  2. Adicione a diretiva 'use strict';
  3. Crie um arquivo index.html e adicione esse script à ele.
  */

  'use strict';

  /*
  Crie uma função chamada `cleanCPF`, que receba um CPF por parâmetro, e
  retorne esse CPF limpo (somente os números).
  Usando os CPFs abaixo, mostre no console que a limpeza funciona para todos
  eles! Use um console.log para cada CPF.
  - "049-214 3421-1"
  - "210.458.522-05"
  - "735 500 794 - 22"
  - "101.123-131x32"
  */
  console.log( 'Limpando CPFs:' );
  // ?
  function cleanCPF(cpf) {
    return cpf.replace(/\D/g, '');
  }

  var cpf1 = cleanCPF("049-214 3421-1");
  var cpf2 = cleanCPF("210.458.522-05");
  var cpf3 = cleanCPF("735 500 794 - 22");
  var cpf4 = cleanCPF("101.123-131x32");

  console.log(cpf1);
  console.log(cpf2);
  console.log(cpf3);
  console.log(cpf4);
  /*
  Usando os CPFs limpos acima, deixe-os com a formatação correta de CPF.
  Ex.: "999.999.999-99"
  Mostre o resultado no console.
  */
  console.log( '\nFormatando CPFs corretamente:' );
  // ?
  function formatCPF(regex, $1, $2, $3, $4) {
    return $1 + '.' + $2 + '.' + $3 + '-' + $4;
  }

  console.log(cpf1.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, formatCPF));
  console.log(cpf2.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, formatCPF));
  console.log(cpf3.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, formatCPF));
  console.log(cpf4.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, formatCPF));

  /*
  Crie uma expressão regular que faça match com as palavras "junho" ou "julho",
  usando o mínimo de caracteres possíveis na regex.
  Para garantir que a regex funciona, teste-a usando o método match. Se houver
  o match, o método retorna um array com os matches. Caso contrário, ele
  retornará null.
  Mostre no console o resultado do match para a frase:
  "Os meses de janeiro, junho e julho começam com a letra j."
  O resultado deve ser:
  ["junho", "julho"]
  */
  console.log( '\nMatch com as palavras "junho" ou "julho" para a frase "Os meses de janeiro, junho e julho começam com a letra j.":' );
  // ?
  var frase = "Os meses de janeiro, junho e julho começam com a letra j.";
  console.log(frase.match(/ju[nl]ho/g));
  /*
  Crie uma expressão regular que faça o match com a abertura de uma tag
  HTML qualquer.
  Ex.: "<div>", "<section>", "<blockquote>".
  Use o método match e faça o teste com a marcação abaixo:
  "<div><section><blockquote>Texto <img /></blockquote></section></div>"
  O resultado deve ser:
  ["<div>", "<section>", "<blockquote>"]
  */
  console.log( '\nMatch com a abertura de uma tag HTML:' );
  // ?
  frase = "<div><section><blockquote>Texto <img /></blockquote></section></div>";
  console.log(frase.match(/<\w+>/g));

  /*
  Crie uma expressão regular que faça o match com uma tag HTML vazia, casando
  com a abertura e fechamento da tag.
  Ex.: "<div></div>", "<section></section>", "<blockquote></blockquote>".
  Use o método match e faça o teste com a marcação abaixo:
  "<div><ul><li></li><li></li><li><span></span></li></ul></div>"
  O resultado deve ser:
  ["<li></li>", "<li></li>", "<span></span>"]
  */
  console.log( '\nMatch com tags HTML vazias (abertura e fechamento da tag):' );
  // ?
  frase = "<div><ul><li></li><li></li><li><span></span></li></ul></div>";
  console.log(frase.match(/<\w+><\/\w+>/g));

  /*
  Vamos complicar um pouco agora :D

  Crie uma expressão regular que faça o match com um texto existente dentro de
  uma tag HTML. O texto deve ser capturado e substituído por:
  'O texto dentro da tag "[NOME DA TAG]" é "[TEXTO]"'

  Use a marcação abaixo para fazer o replace:
  "<h1>Título da página</h1><p>Este é um parágrafo</p><footer>Rodapé</footer>"

  A marcação deve permanecer como está, somente o texto deve ser substituído.
  No replace, utilize quebras de linha para deixar uma tag por linha.

  O resultado deve ser esse:
  <h1>O texto dentro da tag "h1" é "Título da página"</h1>
  <p>O texto dentro da tag "p" é "Este é um parágrafo"</p>
  <footer>O texto dentro da tag "footer" é "Rodapé"</footer>

  Uma dica: faça o match aos poucos. Para facilitar o teste, use o site
  https://regex101.com/#javascript e verifique se as capturas estão
  corretas, para depois aplicar no código ;)
  */
  console.log( '\nFazer replace dos textos das tags:' );
  // ?
  frase = "<h1>Título da página</h1><p>Este é um parágrafo</p><footer>Rodapé</footer>";
  console.log(frase.replace(/<(\w+)>([^<]+)<\/\w+>/g, '<$1>O texto dentro da tag "$1" é "$2"</$1>\n'));
})();