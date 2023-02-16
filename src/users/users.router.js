const router = require('express').Router();
const userServices = require('./users.services');

router.route('/')
  .get( userServices.getAllUsers )
  .post( userServices.postNewUser );

router.route('/:id')
  .get( userServices.getUserById )
  .delete( userServices.deleteUser )
  .patch( userServices.patchUser );

module.exports = router;
