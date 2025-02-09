//webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Importing the plugin

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        assetModuleFilename: 'images/[hash][ext][query]', // Saves images in dist/images
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/, // Handle .css files
                use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/, // Add image formats
                type: "asset/resource", // Handles images without needing file-loader
            },
        ],
        
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
