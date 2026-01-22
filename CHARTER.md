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

The Jobs Board is a simple static website, rendered from a mixture of
YAML files (the jobs posts), and HTML templates.  It relies on the
following technologies:

- [Gatsby](https://www.gatsbyjs.com/) for static site rendering
- [React](https://reactjs.org/) for the interactive frontend

The website is compiled by running `make`, which executes the following steps:

1. `tools/bundle_posts.py`: This aggregates all posts from `jobs/*.yaml` and
   produces `src/jobs.mjs`.
2. Gatsby compiles the website.  It also creates a single page per
   post (so that each post gets a static URL) (see `gatsby-node.mjs`).

Frontend filtering is done via JavaScript.  Filters are defined in
`src/filter-jobs.js` and the accompanying frontend lives in
`src/components/JobsFilter.jsx`.
