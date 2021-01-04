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
        `gatsby-plugin-netlify`,
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
                    apiKey: process.env.GATSBY_FIREBASE_API_KEY,
                    authDomain: 'bear-state.firebaseapp.com',
                    databaseURL: 'https://bear-state-default-rtdb.firebaseio.com',
                    projectId: 'bear-state',
                    storageBucket: 'bear-state.appspot.com',
                    messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
                    appId: process.env.GATSBY_FIREBASE_APP_ID,
                    measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
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
