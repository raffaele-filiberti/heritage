import React from 'react'
import LensesProductFeatures from './LensesProductFeatures'
import OpticalProductFeatures from './OpticalProductFeatures'
import SunglassesProductFeatures from './SunglassesProductFeatures'

const productFeaturesTypes = {
    'eyeglasses': OpticalProductFeatures,
    'sunglasses': SunglassesProductFeatures,
    'lenses': LensesProductFeatures
};

const ProductFeatures = ({ type, features }) => {
    const ProductFeaturesType = productFeaturesTypes[type.slug];
    return ProductFeaturesType
        ? <ProductFeaturesType product={ features } />
        : <div>{ `Product details with unknown product type "${type}"` }</div>
};

export default ProductFeatures