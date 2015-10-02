/**
 * Created by osnircunha on 9/30/15.
 */
app.controller('playController', function ($scope, $timeout) {
    $scope.selection = {c: null, s: null};

    $scope.handleSelection = function (character, scope) {

        scope.toggle();

        if ($scope.selection.c == null){
            $scope.selection.c = character;
            $scope.selection.s = scope;
        } else if ($scope.selection.s.index == scope.index){
            scope.toggle();
        } else if ($scope.selection.c.name != character.name) {
            $timeout(function () {
                $scope.selection.s.toggle();
                scope.toggle();
                $scope.selection = {c: null, s: null};
            }, 1000);
        } else {
            scope.locked = true;
            $scope.selection.s.locked = true;

            $timeout(function () {
                scope.match();
                $scope.selection.s.match();
                $scope.selection = {c: null, s: null};
            }, 1000);
        }
    }
});