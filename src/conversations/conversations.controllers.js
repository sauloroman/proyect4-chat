const Conversations = require("../models/conversations.models");
const Participants = require("../models/participants.models");
const Users = require("../models/users.models");
const uuid = require('uuid');

const findAllConversations = async (userId) => {

  try {

    const data = await Conversations.findAll({
      include: {
        model: Participants,
        where: {
          userId
        }
      }
    })

    return data;

  } catch( error ) {
    throw new Error( error );
  }
}

const createConversation = async ( conversationObj, userOwnerId, userGuestId ) => {

  const { name, profileImage, isGroup } = conversationObj;
  
  // Validacion por si el usuario invitado existe
  const userGuest = await Users.findOne({ where: { id: userGuestId }})

  if ( !userGuest ) return false;

  const newConversation = await Conversations.create({
    id: uuid.v4(),
    name,
    profileImage,
    isGroup,
  });
  
  // Owner Participant
  await Participants.create({
    id: uuid.v4(),
    userId: userOwnerId,
    conversationId: newConversation.id,
    isAdmin: true
  });

  // Guest Participant
  await Participants.create({
    id: uuid.v4(),
    userId: userGuestId,
    conversationId: newConversation.id,
    isAdmin: false
  })

  return newConversation;

}

module.exports = {
  findAllConversations,
  createConversation
}