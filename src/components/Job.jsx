import React from "react";
import { Link } from "gatsby";

import Badge from "./Badge";
import jobToMarkdown from "../jobToMarkdown.mjs";


const Job = ({ job }) => {
  const processedJob = React.useMemo(() => jobToMarkdown(job), [job]);

  if (processedJob === undefined) {
    console.log("We don't expect an empty job posting; aborting");
    return <div>Empty job posting</div>;
  }

  return (
    <div className="job">
      <div className="badges">
        { processedJob.badges &&
          processedJob.badges.map((badge) =>
            <Badge key={badge} type={badge}/>
          )
        }
        { (processedJob.percentOSS === 100) &&
          <Badge type="Pure OSS"/>
        }
      </div>
      <Link to={`/job/${processedJob.id}`}>
        <div className="title">{ processedJob.entity } / { processedJob.title }</div>
      </Link>
      <div className="meta">
        { processedJob.percentTime &&
          <div className="percentTime">This job is <b>{ processedJob.percentTime }%</b> time.</div>
        }
        <div className="percentOSS">
          <b>{ processedJob.percentOSS }%</b> of time is on <b>open source</b>.
        </div>
        { processedJob.deadline &&
          <div className="deadline">
            Application deadline: <b>{ processedJob.deadline }</b>
          </div>
        }
        { processedJob.location &&
          <div className="location">
            Location: { processedJob.location }
          </div>
        }
        { processedJob.url &&
          <div className="url">
            URL: <a href={processedJob.url}>{ processedJob.url }</a>
          </div>
        }
      </div>
      <div
        className="description"
        dangerouslySetInnerHTML={{__html: processedJob.description}}
      />
    </div>
  );
};
export default Job;
