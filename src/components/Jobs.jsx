import React from "react";

import Job from './Job';

const Jobs = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <div className="jobList">
        <div className="noJobs">
          No jobs currently listed 😢&nbsp; <a href="https://github.com/numfocus/jobs-board#posting-a-job">Make a PR!</a>
        </div>
      </div>
    )
  }
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
