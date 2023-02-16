const usersControllers = require('./users.controllers');
const responsesHandler = require('../utils/handleResponses');

const getAllUsers = (_req, res) => {

  usersControllers.findAllUsers()
    .then( data => {

      responsesHandler.success({
        data,
        status: 200,
        message: 'All products were gotten',
        res
      })

    })
    .catch( error => {

      responsesHandler.error({
        status: 400,
        data: error,
        message: 'Something wrong happpend with all users',
        res
      })
        
    });

}

const getUserById = async ( req, res ) => {

  const { id } = req.params;

  usersControllers.findUserById( id )
    .then( data => {

      if ( data ) {
        responsesHandler.success({
          res,
          status: 200,
          message: 'User found succesfully',
          data
        })
      } else {
        responsesHandler.error({
          res,
          status: 404,
          message: `User with id ${id} not found`,
        })
      }

    })
    .catch( error => {

      responsesHandler.error({
        res, 
        status: 400,
        data: error,
        message: 'Something wrong happpend with this user',
      })

    });

}

const postNewUser = (req, res) => {

  usersControllers.createNewUser( req.body )
    .then( data => {

      responsesHandler.success({
        data,
        res,
        status: 201,
        message: 'User created succesfully'
      })

    })
    .catch( error => {

      responsesHandler.error({
        res, 
        status: 400,
        data: error,
        message: 'It was not possible to create a new user',
        fields: {
          firstName: 'String',
          lastName: 'String',
          email: 'example@email.com',
          password: 'String',
          profileImage: 'site.com/image-jpg',
          phone: '+524496548073'
        }
      })

    });

}

const deleteUser = ( req, res ) => {

  const { id } = req.params;

  usersControllers.deleteUser( id )
    .then( data => {

      if ( data ) {
        responsesHandler.success({
          res,
          status: 200,
          data,
          message: `User with id ${id} was deleted succesfully`
        })
      } else {
        responsesHandler.error({
          res,
          status: 404,
          message: 'User not found'
        })
      }

    })
    .catch( error => {
      responsesHandler.error({
        res, 
        status: 400,
        data: error,
        message: 'Something wrong happpend trying to delete this user',
      })
    });

}

const patchUser = (req, res) => {

  const {id} = req.params;

  usersControllers.updateUser( id, req.body )
    .then( data => {

      if ( data ) {
        responsesHandler.success({
          res,
          status: 200,
          message: `User with id ${id} modified successfully`,
        })
      } else {
        responsesHandler.error({
          res, 
          status: 400,
          data: error,
          message: 'It was not possible to create a new user',
          fields: {
            firstName: 'String',
            lastName: 'String',
            email: 'example@email.com',
            password: 'String',
            profileImage: 'site.com/image-jpg',
            phone: '+524496548073'
          }
        })
      }
    
    })
    .catch( error => {
      responsesHandler.error({
        res, 
        status: 400,
        data: error,
        message: 'Something wrong happpend trying to update this user',
      })
    });

}

module.exports = {
  getAllUsers,
  getUserById,
  postNewUser,
  deleteUser,
  patchUser
}