module.exports = {
    plugins: {
        'postcss-cssnext': {
            browsers: ['last 2 versions', '> 5%'],
            warnForDuplicates: false
        },
        'autoprefixer': {},
        'cssnano': {
            preset: 'default',
        }
    }
};