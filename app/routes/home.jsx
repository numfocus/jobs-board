import JobsFilter from "../components/JobsFilter";
import { buildTime, loadJobs } from "../jobs.server";

export async function loader() {
  return { jobs: await loadJobs(), buildTime };
}

export default function Home({ loaderData }) {
  return <JobsFilter jobs={loaderData.jobs} buildTime={loaderData.buildTime} />;
}
