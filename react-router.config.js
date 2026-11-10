import { copyFile } from "node:fs/promises";
import path from "node:path";

import { loadJobs } from "./app/jobs.server.js";

export default {
  ssr: false,
  async prerender() {
    const jobs = await loadJobs();
    return ["/", "/404", ...jobs.map((job) => `/job/${job.id}`)];
  },
  // GitHub Pages serves 404.html for unknown paths, which the client
  // router then matches to the catch-all route.
  async buildEnd({ reactRouterConfig }) {
    const client = path.join(reactRouterConfig.buildDirectory, "client");
    await copyFile(
      path.join(client, "404", "index.html"),
      path.join(client, "404.html"),
    );
  },
};
