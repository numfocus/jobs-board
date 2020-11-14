const filterJobs = (jobs, filter) => {
  if (filter.fullTime) {
    jobs = jobs.filter((job) => job.percentTime === 100)
  }
  if (filter.ossTimeGt) {
    jobs = jobs.filter((job) => job.percentOSS >= parseInt(filter.ossTimeGt))
  }

  return jobs;
}

export default filterJobs;
