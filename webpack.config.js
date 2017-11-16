const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry : {
       'dist/script.js': './js/components/App.jsx',
       'dist/main.css~': './scss/main.scss'
   },
   output : {
       path: __dirname+'/',
       filename: '[name]'
   },
   devServer: {
      inline: true,
      contentBase: './',
      port: 3009
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'stage-2', 'react'] }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })

            },
            {
              test: /\.(png|jpg|gif|svg)$/,
              loader: "url-loader?limit=1000000&name=images/[name].[ext]"
            }
            // {
            //   test: /\.(png|jpg|gif)$/,
            //   exclude: /node_modules/,
            //   use: [
            //     {
            //       loader: 'file-loader',
            //       options: {}
            //     }
            //   ]
            // }
        ]
    },
    plugins: [
       new ExtractTextPlugin('./dist/main.css')

   ]
};
