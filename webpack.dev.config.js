// DEV Webpack configuration used to build the service worker
const path = require("path");

// This should match the dist folder
const webBuildTargetFolder = path.join(__dirname, "dist", "pwa");
// This should match service worker file name
const targetServiceWorkerFilename = "service-worker.js";

module.exports = {
  target: "node",
  mode: "none",
  entry: {
    index: path.join(__dirname, "src", "service-worker.ts"),
  },
  resolve: { extensions: [".js", ".ts"] },
  output: {
    path: webBuildTargetFolder,
    filename: targetServiceWorkerFilename,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          onlyCompileBundledFiles: true,
          compilerOptions: {
            sourceMap: true,
          },
        },
      },
    ],
  },
  plugins: [],
};
