import React from "react";

import marked from 'marked';

import { useForm } from "react-hook-form";

import Jobs from "./Jobs";
import HowToPost from "./HowToPost";

import jobData from '../jobs.js';
import filterJobs from '../filter-jobs.js';

const DOMPurify = (typeof window !== `undefined`) ?
      require('dompurify') : undefined;

const defaultFormValues = {
  fullTime: false,
  ossTimeGt: 0
};

const JobsFilter = () => {
  const { register, watch, reset } = useForm();
  const formData = watch();

  const sanitize = DOMPurify ? DOMPurify.sanitize : (x, y) => x;
  const jobsWithMarkdown = jobData.map((job) => ({
    ...job,
    description: sanitize(
      marked(job.description),
      {ALLOWED_TAGS: ['em', 'strong', 'ol', 'ul', 'li', 'br', 'p']}
    )
  }));

  const jobs = filterJobs(jobsWithMarkdown, formData);

  return (
    <div className="jobsLayout">
      <div className="leftColumn">
        <div className="filter">
          <form>
            <div className="section">
              Type
            </div>

            <label>
              <input name="fullTime" type="checkbox" ref={register} />
              Full-time
            </label>

            <div className="section">
              Open Source
            </div>

            <label>
              <select name="ossTimeGt" ref={register}>
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
              <input name="remote" type="checkbox" ref={register} />
              Remote
            </label>

            <button
              type="button"
              className="reset"
              onClick={() => reset(defaultFormValues)}
            >
              Reset
            </button>
          </form>
        </div>
        <HowToPost/>
      </div>
      <Jobs jobs={jobs}/>
    </div>
  )
};


export default JobsFilter;
