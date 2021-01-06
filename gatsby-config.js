const config = require('./config')
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: config.siteTitle,
        description: config.siteDescription,
        author: config.author,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-emotion`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: config.manifestName,
                short_name: config.manifestShortName,
                start_url: config.pathPrefix || config.manifestStartUrl,
                background_color: config.manifestBackgroundColor,
                theme_color: config.manifestThemeColor,
                display: config.manifestDisplay,
                icon: config.manifestIcon, // This path is relative to the root of the site.
            },
        },
        {
            resolve: `gatsby-plugin-create-client-paths`,
            options: { prefixes: [`/app/*`] },
        },

        {
            resolve: 'gatsby-plugin-firebase',
            options: {
                features: {
                    auth: true,
                    database: true,
                    firestore: false,
                    functions: true,
                },
                credentials: {
                    apiKey: 'AIzaSyCziiAM1cDeMGws0hd4xDbe9mDBh-CzC6E',
                    authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN || 'bear-state.firebaseapp.com',
                    databaseURL:
                        process.env.GATSBY_FIREBASE_DATABASE_URL || 'https://bear-state-default-rtdb.firebaseio.com',
                    projectId: 'bear-state',
                    storageBucket: 'bear-state.appspot.com',
                    messagingSenderId: '383638739474',
                    appId: '1:383638739474:web:830c7b2f8a1a3e83af56cb',
                    measurementId: 'G-ZGS9M1PCKQ',
                },
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/images/`,
            },
        },
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                // The property ID; the tracking code won't be generated without it
                trackingId: '255929633',
            },
        },
        `gatsby-plugin-offline`,
    ],
}
