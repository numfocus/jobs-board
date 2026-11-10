import { useState } from "react";

import Jobs from "./Jobs";
import HowToPost from "./HowToPost";

import filterJobs from "../filter-jobs.mjs";
import { useNow } from "../use-now";

const defaultFilter = {
  fullTime: false,
  ossTimeGt: "0",
  showExpired: false,
  remote: false,
};

const JobsFilter = ({ jobs: allJobs, buildTime }) => {
  const [filter, setFilter] = useState(defaultFilter);
  const now = useNow(buildTime);

  const jobs = filterJobs(allJobs, filter, now);
  const isFiltered = Object.keys(defaultFilter).some(
    (key) => filter[key] !== defaultFilter[key]
  );

  const checkbox = (name) => ({
    type: "checkbox",
    checked: filter[name],
    onChange: (e) => setFilter({ ...filter, [name]: e.target.checked }),
  });

  return (
    <div className="jobsLayout">
      <div className="leftColumn">
        <div className="filter">
          <form>
            <div className="section">
              Type
            </div>

            <label>
              <input {...checkbox("fullTime")} />
              Full-time
            </label>
            <label>
              <input {...checkbox("showExpired")} />
              Expired
            </label>


            <div className="section">
              Open Source
            </div>

            <label>
              <select
                value={filter.ossTimeGt}
                onChange={(e) => setFilter({ ...filter, ossTimeGt: e.target.value })}
              >
                <option value="0">Any</option>
                <option value="25">&gt; 25%</option>
                <option value="50">&gt; 50%</option>
                <option value="75">&gt; 75%</option>
                <option value="100">100%</option>
              </select>
              &nbsp;OSS time
            </label>

            <div className="section">
              Location
            </div>
            <label>
              <input {...checkbox("remote")} />
              Remote
            </label>

            <button
              type="button"
              className="reset"
              onClick={() => setFilter(defaultFilter)}
            >
              Reset
            </button>
          </form>
          {isFiltered && (
            <div className="count">
              Displaying {jobs.length} / {allJobs.length} entries.
            </div>
          )}
        </div>
        <HowToPost/>
      </div>
      <Jobs jobs={jobs} now={now}/>
    </div>
  )
};


export default JobsFilter;
