const bcrypt = require('bcrypt');

const getUserByCreds = async (mongoSchema, schema, email, password) => {
  let user = await mongoSchema.findByEMail(schema,email);
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
