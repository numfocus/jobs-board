import { isJobExpired } from "./utils.mjs";

const filterJobs = (jobs, filter) => {
  const today = new Date();

  // Filter out expired jobs if requested.
  if (!filter.showExpired) {
    jobs = jobs.filter((job) => !isJobExpired(job, today));
  }

  if (filter.fullTime) {
    jobs = jobs.filter((job) => job.percentTime === 100);
  }

  if (filter.ossTimeGt) {
    // Ensure we're comparing numbers
    const minOSS = parseInt(filter.ossTimeGt, 10);
    jobs = jobs.filter((job) => job.percentOSS >= minOSS);
  }

  if (filter.remote) {
    jobs = jobs.filter((job) => (job.location || 'remote').toLowerCase() === 'remote' );
  }

  return jobs;
};

export default filterJobs;
