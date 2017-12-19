const tsLoader = require('./ts-loader')

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/index.ts'
    tsLoader(config);
    return config
  }
}