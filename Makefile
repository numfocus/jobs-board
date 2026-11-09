.PHONY: build develop jobs
.DEFAULT_GOAL := build

jobs:
	python3 tools/bundle_posts.py

develop: jobs
	pnpm run develop

build: jobs
	pnpm run build
