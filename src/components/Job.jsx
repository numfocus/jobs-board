import React from "react";
import { Link } from "next/link";

import Badge from "./Badge";
import jobToMarkdown from "../jobToMarkdown.js";


const Job = ({ job }) => {
  if (job === undefined) {
    console.log("We don't expect an empty job posting; aborting");
    return <div>Empty job posting</div>;
  }

  job = jobToMarkdown(job);
  return (
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
      <Link to={`/job/${job.id}`}>
        <div className="title">{ job.entity } / { job.title }</div>
      </Link>
      <div className="meta">
        { job.percentTime &&
          <div className="percentTime">This job is <b>{ job.percentTime }%</b> time.</div>
        }
        <div className="percentOSS">
          <b>{ job.percentOSS }%</b> of time is on <b>open source</b>.
        </div>
        { job.deadline &&
          <div className="deadline">
            Application deadline: <b>{ job.deadline }</b>
          </div>
        }
        { job.location &&
          <div className="location">
            Location: { job.location }
          </div>
        }
        { job.url &&
          <div className="url">
            URL: <a href={job.url}>{ job.url }</a>
          </div>
        }
      </div>
      <div
        className="description"
        key={ job.id }
        dangerouslySetInnerHTML={{__html: job.description}}
      />
    </div>
  );
};
export default Job;
