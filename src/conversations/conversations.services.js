const conversationController = require('./conversations.controllers');
const handlerResponses = require('../utils/handleResponses');

const getAllConversationsByUser = ( req, res ) => { 

  const userId = req.user.id;

  conversationController.findAllConversations( userId )
    .then( data => {

      handlerResponses.success({
        res,
        status: 200,
        message: data.length ? 'Showing all your conversations' : 'No conversations to show',
        data
      })

    })
    .catch( error => {

      handlerResponses.error({
        res,
        status: 400,
        message: 'Something bad happened',
        data: err
      })

    })

}

const postNewConversation = (req, res) => {

  const userOwnerId = req.user.id;
  const { userGuestId, ...conversationObj } = req.body;

  conversationController.createConversation( conversationObj, userOwnerId, userGuestId)
    .then( data => {

      if ( data ) {
        handlerResponses.success({
          res,
          status: 201,
          message: 'Conversation created successfully',
          data
        })
      } else {
        handlerResponses.error({
          res,
          status: 400,
          message: `User with id: ${id} not found`,
        })
      }

    })
    .catch( error => {
      handlerResponses.error({
        res,
        status: 400,
        message: error.message || 'Something bad',
        data: error,
        fields: {
          name: 'String',
          profileImage: 'String',
          isGroup: 'Bool',
          guestId: 'String UUID'
        }
      })
    })

}

module.exports = {
  getAllConversationsByUser,
  postNewConversation
}