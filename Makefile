

init: install-deps create
	

install-deps:
	pip install -r requirements.txt

create:
	python create.py