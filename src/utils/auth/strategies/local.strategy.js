const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UsersService = require('../../../dao/models/user.dao');
const service = new UsersService();

const LocalStrategy = new Strategy(
  {usernameField:'email',passwordField:'password'},
  async (email, password, done) =>{

  try {
    const user = await service.findByEmail(email);
    console.log(user)
    console.log(user.dataValues.password)
    if(!user){
      console.log("hola2")
      done(boom.unauthorized(), false)
    }
    const isMatch= await bcrypt.compare(password, user.dataValues.password);
    if(!isMatch){
      console.log("hola3")
      done(boom.unauthorized(), false)
    }
    done(null, user);
  } catch (error) {
    done(error, false)
  }

});

module.exports = LocalStrategy;
