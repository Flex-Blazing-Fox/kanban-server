# Fancy Todo

## Usage

- ### Development Version
    The resource for already deployed production version is https://kanban-server-rangga.herokuapp.com. 

- ### Development Version
    The resource for already deployed development version is https://kanban-server-staging.herokuapp.com. 

- ### Sandbox Version
    If you want to play with the sandbox or contributing, the steps are:
    1. Clone the repo from `git@github.com:ranggarppb/kanban-server.git`
    2. Edit the .env-template to make your own environment variable and rename the file from `.env-template` to `.env`
    3. Run `npm run dev` in your terminal if you want to try basic CRUD functionality and try hitting the endpoints below with the main resource is `http://localhost:3000` (you can use test.http file if you dont want to move to Postman or terminal)
    4. Run `bash start.sh` in your terminal if you want to run all available applications (including multiple websockets server, NGINX load balancer, and Redis In Memory Database)
    4. We have **pre-commit** hook to automatically do **unit testing** before doing commit so make sure they are all passed
    5. Making **Pull Request** to dev and master branches also will trigger the **Github CI Workflow** and **Heroku kanban-server pipeline CD** so all Pull Request must be verified first

## Endpoints
The resource for the endpoint is https://fancy-todo-dev.herokuapp.com or http://localhost:3000. You can use either Postman, curl, or REST API Client

<img src=https://img.shields.io/badge/POST-%2Fuser%2Fregister-blueviolet width=162.5/>

Registering your email and password
- ### Request Body
    ```javascript
    {
        "email": "user6@gmail.com",
        "password": "user6"
    }
    ```
- ### Response Example
    ```
    {
        "id": 4,
        "email": "user6@gmail.com",
        "password": "$2b$10$JC7p4S6bZj.dtnHKMkGspOMn4ojnC5QU.CT3ApT7pr7v3g4ZroYOa",
        "updatedAt": "2021-06-28T12:04:30.390Z",
        "createdAt": "2021-06-28T12:04:30.390Z"
    }
    ```
- ### Errors
    - #### Registering already used email
        ```
        {
            "error": [
                "Email is not unique"
            ]
        }
        ```
    - #### Registering invalid email
        ```
        {
            "error": [
                "Validation isEmail on email failed"
            ]
        }
        ```
    - #### Registering empty email or password
        ```
        {
            "error": [
                "Validation notEmpty on email failed",
                "Validation isEmail on email failed"
            ]
        }
        ```

<img src=https://img.shields.io/badge/POST-%2Fuser%2Flogin-blueviolet width=143>

Login your email and password
- ### Request Body
    ```javascript
    {
        "email": "user1@gmail.com",
        "password": "user1"
    }
    ```
- ### Response Example
    ```javascript
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0ODgyMzE3fQ.Smeq6lZPxFWHOaBtX3Q3tMP1wbxCZX5QDyGauoai5L0"
    }
    ```
- ### Errors
    - #### Login with wrong email or password
        ```
        {
            "error": [
                "Email or password combination can't be found. If you're authenticating by Github, make sure that you have public email."
            ]
        }
        ```


The access_token will be used for create, put, patch, and delete

<img src=https://img.shields.io/badge/GET-%2Ftask-blue width=99>

Get all todo list that you've made 
-   ### Request Header
    ```javascript
    {
        access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0ODgyMzE3fQ.Smeq6lZPxFWHOaBtX3Q3tMP1wbxCZX5QDyGauoai5L0
    }
    ```
-   ### Response Example
    ```javascript
    [
        {
            "id": 1,
            "user_id": 1,
            "title": "Example Title 1",
            "description": "Example Description 1",
            "priority": "high",
            "category": "backlog",
            "due_date": "2021-08-31T02:00:00.000Z",
            "createdAt": "2021-07-12T17:14:16.157Z",
            "updatedAt": "2021-07-12T17:14:16.157Z"
        },
        {
            "id": 2,
            "user_id": 1,
            "title": "Example Title 2",
            "description": "Example Description 2",
            "priority": "medium",
            "category": "todo",
            "due_date": "2021-08-30T12:00:00.000Z",
            "createdAt": "2021-07-12T17:14:16.157Z",
            "updatedAt": "2021-07-12T17:14:16.157Z"
        },
        {
            "id": 3,
            "user_id": 2,
            "title": "Example Title 3",
            "description": "Example Description 3",
            "priority": "high",
            "category": "in progress",
            "due_date": "2021-07-30T12:00:00.000Z",
            "createdAt": "2021-07-12T17:14:16.157Z",
            "updatedAt": "2021-07-12T17:14:16.157Z"
        }
    ]
    ```
- ### Errors
    - #### Get all tasks without token
        ```
        {
            "error": [
                "Token is not exist or invalid token"
            ]
        }
        ```

<img src=https://img.shields.io/badge/GET-%2Ftask%2F%3Aid-blue width=119>

Get todo with certain id
- ### Request Parameter
    The parameter for this API is `{id}`. For example we use `id = 2` for `user1@gmail.com`
- ### Request Header
    ```javascript
    {
        access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0ODgyMzE3fQ.Smeq6lZPxFWHOaBtX3Q3tMP1wbxCZX5QDyGauoai5L0
    }
    ```
