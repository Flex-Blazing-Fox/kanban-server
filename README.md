# kanban-server

kaban-server
# Dokumentasi API Kanban-Server
### Kanban
## Database
```
kanban_db
```

## Package
```
bcrypt, dotenv, express, jsonwebtoken, nodemon, pg, sequelize
```

## Migration
sequelize db:migrate

## Run Dev
```
npm run dev
```

### HTTP REQUEST
***BASE URL:***
```
http://127.0.0.1:3000
```

## Register User
- **URL:**
```
/user/register
```
- **METHOD:**
```
POST
```
- **SUCCESS RESPONSE:**
```
CODE: 201
{
    "result": {
        "id": 1,
        "email": "test@mail.com",
        "password": "$2b$10$n2PvIv747U8WPsCmZUfZMucoWhQHWVcbDEWdXbUFwqidsXDkxSNjK",
        "updatedAt": "2021-07-14T08:38:11.613Z",
        "createdAt": "2021-07-14T08:38:11.613Z"
    }
}
```
- **ERROR RESPONSE:**
```
CODE: 500
```

## Login User
- **URL:**
```
/user/login
```
- **METHOD:**
```
POST
```
- **SUCCESS RESPONSE:**
```
CODE: 200
{
    "message": "Login Success",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2MjYyNTIwMTZ9.1F6zUwqn2jofa9BZHl8HCuuF5J6dV8X1Q46Yiagg9uQ"
}
```
- **ERROR RESPONSE:**
```
CODE: 500
```

## Add Kanban
- **URL:**
```
/tasks
```
- **METHOD:**
```
POST
```
- **SUCCESS RESPONSE:**
```
CODE: 201
{
    "id": 1,
    "title": "test1",
    "category": "Backlog",
    "userId": 1,
    "updatedAt": "2021-07-14T08:54:05.828Z",
    "createdAt": "2021-07-14T08:54:05.828Z"
}
```
- **ERROR RESPONSE:**
```
CODE: 500
```

## Show Kanban
- **URL:**
```
/tasks
```
- **METHOD:**
```
GET
```
- **SUCCESS RESPONSE:**
```
CODE: 200
{
    "id": 1,
    "title": "test1",
    "category": "Backlog",
    "userId": 1,
    "updatedAt": "2021-07-14T08:54:05.828Z",
    "createdAt": "2021-07-14T08:54:05.828Z"
}
```
- **ERROR RESPONSE:**
```
CODE: 500
```

## Show Detail
- **URL:**
```
/tasks
```
- **METHOD:**
```
GET
```
- **PARAMS:**
```
id
```
- **SUCCESS RESPONSE:**
```
CODE: 200
{
    "id": 1,
    "title": "test1",
    "category": "Backlog",
    "userId": 1,
    "createdAt": "2021-07-14T08:54:05.828Z",
    "updatedAt": "2021-07-14T08:54:05.828Z"
}
```
- **ERROR RESPONSE:**
```
CODE: 500
```

## Update All
- **URL:**
```
/tasks
```
- **METHOD:**
```
put
```
- **PARAMS:**
```
id
```
- **SUCCESS RESPONSE:**
```
CODE: 200
[
    {
        "id": 1,
        "title": "test1-edit",
        "category": "todo",
        "userId": 1,
        "createdAt": "2021-07-14T08:54:05.828Z",
        "updatedAt": "2021-07-14T09:59:42.728Z"
    }
]
```
- **ERROR RESPONSE:**
```
CODE: 500
```


## Update Category
- **URL:**
```
/tasks
```
- **METHOD:**
```
put
```
- **PARAMS:**
```
id
```
- **SUCCESS RESPONSE:**
```
CODE: 200
[
    {
        "id": 1,
        "title": "test1-edit",
        "category": "doing",
        "userId": 1,
        "createdAt": "2021-07-14T08:54:05.828Z",
        "updatedAt": "2021-07-14T10:02:01.420Z"
    }
]
```
- **ERROR RESPONSE:**
```
CODE: 500
```

## Delete
- **URL:**
```
/tasks
```
- **METHOD:**
```
delete
```
- **PARAMS:**
```
id
```
- **SUCCESS RESPONSE:**
```
CODE: 200
{
    "message": "Success deleted task"
}
```
- **ERROR RESPONSE:**
```
CODE: 500
```