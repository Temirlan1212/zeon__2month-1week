const path = require("path");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "sourse-map" : undefined;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devServer: {
    port: 3001,
    open: true,
    hot: true,
  },
  entry: path.resolve(__dirname, "src", "index.ts"),
  resolve: {
    extensions: [".js", ".json", ".wasm", ".ts"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: {
      dry: true,
      keep: /.git/,
    },
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/[hash][ext]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/pages/Signup", "signup.html"),
      filename: "signup.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/pages/Signin", "signin.html"),
      filename: "signin.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/pages/AddBook", "addBook.html"),
      filename: "addBook.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      filename: "index.html",
    }),

    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets"),
          to: path.resolve(__dirname, "dist/assets/"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.s(a|c)ss$/i,
        use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.pug$/i,
        loader: "pug-loader",
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(svg|jpe?g|png|webp)$/,
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: "asset/resource",
      },
    ],
  },
};
