var webpack = require('webpack');

module.exports = {
    entry: __dirname + "/bin/es5/assert-js.js",
    mode: "production",
    output: {
        filename: "assert-js.min.js",
        path: __dirname + "/bin/es5/",
    },
    optimization: {
        minimize: true
    }
};
