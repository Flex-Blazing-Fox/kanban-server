# Kanban App
**How to run the server:**
 - Install packages by running : 
 ```
 $ npm install
 ```
 - Migrate db : 
 ```
 $ sequelize db:migrate
 ```
 - Setup a development server: 
 ```
 $ npm run dev
 ```

**Base URL**: <br>
http://localhost:3000

**Environment Variables** <br>
> Save your environment variable in .env file and don't forget to add .env to .gitignore. You can also change the default port in .env file.

---

## Register
Register a user and return user's id and email.
* **URL** <br>
/users/register
* **Method** <br>
`POST`
* **URL Params** <br>
None
* **Data Params** <br>
**Required:**
    ```
    {
        "email": "ari@gmail.com",
        "first_name": "ari",
        "last_name": "juanda",
        "password": "your_password",
        "organization_id": 1
    }
    ```
* **Success Response**
	* **Code:** 201 <br>
		**Content:**
        ```
        {
          "id": 1,
          "name": "Ari Juanda",
          "email": "user@gmail.com",
          "organization_id: 1
        }
        ```
* **Error Response:**
    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "err" : "Email already exists" 
      }
      ```

    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "err" : [<SequelizeValidationError>]
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      { 
        "err": "Internal server error"
      }
      ```
      
---

## Login
Login to the app.
* **URL** <br>
/users/login
* **Method** <br>
`POST`
* **URL Params** <br>
None
* **Data Params** <br>
**Required:**
    ```
    {
      "email": "ari@gmail.com",
      "password": "your_password"
    }
    ```
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhcmlAZ21haWwuY29tIiwib3JnYW5pemF0aW9uX2lkIjoxLCJpYXQiOjE2MjU5NzY3NzR9.CCjQKl7HXxf_CE-3r57QQ59xyfuwsEAmTRVPed8HqcE",
          "user": {
            "id": 1,
            "email": "ari@gmail.com",
            "organization_id": 1
          }
        }
        ```
* **Error Response:**
    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "err" : [<SequelizeValidationError>]
      }
      ```

    * **Code:** 400 <br>
      **Content:**
      ```
      { 
        "err": "Email or Password is wrong"
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "err" : "Internal server error" 
      }
      ```
      
---

## Forgot Password
Login to the app.
* **URL** <br>
/users/login
* **Method** <br>
`PUT`
* **URL Params** <br>
None
* **Data Params** <br>
**Required:**
    ```
    {
      "email": "ari@gmail.com",
      "password": "your_new_password"
    }
    ```
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "user": {
            "id": 1,
            "email": "ari@gmail.com",
            "organization_id": 1
          }
        }
        ```
* **Error Response:**
    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "err" : [<SequelizeValidationError>]
      }
      ```

    * **Code:** 404 <br>
      **Content:**
      ```
      { 
        "err": "User Not Found"
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "err" : "Internal server error" 
      }
      ```
      
---

## Add Organization
Add a new organization.
* **URL** <br>
/organizations
* **Method** <br>
`POST`
* **URL Params** <br>
None
* **Data Params** <br>
**Required:**
    ```
    {
      "name": "Tunaiku",
      "logo": "<your_organization_logo_link>"
    }
    ```
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "organization": {
            "id": 3,
            "name": "Tunaiku",
            "logo": "<your_organization_logo_link>",
            "updatedAt": "2021-07-11T04:20:18.178Z",
            "createdAt": "2021-07-11T04:20:18.178Z"
          }
        }
        ```
* **Error Response:**
    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "err" : [<SequelizeValidationError>]
      }
      ```

    * **Code:** 400 <br>
      **Content:**
      ```
      { 
        "err": "Organization already exists"
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "err" : "Internal server error" 
      }
      ```
      
---

## Get Organizations
Get a list of organizations that have been added.
* **URL** <br>
/organizations
* **Method** <br>
`GET`
* **URL Params** <br>
None
* **Data Params** <br>
None
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        [
          {
            "id": 1,
            "name": "Amarbank",
            "logo": "https://1.bp.blogspot.com/-B_Ffk_uv-SY/Wl1xGNvhIjI/AAAAAAAANkU/2dVEIQe59qgaO8KCYCeW80fQ8OTxgLsSQCLcBGAs/s1600/Bank-Amar-Logo-transparent-png.png",
            "createdAt": "2021-07-10T13:44:59.404Z",
            "updatedAt": "2021-07-10T13:44:59.404Z"
          },
          {
            "id": 3,
            "name": "Tunaiku",
            "logo": "https://1.bp.blogspot.com/-B_Ffk_uv-SY/Wl1xGNvhIjI/AAAAAAAANkU/2dVEIQe59qgaO8KCYCeW80fQ8OTxgLsSQCLcBGAs/s1600/Bank-Amar-Logo-transparent-png.png",
            "createdAt": "2021-07-11T04:20:18.178Z",
            "updatedAt": "2021-07-11T04:20:18.178Z"
          }
        ]
        ```
* **Error Response:**

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "err" : "Internal server error" 
      }
      ```
      
