import * as React from "react";
import { graphql, Link } from "gatsby";
import Header from "../components/Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="fullbleed-wrapper grid grid-cols-[1fr_min(70ch,100%)_1fr]">
        {children}
      </main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="my-10 w-full text-center flex items-center justify-center font-bold">
      <Link className="hover:underline" to="imprint">
        Imprint
      </Link>
    </footer>
  );
}

function Greeting() {
  return (
    <section className="col-[2] text-xl lg:text-3xl mt-12 px-10">
      Hi 👋 I'm a software developer with a heart for non-profits. I like to
      develop applications all across the stack!
    </section>
  );
}

function BlogpostPreview({ node }) {
  return (
    <>
      <Link
        className="text-xl block text-orange-600 font-bold"
        to={node.frontmatter.slug}
      >
        {node.frontmatter.title}
      </Link>
      <span className="block text-xs mb-2 font-bold opacity-80">
        {node.frontmatter.date}
      </span>
      <span className="text-md mr-2">{node.excerpt}</span>
      <Link to={node.frontmatter.slug}>Read More</Link>
    </>
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
      <Greeting />

      <section className="col-[2] px-10 mt-12">
        <h2 className="text-xl font-bold mb-5">My Blog</h2>
        <ul className="flex flex-col space-y-10">
          {newestFourBlogArticles.map((node) => (
            <li>
              <BlogpostPreview node={node} />
            </li>
          ))}
        </ul>
        <Link
          className="text-terracotta-600 hover:underline w-full block text-center my-10"
          to="/blog"
        >
          Show all blog posts
        </Link>
      </section>

      <section className="col-[2] px-10 mt-16">
        <h2 className="text-xl font-bold mb-5">Passion Projects</h2>
        <ul className="flex flex-col space-y-6">
          {newestFourPassionProjects.map((node) => (
            <li>
              <BlogpostPreview node={node} />
            </li>
          ))}
        </ul>
      </section>
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
