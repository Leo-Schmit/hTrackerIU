.PHONY: start build init-db start-be test client start-fe build-fe stop pep8-check pep8-fix

PORT ?= 8095

start:
	make init-db
	PORT=$(PORT) docker compose up -d htracker-iu
	@echo "\n\nPlease open\nhttp://localhost:$(PORT)\n\n"

build:
	docker compose build htracker-iu

init-db:
	docker compose run --rm init-db

start-be:
	ENV=dev docker compose up -d htracker-iu

test:
	docker compose run --rm test

client:
	docker compose run --rm client-download
	docker compose run --rm openapi-generator

start-fe:
	REACT_APP_PORT=$(PORT) docker compose up frontend

build-fe:
	docker compose run --rm build-frontend

stop:
	docker compose down

pep8-check:
	docker run --rm -v `pwd`:/app -w /app python:3.12-alpine sh -c "pip install pycodestyle && find . -path ./static/node_modules -prune -o -path ./.venv -prune -o -name '*.py' -print | xargs pycodestyle --max-line-length=120"

pep8-fix:
	docker run --rm -v `pwd`:/app -w /app python:3.12-alpine sh -c "pip install autopep8 && find . -path ./static/node_modules -prune -o -path ./.venv -prune -o -name '*.py' -exec autopep8 --in-place --aggressive --aggressive {} +"
