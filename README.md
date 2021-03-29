# tgif-voting-portal
Spring 2021 TGIF Mentored Project

## Setup
- clone the repository
- run `yarn install` in the root, client, and server folders
  - if there are new plugins, re-run `yarn install` in the folders

Easiest way to start locally
- run  `yarn dev` in the root folder. This will concurrently start the client (react app), express server, and rebuild/start the database (drop the database and recreate it). Ouput of the three applications will be merged and printed in the same terminal tab.


Starting each application separately
- run `yarn start` in the client folder to start the react app in localhost
- run `yarn server` in the server folder to start the express server in localhost
- run `yarn db` in root directory to rebuild + start the database