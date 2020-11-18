.PHONY: build develop jobs

jobs:
	python tools/bundle_posts.py

develop: jobs
	gatsby develop

build: jobs
	gatsby build
