import { Link } from "gatsby";
import * as React from "react";

export default function Footer() {
  return (
    <footer className="my-10 w-full text-center flex items-center justify-center font-bold">
      <Link className="hover:underline" to="/imprint">
        Imprint
      </Link>
    </footer>
  );
}
