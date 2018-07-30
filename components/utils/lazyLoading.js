const lazyLoadImg = (url, loadCallback) =>
    new Promise((resolve, reject) => {

        let image = new Image();

        image.onload = () => {

            if (loadCallback) {
                loadCallback();
            }

            resolve(image);
        };

        image.onerror = () => {
            let message = 'Could not load image at ' + url;
            reject(url);
        };
        
        image.src = url;
    });

export default lazyLoadImg;

export const loadImages = (srcsWithKeys, loadCallback) => {
    return new Promise((resolve, reject) => {
        const preloadGoal = srcsWithKeys.length;
        let numLoaded = 0;
        const images = {};

        const handleLoad = imgData => {
            if (loadCallback) {
                loadCallback();
            }
            numLoaded += 1;
            images[imgData.id] = imgData.img;
            if (numLoaded === preloadGoal) {
                resolve(images);
            }
        };

        const loadImageWithCatch = img => {
            loadImage(img.src)
                .then(loadedImgEl => {
                    handleLoad({ id: img.id, img: loadedImgEl });
                })
                .catch(url => {
                    loadImageWithCatch(img);
                });
        };

        srcsWithKeys.forEach(loadImageWithCatch);
    });
};
