/**
 * Created by groupsky on 26.04.16.
 */

require('../main').directive('quotes', /*@ngInject*/function ($animate, $compile, $templateCache, $timeout) {
    var tmpl = $templateCache.get('/quote.html');
    return function ($scope, $element, $attrs) {
        var changePeriod = $attrs.quotes || 15;

        var currentElement = $compile(tmpl)($scope);
        $element.append(currentElement);

        function next() {
            var nextElement = $compile(tmpl)($scope);
            $element.append(nextElement);

            $animate.enter(nextElement, $element, currentElement);
            $animate.leave(currentElement);

            currentElement = nextElement;

            $timeout(next, changePeriod * 1000);
        }

        next();
    };
});
