build:
	cd public-web-users && pnpm build
	cd public-web-jobs && pnpm build

deploy: build
	docker compose up --build

start: deploy	
	echo System stopped