import { marked } from 'marked';
import DOMPurify from 'dompurify';

const sanitize = (typeof window !== 'undefined' && DOMPurify && DOMPurify.sanitize) ? DOMPurify.sanitize : (x, y) => x;

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
