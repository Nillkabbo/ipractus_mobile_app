const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure proper resolution for axios and network modules
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Add support for proper axios resolution in React Native
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];

module.exports = config;
