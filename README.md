# Arqiv

## Description
An App that allows you to create a personal collection
of 3D-Models of museum exhibits.
For collection the app uses NFC technology.
The server application where the 3D-Models and collections
of users are stored is https://github.com/simonbiwer/arqiv-backend

## Start application

- Install dependencies `npm install`
- Start server application `arqiv-backend` (https://github.com/simonbiwer/arqiv-backend)
- If needed adjust `localhostIP` and `port` in [constants](src/constants.ts)
- Start the application with `expo start` (to show the app in the browser use `--web`)

## Tech-Stack
- React-Native
- Expo
- three.js