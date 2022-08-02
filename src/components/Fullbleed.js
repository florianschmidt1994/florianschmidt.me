import React from "react";

export default function Fullbleed({ children }) {
  return (
    <div className="grid grid-cols-[1fr_min(900px,100%)_1fr]">{children}</div>
  );
}
