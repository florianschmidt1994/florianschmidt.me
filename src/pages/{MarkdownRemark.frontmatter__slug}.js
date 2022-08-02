import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Fullbleed from "../components/Fullbleed";
import Img from "gatsby-image";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <Fullbleed>
        <div className="col-[2] px-10">
          <Img
            className="rounded"
            fluid={
              markdownRemark.frontmatter.featuredImage.childImageSharp.fluid
            }
          />
        </div>

        <header className="col-[2] my-10 px-10">
          <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
          <h2 className="text-xs font-bold opacity-80">{frontmatter.date}</h2>
        </header>
        <div
          className="blog-post col-[2] text-lg px-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Fullbleed>
    </Layout>
  );
}
export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
