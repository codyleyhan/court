# Court Frontend (iOS-Only Currently)
Court iOS currently uses Expo to serve the app. This means that for testing, we can run a local Expo server which handles bundling the JS and serving directly to your phone.

## Getting Started

First, you will need to install Expo CLI tools.
To do this, ensure you have npm installed, then run:
```bash
npm install expo-cli --global
```
Now go into the git-managed directory:
```bash
cd frontend/Court-iOS
```
*Note*: if this is your first time running, you may need to install Court's dependencies first by running:
```bash
npm install
```
## Running Expo Server
To run the expo server, simply run:
```bash
expo start
```
From here, the JS will be compiled and ready to serve
## Running the app on your device
Expo allows us to run a live-compiled version of our app.

First, install the `Expo Client` app from the app store.

Then once you have the app installed, simply scan the generated QR code from the `Running Expo Server` step from your iPhone's camera, and click the `Open in Expo` prompt. 
From here, you should see the JS bundle being loaded, and finally you'll load into the app.