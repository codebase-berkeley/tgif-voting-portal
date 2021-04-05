# tgif-voting-portal
Spring 2021 TGIF Mentored Project

## Setup
- clone the repository
- run `yarn install` in the root, client, and server folders
  - if there are new plugins, re-run `yarn install` in the folders

Easiest way to start locally
- run  `yarn dev` in the root folder. This will concurrently start the client (react app), express server, and rebuild/start the database (drop the database and recreate it). Ouput of the three applications will be merged and printed in the same terminal tab.

- [Optional] to interact with our db and run sql commands in terminal on the fly, open a new terminal window and run `psql tgif` (doesn't have to be run in any specific folder)

Starting each application separately
- run `yarn start` in the client folder to start the react app in localhost
- run `yarn server` in the server folder to start the express server in localhost
- run `yarn db` in root directory to rebuild + start the database. This will also let you run sql commands and interact with our db directly in this terminal window

## Ports Used
- React client: localhost:3000
- Express server: localhost:8000
- Postgres DB: localhost:5432
