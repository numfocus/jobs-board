import { marked } from 'marked';

const DOMPurify = (typeof window !== 'undefined') ? require('dompurify') : undefined;
const sanitize = (DOMPurify && DOMPurify.sanitize) ? DOMPurify.sanitize : (x, y) => x;

export const jobToMarkdown = (job) => {
  if (!job) return job;
  return {
    ...job,
    description: sanitize(
      marked(job.description || ''),
      { ALLOWED_TAGS: ['em', 'strong', 'ol', 'ul', 'li', 'br', 'p', 'a'] }
    )
  };
};

export default jobToMarkdown;
