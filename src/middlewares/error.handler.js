function logErrors (err, req, res, next){
  // eslint-disable-next-line no-console
  console.log('logErrors');
  // eslint-disable-next-line no-console
  console.log(err);
  next(err);
}

function errorHandler (err, req, res, next){
  try {
    // eslint-disable-next-line no-console
    console.log('errorHandler');
    res.status(500).json({
      message: err.message,
      stack: err.stack
    });
  } catch (error) {
    next(error);
  }
}


function boomErrorHandler (err, req, res, next){
if (err.isBoom){
  const {output} = err;
  res.status(output.statusCode).json(output.payload);
}else{
  next(err)
}
}


module.exports = { logErrors, errorHandler, boomErrorHandler}
