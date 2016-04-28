/**
 * Created by groupsky on 26.04.16.
 */
var bulk = require('bulk-require');

require('./main').run(/*@ngInject*/function ($log, $templateCache) {
    // include all views
    function registerViews(url, view) {
        if (angular.isObject(view)) {
            angular.forEach(view, function (subview, key) {
                registerViews(url + "/" + key, subview);
            });
        } else {
            $log.debug('registering template cache', url);
            $templateCache.put(url + '.html', view);
        }
    }

    registerViews('', bulk(__dirname + "/../views", ['**/*.html']));
});
