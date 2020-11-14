import React from "react";

const Job = ({ job }) => (
  <div className="job">
    <div className="meta">
      <div className="title">{ job.entity } / { job.title }</div>
      <div className="percentTime">This job is { job.percentTime }% time.</div>
      <div className="percentOSS">{ job.percentOSS }% of that time
        is on open source</div>
    </div>
    <div
      className="description"
      dangerouslySetInnerHTML={{__html: job.description}}
    />
  </div>
);

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
