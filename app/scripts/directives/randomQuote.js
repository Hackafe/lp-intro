/**
 * Created by groupsky on 26.04.16.
 */

var bulk = require('bulk-require');
var values = require('object.values');
var quotes = [];

var damithch = values(bulk(__dirname + "/../../quotes", ['damithch*.html']));
var damithchAuthorRegex = /(<(em|i)>--|--<(em|i)>)((.|[\r\n])*)<\/(em|i)>/;
quotes = quotes.concat(damithch.map(function(quote) {
    var author = quote.match(damithchAuthorRegex);
    author = author && author[4] || '';
    // remove the source link
    author = author.replace(/\[(.|[\r\n])*(source|from)(.|[\r\n])*\]/, '');
    // remove tags
    author = author.replace(/<(.|[\r\n])*?>/gm, '');
    // finally trim it
    author = author.trim();

    // remove the author if any
    quote = quote.replace(damithchAuthorRegex, '');
    // remove enclosing <p> if any
    quote = quote.replace('</?p>', '');
    // remove <br>
    quote = quote.replace('<br/?>', '');
    // and trim
    quote = quote.trim();

    return "<blockquote><p>"+quote+"</p>"+(author&&"<footer>"+author+"</footer>"||'')+"</blockquote>"
}));

var bulkQuotes = require('../../quotes/bulk.html');
quotes = quotes.concat(bulkQuotes.split("\n\n").map(function (quote) {
    quote = quote.trim();
    return quote.match(/\n/)
        ? "<pre>" + quote + "</pre>"
        : "<blockquote><p>" + quote + "</p></blockquote>";
}));

require('../main').directive('randomQuote', /*@ngInject*/function () {
    return function ($scope, $elem) {
        var quote = quotes[Math.floor(Math.random() * quotes.length)];

        $elem.html(quote);
    }
});
