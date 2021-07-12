# Kanban
---
### Inital Setup
```
npm install
```

### Database Setup
```
sequelize db:migrate
```

### Run Application
```
npm run dev
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
            "id": 11,
            "title": "q",
            "category": "q",
            "userId": 1,
            "createdAt": "2021-07-12T09:09:32.813Z",
            "updatedAt": "2021-07-12T09:09:32.813Z"
        }
    ]
    ```
- **Error Respon**
    - Code: 500

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
    title|Write Base Code
    category | Doing
- **Success Respon**
    - Code: 201
    ```json
    {
        "id": 11,
        "title": "q",
        "category": "q",
        "userId": 1
    }
    ```
- **Error Respon**
    - Code: 500

## User API

### **POST / User Register**

- **URL**

    ```
    /register
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
    /login
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
        "message": "Success",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0ODkwOTUyfQ.Gxh1bvB2tN9k80_Jlc6AAwxZv0SMxs5PYC66wSPeM9U"
    }
    ```
- Success Response :
    - Code : 400