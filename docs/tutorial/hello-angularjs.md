# Hello AngularJS

Caso você não tenha feito a instalação do projeto acesse a [página de instalação](/install) para realiza-la.

## Iniciando o projeto

No diretório do projeto execute o comando abaixo para deixarmos o projeto com a estrutura inicial.

```bash
git checkout step-01
```

Agora você deve ter um arquivo `index.html` na raiz do projeto e um arquivo `src/app.js` iguais os apresentados abaixo:

::: code-group

```html{2,25-27,31} [index.html]
<!doctype html>
<html ng-app lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app" class="container mx-auto px-4">
      <main class="flex flex-col gap-8 h-screen justify-center items-center">
        <div class="flex items-center gap-4">
          <a href="https://angularjs.org" target="_blank">
            <img src="/Angularjs.ico" alt="AngularJS logo" class="hover:scale-125 ease-in-out duration-300">
          </a>
          <div class="font-bold text-5xl">
            +
          </div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" alt="Vite logo" class="h-16 hover:scale-125 ease-in-out duration-300" />
          </a>
        </div>
        <h1 class="text-3xl">Hello AngularJS + Vite!</h1>
        <button class="btn btn--primary hover:scale-105 ease-in-out"
            ng-init="count = 0"
            ng-click="count = count + 1">
          Count {{count}}
        </button>
      </main>
    </div>
    <script type="module" src="/src/app.js"></script>
  </body>
</html>
```

```js [app.js]
import "./style.css";
import "angular";
```

:::

## O que está acontecendo?

A princípio é um código HTML  normal, com tags e atributos. O grande diferencial são os atributos iniciados com o prefixo ng- (`ng-app`, `ng-init` e `ng-click`) que representa o que podemos chamar de diretivas AngularJS e o duplo par de chaves (<span v-pre>`{{count}}`</span>) que é uma forma que o Angular nos dá para adicionarmos expressões ao HTML.

Você pode ver também que temos o `src/app.js` importado como um script e nele temos os importes do `angular` e de um arquivo css, com isto o Vite automáticamente adiciona o AngularJS e o arquivo css ao nosso html.

Inicialmente vamos focar só no atributo `ng-app`, presente na tag HTML, e no duplo par de chaves .

## ng-app

A diretiva `ng-app` informa ao AngularJS qual será o elemento raiz da nossa aplicação. Após carregar o seu script, é adicionado um callback para quando o conteúdo da página estiver completamente carregado. Ao executar este callback o AngularJS procura no DOM, pela diretiva `ngApp` e entao realiza as demais operações de compilação no conteúdo deste elemento. Este processo é chamado de inicialização.

::: tip
Angular usa kebab-case para os nomes dos atributos e camelCase para os nomes das diretivas, sendo assim `ng-app` representa a diretiva `ngApp`.
:::

::: tip
É possível inicializar o AngularJS manualmente também, para mais informações sobre inicialização veja o a página [Bootstrap](https://docs.angularjs.org/guide/bootstrap) da doc do AngularJS.
:::

Abaixo vou deixar um fluxograma simples do processo de inicialização do AngularJS

![bootstrapAngulaJS](/img/bootstrapAngulaJS.svg)

## Duplo par de chaves

No AngularJS conseguimos realizar vinculos de valores presentes nos nossos scripts com o html utilizando o duplo para de chaves.
Com isto, conseguimos injetar no html expressões que serão avalidas pelo AngularJS e o seu retorno será adicionado ao html após a compilação.

Observe o exemplo abaixo:

```html
<div>{{1 + 1}}</div>
```

Este código, após compilado, resultara em:

```html
<div>2</div>
```

::: tip
As expressões aceitas pelo duplo par de chaves são parecidas com JavaScript, porém tem algumas limitações, você pode saber mais em [AngularJS Expressions](https://docs.angularjs.org/guide/expression).
:::

::: tip
Toda vez que um valor ao qual o AngularJS observa mudar, o html será recompilado. Você pode garantir que a expressão 
que você está passando para o duplo par de chaves sejá executada sómente na primeira compilação adicinando um par de dois pontos (\:\:) no inicio da expressão
<span v-pre>`{{:: 1 + 1}}`</span>, assim o cálculo será realizado uma única vez e o valor será armazenado para as próximas compilações.
Isto é chamado de one-time expression.
:::

Abaixo vou deixar mais um fluxograma simples do processo

![doubleCurlyAngularJS](/img/doubleCurlyAngularJS.svg)