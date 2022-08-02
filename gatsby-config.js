module.exports = {
    siteMetadata: {
        title: `florianschmidt.me`,
        siteUrl: `https://www.yourdomain.tld`
    },
    plugins: [
        'gatsby-plugin-postcss',
        {resolve: "gatsby-transformer-remark", options: {plugins: [{resolve: "gatsby-remark-embed-gist"}]}},
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "pages",
                "path": "./src/pages/",
            },
            __key: "pages",
        }, {
            resolve: `gatsby-remark-classes`,
            options: {
                classMap: {
                    paragraph: "mb-5",
                }
            }
        }]
};