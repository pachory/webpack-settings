const DEPLOYMODE = "development"
const enabledSourceMap = DEPLOYMODE === "development"
const path = require('path')
const globule = require('globule')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pugFilePaths = globule.find(
    './src/**/*.pug', {
        ignore: [
            './src/**/_*/*.pug'
        ]
    }
)

const webpackConfig = {
    // ソースコードの圧縮 (production を指定すると圧縮される)
    mode: DEPLOYMODE,

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
        watchContentBase: true,
        open: true
    },

    module: {
        rules: [{
                // Babel の設定
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            // プリセット使うと ES2019 を ES5 にトランスパイルする
                            "@babel/preset-env"
                        ]
                    }
                }]
            },
            {
                test: /\.scss/,
                use: ["style-loader", {
                        // CSS をバンドルするための設定
                        loader: "css-loader",
                        options: { url: true, sourceMap: enabledSourceMap, importLoaders: 2 }
                    },
                    {
                        // PostCSS の設定
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            plugins: [
                                // Autoprefixer を有効化してベンダープレフィックスを自動的に付与する設定
                                require("autoprefixer")({
                                    grid: true
                                })
                            ]
                        }
                    },
                    {
                        // Sass をバンドルするための設定
                        loader: "sass-loader",
                        options: { sourceMap: enabledSourceMap }
                    }
                ]
            },
            {
                // 画像をバンドルするための設定
                test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
                loader: "url-loader"
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'pug-loader',
                    options: {
                        pretty: true,
                        root: path.resolve(__dirname, 'src/')
                    }
                }]
            }
        ]
    },
    plugins: []
}

pugFilePaths.forEach((pugFilePath) => {
    const fileName = pugFilePath.replace('./src/', '').replace('.pug', '.html')
    webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
            filename: `${fileName}`,
            template: pugFilePath
        })
    )
})

module.exports = webpackConfig