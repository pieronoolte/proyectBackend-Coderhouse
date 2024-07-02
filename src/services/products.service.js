const path = require('path');
const nodemailer = require('nodemailer');
const Users = require('../schemas/user.schema');
const { config } = require('../../config')


const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: config.userNM,
    pass: config.passwordNM
  }
})

const paginateProducts = async (schema, size, page, sort) => {
  const options = {
    limit: size || 10,
    page: page || 1,
    sort: sort || { createdAt: -1 },
    lean: true
  };

  let result = await schema.paginate({}, options);

  result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/products/paginate?page=${result.prevPage}` : '';
  result.nextLink = result.hasNextPage ? `http://localhost:8080/api/products/paginate?page=${result.nextPage}` : '';

  result.isValid = !(page <= 0 || page > result.totalPages)
  return result
}

const deleteProductMailer = async (schema, pid) => {
  const product = await schema.findOne({ _id: pid });
  const user = await Users.findOne({ _id: product.owner });

  let imagePath = path.join(__dirname, '..', 'public', 'images', 'imageMail.png');
  await transport.sendMail({
    from: 'pieronolte@gmail.com',
    to: user.email,
    subject: 'Eliminación de producto',
    html: `
          <div>
            <h1>Estimad@ ${user.name} ${user.lastname}</h1>
            <p>El producto ${product.title} ha sido eliminado</p>
            <p>Lo invitamos a registrar nuevos productos!</p>
            <img src="cid:imageMail"/>
          </div>`,
    attachments: [{
      filename: 'imageMail.png',
      path: imagePath,
      cid: 'imageMail'
    }]
  });
}



module.exports = { paginateProducts, deleteProductMailer }
