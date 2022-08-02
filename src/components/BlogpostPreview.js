import { Link } from "gatsby";
import * as React from "react";

export function BlogpostPreview({ node }) {
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
