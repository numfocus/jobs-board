.PHONY: build develop jobs
.DEFAULT_GOAL := build

jobs:
	python tools/bundle_posts.py

develop: jobs
	next dev

build: jobs
	next build
