import { isJobExpired } from "./utils.mjs";

const filterJobs = (jobs, filter, now) => {
  if (!filter.showExpired) {
    jobs = jobs.filter((job) => !isJobExpired(job, now));
  }

  if (filter.fullTime) {
    jobs = jobs.filter((job) => job.percentTime === 100);
  }

  if (filter.ossTimeGt) {
    const minOSS = parseInt(filter.ossTimeGt, 10);
    jobs = jobs.filter((job) => job.percentOSS >= minOSS);
  }

  if (filter.remote) {
    // Matches "remote", "Remote (US)", "London / Remote", etc.
    jobs = jobs.filter((job) =>
      (job.location || "remote").toLowerCase().includes("remote")
    );
  }

  return jobs;
};

export default filterJobs;
