import React from "react";

import Job from './Job';

const Jobs = ({ jobs }) => {
  return (
    <div className="jobList">
      {
        jobs.map((job) =>
          <Job job={job} key={job.id}/>
        )
      }
    </div>
  );
};

export default Jobs;
