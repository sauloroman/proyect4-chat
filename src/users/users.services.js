const usersControllers = require('./users.controllers');
const responsesHandler = require('../utils/handleResponses');
const { hashPassword } = require('../utils/crypto');

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

// Servicios para acciones sobre el propio usuario

const getMyUser = ( req, res ) => {

  const id = req.user.id;

  usersControllers.findUserById( id )
    .then( data => {
      responsesHandler.success({
        res,
        status: 200,
        message: 'This is your current user',
        data
      })
    })
    .catch( error => {
      responsesHandler.error({
        res,
        status: 400,
        message: 'Something bad happend with this current user',
        data: err
      })
    })

}

const deleteMyUser = ( req, res ) => {

  const id = req.user.id;

  usersControllers.deleteUser( id )
    .then( (_data) => {
      responsesHandler.success({
        res,
        status: 200,
        message: `User deleted successfully with id ${id}`
      })
    })  
    .catch( err => {
      responsesHandler.success({
        res,
        status: 400,
        message: `It was not possible to delete user with id ${id}`,
        data: err
      })
    })
}

const patchMyUser = ( req, res ) => {

  const id = req.user.id;
  const { password, firstName, lastName, profileImage, email, phone } = req.body;

  const userObj = {
    firstName,
    lastName,
    email,
    password: hashPassword( password ),
    profileImage,
    phone
  }

  usersControllers.updateUser( id, userObj )
    .then( (_data) => {
      responsesHandler.success({
        res,
        status: 200,
        message: 'Your was updated successfully',
      })
    })
    .catch( error => {
      responsesHandler.error({
        res,
        status: 400,
        message: 'Somethind bad happend',
        data: error
      })
    })

}

module.exports = {
  getAllUsers,
  getUserById,
  postNewUser,
  deleteUser,
  patchUser,
  getMyUser,
  deleteMyUser,
  patchMyUser
}