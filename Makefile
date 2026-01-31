.PHONY: build develop jobs
.DEFAULT_GOAL := build

jobs:
	python3 tools/bundle_posts.py

develop: jobs
	gatsby develop

build: jobs
	gatsby build
