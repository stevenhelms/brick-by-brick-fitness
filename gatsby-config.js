module.exports = {
  siteMetadata: {
    title: `Bear State Nutrition`,
    description: `Bear State Winter 2021 Nutrition Challenge.`,
    author: `@stevenhelms`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `bear-state-winter-2021`,
        short_name: `BearState`,
        start_url: `/`,
        background_color: `#e25a2d`,
        theme_color: `#e25a2d`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `src`,
    //     path: `${__dirname}/src/`,
    //   },
    // },
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
    // `gatsby-transformer-remark`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-emotion`,
    // {
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `src/utils/typography`,
    //   },
    // },
    // `gatsby-plugin-netlify-identity-widget`,
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
