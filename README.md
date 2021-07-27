# Fancytask-Server

***Getting Started for Server Side Development Level***

* _Edit file `env-template` menjadi `.env`._
* _Pada file `.env` tersebut isi sesuai kebutuhan / database._
* _`JWT_KEY` yaitu signature untuk generate token._
* _`DB_USERNAME` yaitu username database._
* _`DB_Password` yaitu Password database._
* _Setelah itu jalankan `sequelize db:migrate` untuk migrasi ke database._
* _Jalankan `nodemon app.js` untuk menjalankan aplikasi._

## Available Endpoint
_Users_

* `POST /register`
* `POST /login`

_Tasks_

* `POST /tasks`
* `GET /tasks`
* `PUT /tasks/:id`
* `PATCH /tasks/:id`
* `DELETE /tasks/:id`

## RESTful Endpoint

### Add User
> Menambahkan user baru

* _URL_

  ```
  /register
  ```

* _Method_

  ```
  POST
  ```

* _URL Params_

  ```
  None
  ```

* _Data Params_

  ```
  {
    "Email": req.body.Email,
    "Password": req.body.Password
  }
  ```

* _Response_

  **Code 201**

  Jika request berhasil

  ```
  {
    "id": req.body.id,
    "Email": req.body.Email,
  }

  ```

  **Code 400**

  Validasi tidak terpenuhi,

  jika ada value attributes tidak sesuai dengan validasi

  ```
  {
    "err": [
        "Email must be not empty",
        "Must be Email format",
        "Password must be filled",
        "Password min 6 characters",
        "There must be a number"
    ]
  }
  ```

  **Code 500**

  Jika value dari attributes ada yang `tidak ada` atau `null`

  ```
  {
    "err": "Internal server error"
  }
  ```
  **Code 400**

  Jika Email telah terdaftar

  ```
  {
    "err": "Email has been used"
  }
  ```
### Login User
> Login user ke aplikasi

* _URL_

  ```
  /login
  ```

* _Method_

  ```
  POST
  ```

* _URL Params_

  ```
  None
  ```

* _Data Params_

  ```
  {
    "Email": req.body.Email,
    "Password": req.body.Password
  }
  ```

* _Response_

  **Code 200**

  Jika request berhasil

  ```
  {
    "access_token": "access token"
  }

  ```

  **Code 500**

  Jika value dari attributes ada yang `tidak ada` atau `null`

  ```
  {
    "err": "Internal server error"
  }
  ```
   **Code 400**

  Jika Email belum terdaftar

  ```
  {
    "err": "Email not registered"
  }
  ```
  ### Add Task
> Menambahkan task baru

* _URL_

  ```
  /tasks
  ```

* _Method_

  ```
  POST
  ```

* _URL Params_

  ```
  None
  ```

* _Data Params_

  ```
  {
    "title": req.body.title,
    "Category": req.body.Category,
    "userID": req.userID
  }
  ```

* _Response_

  **Code 201**

  Jika request berhasil

  ```
  {
    "title": req.body.title,
    "Category": req.body.Category,
    "userID": req.userID
  }

  ```

  **Code 400**

  Validasi tidak terpenuhi,

  jika ada value attributes tidak sesuai dengan validasi

  ```
  {
    "err": [
      "Title must be filled",
      "Category must be filled",
    ]
  }
  ```

  **Code 500**

  Jika value dari attributes ada yang `tidak ada` atau `null`

  ```
  {
    "err": "Internal server error"
  }
  ```

### Display task

> Menampilkan semua task dari user 

* _URL_

  ```
  /tasks
  ```

* _Method_

  ```
  GET
  ```

* _URL Params_

  ```
  None
  ```

* _Data Params_

  ```
  None
  ```

* _Response_

  **Code 200**

  Jika request berhasil

  ```
  task:[
    {
      "id": 1,
      "title": req.body.title,
      "Category": req.body.Category,
      "userID":1
    },
    {
      "id": 2,
      "title": req.body.title,
      "Category": req.body.Category,
      "userID":1
    }
  ]
  ```

  **Code 500**

  Jika request gagal karena server error

  ```
    "err": {
      "Internal server error"
    }

  ```

### Edit task

> Edit value dari task yang ditemukan

* _URL_

  ```
  /tasks/:id
  ```

* _Method_

  ```
  PUT
  ```

* _URL Params_

  ```
  id
  ```

* _Data Params_

  ```
  {
    "title": req.body.title,
    "Category": req.body.Category,
  }
  ```

* _Response_

  **Code 200**

  Jika request berhasil

  ```
  {
    "id": 1,
    "title": req.body.title,
    "Category": req.body.Category,
    "userID": 1
  }
  ```

  **Code 400**

  Validasi tidak terpenuhi,

  jika validasi tidak terpenuhi dari attribute

  ```
  {
    "err": [
      "Title must be filled",
      "Category must be filled",
    ]
  }
  ```

  **Code 404**

  Jika task tidak ditemukan

  ```
    "err": {
      "task not found"
    }
  
  ```

  **Code 500**

  Jika request gagal karena server error

  ```
    "err": {
      "Internal server error"
    }
  
  ```  

### Update task

> Update task category

* _URL_

  ```
  /tasks/:id
  ```

* _Method_

  ```
  PATCH
  ```

* _URL Params_

  ```
  id
  ```

* _Data Params_

  ```
  {
    "Category": req.body.Category
  }
  ```

* _Response_

  **Code 200**

  Jika request berhasil

  ```
  {
    "id": 1,
    "title": "makan siang",
    "Category": "todo ",
    "userID": 1,
  }
  ```

  **Code 400**

  Validasi tidak terpenuhi,

  jika ada value attributes tidak sesuai validasi

  ```
    "err": {
      "Category must be filled"
    }
  
  ```

  **Code 404**

  Jika task tidak ditemukan

  ```
    "err": {
      "task not found"
    }
  
  ```

  **Code 500**

  Jika request gagal karena server error

  ```
    "err": {
      "Internal server error"
    }
  
  ```

### Delete task

> Delete task by id

* _URL_

  ```
  /tasks/:id
  ```

* _Method_

  ```
  DELETE
  ```

* _URL Params_

  ```
  id
  ```

* _Data Params_

  ```
  None
  ```

* _Response_

  **Code 200**

  Jika request berhasil

  ```
  { "message": "task success to delete" }
  ```

  **Code 404**

  Jika task tidak ditemukan

  ```
    "err": {
      "task not found"
    }

  ```

  **Code 500**

  Jika request gagal karena server error

  ```
  
    "err": {
      "Internal server error"
    }
  
  ```
