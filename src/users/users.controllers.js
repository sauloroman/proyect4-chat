const Users = require("../models/users.models");
const uuid = require('uuid');
const { hashPassword } = require("../utils/crypto");

const findAllUsers = async() => {
  const data = await Users.findAll();
  return data;
}

const findUserById = async( id ) => {
  const data = await Users.findOne({
    where: {
      id
    }
  })
  return data;
}

const createNewUser = async ( userInformation ) => {

  const newUser = {
    id: uuid.v4(),
    firstName: userInformation.firstName,
    lastName: userInformation.lastName,
    email: userInformation.email,
    password: hashPassword(userInformation.password),
    profileImage: userInformation.profileImage,
    phone: userInformation.phone
  }

  const data = await Users.create( newUser );
  return data;

}

const updateUser = async( id, userInformation ) => {

  const data = await Users.update( userInformation, {
    where: {
      id
    }
  });

  return data[0];

}

const deleteUser = async ( id ) => {

  const data = await Users.destroy({
    where: {
      id
    }
  })

  return data;
}


module.exports = {
  findAllUsers,
  findUserById,
  createNewUser,
  updateUser,
  deleteUser
}