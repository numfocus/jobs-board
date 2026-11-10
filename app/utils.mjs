/**
 * Checks if a job has expired using the 'Anywhere on Earth' (-12:00) timezone.
 */
export const isJobExpired = (job, now = new Date()) => {
  try {
    const expiresStr = String(job.expires).trim();
    const expiryDate = new Date(`${expiresStr}T23:59:59.999-12:00`);

    // If date is malformed, default to NOT expired to avoid hiding jobs by mistake.
    if (isNaN(expiryDate.getTime())) {
      return false;
    }

    return expiryDate < now;
  } catch (error) {
    // Fail-safe: malformed data shouldn't break the entire jobs board UI.
    return false;
  }
};
