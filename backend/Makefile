init: install-deps migrate
	
start:
	gunicorn wsgi:app

install-deps:
	pip install -r requirements.txt

migrate:
	python migrate.py