const checkUserCredentials = require('./auth.controller');
const handleResponses = require('../utils/handleResponses');
const jwt = require('jsonwebtoken');

const postLogin = ( req, res ) => {

  const { email, password } = req.body;

  checkUserCredentials( email, password )
    .then( ( user ) => {

      if ( user ) {
        const token = jwt.sign(
          { 
            id: user.id,
            email: user.email,
            firstName: user.firstName
          },
          'ROMANSTYLE',
          {
            expiresIn: '30d'
          }
        )

        handleResponses.success({
          status: 200,
          message: 'Correct Crendentials',
          res,
          data: token
        })
      } else {
        handleResponses.error({
          status: 401,
          message: 'Invalid Credentials',
          res
        })
      }

    })
    .catch( err => {
      handleResponses.error({
        status: 400,
        message: 'Something Bad Happened',
        data: err,
        res
      })
    })

}

module.exports = postLogin;