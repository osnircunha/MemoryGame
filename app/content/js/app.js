'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('memoryGame', ['ui.router', 'ngAnimate', 'ui.bootstrap']);

app.run(function (arrayShuffle, $rootScope, $http) {
    $http.get('data/disneyChars.json').success(function (data) {
        data = arrayShuffle.shuffle(data);
        var array = [];
        for(var i = 0; i < 20; i++){
            var item = data.pop();
            array.push(item);
            array.push(item);
        }

        $rootScope.charsList = arrayShuffle.shuffle(array);
    });

});

app.factory('arrayShuffle', function(){
   return {
       shuffle : function(array){
           var currentIndex = array.length
               ,temporaryValue
               ,randomIndex;

           // While there remain elements to shuffle...
           while (0 !== currentIndex) {

               // Pick a remaining element...
               randomIndex = Math.floor(Math.random() * currentIndex);
               currentIndex -= 1;

               // And swap it with the current element.
               temporaryValue = array[currentIndex];
               array[currentIndex] = array[randomIndex];
               array[randomIndex] = temporaryValue;
           }
           return array;
       }
   }
});

app.controller('mainController', function ($scope) {

});

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $provide) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "content/pages/home.html",
            controller: 'mainController'
        })
        .state('play', {
            url: "/play",
            templateUrl: "content/pages/play.html",
            controller: 'playController'
        });
});
