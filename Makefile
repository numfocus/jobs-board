.PHONY: build develop
.DEFAULT_GOAL := build

develop:
	pnpm run dev

build:
	pnpm run build
