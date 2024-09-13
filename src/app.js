import "./style.css";
import angular from "angular";

const room = angular.module("room", [])

room.controller("questionController", ['$scope', function($scope) {

    $scope.author = "Rhoden";

    $scope.questions = [
        { likeCount: 0, content: "Quando o AngularJS foi criado?", author: "Rhoden" },
        { likeCount: 1, content: "O que é um controller?", author: "Pohren" },
        { likeCount: 1, content: "Alguém ainda usa AngularJS?", author: "Silva" }
    ]

    $scope.ask = () => {
        if ( !$scope.newQuestion ) {
            return;
        }
        $scope.questions.unshift(
            { likeCount: 0, content: $scope.newQuestion, author: $scope.author },
        );
        $scope.newQuestion = "";
    }
}])