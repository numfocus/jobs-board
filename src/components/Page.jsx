import React from "react";
import { Link } from "next/link";

const Page = ({ children }) => (
  <div className="page">
    <div className="content">
      <div className="header">
        <Link to="/">
          <h1>NumFOCUS Jobs Board</h1>
        </Link>
      </div>
      { children }
    </div>
  </div>
);

export default Page;
