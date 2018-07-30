export default [
    {
        title: 'Know How',
        path: '/know-how',
        asPath: '/know-how',
        subMenu: {
            links: [
                {
                    title: 'Frames',
                    path: '/content?page=frames',
                    asPath: '/frames'
                },
                {
                    title: 'Lenses',
                    path: '/content?page=lenses',
                    asPath: '/lenses'
                },
            ],
        }
    },
    {
        title: 'Collections',
        path: '/collections',
        asPath: '/collections',
        subMenu: {
            links: [
                {
                    title: 'Spectacles of Time',
                    path: '/collection?slug=spectacles-of-time',
                    asPath: '/collections/spectacles-of-time'
                },
                {
                    title: 'First Class',
                    path: '/collection?slug=first-class',
                    asPath: '/collections/first-class'
                },
            ],
        }
    },
    {
        title: 'Philosophy',
        path: '/content?page=philosophy',
        asPath: '/philosophy',
        submenu: 0
    },
    {
        title: 'Locator',
        path: '/store-locator',
        asPath: '/store-locator',
        subMenu: 0
    },
]
