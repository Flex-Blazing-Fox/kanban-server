const errorHandler = (err, req, res, next) => {
    let statusCode
    let error = []
    
    switch(err.name){
        case 'NOT_LOGIN':
            statusCode = 401
            error.push({"message":"Anda Belum Login"})
            break;
        case 'INVALID_TOKEN':
            statusCode = 401
            error.push({"message":"Invalid Access Token"})
            break;
        case 'LOGIN_FAILED':
            statusCode = 401
            error.push({"message":"Login Failed"})
            break;
        case 'TASK_NOT_FOUND':
            statusCode = 404
            error.push({"message":"Task Not Found"})
            break;
        case 'USER_DATA_NOT_FOUND':
            statusCode = 404
            error.push({"message":"User Data Tidak Ditemukan"})
            break;
        case 'SequelizeValidationError':
            statusCode = 400
            error.push({"message":err.errors[0].message})
            break;
        case'SequelizeUniqueConstraintError' : 
            statusCode = 400
            error.push({"message" : "Email telah terdaftar"})
            break
        default:
            statusCode = 500
            error.push(err.name)
            break;
    }

    res.status(statusCode).json(error)
}

module.exports = errorHandler