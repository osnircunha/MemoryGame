'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('memoryGame', ['ui.router', 'ngAnimate']);

app.run(function (arrayShuffle, $rootScope, $http) {
    $rootScope.isSelecting = false;
    $http.get('data/disneyChars.json').success(function (data) {
        data = arrayShuffle.shuffle(data);
        var array = [];
        var index = 0;
        for(var i = 0; i < 20; i++){

            var item1 = data.pop();
            item1.ref = index++;
            array.push(item1);

            var item2 = JSON.parse(JSON.stringify(item1));
            item2.ref = index++;
            array.push(item2);
        }

        $rootScope.charsList = arrayShuffle.shuffle(array);
        chunks($rootScope.charsList, 8);
    });

    var chunks = function (list, columns) {
        $rootScope.chunks = [];
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        var rowRef = [];
        for(var i = 0; i <= columns; i ++){
            if(i == 0){
                rowRef.push({index: ""});
            } else {
                rowRef.push({index: i});
            }
        }

        $rootScope.chunks.push(rowRef);
        var row = 0;
        for(var i = 0; i < list.length; i += columns){
            var rowItems = list.slice(i, Math.min(list.length, i + columns));
            rowItems.unshift({index: alphabet[row++]});
            $rootScope.chunks.push(rowItems);
        }
    }
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
