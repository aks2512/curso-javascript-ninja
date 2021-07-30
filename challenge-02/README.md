# Desafio da semana #2

Nesse exercício, você está livre para escolher os nomes para suas variáveis e funções! :smile:

```js
// Crie uma função que receba dois argumentos e retorne a soma dos mesmos.
function soma(x,y) { return x + y; }

// Declare uma variável que receba a invocação da função criada acima, passando dois números quaisquer por argumento, e somando `5` ao resultado retornado da função.
var var1 = soma(10,10) + 5;

// Qual o valor atualizado dessa variável?
25

// Declare uma nova variável, sem valor.
var var2;

/*
Crie uma função que adicione um valor à variável criada acima, e retorne a string:
    O valor da variável agora é VALOR.
Onde VALOR é o novo valor da variável.
*/
function addValue() { var2 = 25 ; return 'O valor da variável agora é ' + var2; }

// Invoque a função criada acima.
addValue();

// Qual o retorno da função? (Use comentários de bloco).
<!-- VALOR -->

/*
Crie uma função com as seguintes características:
1. A função deve receber 3 argumentos;
2. Se qualquer um dos três argumentos não estiverem preenchidos, a função deve retornar a string:
    Preencha todos os valores corretamente!
3. O retorno da função deve ser a multiplicação dos 3 argumentos, somando `2` ao resultado da multiplicação.
*/
function calc(val1, val2, val3) { 
  if (val1 != null && val2 != null && val3 != null) {
    return (val1 * val2 * val3) + 2; 
  } else {
    return 'Preencha todos os valores corretamente!';
  } 
}

// Invoque a função criada acima, passando só dois números como argumento.
calc(2,3);

// Qual o resultado da invocação acima? (Use comentários para mostrar o valor retornado).
<!--  Preencha todos os valores corretamente! -->

// Agora invoque novamente a função criada acima, mas passando todos os três argumentos necessários.
calc(2,3,2);

// Qual o resultado da invocação acima? (Use comentários para mostrar o valor retornado).
<!-- 14 -->

/*
Crie uma função com as seguintes características:
1. A função deve receber 3 argumentos.
2. Se somente um argumento for passado, retorne o valor do argumento.
3. Se dois argumentos forem passados, retorne a soma dos dois argumentos.
4. Se todos os argumentos forem passados, retorne a soma do primeiro com o segundo, e o resultado, dividido pelo terceiro.
5. Se nenhum argumento for passado, retorne o valor booleano `false`.
6. E ainda, se nenhuma das condições acima forem atendidas, retorne `null`.
*/
function calc(v1, v2, v3) { 
  if (v1 != null && v2 == null && v3 == null) {
    return v1; 
  }
  else if (v1 == null && v2 != null && v3 == null) {
    return v2; 
  }
  else if (v1 == null && v2 == null && v3 != null) {
    return v3; 
  }
  else if (v1 != null && v2 != null && v3 == null) {
    return v1 + v2; 
  }
  else if (v1 != null && v2 == null && v3 != null) {
    return v1 + v3; 
  }
  else if (v1 == null && v2 != null && v3 != null) {
    return v2 + v3; 
  }
  else if (v1 != null && v2 != null && v3 != null) {
    return (v1 + v2) / v3; 
  }
  else if (v1 == null && v2 == null && v3 == null) {
    return false; 
  }
  else {
    return null;
  }
    
}

// Invoque a função acima utilizando todas as possibilidades (com nenhum argumento, com um, com dois e com três.) Coloque um comentário de linha ao lado da função com o resultado de cada invocação.
var v1 = calc(1);
var v2 = calc(1,2);
var v3 = calc(1,2,3);
var v4 = calc();

<!-- 1, 3, 1, false, false -->
```
