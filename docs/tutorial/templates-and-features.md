# Templates e funcionalidades

Em uma aplicação AngularJS podemos considerar como templates todo o html presente ao qual o AngularJS tem acesso.

Antes de nos aprofundarmos mais, é importante saber que o AngularJS encoraja o uso do padrão [MVC(Model-View-Controller)](https://en.wikipedia.org/wiki/Model%E2%80%93View%E2%80%93Controller),
utilizando ele como exemplo de seu comportamento. Para o AngularJS a view é uma projeção do model através de um template html.
O model são os dados presentes na aplicação. Toda vez que um dado do model é alterado, a view atualiza os pontos aos quais o template tem vinculo com estes dados.

Para darmos continuidade com o exemplo vamos atualizar o nosso repositório com alguns arquivos prontos.
Realize o seguinte comando para atualizar o repositório com os arquivos deste exemplo:

```bash
git checkout step-02
```

Com isto você poderá ver que o nossos arquivos `index.html` e `src/app.js` contém muito mais conteúdo, vou abora-los passo a passo aqui.

## Módulos

Em AngularJS todas as funcionalidade que criarmos devem estar vinculadas em um módulo.
Para utilizarmos este módulo podemos atribui-lo na diretiva `ngApp` assim o mesmo será inicializado em conjunto com o AngularJS.
A declaração e atribuição do módulo podem ser vistas abaixo onde declaramos o módulo `room`.

::: code-group

```js [app.js]
import "./style.css";
import angular from "angular";

const room = angular.module("room", [])
// ...resto do código
```

```html [index.html]
<!doctype html>
<html ng-app="room" lang="en">
<!-- ...resto do código -->
```

:::

## Templates e escopos ($scope)

Cada diretiva possue um atributo `$scope` onde ficam os dados (model) que são vinculados ao template.
Além dos atributos `$scope` a diretiava `ngApp` possui um atributo `$rootScope`.
Todo atributo `$scope` é um protótipo do atributo `$scope` da diretiva pai.

Como podemos ver no html temos a diretiva `ngApp`, no template dela temos a diretiva `ngController`
e no template do `ngController` temos a diretiva `ngRepeat`. Cada uma destas diretivas tem seu próprio `$scope` que
é um portótipo do `$scope` da diretiva pai como apresentado abaixo.

```html {2,5,10}
<!doctype html>
<html ng-app="room" lang="en">
  <!-- ...outros htmls -->
  <body>
    <div ng-controller="questionController">
    <main class="flex flex-col gap-4 justify-center items-center">
        <!-- ...mais html -->
        <div
        class="question"
        ng-repeat="question in questions track by question.id"
        >
        <!-- ...um pouco mais de html -->
```

Abaixo segue um diagrama baseado no mesmo diagrama presente na doc [Tutorial 2 - AngularJS Templates](https://docs.angularjs.org/tutorial/step_02) do AngularJS:

![scopesAndTemplates](/img/scopesAndTemplates.svg)

## Funcionalidades

Agora que já vimos e entedemos um pouco mais dos templates e escopos vou abordar algumas das principais diretivas que temos e utilizamos no AngularJS

### ngController

Um controller é uma função construtora, que recebe como parametro um `$scope`, ao qual podemos manipular. Esse escopo pode ser atribuído em
um elemento por meio da diretiva `ngController`, nos permitindo vincular os seus valores em um template html. Um controlador deve estar vinculado em um módulo.

No nosso exemplo criamos o controlador `questionController` e vinculamos ele ao módulo `room`, e por fim vinculamos esse controlador ao nosso template, permitindo que enquanto
um usuário interaja com a tela a mesma atualize dinamicamente.

Como pode ser visto abaixo conseguimos utilizar os valores `questions` e `author` dentro do nosso template da diretiva `ngController`.

::: code-group

```js [app.js]
import "./style.css";
import angular from "angular";

const room = angular.module("room", [])

room.controller("questionController", ['$scope', function($scope) {
    let countId = 0;
    $scope.author = "Rhoden";

    $scope.questions = [
        { id: countId++, likeCount: 0, content: "Quando o AngularJS foi criado?", author: "Rhoden" },
        { id: countId++, likeCount: 1, content: "O que é um controller?", author: "Pohren" },
        { id: countId++, likeCount: 1, content: "Alguém ainda usa AngularJS?", author: "Silva" }
    ]

    $scope.ask = () => {
        if ( !$scope.newQuestion ) {
            return;
        }
        $scope.questions.unshift(
            { id: countId++, likeCount: 0, content: $scope.newQuestion, author: $scope.author },
        );
        $scope.newQuestion = "";
    }
}])
```

```html [index.html]
<div ng-controller="questionController" class="max-w-screen-md mx-auto px-4">
    <main class="flex flex-col gap-4 justify-center items-center">
        <div class="room-title">
          <h1>Sala AngularJS</h1>
          <span ng-show="questions.length > 0">{{questions.length}} pergunta(s)</span>
        </div>

        <form ng-submit="ask()" class="w-full">
          <textarea
            class="question resize-y"
            ng-model="newQuestion"
            placeholder="O que você quer perguntar?"
          ></textarea>
          <div class="footer">
            <div class="form--autor">
              <span class="text-sm">{{author}}</span>
            </div>
            <button
              type="submit"
              class="btn btn--primary"
            >
                Enviar Pergunta
            </button>
          </div>
        </form>

        <div
          class="question"
          ng-repeat="question in questions track by question.id"
        >
        <!-- ...mais template -->
        </div>
    </main>
</div>
```

:::

### ngShow

A diretiva `ngShow` apresenta ou esconde o elemento vinculado nela alterando o atributo css `display` para `none`.
Sendo assim se a expressão passada para ela for um `falsy` o elemento some, caso seja um `truthy` o mesmo volta a aparecer.

No nosso exemplo utilizamos ela para apresentar o total de perguntas feitas caso existam perguntas.

```html
<span ng-show="questions.length > 0">{{questions.length}} pergunta(s)</span>
```

### ngSubmit

A diretiva `ngSubmit` serve para capturarmos um evento de submit de um formulário, a mesma recebe uma expressão que será executada quando o evento de submit ocorrer.

Utilizamos ela para capturar o submit de uma nova questão e então executar o método `ask` que adiciona um nova pergunta na lista de perguntas.

```html
<form ng-submit="ask()" class="w-full">
```

### ngModel

A diretiva `ngModel` serve para vincular valores de input com um atributo do nosso model.
Caso ocorra uma alteração no valor do input o mesmo será refletido ao nosso atributo.
E o inverso também ocorrerá, caso alteremos o valor do atributo o mesmo será refletido no input.

Utilizamos ela para capturar a pergunta do nosso usuário e limpamos o valor dela ao final do método `ask`.

::: code-group

```html [index.html]
<textarea
class="question resize-y"
ng-model="newQuestion"
placeholder="O que você quer perguntar?"
></textarea>
```

```js [app.js]
$scope.ask = () => {
    if ( !$scope.newQuestion ) {
        return;
    }
    $scope.questions.unshift(
        { id: countId++, likeCount: 0, content: $scope.newQuestion, author: $scope.author },
    );
    $scope.newQuestion = "";
}
```

:::

### ngRepeat

A diretiva `ngRepeat` é uma diretiva especial. Ela instancia um template e `$scope`, para cada item dentro de uma coleção.
A mesma recebe uma expressão da seguinte maneira `item in colecao`, ondem `item` é o nome do atributo, ao qual, estará o item, no `$scopo` da instancia do `ngRepeat`,
e `colecao` é o nome do atributo, ao qual, está sua coleção. É importante o usó da expressão `track by item.id`, onde `id` pode ser qualqer identificador
único em seu item, pois isso permite que o AngularJS consiga evitar atualizações em elementos que não mudaram, melhorando o desempenho.
Você pode ler mais sobre isso em [Tracking and Duplicates](https://docs.angularjs.org/api/ng/directive/ngRepeat#tracking-and-duplicates).

Utilizamos ela para apresentar todas as perguntas já feitas em nossa tela.

```html
<div
    class="question"
    ng-repeat="question in questions track by question.id"
>
```

### ngClick

Assim como a diretiva `ngSubmit`, a diretiva `ngClick` captura um evento, neste caso o evento de click.

Utilizamos ela para realizar o like no nosso botão de like de um pergunta, e também utilizamos ela no botão de remoção de pergunta.

```html
<button
    ng-click="question.likeCount = question.likeCount + (!question.likeId ? 1 : -1); question.likeId = !question.likeId"
>
<!-- ...mais um pouco de html -->
 <button
    ng-click="questions.splice($index, 1)"
    class="btn btn--icon trash"
>
```

### ngClass

A diretiva `ngClass` é utilizada para atualizar dinamicamente as classes de um elemento, ela aceita um objeto, uma string ou um array de objetos e strings.
Caso seja passado um objeto, cada atributo representará o nome de uma classe, se o valor do atributo for um `truthy` a classe será adicionada ao elemento,
se for um `falsy` ela será removida.

Utilizamos ela no nosso exemplo para alterar o botão de like caso o usuário tenha dado o like em uma pergunta.

```html
<button
    ng-click="question.likeCount = question.likeCount + (!question.likeId ? 1 : -1); question.likeId = !question.likeId"
    ng-class="['btn','btn--icon',{ liked: question.likeId, unliked: !question.likeId }]"
>
```

### ngIf

A diretiva `ngIf` assim como `ngShow` faz com que elementos sumam e reapareçam em tela. A grande diferença é que o `ngIf` remove o elemento do DOM e destroi o seu `$scope` quando
a expressão passada a ela resultar em um `falsy`, ao retorna para `truthy` o elemento é recompilado e volta ao seu estado incial sendo adicionado novamente ao DOM.

Utilizamos ela para apresentar o contador de likes caso alguma pergunta já tenha recebido algum like.

```html
<span ng-if="question.likeCount">{{question.likeCount}}</span>
```
