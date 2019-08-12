const path = require('path');

const webpackConfig = [];

const generateConfig = name => {
  const mode = name.includes('min')
    ? 'production'
    : 'development';

  const config = {
    name,
    entry: './lib/Okuna.js',
    mode,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `${name}.js`,
      sourceMapFilename: `${name}.map`,
      library: 'okuna',
      libraryTarget: 'umd'
    },
    devtool: 'source-map'
  };

  return config;
};

[ 'okuna', 'okuna.min' ].forEach(key => {
  webpackConfig.push(generateConfig(key));
});

module.exports = webpackConfig;
