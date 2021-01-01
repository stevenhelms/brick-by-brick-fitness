module.exports = {
    siteTitle: 'Bear State Gym', // <title>
    siteDescription: 'Bear State Winter 2021 Nutrition Challenge.',
    manifestName: 'bear-state-gym-winter21',
    manifestShortName: 'BearStateGym', // max 12 characters
    manifestStartUrl: '/',
    manifestBackgroundColor: '#e25a2d',
    manifestThemeColor: '#e25a2d',
    manifestDisplay: 'standalone', // or minimal-ui
    manifestIcon: 'src/images/bear-state-logo-Sept2020.png',
    pathPrefix: `/`, // This path is subpath of your hosting https://domain/portfolio
    author: 'Steve Helms',
    heading: 'Bear State Gym',
    subHeading: 'Fitness and Nutrition',
    // social
    socialLinks: [
        {
            style: 'brands',
            icon: 'fa-facebook',
            name: 'Facebook',
            url: 'https://www.facebook.com/Bear-State-Gym-686384604775823/',
        },
        {
            style: 'brands',
            icon: 'fa-instagram',
            name: 'Instagram',
            url: 'https://www.instagram.com/bear_state/',
        },
        {
            style: 'solid',
            icon: 'fa-envelope',
            name: 'Email',
            url: 'mailto:bearstatecf@gmail.com',
        },
    ],
}
