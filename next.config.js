const path = require('path');
const withSass = require('@zeit/next-sass');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {ANALYZE} = process.env;
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config');

module.exports = withSass({
        cssModules: true,
        cssLoaderOptions: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]',
            minimize: true,
            sourceMap: true,
            importLoaders: 2
        },
        sassLoaderOptions: {
            includePaths: ["/scss/utils.scss"]
        },
        webpack: function (config) {
            if (ANALYZE) {
                config.plugins.push(new BundleAnalyzerPlugin({
                    analyzerMode: 'server',
                    analyzerPort: 3000,
                    openAnalyzer: true
                }))
            }

            return commonsChunkConfig(config, /\.(sass|scss|css)$/)
        }
    }
);