/**
 * Created by groupsky on 26.04.16.
 */

var angular = require('angular');

var app = module.exports = angular.module('app', [
    require('angular-animate')
]);

// include all js files
require('bulk-require')(__dirname, ['./**/!(main|*.spec).js']);
