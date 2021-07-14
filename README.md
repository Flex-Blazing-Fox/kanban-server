# Kanban
---
### Inital Setup
```
$ npm install
```

### Database Setup
```
$ sequelize db:migrate
```

### Run Application
```
$ npm run dev
```

### Base URL :
```
http://127.0.0.1:3000
```

## Kanban API

### **GET / Show All Task**

- **URL**
    ```
    /tasks
    ```
- **Method**
    ```
    GET
    ```
- **URL Params**
    ```
    none
    ```
- **Success Respon**
    - Code: 200
        ```json
        [
            {
                "id": 1,
                "title": "Example Task",
                "category": "backlog",
                "userId": 1,
                "createdAt": "2021-07-14T10:03:29.256Z",
                "updatedAt": "2021-07-14T10:03:29.256Z"
            },
            {
                "id": 2,
                "title": "Example Task 2",
                "category": "doing",
                "userId": 1,
                "createdAt": "2021-07-14T10:04:41.184Z",
                "updatedAt": "2021-07-14T10:04:41.184Z"
            }
        ]
        ```
- **Error Respon**
    - Code: 500

### **GET / Get Task By Id**

- **URL**
    ```
    /tasks
    ```
- **Method**
    ```
    GET
    ```
- **URL Params**
    ```
    id
    ```
- **Success Respon**
    - Code: 200
        ```json
        {
            "id": 12,
            "title": "Example Task",
            "category": "backlog",
            "userId": 1
        }
        ```
- **Error Respon**
    - Code: 404
        ```json
        [
            {
                "message": "Tak Not Found"
            }
        ]
        ```

### **POST / Add New Task**

- **URL**
    ```
    /tasks
    ```
- **Method**
    ```
    POST
    ```
- **URL Params**
    ```
    none
    ```
- **Body** urlencoded

    Key | Value
    ----|-------
    title|Example Task
    category | backlog
- **Success Respon**
    - Code: 201
        ```json
        {
            "id": 1,
            "title": "Example Task",
            "category": "backlog",
            "userId": 1
        }
        ```
- **Error Respon**
    - Code: 400
        ```json
        [
            {
                "message": "Title Tidak boleh kosong"
            }
        ]
        ```
        ```json
        [
            {
                "message": "Category Tidak boleh kosong"
            }
        ]
        ```
### **PUT / Update Task**

- **URL**
    ```
    /tasks
    ```
- **Method**
    ```
    PUT
    ```
- **URL Params**
    ```
    id
    ```
- **Body** urlencoded

    Key | Value
    ----|-------
    title|Example Task 2 Edit
    category | done
- **Success Respon**
    - Code: 201
        ```json
        {
            "id": 2,
            "title": "Example Task 2 Edit",
            "category": "done",
            "userId": 1,
            "createdAt": "2021-07-14T10:04:41.184Z",
            "updatedAt": "2021-07-14T10:10:27.185Z"
        }
        ```
- **Error Respon**
    - Code: 400
        ```json
        [
            {
                "message": "Title Tidak boleh kosong"
            }
        ]
        ```
        ```json
        [
            {
                "message": "Category Tidak boleh kosong"
            }
        ]
        ```
### **PATCH / Update Category By Id**

- **URL**
    ```
    /tasks
    ```
- **Method**
    ```
    PATCH
    ```
- **URL Params**
    ```
    id
    ```
- **Body** urlencoded

    Key | Value
    ----|-------
    category | doing
- **Success Respon**
    - Code: 201
        ```json
        {
            "id": 2,
            "title": "Example Task 2 Edit",
            "category": "doing",
            "userId": 1,
            "createdAt": "2021-07-14T10:04:41.184Z",
            "updatedAt": "2021-07-14T10:14:18.249Z"
        }
        ```
- **Error Respon**
    - Code: 400
        ```json
        [
            {
                "message": "Category Tidak boleh kosong"
            }
        ]
        ```
### **DELETE / Delete Task**

- **URL**
    ```
    /tasks
    ```
- **Method**
    ```
    DELETE
    ```
- **URL Params**
    ```
    id
    ```
- **Success Respon**
    - Code: 200
        ```json
        {
            "message": "Tasks Successfully Deleted"
        }
        ```
- **Error Respon**
    - Code: 404
        ```json
        [
            {
                "message": "Tak Not Found"
            }
        ]
        ```

## User API
---

### **POST / User Register**

- **URL**

    ```
    /users/register
    ```

- **Method**

    ```
    POST
    ```

- **URL Params**
    ```
    none
    ```
- **Body** urlencoded

    
    Key         | Value 
    ----------- |------
    email       | budi@mail.com
    password    | 123456

    
- Success Response :
    - Code : 201

        ```json
        {
            "message": "Pendaftaran Berhasil"
        }
        ```

- Error Response Code :

    -  Code: 400
    
    - Email Sudah Terdaftar
        ```json
        [
            {
                "message": "Email telah terdaftar"
            }
        ]
        ```
    - Email Sudah Kosong
        ```json
        [
            {
                "message": "Email Tidak Boleh Kosong"
            }
        ]
        ```
    - password Kurang dari 6 karakter
        ```json
        [
            {
                "message": "Password minimal 6 karkter"
            }
        ]
        ```
    - password kosong
        ```json
        [
            {
                "message": "Password Tidak Boleh Kosong"
            }
        ]
        ```
### **POST / User Login**

- **URL**

    ```
    /users/login
    ```

- **Method**

    ```
    POST
    ```

- **URL Params**
    ```
    none
    ```
- **Body** urlencoded

    
    Key         | Value 
    ----------- |------
    email       | budi@mail.com
    password    | 123456

    
- Success Response :
    - Code : 200
        ```json
        {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6MSwiaWF0IjoxNjI2MTg2MDI3fQ.kWjGtwmY0RsgdVQFz5J5i5DSSb8ptWf5rDpMfTb0rWs"
        }
        ```
- Success Response :
    - Code : 401
        ```json
        [
            {
                "message": "Login Failed"
            }
        ]
        ```