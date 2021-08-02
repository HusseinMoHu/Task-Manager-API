# Task Manager RESTful API
Task manager application built using **NODE JS** and **MongoDB**. It follows a **RESTFul API** design architecture. The app sends an email notification upon registration and deactivation of the user's account. It's richly built with a simple scientific technique and best practices in the world of **API** design.

## Features

- Sign-Up and Login
- Create, Read, Update, and Delete Users
- Create, Read, Update, and Delete Tasks
- Email sent on creating and deleting account
- Logout individual device and Logout from all devices
- Authentication and Security
- Sorting, Pagination, and Filtering
- Upload profile picture, convert large images to PNG and Resize it before sending to Database
- When a user is deleted, the tasks associated with it are also deleted
- Test cases for verify the complete functionality of the application

## Getting started
To get the Node server running locally:
- create .env with the following code (update credentials). Make sure to create .env in the root directory of the project. config/dev.env & config/test.env

- For dev environment
```
PORT=3000
MONGODB_URL=<--YOUR_URL-->/task-manager-api
SENDGRID_API_KEY=<--YOUR_API_KRY-->
JWT_SECRET=<set_you_secret>
```
- For testing environment
```
PORT=3000
MONGODB_URL=<--YOUR_URL-->/task-manager-api-test
SENDGRID_API_KEY=<--YOUR_API_KRY-->
JWT_SECRET=<set_you_secret>
```

- ``npm install`` to install all required dependencies
- ``npm start`` to start the local server
- ``npm run dev`` to start the local server in dev mode
- ``npm test`` to fire test cases



IT run your application on http://localhost:3000/

## Hosted Domain Link

[Task Manager API](https://hussien-task-manager.herokuapp.com/)

## Postman Collection Link For Both Local and Production Environment

[Task Manager API Shared Collection](https://www.getpostman.com/collections/4c2667002b265a5744ca)


## API Endpoints

| Methods | Endpoints                          | Access  | Description                              |
| ------- | ---------------------------------- | ------- | ---------------------------------------- |
| POST    | /users                             | Public  | Sign up                                  |
| POST    | /users/login                       | Public  | Login                                    |
| POST    | /users/logout                      | Private | Logout an account                        |
| POST    | /users/logoutAll                   | Private | Logout all accounts                      |
| POST    | /tasks                             | Private | Create a Task                            |
| GET     | /users/me                          | Private | User's Profile                           |
| PATCH   | /users/me                          | Private | Update Profile                           |
| POST    | /users/me/avatar                   | Private | Upload Profile Picture                   |
| GET     | /users/userID/avataar              | Private | View Profile Picture                     |
| DELETE  | /users/me/avatar                   | Private | Delete Profile Picture                   |
| DELETE  | /users/me                          | Private | Delete Account                           |
| GET     | /tasks/taskID                      | Private | View a Task                              |
| GET     | /tasks                             | Private | View all Tasks                           |
| GET     | /tasks?completed=true              | Private | Limit the result to completed tasks      |
| GET     | /tasks?completed=false             | Private | Limit the result to uncompleted tasks    |
| GET     | /tasks?limit=2                     | Private | Limit the result to 2                    |
| GET     | /tasks?skip=3                      | Private | Paginating result                        |
| GET     | /tasks?sortBy=createdAt_desc       | Private | Sort by Descending order of created date |
| GET     | /tasks?sortBy=createdAt_asc        | Private | Sort by Ascending order of created date  |
| PATCH   | /tasks/taskID                      | Private | Update a Task                            |
| DELETE  | /tasks/taskID                      | Private | Delete a Task                            |

## NPM Packages That Used in The Project

### Dependencies
- **@sendgrid/mail** Email sent on creating and deleting account
- **bcryptjs** Hashing passwords before sending to Database
- **express** Node.js Framework
- **jsonwebtoken** Create and verify Tokens for Authentication and Authorization 
- **mongodb** NoSQL Database
- **mongoose** is an Object Modeling Tool for MongoDB
- **multer** Upload user profile picture, it's middleware for handling multipart/form-data
- **sharp** convert large images in common formats and Resize it before sending to server
- **validator** A library of string validators and sanitizers.

### devDependencies
- **env-cmd** Executing commands using an environment from an .env file
- **jest** Testing Framework
- **nodemon** Automatically restarting the node application when file changes
- **supertest** HTTP assertions for test cases


