# Court

[![Build Status](https://travis-ci.org/codyleyhan/court.svg?branch=master)](https://travis-ci.org/codyleyhan/court)

```bash
.
├── README.md
├── backend
│   ├── Makefile
│   ├── Procfile
│   ├── README.md
│   ├── court
│   │   ├── __init__.py
│   │   ├── app.py
│   │   ├── chats
│   │   │   ├── __init__.py
│   │   │   ├── models.py
│   │   │   ├── sockets.py
│   │   │   ├── thread_service.py
│   │   │   └── views.py
│   │   ├── config.py
│   │   ├── court.db
│   │   ├── database.py
│   │   ├── errors.py
│   │   ├── sockets.py
│   │   └── users
│   │       ├── __init__.py
│   │       ├── auth_service.py
│   │       ├── models.py
│   │       └── views.py
│   ├── migrate.py
│   ├── requirements.txt
│   ├── runtime.txt
│   ├── tests
│   │   ├── __init__.py
│   │   ├── config.py
│   │   └── test_auth_service.py
│   └── wsgi.py
├── docs
│   ├── Makefile
│   ├── conf.py
│   ├── doctrees
│   │   ├── environment.pickle
│   │   └── index.doctree
│   ├── html
│   │   ├── _sources
│   │   │   └── index.rst.txt
│   │   ├── genindex.html
│   │   ├── index.html
│   │   ├── objects.inv
│   │   ├── py-modindex.html
│   │   ├── search.html
│   │   └── searchindex.js
│   ├── index.html
│   └── index.rst
└── frontend
    ├── Court-iOS
    │   ├── App.js
    │   ├── __tests__
    │   │   └── App-test.js
    │   ├── app.json
    │   ├── assets
    │   │   └── images
    │   │       ├── court-logo-black.png
    │   │       ├── court-logo-white.png
    │   │       ├── icon.png
    │   │       ├── robot-dev.png
    │   │       ├── robot-prod.png
    │   │       └── splash.png
    │   ├── components
    │   │   ├── Avatar.js
    │   │   ├── Header.js
    │   │   ├── InboxComponents.js
    │   │   ├── LoginButton.js
    │   │   ├── StyledText.js
    │   │   ├── TabBarIcon.js
    │   │   └── __tests__
    │   │       └── StyledText-test.js
    │   ├── constants
    │   │   ├── Colors.js
    │   │   ├── Layout.js
    │   │   └── Network.js
    │   ├── navigation
    │   │   ├── AppNavigator.js
    │   │   └── MainTabNavigator.js
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── screens
    │   │   ├── InboxScreen.js
    │   │   ├── LinksScreen.js
    │   │   ├── LoginScreen.js
    │   │   └── SettingsScreen.js
    │   └── utils
    │       ├── Login.js
    │       └── api
    │           └── FacebookLogin.js
    └── README.md
  ```

Remake directory tree with:
```bash
brew install tree
tree -v --charset utf-8 -I 'venv|\*.pyc|\_\_pycache\_\_|\_static|\_modules|fonts'
```
