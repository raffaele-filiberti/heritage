module.exports = (dato, root, i18n) => {
    root.createDataFile("dato/home.json", "json", Object.assign({}, itemToJson(dato.home)));
};

function itemsToJson (items) {
    return items.map(item => itemToJson(item))
}

function itemToJson (item) {
    let itemJson = item.toMap();

    //seo meta tags handler
    if (typeof itemJson.seoMetaTags !== 'undefined' ) {
        const meta = itemJson.seoMetaTags
            .filter(tag => tag.tagName === 'meta')
            .map(tag => tag.attributes)
            .reduce((all, tag) => Object.assign(all, { [tag.name || tag.property]: tag.content }), {});

        itemJson.seo = Object.assign({
            'article:modified_time': meta['article:modified_time'],
            'article:publisher': meta['article:publisher'],
            'twitter:site': meta['twitter:site'],
        }, itemJson.seo || {})
    }

    return itemJson
}