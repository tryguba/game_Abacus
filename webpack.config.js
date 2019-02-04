const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const argv = require('yargs').argv;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const publicPath = path.join(__dirname, '/public');

const isDev = argv.mode === 'development';
const isProd = !isDev;


const config = {
  entry: {
    index: './src/js/index.js',
    franchise: './src/js/simulator.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: publicPath
  },
  module: {
    rules: [
    {
      test: /\.html$/,
      use: 'html-loader'
    }, 
    {
      test: /\.sass$/,
      exclude: /node_modules/,
      use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              isProd ? require('cssnano') : () => {}, require('autoprefixer')({ browsers: ['last 15 versions']})
            ]
          }
        },
        'sass-loader'
      ]
    }, 
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{loader: 'babel-loader'}]
    }, 
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [{
        loader: 'file-loader',
        options: {name: 'images/[name][hash].[ext]'}
      }, {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 70
          }
        }
      },
      ],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'fonts/[name][hash].[ext]'
        }
      },
    }]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        title: 'index',
        template: './index.html',
        excludeChunks: ['simulator'],
        filename: 'index.html',
      }
    ), 
    new HtmlWebpackPlugin(
      {
        title: 'simulator',
        template: './simulator.html',
        chunks: ['simulator'],
        filename: 'simulator.html',
      }
    ),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
    
  ],
  devServer: {
    contentBase: publicPath,
    port: 9001,
    compress: true,
    open: true
  },
  optimization: isProd ? {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
            drop_console: true
          },
        },
      }),
    ],
  } : {},
  
};

module.exports = config;