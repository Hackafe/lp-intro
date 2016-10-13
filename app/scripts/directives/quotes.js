/**
 * Created by groupsky on 26.04.16.
 */

require('../main').directive('quotes', /*@ngInject*/function ($animate, $compile, $rootElement, $templateCache, $timeout) {
    var tmpl = $templateCache.get('/quote.html');
    return function ($scope, $element, $attrs) {
        var changePeriod = $attrs.quotes || 15;
        var elements = [];
        var timeoutCb = false;
        var idx = -1;
        var manual = false;

        var currentElement = $compile(tmpl)($scope);
        $element.append(currentElement);

        function show() {
            $timeout.cancel(timeoutCb);

            var nextElement = elements[idx];
            $element.append(nextElement);

            $animate.enter(nextElement, $element, currentElement);
            $animate.leave(currentElement);

            currentElement = nextElement;

            timeoutCb = $timeout(next, (manual ? 3 : 1) * changePeriod * 1000);
            manual = false;
        }

        function prev() {
            if (idx == 0) return;
            idx--;
            show();
        }

        function next() {
            idx++;
            if (idx >= elements.length) {
                elements.push($compile(tmpl)($scope));
            }
            show();
        }

        next();

        $rootElement.on('keydown', function(event) {
            console.log(event, event.keyCode);
            switch (event.keyCode) {
                // page up
                case 33:
                // left arrow
                case 37:
                    manual = true;
                    $timeout(prev);
                    break;
                // page down
                case 34:
                // right arrow
                case 39:
                    manual = true;
                    $timeout(next);
                    break;
            }
        })

    };
});
