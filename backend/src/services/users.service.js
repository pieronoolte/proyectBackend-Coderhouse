const bcrypt = require('bcrypt');

const getUserByCreds = async (schema, email, password) => {
  let user = await schema.findOne({email: email});
  if (user && user.password) {

    let correctPwd =  bcrypt.compareSync(password, user.password);

    if (correctPwd) {
      delete user.password;
      return user;
    }

  }

  return null;
}

module.exports = { getUserByCreds }
