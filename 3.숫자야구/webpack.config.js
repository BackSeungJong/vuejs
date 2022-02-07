// webpacking
// 많은 스크립트를 하나로 모으기 위함
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path'); // 노드가 만들어주는 path

module.exports = {
    mode: 'development', // 'production'
    devtool: 'eval', // hidden-source-map
    resolve: {
        extensions: ['.js', '.vue'] // 확장자 처리
    },
    entry: {
        //app: "./main.js",
        app: path.join(__dirname, 'src/main.js')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader',
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: "app.js", // = "[name].js"
        path: path.join(__dirname, 'dist'),
    },
};