---

## Get an Organization
Get an organiztion from an id.
* **URL** <br>
/organizations
* **Method** <br>
`GET`
* **URL Params** <br>
id
* **Data Params** <br>
None
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "id": 1,
          "name": "Amarbank",
          "logo": "https://1.bp.blogspot.com/-B_Ffk_uv-SY/Wl1xGNvhIjI/AAAAAAAANkU/2dVEIQe59qgaO8KCYCeW80fQ8OTxgLsSQCLcBGAs/s1600/Bank-Amar-Logo-transparent-png.png",
          "createdAt": "2021-07-10T13:44:59.404Z",
          "updatedAt": "2021-07-10T13:44:59.404Z"
        }
        ```
* **Error Response:**
    * **Code:** 404 <br>
      **Content:**
      ```
      { 
        "err": "Not Found"
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "err" : "Internal server error" 
      }
      ```
      
---

## Add Category
Add a new category.
* **URL** <br>
/categories
* **Method** <br>
`POST`
* **URL Params** <br>
None
* **Data Params** <br>
**Required:**
    ```
    {
      "name": "backlog"
    }
    ```
* **Success Response**
	* **Code:** 201 <br>
		**Content:**
        ```
        {
          "category": {
            "id": 1,
            "name": "backlog",
            "updatedAt": "2021-07-11T04:24:05.838Z",
            "createdAt": "2021-07-11T04:24:05.838Z"
          }
        }
        ```
* **Error Response:**
    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "err" : [<SequelizeValidationError>]
      }
      ```

    * **Code:** 400 <br>
      **Content:**
      ```
      { 
        "err": "Category already exists"
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "err" : "Internal server error" 
      }
      ```
      
---

## Edit Category
Edit the category you have added.
* **URL** <br>
/categories
* **Method** <br>
`PUT`
* **URL Params** <br>
id
* **Data Params** <br>
**Required:**
    ```
    {
      "name": "review"
    }
    ```
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "category": {
            "id": 1,
            "name": "review",
            "updatedAt": "2021-07-11T04:24:05.838Z",
            "createdAt": "2021-07-11T04:24:05.838Z"
          }
        }
        ```
* **Error Response:**
    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "err" : [<SequelizeValidationError>]
      }
      ```

    * **Code:** 400 <br>
      **Content:**
      ```
      { 
        "err": "Category already exists"
      }
      ```

    * **Code:** 404 <br>
      **Content:**
      ```
      { 
        "err": "Not Found"
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "err" : "Internal server error" 
      }
      ```
      
---

## Get Categories
Get a list of categories available.
* **URL** <br>
/categories
* **Method** <br>
`GET`
* **URL Params** <br>
None
* **Data Params** <br>
None
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        [
          {
            "id": 5,
            "name": "backlog",
            "createdAt": "2021-07-10T16:12:43.893Z",
            "updatedAt": "2021-07-10T16:12:43.893Z"
          },
          {
            "id": 7,
            "name": "todo",
            "createdAt": "2021-07-10T16:14:51.490Z",
            "updatedAt": "2021-07-10T16:14:51.490Z"
          },
          {
            "id": 8,
            "name": "doing",
            "createdAt": "2021-07-10T16:14:54.626Z",
            "updatedAt": "2021-07-10T16:14:54.626Z"
          },
          {
            "id": 9,
            "name": "done",
            "createdAt": "2021-07-10T16:14:58.748Z",
            "updatedAt": "2021-07-10T16:14:58.748Z"
          },
          {
            "id": 10,
            "name": "reviews",
            "createdAt": "2021-07-11T04:24:05.838Z",
            "updatedAt": "2021-07-11T04:26:37.159Z"
          }
        ]
        ```
* **Error Response:**
    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "err" : "Internal server error" 
      }
      ```
      
---

