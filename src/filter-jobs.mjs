const filterJobs = (jobs, filter) => {  

  const today = new Date();
  const minOSS = filter.ossTimeGt ? parseInt(filter.ossTimeGt, 10) : null;

  return jobs.filter((job) => {
    if (!filter.showExpired && isJobExpired(job, today)) {
      return false;
    }

    if (filter.fullTime && job.percentTime !== 100) {
      return false;
    }

    if (minOSS !== null && job.percentOSS < minOSS) {
      return false;
    }

    if (filter.remote) {
      const location = (job.location || "").toLowerCase();
      return location.includes("remote");
    }

    return true;
  });
};


// here we consider a job expired if its posted date is more than 30 days old
const isJobExpired = (job, today) => {
  if (!job.postedDate) return false; // If no posted date, assume it's not expired

  const postedDate = new Date(job.postedDate);
  const diffTime = Math.abs(today - postedDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 30;
};

export default filterJobs;  
// we can use this code for mordern js and it will work in node and browser both.

