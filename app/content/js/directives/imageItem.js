/**
 * Created by osnircunha on 9/30/15.
 */
app.directive('flippy', function () {
    return {
        restrict: 'E',
        scope:{
            onLoadCallback: '&',
            item: '=',
            index: '='
        },
        link: function (scope, elem, attrs) {

            scope.toggle = function(){
                elem.toggleClass('flipped');
            };

            scope.match = function(){
                elem.toggleClass('match');
            };

            elem.click(function (e) {
                e.preventDefault();
                if(!scope.locked) {
                    scope.onLoadCallback({c: scope.item, t: scope});
                }
            });
            /*
            var options = {
                flipDuration: 400,
                timingFunction: 'ease-in-out',
            };

            // setting flip options
            angular.forEach(['flippy-front', 'flippy-back'], function (name) {
                var el = elem.find(name);
                if (el.length == 1) {
                    angular.forEach(['', '-ms-', '-webkit-'], function (prefix) {
                        angular.element(el[0]).css(prefix + 'transition', 'all ' + options.flipDuration / 1000 + 's ' + options.timingFunction);
                    });
                }
            });
            */

        }
    };
});