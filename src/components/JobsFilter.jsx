import React from "react";

import { useForm } from "react-hook-form";

import Jobs from "./Jobs";
import HowToPost from "./HowToPost";

import jobData from '../jobs';
import filterJobs from '../filter-jobs.js';


const defaultFormValues = {
  fullTime: false,
  ossTimeGt: 0,
  showExpired: false
};

const JobsFilter = () => {
  const { register, watch, reset } = useForm();
  const formData = watch();

  const jobs = filterJobs(jobData, formData);

  return (
    <div className="jobsLayout">
      <div className="leftColumn">
        <div className="filter">
          <form>
            <div className="section">
              Type
            </div>

            <label>
              <input type="checkbox" {...register('fullTime')} />
              Full-time
            </label>
            <label>
              <input type="checkbox" {...register('showExpired')} />
              Expired
            </label>


            <div className="section">
              Open Source
            </div>

            <label>
              <select {...register('ossTimeGt')}>
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
              <input type="checkbox" {...register('remote')} />
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
