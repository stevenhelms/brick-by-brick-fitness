module.exports = {
    siteTitle: 'Brick by Brick Fitness', // <title>
    siteDescription: 'Brick by Brick Fitness Nutrition Challenge.',
    manifestName: 'brick-by-brick-nutrition',
    manifestShortName: 'BBBFitness', // max 12 characters
    manifestStartUrl: '/',
    manifestBackgroundColor: '#aeaeae',
    manifestThemeColor: '#e25a2d',
    manifestDisplay: 'standalone', // or minimal-ui
    manifestIcon: 'src/images/bear-state-logo-Sept2020.png',
    pathPrefix: '/', // This path is subpath of your hosting https://domain/portfolio
    author: 'Steve Helms',
    heading: 'Brick by Brick Fitness',
    subHeading: 'Nutrition Challenge ',
    registrationEndDate: '2022-01-30',
    siteOpen: true,
    logoWhite: 'bear-state-logo-Sept2020-white.png',

    // social
    socialLinks: [
        {
            style: 'brands',
            icon: 'fa-facebook',
            name: 'Facebook',
            url: 'https://www.facebook.com/BrickByBrickFitnessArkansas',
        },
        {
            style: 'brands',
            icon: 'fa-instagram',
            name: 'Instagram',
            url: 'https://www.instagram.com/brick_by_brick_fitness/',
        },
        {
            style: 'solid',
            icon: 'fa-envelope',
            name: 'Website',
            url: 'https://brickbybrickfitness.org/',
        },
    ],

    stressScale: {
        1: 'None',
        2: 'Minimal',
        3: 'Moderate',
        4: 'High',
        5: 'Crazy',
    },
    recoveryScale: {
        1: 'None',
        2: 'Minimal',
        3: 'Somewhat',
        4: 'Mostly',
        5: 'Full',
    },
    challengeGoal: [
        { short: 'Lose Weight', long: 'Want to lose at least 10-15 pounds (or more).' },
        { short: 'Body Recomposition', long: 'Want to lose less than 10-15 pounds while building muscle.' },
        {
            short: 'Improve Health',
            long: 'Want to improve nutrition and overall health while maintaining current weight.',
        },
        { short: 'Build Muscle', long: 'Want to build muscle and increase overall body weight.' },
        {
            short: 'Athletic Performance',
            long: 'Want optimal nutrition to support long and intense athletic training.',
        },
    ],
    levelMethod: [
        'white',
        'white 1',
        'white 2',
        'white 3',
        'yellow',
        'yellow 1',
        'yellow 2',
        'yellow 3',
        'orange',
        'orange 1',
        'orange 2',
        'orange 3',
        'blue',
        'blue 1',
        'blue 2',
        'blue 3',
        'purple',
        'purple 1',
        'purple 2',
        'purple 3',
        'brown',
        'brown 1',
        'brown 2',
        'brown 3',
        'black',
        'black 1',
        'black 2',
        'black 3',
    ],
}