## Delete Category
Delete the category you have added.
* **URL** <br>
/categories
* **Method** <br>
`DELETE`
* **URL Params** <br>
id
* **Data Params** <br>
None
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "message": "Category successfully deleted"
        }
        ```
* **Error Response:**
    * **Code:** 404 <br>
      **Content:**
      ```
      { 
        "err": "Not Found"
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "err" : "Internal server error" 
      }
      ```
      
---

## Add Task
Add a new task.
* **URL** <br>
/tasks
* **Method** <br>
`POST`
* **URL Params** <br>
None
* **Data Params** <br>
**Required:** <br>
Headers: `access_token`
    ```
    {
      "title": "Create user controller",
      "category_id": "5",
      "organization_id": "1",
      "user_id": "1"
    }
    ```
* **Success Response**
	* **Code:** 201 <br>
		**Content:**
        ```
        {
          "task": {
            "id": 35,
            "title": "login feature",
            "category_id": 5,
            "user_id": 1,
            "organization_id": 1,
            "updatedAt": "2021-07-11T04:32:59.854Z",
            "createdAt": "2021-07-11T04:32:59.854Z"
          }
        }
        ```
* **Error Response:**
    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "err" : [<SequelizeValidationError>]
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "err" : "Internal server error" 
      }
      ```
      
---

## Edit Task
Edit the Task you have added.
* **URL** <br>
/tasks
* **Method** <br>
`PUT`
* **URL Params** <br>
id
* **Data Params** <br>
**Required:**<br>
Headers: `access_token`
    ```
    {
      "title": "Create task controller",
      "category_id": "7",
      "organization_id": "1",
      "user_id": "1"
    }
    ```
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "task": {
            "id": 35,
            "title": "register feature",
            "category_id": 7,
            "user_id": 1,
            "organization_id": 1,
            "createdAt": "2021-07-11T04:32:59.854Z",
            "updatedAt": "2021-07-11T04:35:11.963Z"
          }
        }
        ```
* **Error Response:**
    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "err" : [<SequelizeValidationError>]
      }
      ```

    * **Code:** 404 <br>
      **Content:**
      ```
      { 
        "err": "Not Found"
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "err" : "Internal server error" 
      }
      ```
      
---

## Update Task Category
Edit the task category.
* **URL** <br>
/tasks
* **Method** <br>
`PATCH`
* **URL Params** <br>
id
* **Data Params** <br>
**Required:**<br>
Headers: `access_token`
    ```
    {
      "category_id": "8"
    }
    ```
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "task": {
            "id": 1,
            "title": "register feature",
            "category_id": 8,
            "user_id": 1,
            "organization_id": 1,
            "createdAt": "2021-07-10T17:22:25.204Z",
            "updatedAt": "2021-07-11T04:41:18.063Z"
          }
        }
        ```
* **Error Response:**
    * **Code:** 400 <br>
      **Content:**
      ```
      {
        "err" : [<SequelizeValidationError>]
      }
      ```

    * **Code:** 404 <br>
      **Content:**
      ```
      { 
        "err": "Not Found"
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "err" : "Internal server error" 
      }
      ```
      
---

## Get Tasks
Get a list of tasks available.
* **URL** <br>
/tasks
* **Method** <br>
`GET`
* **URL Params** <br>
None
* **Data Params** <br>
Headers: `access_token`
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        [
          {
            "id": 3,
            "title": "login feature",
            "category_id": 5,
            "user_id": 1,
            "organization_id": 1,
            "createdAt": "2021-07-10T17:31:39.509Z",
            "updatedAt": "2021-07-10T17:31:39.509Z",
            "Category": {
              "id": 5,
              "name": "backlog",
              "createdAt": "2021-07-10T16:12:43.893Z",
              "updatedAt": "2021-07-10T16:12:43.893Z"
            }
          },
          {
            "id": 1,
            "title": "register feature",
            "category_id": 8,
            "user_id": 1,
            "organization_id": 1,
            "createdAt": "2021-07-10T17:22:25.204Z",
            "updatedAt": "2021-07-11T04:41:18.063Z",
            "Category": {
              "id": 8,
              "name": "doing",
              "createdAt": "2021-07-10T16:14:54.626Z",
              "updatedAt": "2021-07-10T16:14:54.626Z"
            }
          }
        ]
        ```
* **Error Response:**
    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "err" : "Internal server error" 
      }
      ```
      
---

## Delete Task
Delete the task you have added.
* **URL** <br>
/tasks
* **Method** <br>
`DELETE`
* **URL Params** <br>
id
* **Data Params** <br>
Headers: `access_token`
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "message": "Task successfully deleted"
        }
        ```
* **Error Response:**
    * **Code:** 404 <br>
      **Content:**
      ```
      { 
        "err": "Not Found"
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      {
        "err" : "Internal server error" 
      }
      ```
      
---
