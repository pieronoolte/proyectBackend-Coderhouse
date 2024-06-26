
const Products = require('../schemas/product.schema')
const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const Users = require('../schemas/user.schema');
const Carts = require('../schemas/cart.schema');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const generateMongo = async (quantity) => {
  for (let i = 0; i < quantity; i++) {
    let structureSchemaProducts = {};
    let structureSchemaUsers = {};

    structureSchemaProducts = {
      title: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      code: Math.floor(Math.random() * (50000 - 10000) + 10000),
      price: parseInt(faker.commerce.price(), 10),
      status: faker.datatype.boolean(),
      stock: Math.floor(Math.random() * (100 - 10) + 10),
      category: faker.commerce.department(),
      thumbnails: faker.image.url(),
      owner: new ObjectId('000000000000000000000000')
    };

    structureSchemaUsers = {
      name: faker.person.firstName(),
      lastname: faker.person.lastName(),
      birthdate: faker.date.birthdate(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.direction(),
      password: faker.internet.password()
    };

    try {
      await Products.create(structureSchemaProducts);
      await Users.create(structureSchemaUsers);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error inserting data:', error);
    }
  }

  // Verifica si el usuario admin ya existe
  const adminExists = await Users.findOne({ email: 'admin@ecomerce.com' });

  if (!adminExists) {
    try {
      await Users.create({
        name: 'Admin',
        lastname: 'Ecomerce',
        birthdate: '01/01/2000',
        email: 'admin@ecomerce.com',
        phone: faker.phone.number(),
        address: faker.location.direction(),
        password: '123456',
        role: 'admin'
      });
      // eslint-disable-next-line no-console
      console.log('Admin user created successfully.');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating admin user:', error);
    }
  } else {
    // eslint-disable-next-line no-console
    console.log('Admin user already exists.');
  }
}

const findMongo = async (schema, size) => {
  let document;
  try {
    if (schema === Carts) {
      document = await schema.aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'products._id',
            foreignField: '_id',
            as: 'product'
          }
        },
        {
          $addFields: {
            products: {
              $map: {
                input: "$products",
                as: "prod",
                in: {
                  product: {
                    $arrayElemAt: ["$product", { $indexOfArray: ["$product._id", "$$prod._id"] }]
                  },
                  quantity: "$$prod.quantity"
                }
              }
            }
          }
        },
        { $limit: size }
      ])
    } else {
      document = await schema.find().limit(size).lean();
    }
    return document
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error inserting data:', error);
  }

}


const findOneMongo = async (bd, schema, id) => {
  let document;
  if (schema === Carts) {

    const carts = await bd.find(Carts, 200);
    const cartsJSON = JSON.stringify(carts);
    const parsedCarts = JSON.parse(cartsJSON);
    const as = parsedCarts.map(el => {
      const product = el.products;
      if (product) {
        return product;
      } else {
        return null;
      }
    }).filter(el => el !== null);

    const cart = await schema.findById(id).lean();

    for (let i = 0; i < as.length; i++) {
      let cartFOR = parsedCarts[i];
      if (cartFOR && cartFOR._id == cart._id) {
        let document1 = as[i]
        document = {
          _id: cartFOR._id,
          products: document1
        }
      }
    }
  } else {
    document = await schema.findById(id).lean();
  }
  if (!document) {
    throw boom.notFound(`${schema.modelName} not found`);
  }
  if (!document.status && schema === 'products') {
    throw boom.conflict('Product is block');
  }
  return document;
}

const updateMongo = async (schema, id, changes) => {
  const document = await schema.findById(id);
  if (document === null) {
    throw boom.notFound(`${schema.modelName} not found`);
  }
  const updateDocument = await schema.updateOne(
    { _id: id },
    { $set: changes }
  );
  return updateDocument;
}

const deleteMongo = async (schema, id) => {
  const document = await schema.findById(id);
  if (document === null) {
    throw boom.notFound(`${schema.modelName} not found`);
  }
  const deleteDocument = await schema.findByIdAndDelete(id);
  return {
    state: `${schema.modelName} delete successfully`,
    delete: deleteDocument
  };
}

module.exports = { generateMongo, findMongo, findOneMongo, updateMongo, deleteMongo }

