import Layout from "../components/Layout";
import React from "react";
import Fullbleed from "../components/Fullbleed";
import { graphql } from "gatsby";
import ListOfBlogPosts from "../components/ListOfBlogPosts";

export default function IndexPage({ data }) {
  return (
    <Layout>
      <Fullbleed>
        <div className="col-[2]">
          <ListOfBlogPosts articles={data.allMarkdownRemark.nodes} />
        </div>
      </Fullbleed>
    </Layout>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }

    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          slug
          title
          tags
        }
        excerpt(pruneLength: 400)
      }
    }
  }
`;
