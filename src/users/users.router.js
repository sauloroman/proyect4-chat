const router = require('express').Router();
const userServices = require('./users.services');
const passportJwt = require('../middlewares/auth.middleware');

router.route('/')
  .get( userServices.getAllUsers )
  .post( userServices.postNewUser );

router.route('/me')
  .get( passportJwt, userServices.getMyUser )
  .delete( passportJwt, userServices.deleteMyUser )
  .patch(passportJwt, userServices.patchMyUser)

router.route('/:id')
  .get( userServices.getUserById )
  .delete( userServices.deleteUser )
  .patch( userServices.patchUser );

module.exports = router;
