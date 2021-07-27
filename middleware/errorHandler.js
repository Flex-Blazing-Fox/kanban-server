const errorHandler = (err, req, res, next) => {
  let statusCode
  let message

  switch (err.name) {
    case 'UniqueEmailError':
      statusCode = 400
      message = 'Email already exists'
      break
    case 'UniqueOrgError':
      statusCode = 400
      message = 'Organization already exists'
      break
    case 'UniqueCatError':
      statusCode = 400
      message = 'Category already exists'
      break
    case 'IncorrectCredentialsError':
      statusCode = 400
      message = 'Email or Password is wrong'
      break
    case 'NotProvideParamError':
      statusCode = 400
      message = 'Please provide id params'
      break
    case 'SequelizeValidationError':
      statusCode = 400
      message = err.message.split('\n')
      break
    case 'AuthenticationError':
      statusCode = 401
      message = 'Invalid access token'
      break
    case 'MissingAccessTokenError':
      statusCode = 401
      message = 'Please provide access token'
      break
    case 'ForbiddenError':
      statusCode = 403
      message = 'FORBIDDEN'
      break
    case 'UserNotFoundError':
      statusCode = 404
      message = 'User Not found'
      break
    case 'NotFoundError':
      statusCode = 404
      message = 'Not found'
      break
    default:
      statusCode = 500
      message = 'Internal server error'
      break
  }

  res.status(statusCode).json({ err: message })

}

module.exports = errorHandler