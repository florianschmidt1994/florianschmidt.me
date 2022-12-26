require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: ["article", "company", "author"],
  singleTypes: [],
};

module.exports = {
  siteMetadata: {
    title: `https://florianschmidt.me`,
    siteUrl: `https://florianschmidt.me`,
  },
  plugins: [
    "gatsby-plugin-cname",
    "gatsby-plugin-postcss",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          { resolve: "gatsby-remark-embed-gist" },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 900,
              backgroundColor: "#000000",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-remark-classes`,
      options: {
        classMap: {
          paragraph: "mb-5",
        },
      },
    },
  ],
};
