import React from "react";
import { Link } from "gatsby";

import Page from '../components/Page';
import Job from '../components/Job';

// pageContext comes from createPage in
// gatsby-node.esm.js
const job = ({ pageContext }) => {
  const { job } = pageContext;
  return (
    <Page>
      <Job job={job}/>
      Return to <Link to="/">jobs listing</Link>.
    </Page>
  );
};

export default job;
