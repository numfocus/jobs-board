.PHONY: build

build:
	python tools/bundle_posts.py
	gatsby build
