import { BlogpostPreview } from "./BlogpostPreview";
import { Link } from "gatsby";
import * as React from "react";

export default function ListOfBlogPosts({
  articles,
  header,
  moreText,
  moreLink,
}) {
  return (
    <section className="col-[2] px-10 mt-12">
      {header && <h2 className="text-xl font-bold mb-5">{header}</h2>}
      <ul className="flex flex-col space-y-10">
        {articles.map((node) => (
          <li>
            <BlogpostPreview node={node} />
          </li>
        ))}
      </ul>
      <Link
        className="text-terracotta-600 hover:underline w-full block text-center my-10"
        to={moreLink}
      >
        {moreText}
      </Link>
    </section>
  );
}
