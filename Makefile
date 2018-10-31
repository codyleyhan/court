

init: install-deps create
	
start:
	gunicorn wsgi:app

install-deps:
	pip install -r requirements.txt

create:
	python migrate.py