# Court

[![Build Status](https://travis-ci.org/codyleyhan/court.svg?branch=master)](https://travis-ci.org/codyleyhan/court)

## Directory Structure
### Backend
#### Docs
```bash
/docs
```
#### Initialization/Config
```bash
/backend
```
#### Tests
```bash
/backend/tests
```
#### Database Files
```bash
/backend/court
```
#### Chat and Thread Views, API Declarations
```bash
/backend/court/chats
/backend/court/threads
```
### Frontend
#### Docs
```bash
/frontend/docs
```
#### App Root
```bash
/frontend/Court-iOS
```
#### Utilities
```bash
/frontend/Court-iOS/utils
```
#### Screens
```bash
/frontend/Court-iOS/screens
```
#### Navigation
```bash
/frontend/Court-iOS/navigation
```
#### React Components
```bash
/frontend/Court-iOS/components
```
#### Component Snapshot Tests
```bash
/frontend/Court-iOS/components/__tests__
```
#### Images
```bash
/frontend/Court-iOS/assets
```
## Generating a directory tree

You can automatically generate a text tree of the directory structure by running the following:
```bash
brew install tree
tree -v --charset utf-8 -I 'venv|\*.pyc|\_\_pycache\_\_|\_static|\_modules|fonts'
```
