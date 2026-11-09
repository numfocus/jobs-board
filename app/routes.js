import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("job/:id", "routes/job.jsx"),
  route("*", "routes/not-found.jsx"),
];
