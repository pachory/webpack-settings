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
    }
}