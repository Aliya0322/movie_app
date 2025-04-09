const path = require('path'); //импорт модуля path
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Этот плагин используется для автоматического создания HTML-файлов
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin"); //Плагин используется для копирования файлов или папок из одного места в другое при сборке

module.exports = { //точка входа для Webpack. Здесь указываются файлы, с которых Webpack будет начинать сборку.
  entry: {
    main: './main_page/main.js',
    favorites: './favorites_page/favorites.js'
  },
  output: { //конфигурация для выхода (создания файлов в результате сборки).
    filename: '[name].bundle.js', //Webpack будет генерировать файлы с именами, соответствующими названиям точек входа.
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  mode: 'development', //указывает Webpack, что сборка будет производиться в режиме разработки
  plugins: [
    // new CleanWebpackPlugin(), //

    //два экземпляра плагина HtmlWebpackPlugin, каждый из которых отвечает за создание HTML-файла для каждой страницы:
    new HtmlWebpackPlugin({
      template: './main_page/index.html',
      filename: 'index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './favorites_page/favorites.html',
      filename: 'favorites.html',
      chunks: ['favorites']
    }),
    new CopyPlugin({ //Копирует файл favorites.json из директории server в директорию dist/api.
      patterns: [
        { from: "server/favorites.json", to: "api/favorites.json" },
      ],
    }),
  ],
  devServer: { //запускает сервер для разработки.
    historyApiFallback: true,
    static: './dist',
    port: 3000,
  },
  module: { //конфигурация для обработки файлов с использованием различных загрузчиков
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], //css-loader — обрабатывает CSS-файлы, позволяя Webpack импортировать их в JavaScript,
        //style-loader — добавляет стили в HTML-файл через тег <style>
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto'
      }
    ],
  },
};
