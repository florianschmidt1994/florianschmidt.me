module.exports = {
  siteMetadata: {
    title: `florianschmidt.me`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          { resolve: "gatsby-remark-embed-gist" },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 900,
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
