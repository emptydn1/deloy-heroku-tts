const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const entry = {
  bundle: path.resolve(__dirname, "src/index.jsx"),
};

const output = {
  path: path.resolve(__dirname, "dist"),
  filename: "[name].[chunkhash].js",
  clean: true,
};

const devServer = {
  contentBase: path.resolve(__dirname, "dist"),
  port: 3000,
  open: true,
};

const _module = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: "babel-loader",
    },
    // {
    //   test: /\.svg$/,
    //   use: ["@svgr/webpack", "url-loader"],
    // },
    // {
    //   test: /\.(css|scss)$/,
    //   use: ["style-loader", "css-loader", "sass-loader"],
    // },
    // {
    //   test: /\.(jpe?g|gif|png|svg|woff|woff2|eot|ttf|wav|mp3|ico)$/,
    //   use: [
    //     {
    //       loader: "file-loader",
    //     },
    //   ],
    // },
  ],
};

const resolve = {
  extensions: [".js", ".jsx"],
  alias: {
    src: path.resolve(__dirname, "src"),
    // components: path.resolve(__dirname, "src/components"),
    // utils: path.resolve(__dirname, "src/utils"),
  },
};

const optimization = {
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /node_modules[\\/]/,
        name: "vendor",
        // enforce: true,
        chunks: "all",
      },
    },
  },
};

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "src/index.html"),
  }),
];

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry,
  output,
  resolve,
  module: _module,
  devServer,
  optimization,
  plugins,
  devtool: "eval-source-map",
};
