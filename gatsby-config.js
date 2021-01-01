const config = require("./config")

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
    `gatsby-plugin-netlify-identity-widget`,
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
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyDG8hWYg4s108RqGhTSUKxb57cJv8ffjUc",
          authDomain: "<YOUR_FIREBASE_AUTH_DOMAIN>",
          databaseURL: "<YOUR_FIREBASE_DATABASE_URL>",
          projectId: "bear-state",
          storageBucket: "bear-state.appspot.com",
          messagingSenderId: "<YOUR_FIREBASE_MESSAGING_SENDER_ID>",
          appId: "<YOUR_FIREBASE_APP_ID>",
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
    // {
    //   resolve: `gatsby-plugin-netlify-functions`,
    //   options: {
    //     functionsSrc: `${__dirname}/src/functions`,
    //     functionsOutput: `${__dirname}/functions`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "255929633",
      },
    },
    `gatsby-plugin-offline`,
  ],
}
