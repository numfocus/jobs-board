import React from "react";

import Badge from "./Badge";

const Job = ({ job }) => (
  <div className="job">
    <div className="badges">
      { job.badges &&
        job.badges.map((badge) =>
          <Badge key={badge} type={badge}/>
        )
      }
      { (job.percentOSS === 100) &&
        <Badge type="Pure OSS"/>
      }
    </div>
    <div className="meta">
      <div className="title">{ job.entity } / { job.title }</div>
      <div className="percentTime">This job is { job.percentTime }% time.</div>
      <div className="percentOSS">
        { job.percentOSS }% of that time is on open source
      </div>
      { job.deadline &&
        <div className="deadline">
          Application deadline: { job.deadline }
        </div>
      }
    </div>
    <div
      className="description"
      dangerouslySetInnerHTML={{__html: job.description}}
    />
  </div>
);

export default Job;
