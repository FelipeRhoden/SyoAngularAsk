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