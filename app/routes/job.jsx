import { data, Link } from "react-router";

import Job from "../components/Job";
import { buildTime, loadJobs } from "../jobs.server";
import { useNow } from "../use-now";

export async function loader({ params }) {
  const job = (await loadJobs()).find((j) => j.id === params.id);
  if (!job) {
    throw data(null, { status: 404 });
  }
  return { job, buildTime };
}

export const meta = ({ loaderData }) => [
  {
    title: loaderData
      ? `${loaderData.job.entity} / ${loaderData.job.title} | NumFOCUS Jobs Board`
      : "NumFOCUS Jobs Board",
  },
];

export default function JobPage({ loaderData }) {
  const now = useNow(loaderData.buildTime);
  return (
    <>
      <Job job={loaderData.job} now={now} />
      Return to <Link to="/">jobs listing</Link>.
    </>
  );
}
