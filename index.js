var fs   = require('fs');
var path = require('path');
var less = require('less');
var cacheHelper = require('documark-cache');

module.exports = function dmpLess ($, document, cb) {
    console.log('entering dmpless module');

    var file = "assets/less/style.less";

    console.log("Read file content");
    fs.readFile(file, "utf8", function(error, data) {
        var fileContents = data;

        console.log("File content read.");

        // > Render less to css.
        less.render(fileContents)
            .then(function(output) {

                console.log("Getting css content.");

                // >> Write cache file.
                var cache = cacheHelper(document);
                var cacheFile = cache.fileWriteStream('less-cache.css');

                // >> Append css file to container.
                var container = $('head');
                if (! container.length) {
                    container = $.root();
                }

                cacheFile.end(output.css);
                contrainer.append('<link rel="stylesheet" type="text/css" href="' + cache.filePath('less-cache.css') + '">');

                cb();
            });
    });
}
