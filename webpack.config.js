const path = require('path'); //для того чтобы превратить относительный путь в абсолютный, мы будем использовать пакет path
const HTMLWebpackPlugins = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'), //точка входа в наше приложение содержит абсолютный путь к index.ts
  output: {
    path: path.resolve(__dirname, './dist'), //путь, куда будет собираться наш проект
    filename: 'main.js', // имя нашего бандла
  },
  plugins: [
    new HTMLWebpackPlugins({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: "body"
    }),
    new CleanWebpackPlugin(),
  ],
  //Нужно помочь вебпаку научиться работать с jsx- и tsx-файлами, для этого используют ts-loader
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/, //содержит регулярное выражение, которое содержит информацию, какие файлы должны обрабатываться этим loader'ом
        use: [
          {
            loader: 'ts-loader',
          },
        ], // для того чтобы ts-loader корректно отработал, нам нужен tsconfig, его можно создать вручную, а можно создать автоматически
        /** чтобы проинициализировать его автоматически, можно установить пакет typesctipt глобально или использовать npx, выполнив команду npx tsc --init
         После создания конфига нужно включить "allowJs": true, чтобы работать не только c typescript, также меняем "jsx": "react", чтобы мы могли работать с react-компонентами, и включаем карту ресурсов "sourceMap": true, пока на этом все вернёмся в этот конфиг позже*/
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'], //указываем файлы, с которыми будет работать webpack
  },
};
