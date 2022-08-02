import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import ListOfBlogPosts from "../components/ListOfBlogPosts";
import Fullbleed from "../components/Fullbleed";

function Greeting() {
  return (
    <section className="col-[2] text-xl lg:text-3xl mt-12 px-10">
      Hi 👋 I'm a software developer with a heart for non-profits. I like to
      develop applications all across the stack!
    </section>
  );
}

const IndexPage = ({ data, location }) => {
  console.log(data);

  const isPassionProject = (node) =>
    node.frontmatter.tags && node.frontmatter.tags.includes("passion-project");

  const isBlogArticle = (node) =>
    node.frontmatter.tags && node.frontmatter.tags.includes("blog");

  const newestFourBlogArticles = data.allMarkdownRemark.nodes
    .filter(isBlogArticle)
    .slice(0, 4);

  const newestFourPassionProjects = data.allMarkdownRemark.nodes
    .filter(isPassionProject)
    .slice(0, 4);

  return (
    <Layout>
      <Fullbleed>
        <Greeting />

        <ListOfBlogPosts
          articles={newestFourBlogArticles}
          moreText="Show all blog posts"
          moreLink="/blog"
          header="My Blog"
        />

        <ListOfBlogPosts
          articles={newestFourPassionProjects}
          header="Passion Projects"
          moreText="Show all passion projects"
          moreLink="/projects"
        />
      </Fullbleed>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
