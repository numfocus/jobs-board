# NumFOCUS Jobs Board Charter

The NumFOCUS Jobs Board (https://jobs.numfocus.org/) is a venue for posting open source developer positions.
This charter discusses the intent of the Jobs Board, who is allowed to post there, the posting process, and also briefly outlines the technical mechanism behind the board.

## Intent

The Jobs Board is a platform in service of the NumFOCUS community: it helps prospective candidates find positions in industry that involve community open source.
Industry benefits by having access to a large pool of proven, highly-skilled developers.

Currently, the Jobs Board only allows posting jobs, but eventually it will also allow individuals to announce when they are available to take on new positions.

## Posting rules

Posts may only appear on the Jobs Board if at least 25% of the position is for community-developed open source software.
"Community-developed" means that decision making powers of the project reside with volunteer contributors outside of any specific organization.

We are also limiting posts to positions that involve work on projects affiliated with NumFOCUS.

Posts are approved by NumFOCUS staff before being posted to the site.
Once posted, each job receives a permalink which can be shared outside.

The NumFOCUS Board reserves the right to change posting rules and
procedures, and to deny or remove posts as they see fit.

## Posting new jobs

New jobs are posted by [filing a pull request](https://github.com/numfocus/jobs-board) agains the Jobs Board repo.  Jobs all live in the `jobs` folder, and are fomatted [like this template](https://github.com/numfocus/jobs-board/blob/master/jobs/template.yaml).

By default, jobs expire on the day that applications are due.  No job can be active on the Jobs Board for more than 6 months (but permalinks to the jobs remain indefinitely).

## Technical overview

The Jobs Board is a simple static website, rendered from YAML files
(the job posts) and React components.  It relies on the following
technologies:

- [React Router](https://reactrouter.com/) in framework mode, which
  prerenders all pages to static HTML
- [React](https://react.dev/) for the interactive frontend

The website is compiled by running `make`.  At build time,
`app/jobs.server.js` reads all posts from `jobs/*.yaml`, validates them,
and converts their Markdown descriptions to sanitized HTML.  The build
fails if a post does not pass validation.  Each post gets its own page,
so that it has a static URL (see `react-router.config.js`).

Frontend filtering is done via JavaScript.  Filters are defined in
`app/filter-jobs.mjs` and the accompanying frontend lives in
`app/components/JobsFilter.jsx`.
