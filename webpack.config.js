var webpack = require('webpack');

module.exports = {
    entry: __dirname + "/bin/assert.js",
    output: {
        filename: __dirname + "/bin/assert.min.js",
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
