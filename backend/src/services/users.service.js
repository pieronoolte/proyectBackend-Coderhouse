const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require('nodemailer')


const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'pieronolte@gmail.com',
    pass: 'ejfj vkmt amqr qyac'
  }
})


const getUserByCreds = async (schema, email, password) => {
  let user = await schema.findOne({ email: email });
  console.log(user)
  console.log(user.password)
  if (user && user.password) {

    let correctPwd = bcrypt.compareSync(password, user.password);
    console.log(correctPwd)
    if (correctPwd) {
      delete user.password;
      return user;
    }
    return user;
  }

  return null;
}


const deleteInactiveUsers = async (schema) => {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  try {
    const emails = await schema.find({ lastConnection: { $lt: twoDaysAgo } });
    const result = await schema.deleteMany({ lastConnection: { $lt: twoDaysAgo } });

    await emails.map(async (email) => {
      let imagePath = path.join(__dirname, '..', 'public', 'images', 'imageMail.png');
      await transport.sendMail({
        from: 'pieronolte@gmail.com',
        to: email.email,
        subject: 'Desactivación de cuenta',
        html: `
              <div>
                <h1>Estimad@ ${email.name} ${email.lastname}</h1>
                <p>Su cuenta ha sido desactivada por incactividad de 2 días.</p>
                <p>Lo invitamos a registrarse de nuevo! Lo esperamos!</p>
                <img src="cid:imageMail"/>
              </div>`,
        attachments: [{
          filename: 'imageMail.png',
          path: imagePath,
          cid: 'imageMail'
        }]
      });
    });

    return `Se eliminaron ${result.deletedCount} usuarios por inactividad en los últimos dos días`;
  } catch (error) {
    console.error('Error deleting inactive users:', error);
    throw error;
  }
}


const updateRole = async (schema, uid, role) => {
  const user = await schema.findById(uid)
  console.log("role: ", role)
  if (user === null) {
    throw boom.notFound(`${schema} not found`);
  }

  // Actualizar el rol del usuario
  await schema.updateOne(
    { _id: uid },
    { $set: { role: role } }
  );

  // Retornar el usuario actualizado
  const updatedUser = await schema.findById(uid);
  return updatedUser;
}
module.exports = { getUserByCreds, deleteInactiveUsers, updateRole }
