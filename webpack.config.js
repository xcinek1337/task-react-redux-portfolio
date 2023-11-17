const path = require('path');
// importuję bibliotękę [path] z [node.js]
const HtmlWebpackPlugin = require('html-webpack-plugin');
// importuję plugin [html-webpack-plugin]

module.exports = function(env = {}) {

    const {production: isProd = false} = env;
    console.log(env);
    // w zmiennej [isProd] przechowuje informację
    // w jakim trybie uruchomić webpacka

    return  {
        entry: './src/app.js',
        // definiuje plik wejściowy
        mode: isProd ? 'production' : 'development',
        // definiuje tryb pracy webpacka
        devtool: isProd ? 
            false : 'source-map',
        // definiuje identyfikację kodu źródłowego
        output: {
            path: path.resolve(__dirname, 'build'),
            // definiuje ścieżką wyjściową
            filename: 'app.[contenthash].js',
            // definiuję nazwę pliku wyjściowego
            clean: true,
            // czyszczę katalog build przed nowym buildem
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    // określam jakie pliki 
                    // będą brane pod uwagę
                    exclude: /node_modules/,
                    // określam wykluczenia
                    use: 'babel-loader',
                    // określam jaki [loader]
                    // ma być wykorzystany
                },           
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    // dodaję rozszerzenia obrazów
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name][contenthash][ext]',
                        // ustawiam nazwę katalogu i pliku
                    },
                },
                {
                    test: /\.(ttf|otf|woff|woff2)$/,
                    // dodaję rozszerzenia fontów
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][contenthash][ext]',
                        // ustawiam nazwę katalogu i pliku
                    },
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                // wskazuje plik źródłowy
                filename: 'index.html'
                // określan nazwę dla pliku
            })
        ]
    }
}
// eksportuję ustawienia dla webpacka
