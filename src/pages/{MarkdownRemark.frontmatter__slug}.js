import React from "react";
import { graphql } from "gatsby";
import Header from "../components/Header";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <>
      <Header />
      <article className="grid grid-cols-[1fr_min(70ch,100%)_1fr] p-10 text-black blog-post">
        <header className="col-[2] mb-10">
          <h1 className="text-xl font-bold">{frontmatter.title}</h1>
          <h2 className="text-sm">{frontmatter.date}</h2>
        </header>
        <div
          className="col-[2] text-lg"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </>
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
      }
    }
  }
`;
