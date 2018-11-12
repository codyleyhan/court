init: install-deps migrate
	
start:
	gunicorn wsgi:app --worker-class eventlet -w 1 --bind 0.0.0.0

install-deps:
	pip install -r requirements.txt

migrate:
	python migrate.py

