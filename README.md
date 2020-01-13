# React Blog Backend

Want to take a peek at our deployed project? Check it out here: 

## Team
|                                       [Ogwuru Johnson](https://github.com/ogwurujohnson)                                        |                                       [Uzoamaka Anyanwu](https://github.com/Uzoamaka126)                                        |                                       [Damilola Wumi](https://github.com/Damilolawumi)                                        |                                       [David Kuseh](https://github.com/davidkuseh)                                        |                                       [Megan Ennis](https://github.com/Megan0145)                                        |                            
| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
|                      [<img src="https://avatars1.githubusercontent.com/u/14821816?s=400&v=4" width = "200" />](https://github.com/ogwurujohnson)                       |                      [<img src="https://avatars.githubusercontent.com/Uzoamaka126" width = "200" />](https://github.com/Uzoamaka126)                       |                      [<img src="https://avatars.githubusercontent.com/Damilolawumi" width = "200" />](https://github.com/Damilolawumi)                       |                      [<img src="https://avatars.githubusercontent.com/davidkuseh" width = "200" />](https://github.com/davidkuseh)                       |                      [<img src="https://avatars.githubusercontent.com/Megan0145" width = "200" />](https://github.com/Megan0145)                       |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/ogwurujohnson)                 |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Uzoamaka126)             |           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Damilolawumi)            |          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/davidkuseh)           |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Megan0145)             |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) |
|                                       [__Francis Bulus__](https://github.com/fosterferret)                                        |                                                             |
|                      [<img src="https://avatars.githubusercontent.com/fosterferret" width = "200" />](https://github.com/fosterferret)                       |                      
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/fosterferret)                 |            

## Project Overview
[Trello Board](https://trello.com/b/HsuE5rL4/react-blog) <br>
[Product Canvas](https://www.notion.so/EU3-React-Blog-4641325fe0384a70948b802b87c0d6f3) <br>
[UX Design files](https://www.figma.com/file/Y4hxd9F1DLn2FkiExRYudV/avocadosandbox?node-id=1%3A3) <br>

Experience readers reactions/insights into your articles/blog posts as a writer to help you make better writing decisions. Have a more granular engagement platform for as a writer. Enjoy the content of your favourite writers and react appropirately whenever and whever you want.

### Key Features
-    users can react with emojis, highlights and comments on all or several parts of any content they read.
-    users can see all the reactions to their articles.
-    for every shoutout, comment or reaction to shoutout users get to see a stat on it.
-    users can see how many bravos they have in their wallet in Slack
-    users can see their Slack workspace leaderboard in Slack

## Tech Stack
#### [Back end](https://github.com/orgs/LABS-EU3/teams/react_blog built using:
-    _NodeJS (Express)_
-    _PostgreSQL_
# APIs
- CUSTOM BUILT REST API
- SENDGRID (For email notifications and newsletter subscriptions)
- Pusher (For realtime notifications)
- AWS SDK

# Environment Variables
For the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_REGION=
    DB_ENV=development
    PORT=5000
    DATABASE_URL=
    SECRET=
    SENDGRID_API_KEY=
    CLIENT_URL


    ## Project Files Structure

:rocket: data directory

- [x] migrations directory
- [x] models directory
- [x] seeds directory
- [x] dbConfig.js file

:rocket: routes directory

- [x] _tests_ directory
- [x] utils directory
- [x] articles.js
- [x] auths.js
- [x] index.js

:rocket: services directory

- [x] articles.js
- [x] auths.js
- [x] index.js

## Coding styles and conventions

:heavy_check_mark: Folders, files and variables naming based on the functions they perform

- Camel Case `eg: articles, getArticles`

:heavy_check_mark: Constants and env variables naming

- Snake Case (All Caps) `eg: SECRET, DATABASE_URL`

:heavy_check_mark: Asynchronous Operations method

- async-await method

## NPM Commands and Descriptions

| Command            | Description                                                       |
| -------------------| ----------------------------------------------------------------- |
| `npm run server`   | Starts the server in hot-reload mode for development              |
| `npm test`         | Runs the project test suite                                       |
| `npm start`        | Starts the app server in dev, staging and production environments |
| `npm migration`    | Runs latest migrations for production                             |
| `npm dev-migration`| Runs latest migrations for development                            |
| `npm test-watch`   | Runs the project test watcher suite                               |
| `npm coverage`     | Reports coverage                                                  |

### Prettier Setup for VS Code

- Install the VS-Code extension below;

  - [x] Name: Prettier - Code formatter
  - [x] Id: esbenp.prettier-vscode
  - [x] Description: VS Code plugin for prettier/prettier
  - [x] Version: 1.9.0
  - [x] Publisher: Esben Petersen
  - [x] VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

- Head over to the VS-Code settings and search for prettier

- Locate and tick the checkbox under `Prettier: Eslint Integration` section... You good to go! :sunglasses:

[![Build Status](https://travis-ci.com/LABS-EU3/react_blog_backend.svg?branch=dev)](https://travis-ci.com/LABS-EU3/react_blog_backend)


# Contributing
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change
## Issue/Bug Request
   
 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests
We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests
If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.
Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines
- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Documentation
See [Frontend Documentation](https://github.com/bravolabs/react_blog_frontend/blob/develop/README.md) for details on the frontend of our project.

### Attribution
These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).
