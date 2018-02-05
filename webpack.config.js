var webpack = require('webpack');

module.exports = {
    entry: __dirname + "/bin/es5/assert-js.js",
    output: {
        filename: __dirname + "/bin/es5/assert-js.min.js",
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            output: {
                comments: false
            }
        })
    ]
};
