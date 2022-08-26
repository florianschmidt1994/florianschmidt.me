import { Link } from "gatsby";
import * as React from "react";

export default function Header() {
  return (
    <header className="py-12 px-10 flex flex-col items-center">
      <h1 className="text-5xl text-terracotta-600">Florian Schmidt</h1>
      <nav className="mt-8">
        <ul className="font-bold flex flex-row space-x-10 uppercase text-xs opacity-80">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/projects">Passion Projects</Link>
          </li>
          <li>
            <Link to="/about-me">About me</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