- ### Response Example
    ```javascript
    {
        "id": 2,
        "user_id": 1,
        "title": "Example Title 2",
        "description": "Example Description 2",
        "priority": "medium",
        "category": "todo",
        "due_date": "2021-08-30T12:00:00.000Z",
        "createdAt": "2021-07-12T17:14:16.157Z",
        "updatedAt": "2021-07-12T17:14:16.157Z"
    }
    ```
- ### Errors
    - #### Get certain task without token
        ```
        {
            "error": [
                "Token is not exist or invalid token"
            ]
        }
        ```

<img src=https://img.shields.io/badge/POST-%2Ftask-blue width=101.5>

Make new todo
- ### Request Header
    ```javascript
    {
        access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0ODgyMzE3fQ.Smeq6lZPxFWHOaBtX3Q3tMP1wbxCZX5QDyGauoai5L0
    }
    ```
- ### Request Body
    ```javascript
    {
        "title": "Example Title",
        "description": "Example Description",
        "status": "to execute",
        "due_date": "2021-07-03 12:00:00"
    }
    ```
- ### Response Example
    ```javascript
    {
        "id": 4,
        "title": "Example Title",
        "description": "Example Description",
        "status": "to execute",
        "due_date": "2021-07-03T12:00:00.000Z",
        "user_id": 1,
        "updatedAt": "2021-06-28T12:30:00.014Z",
        "createdAt": "2021-06-28T12:30:00.014Z"
    }
    ```
- ### Errors
    - #### Make task with invalid datetime format or empty datetime
        ```
        {
            "error": [
                "Input the date and time format string (YYYY-MM-DD hh:mm:ss)",
                "Validation notEmpty on due_date failed"
            ]
        }
        ```
    - #### Make task with duedate less than current timestamp
        ```
        {
            "error": [
                "Due datetime can't be less than current datetime"
            ]
        }
        ```
    - #### Make task with category and priority not in the list (category: backlog, todo, in progress, done; priority: high, medium, low)
        ```
        {
            "error": [
                "Validation isIn on category failed"
            ]
        }
        ```

<img src=https://img.shields.io/badge/PUT-%2Ftask%2F%3Aid-blue width=122>

Updating the todo record
- ### Request Parameter
    The parameter for this API is `{id}`. For example we use `id = 2` for `user1@gmail.com`
- ### Request Header
    ```javascript
    {
        access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0ODgyMzE3fQ.Smeq6lZPxFWHOaBtX3Q3tMP1wbxCZX5QDyGauoai5L0
    }
    ```
- ### Request Body
    ```javascript
    {
        "title": "Example Title 3",
        "description": "Example Desc 3",
        "priority": "medium",
        "category": "todo",
        "due_date": "2021-07-30 00:00:00"
    }
    ```
- ### Response Body
    ```javascript
    {
        "id": 2,
        "user_id": 1,
        "title": "Example Title 3",
        "description": "Example Desc 3",
        "priority": "medium",
        "category": "todo",
        "due_date": "2021-07-30T00:00:00.000Z",
        "createdAt": "2021-07-12T17:14:16.157Z",
        "updatedAt": "2021-07-14T13:48:04.582Z"
    }
    ```
- ### Errors
    - #### Update certain task's record without token
        ```
        {
        "error": [
            "Task with id 2 is not found / authorized"
        ]
        }
        ```
    - #### Including all other errors from POST /task 

<img src=https://img.shields.io/badge/PATCH-%2Ftask%2F%3Aid-blue width=140>

Updating the todo's value
- ### Request Parameter
    The parameter for this API is `{id}`. For example we use `id = 1` for `user1@gmail.com`
- ### Request Header
    ```javascript
    {
        access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0ODgyMzE3fQ.Smeq6lZPxFWHOaBtX3Q3tMP1wbxCZX5QDyGauoai5L0
    }
    ```
- ### Request Body
    ```javascript
    {
        "due_date": "2021-08-31 00:00:00"
    }
    ```
- ### Response Example
    ```javascript
    {
        "id": 2,
        "user_id": 1,
        "title": "Example Title 2",
        "description": "Example Description 2",
        "priority": "medium",
        "category": "todo",
        "due_date": "2021-08-30T00:00:00.000Z",
        "createdAt": "2021-07-12T17:14:16.157Z",
        "updatedAt": "2021-07-14T13:45:46.549Z"
    }
    ```
- ### Errors
    - #### Update certain task's value without token
        ```
        {
        "error": [
            "Task with id 2 is not found / authorized"
        ]
        }
        ```
    - #### Including all other errors from POST /task 

<img src=https://img.shields.io/badge/DELETE-%2Ftask%2F%3Aid-blue width=145>

Delete a todo record
- ### Request Parameter
    The parameter for this API is `{id}`. For example we use `id = 2` for `user1@gmail.com`
- ### Request Header
    ```javascript
    {
        access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0ODgyMzE3fQ.Smeq6lZPxFWHOaBtX3Q3tMP1wbxCZX5QDyGauoai5L0
    }
    ```
- ### Response Example
    ```javascript
    {
        "message": "Record with id 2 successfully deleted"
    }
    ```
- ### Errors
    - #### Update certain task's value without token
        ```
        {
        "error": [
            "Task with id 2 is not found / authorized"
        ]
        }
