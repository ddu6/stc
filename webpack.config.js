const path = require('path')
module.exports = {
    entry: './test/main.src.js',
    mode: 'production',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'test')
    }
}