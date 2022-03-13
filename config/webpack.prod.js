const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const findSrc = name => `./src/${name}/index.js`;

module.exports = {
  entry: {
    main: findSrc('home'),
  },
  mode: "production",
  optimization: {
    splitChunks: {
        chunks: 'all',
        //minsize: 3000
    }
  },
  module: {
      rules: [
        {
          test: /\.(png|jpg)$/,
          type: 'asset',
          parser:{
              dataUrlCondition: {
                  maxSize: 3*1024 //3 kilobytes
              }
          }
        },
        {
          test: /\.css$/,
          use: [
              MiniCssExtractPlugin.loader, 'css-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
              MiniCssExtractPlugin.loader, 'css-loader', {
                loader: 'sass-loader',
                options: {
                  // Prefer `dart-sass`
                  implementation: require("sass"),
                },
              } 
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: [ '@babel/env', '@babel/preset-react' ],
                  plugins: [ '@babel/plugin-proposal-class-properties' ]
              }
          }
        },
        {
          test: /\.hbs$/,
          use: [
            'handlebars-loader'
          ]
        }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: "[name].[contenthash:5].js",
    path: path.resolve(__dirname, "../dist/"),
    publicPath: '/static/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:5].css',
    }),
    new CleanWebpackPlugin(
    //   {
    //     cleanOnceBeforeBuildPatterns: [
    //       '**/*',
    //       path.join(process.cwd(), 'build/**/*')
    //   ]
    // }
    ),
    new HtmlWebpackPlugin({
        filename: 'home.html',
        chunks: ['main'],
        title: 'hello world',
        description: 'page Description',
        filename: 'index.html',
        template: 'src/page-template.hbs',
        minify: true
    }),
  ]
}