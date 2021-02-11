# NumFOCUS Jobs Board

Please refer to the [charter](CHARTER.md) for more on the purpose of the
Jobs Board, the types of posts that are accepted, and the technical
design of the software.

## Posting a job

Copy `jobs/template.yaml` to `jobs/YYYY-MM-DD_groupname.yaml`, fill
out the details, and file a pull request to this repository.

## Installation

Install gatsby:

```shell
npm install -g gatsby
```

Install dependencies:

```shell
npm install
```

## Develop

```shell
make develop
```
The site is now running at `http://localhost:8000`

## Deploy

```shell
make build
```

The site is generated into `./public`.

## Site generator

This site is generated using [Gatsby](https://gatsbyjs.com)
