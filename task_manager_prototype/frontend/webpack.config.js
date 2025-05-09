const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: { 
        filename: "bundle.js",
        path: path.resolve(__dirname, "public")
    },
    mode: "development",
    devServer: {
        static: "./index.html",
        port: 3000
    }
}