import queryString from 'querystring';

const defaults = {
    fit: 'crop',
    auto: ['compress'],
    wm: 'jpg'
};

const imgix = (imagePath, params) => {
    return `${imagePath}?${queryString.stringify(Object.assign({}, defaults, params))}`
};

export default imgix