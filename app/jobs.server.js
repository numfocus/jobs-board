import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { CORE_SCHEMA, load } from "js-yaml";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import * as z from "zod";

const JOBS_DIR = path.resolve("jobs");

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "use YYYY-MM-DD")
  .refine(
    (s) => !isNaN(Date.parse(s)) && new Date(s).toISOString().startsWith(s),
    "not a valid date",
  );

const percent = z.int().min(0).max(100);

const jobSchema = z.strictObject({
  entity: z.string(),
  title: z.string(),
  url: z.url({ protocol: /^https?$/ }).optional(),
  percentTime: z.union([percent, z.string()]).optional(),
  percentOSS: percent,
  badges: z.array(z.enum(["Sponsor"])).optional(),
  deadline: isoDate.optional(),
  expires: isoDate,
  location: z.string().optional(),
  description: z.string(),
});

const fileNameSchema = z.object({
  date: isoDate,
  slug: z.string().regex(/^[\w-]+$/, "use YYYY-MM-DD_groupname.yaml"),
});

class JobError extends Error {}

const sanitizeOptions = {
  allowedTags: ["em", "strong", "ol", "ul", "li", "br", "p", "a"],
  allowedAttributes: { a: ["href"] },
  allowedSchemes: ["http", "https", "mailto"],
};

const parseJob = async (fileName) => {
  const id = path.basename(fileName, ".yaml");
  const [date, slug = ""] = id.split(/_(.*)/);
  // CORE_SCHEMA keeps dates as strings, so the schema checks their format.
  const raw = load(await readFile(path.join(JOBS_DIR, fileName), "utf8"), {
    schema: CORE_SCHEMA,
  });
  const name = fileNameSchema.safeParse({ date, slug });
  const content = jobSchema.safeParse(raw);
  const errors = [name, content]
    .filter((r) => !r.success)
    .map((r) => `${r === name ? "File name" : "Contents"}:\n${z.prettifyError(r.error)}`);
  if (errors.length > 0) {
    throw new JobError(errors.join("\n"));
  }
  const { description, ...job } = content.data;
  return {
    ...job,
    id,
    date,
    descriptionHtml: sanitizeHtml(marked.parse(description), sanitizeOptions),
  };
};

const readJobs = async () => {
  const files = (await readdir(JOBS_DIR)).filter(
    (f) => f.endsWith(".yaml") && f !== "template.yaml",
  );
  const results = await Promise.allSettled(files.map(parseJob));
  const errors = results.flatMap((r, i) =>
    r.status === "rejected"
      ? [`jobs/${files[i]}:\n${r.reason instanceof JobError ? r.reason.message : r.reason}`]
      : [],
  );
  if (errors.length > 0) {
    throw new Error(`Invalid job posts:\n\n${errors.join("\n\n")}`);
  }
  return results
    .map((r) => r.value)
    .sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id));
};

let jobs;

// Every prerendered page calls this, so the files are parsed once per build.
export const loadJobs = () => (jobs ??= readJobs());

export const buildTime = new Date().toISOString();
