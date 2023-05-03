.DEFAULT_GOAL := help

.PHONY: help
help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# it is here only for reference, no need to run it again
init-ts: ## init a typescript project
	npx tsc --init --rootDir src --outDir build \
		--esModuleInterop --resolveJsonModule --lib es6 \
		--module commonjs --allowJs true --noImplicitAny true

generate-csr: ## generate key/csr files
	@openssl req -new -newkey rsa:2048 -nodes -keyout example.com.key -out example.com.csr

compile: ## transpile ts to js
	@npx tsc

run-js: compile ## run js file
	@node build/index.js

lint: ## run lint checks
	@yarn --silent lint --fix