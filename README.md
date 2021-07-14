# Kanban-Server

***Getting Started for Server Side***

- _Jalankan `npm install` di terminal_
- _Edit file `config.js` sesuai dengan database masing masing :_
- _Setting `.env` diperlukan agar app dapat berjalan sebagaimana semestinya_ :
    * _Sesuaikan `JWT_KEY` yang sudah ditentukan_
    * _Sesuaikan `DB_USERNAME` yang sudah ditentukan_
    * _Sesuaikan `DB_PASSWORD` yang sudah ditentukan_
    * _Sesuaikan `DB_NAME` yang sudah ditentukan_
    * _Sesuaikan `CLIENT_ID` yang sudah ditentukan_
    * _Sesuaikan `DEFAULT_PASSWORD` yang sudah ditentukan_
- _Jalankan `sequelize db:migrate` untuk migrasi ke database_
- _Jalankan `sequelize db:migrate:undo:all` untuk menghapus migrasi di database_
- _Jalankan `nodemon app.js` untuk menjalankan applikasi server side._
 
## Available Endpoint _Kanban_
  ----
_Users :_

* `POST /register`
* `POST /login`
* `POST /googleLogin`

_Task :_

* `POST /tasks`
* `GET /tasks`
* `PATCH /tasks/:id`
* `DELETE /tasks/:id`

## RESTful Endpoint
  ----
### User Register :

> Buat / daftar user baru

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
    "email": req.body.email,
    "password": req.body.password
  }
  ```
* _Response_

  **Code 201** : Jika request berhasil

  ```
  {
    "message": "User Created"
  }
  ```

  **Code 400** : Jika validasi tidak terpenuhi

  ```
  {
    "errors": [
        "Email can not be null",
        "Email has been used",
        "Email format is not correct",
        "Email can not be empty"
        "Password at least have 6 characters",
        "Password can not be null"
        "Password can not be empty"
    ]
  }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
  {
    "errors": [
      "Internal server error"
    ]
  }
  ```

### User Login :
   
> login ke applikasi

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
    "email": req.body.email,
    "password": req.body.password
  }
  ```

* _Response_

  **Code 201** : Jika request berhasil

  ```
  {
    "success": true,
    "access_token": access_token
  }
  ```

  **Code 401** : Jika validasi tidak terpenuhi

  ```
  {
    "errors": [
      "Email or Password is wrong"
    ]
  }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
  {
    "errors": [
      "Internal server error"
    ]
  }
  ```

### Google Login :
   
> login ke applikasi menggunakan akun google

* _URL_

  ```
  /googleLogin
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
    idToken
  }
  ```

* _Response_

  **Code 201** : Jika request berhasil

  ```
  {
    "access_token": access_token
  }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
  {
    "errors": [
      "Internal server error"
    ]
  }
  ```

### Get Task :
> Menampilkan semua task 

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

  **Code 200** : Jika request berhasil

  ```
  {
    "data": [
        {
            "id": 2,
            "title": "coba1",
            "category": "start",
            "createdAt": "2021-07-13T14:58:44.429Z",
            "updatedAt": "2021-07-13T14:58:44.429Z",
            "userId": 1
        },
        {
            "id": 3,
            "title": "coba2",
            "category": "start",
            "createdAt": "2021-07-13T14:59:23.870Z",
            "updatedAt": "2021-07-13T14:59:23.870Z",
            "userId": 1
        }
    ]
  }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
  {
    "errors": [
      "Internal server error"
    ]
  }
  ```

### Add Task :
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
    "category": req.body.title,
    "userId" : req.userId
  }
  ```

* _Response_

  **Code 201** : Jika request berhasil

  ```
  {
    "id": 8,
    "title": "coba5",
    "category": "start",
    "userId": 1,
    "updatedAt": "2021-07-14T03:26:19.430Z",
    "createdAt": "2021-07-14T03:26:19.430Z"
  }
  ```

  **Code 400** : Validasi tidak terpenuhi,

  Jika ada value attributes berupa `empty string` maka akan mengeluarkan error validasi sesuai attributenya

  ```
      {
        "errors": [
            "Validation notEmpty on title failed",
            "Validation notEmpty on category failed",
        ]
      }
  ```

### Update Category :

> Update task category

* _URL_

  ```
  /tasks
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
    "category": req.body.category
  }
  ```

* _Response_

  **Code 200** : Jika request berhasil

  ```
  {
    "data": {
        "id": 2,
        "title": "coba1",
        "category": "proses",
        "createdAt": "2021-07-13T14:58:44.429Z",
        "updatedAt": "2021-07-13T14:58:44.429Z",
        "userId": 1
    }
  }
  ```

  **Code 400** : Validasi tidak terpenuhi,

  Jika ada value attributes category berupa `empty` maka akan mengeluarkan error validasi sesuai attributenya

  ```
  {
    "errors": [
        "Validation notEmpty on category failed"
    ]
  }
  ```

  Jika ada value attributes category berupa `null` maka akan mengeluarkan error validasi sesuai attributenya

  ```
  {
    "errors": [
        "Category can not be null"
    ]
  }
  ```

  **Code 404** : Jika task tidak ditemukan

  ```
  {
    "errors": [
      "Task not found"
    ]
  }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
  {
    "errors": [
      "Internal server error"
    ]
  }
  ```
### Delete task :

> Delete task by id

* _URL_
  ```
  /tasks
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

  **Code 200** : Jika request berhasil

  ```
  {
      "message": "Task success to delete"
  }
  ```

  **Code 404** : Jika task tidak ditemukan

  ```
  {
    "errors": [
      "Task not found"
    ]
  }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
  {
    "errors": [
      "Internal server error"
    ]
  }
  ```

