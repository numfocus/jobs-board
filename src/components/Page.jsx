import React from "react";
import { Link } from "gatsby";

const Page = ({ children }) => (
  <>
    <div className="header">
      <Link to="/">
        <h1>NumFOCUS Jobs Board</h1>
      </Link>
    </div>
    { children }
  </>
);

export default Page;
