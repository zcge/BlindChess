module.exports = {
    entry: [
        "babel-polyfill",
        "./src/entry.js"
    ],
    output: {
        output: {
            path: "./dist"
        },
        filename: "bundle.js"
    },
    module: {
        loader: [{
            test: /\.js$/,
            loader: 'babel-loader', 
            exclude: /node_modules/, 
            query: {
                presets: ['es2015']
            }
        }]
    },
    devtool: "source-map"
}