## Running from command line
To run all tests from the court/backend/test directory:
```bash
make test
```

# Test Description

For backend testing, we are utilizing the pytest library as a testing framework to provide a higher level of abstraction as well as useful helper functions to help with testing.  This allows us to utilize factories to create a clean application state for each test through pytest's fixture pattern.

We have created tests for  the following user scenarios using either integration or unit tests, testing both the common cases and the exceptional cases for each client use case. 

## Test Oracles

### User authentication:

The client should be able to create a new account through facebook when passing a valid facebook access token.  The expected result from the backend API should be a JSON response containing a JWT authentication token as well as the created user with a HTTP status code of 200 OK.

The  client should be able to login to an account through facebook when passing a valid facebook access token.  The expected result should be a JSON response with a JWT authentication token as well as the user that has been stored with a HTTP status code of 200 OK.

As an exceptional case we tested the case when a bad facebook access token is passed to the API.  The expected result should be a JSON response containing the error with no JWT authentication token returned and a HTTP status code of 401 Unauthorized.

### Getting chat thread information:

The client should be able to get all chat threads associated with the logged in user.  The expected result from the backend API should be a JSON response containing an array of chat thread objects as well as the users involved in that chat thread with a HTTP status code of 200 OK.

The client should be able to get paginated messages for a chat that the current user is a part of.  The expected result from the backend API should be a JSON response containing an array of messages associated with that chat thread with a HTTP status code of 200OK.  As a client I should also be able to fetch older messages as well as newer messages through the pagination mechanism.

The client should not be able to get messages for a chat thread that the current user is not a part of.  The expected result should be a JSON response containing the error with no messages and a HTTP status code of 401 Unauthorized.

### Real time chat streams:

The client should be able to subscribe to a stream of messages for a thread the user is a part of.  The expected result from the API should be an event notification saying the client is connected to the websocket and then if a message is added to a thread, the client should receive that message as well in real time.

The client should be able to add a message to the real time chat thread.  The expected result from the API should be an event notification emitted to everyone connected to the thread indicating the new message with the new message data.

The client should not be able to subscribe to chat threads that they are not a part of.  The expected result from the API should be an error notification indicating that the user is not authorized.
