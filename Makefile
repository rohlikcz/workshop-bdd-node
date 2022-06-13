.PHONY: compose-up test

compose-up:
	docker-compose up -d

test:
	docker-compose exec web npm test