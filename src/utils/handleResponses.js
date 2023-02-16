const success = ({status, message, data, res }) => {

  res.status( status ).json({
    error: false,
    status,
    message,
    data
  })

}

const error = ({ status, message, fields, data, res }) => {

  res.status(status).json({
    error: true,
    status,
    message,
    fields, 
    data
  })

}

module.exports = {
  success,
  error
}