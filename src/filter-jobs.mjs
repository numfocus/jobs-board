const filterJobs = (jobs, filter) => {
  // Filter out expired jobs.  Use Howland Island timezone to ensure
  // that everyone sees the job on its last day.
  const today = new Date();
  if (!filter.showExpired) {
    jobs = jobs.filter((job) => new Date(`${job.expires}T23:59:59.999-12:00`) > today)
  }

  if (filter.fullTime) {
    jobs = jobs.filter((job) => job.percentTime === 100)
  }

  if (filter.ossTimeGt) {
    jobs = jobs.filter((job) => job.percentOSS >= parseInt(filter.ossTimeGt))
  }

  if (filter.remote) {
    // Matches "remote", "Remote (US)", "London / Remote", etc.
    jobs = jobs.filter((job) =>
      (job.location || "remote").toLowerCase().includes("remote")
    );
  }

  return jobs;
}

export default filterJobs;
