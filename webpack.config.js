const path = require("path");
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const html = ['index']

const htmlArray = html.map(name => {
    return new HtmlWebPackPlugin({
        filename: `${name}.html`,
        template: `${__dirname}/public/${name}.html`,
        templateParameters: () => {
            return { 'foo': process.env.NODE_ENV == 'production' ? 'production' : 'dev' }
        },
        hash: true,
        inject: true,
        chunks: [name]
    })
})
module.exports = {
    devtool: 'cheap-module-source-map',
    stats: {
        all: false,
        timings: true,
        cached: true
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 3,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
    devServer: {
        contentBase: './public',
        hot: true,
    },
    entry: {
        index: ['webpack-hot-middleware/client', 'react-hot-loader/patch', './src/client/main']
    },
    output: {
        path: path.join(__dirname, "/dist/client"),
        filename: "[name].bundle.js",
    },
    resolve: {
        alias: {
            images: path.resolve(__dirname, 'src/img'),
            'react-dom': '@hot-loader/react-dom',
        },
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [
                // 'cache-loader' , 
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                        plugins: ["react-hot-loader/babel"]
                    }
                },
            ]
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
                name: 'img/[name].[ext]',
              },
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            })
        }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new ExtractTextPlugin('style.css'),
        new webpack.HotModuleReplacementPlugin(),
        ...htmlArray,
    ]
}