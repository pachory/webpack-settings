module.exports = {
    // ソースコードの圧縮 (production を指定すると圧縮される)
    mode: "development",

    // エントリーポイントの JS
    entry: `./src/index.js`,

    // ビルド後ファイルの出力設定
    output: {
        path: `${__dirname}/dist`,
        filename: "bundle.js"
    },

    // ローカルサーバー設定
    devServer: {
        contentBase: "dist",
        open: true
    },

    module: {
        rules: [{
            // Babel の設定
            test: /\.js$/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: [
                        // プリセット使うと ES2019 を ES5 にトランスパイルする
                        "@babel/preset-env"
                    ]
                }
            }]
        }]
    },

}