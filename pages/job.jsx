import React from "react";
import { Link } from "next/link";

import Page from '../src/components/Page';
import Job from '../src/components/Job';

// pageContext comes from createPage in
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
