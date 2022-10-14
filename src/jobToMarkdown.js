import { marked } from 'marked';

export const jobToMarkdown = (job) => {
  const DOMPurify = (typeof window !== `undefined`) ?
        require('dompurify') : undefined;

  const sanitize = DOMPurify ? DOMPurify.sanitize : (x, y) => x;

  return {
    ...job,
    description: sanitize(
      marked(job.description),
      {ALLOWED_TAGS: ['em', 'strong', 'ol', 'ul', 'li', 'br', 'p', 'a']}
    )
  };
};

export default jobToMarkdown;
