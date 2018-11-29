init: install-deps migrate

start:
	gunicorn wsgi:app --worker-class eventlet -w 1 --bind 0.0.0.0

debug:
	python3 wsgi.py

install-deps:
	pip install -r requirements.txt

test:
	pytest -v

migrate:
	python migrate.py

