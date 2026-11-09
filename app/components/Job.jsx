import { Link } from "react-router";

import Badge from "./Badge";
import { isJobExpired } from "../utils.mjs";


const Job = ({ job, now }) => {
  const isExpired = isJobExpired(job, now);

  return (
    <div className={`job${isExpired ? " expired" : ""}`}>
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
      {isExpired && (
        <div className="expired-banner">
          This job post has expired and is no longer open for applications.
        </div>
      )}
      <div
        className="description"
        dangerouslySetInnerHTML={{__html: job.descriptionHtml}}
      />
    </div>
  );
};
export default Job;
