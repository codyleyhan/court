# Court API

## How to get started

I highly recommend installing virtualenv and having a virtual environment, then
go through the following steps

Ensure you have python 3 and then run:
```bash
make init
```

Then to start the app run:
```bash
make start
```

## Good to know

If you add a dependency then run:
```bash
pip freeze > requirements.txt
```

If you want to recompile the documentation then go to docs/ directory and run:
```bash
make html
```

## Routes

|Endpoint     |Methods           |Rule
|------------ |----------------  |-------------------------------------
|health_check |GET               |/
|thread_api   |GET               |/api/threads
|message_api  |GET               |/api/threads/<int:thread_id>/messages
|user_api     |POST              |/api/users
|profile_api  |GET, PUT          |/api/users
|match_api    |GET               |/api/matches
