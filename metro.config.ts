const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add polyfills for Node.js modules
config.resolver.extraNodeModules = {
  path: require.resolve("path-browserify"),
  crypto: require.resolve("crypto-browserify"),
  stream: require.resolve("stream-browserify"),
};

module.exports = config;
