const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const { ObjectId } = mongoose.Types;
const Carts = require('../schemas/cart.schema');

const addProductCart = async (schema, cid, pid, quantity) => {
  const document = await schema.findById(cid);
  // if (!document) {
  //   throw boom.notFound(`${schema} not found`);
  // }
  console.log("document:", document)
  if (!mongoose.Types.ObjectId.isValid(pid)) {
    throw boom.notFound(`Product not found`);
  }
  const newProduct = await schema.find({ _id: cid, products: { $elemMatch: { _id: pid } } });
  console.log("new Product:", newProduct)
  if (Object.keys(newProduct).length !== 0) {
    const documentInc = await schema.findOneAndUpdate(
      { _id: cid, products: { $elemMatch: { _id: pid } } },
      { $inc: { 'products.$.quantity': 1 } },
      { new: true }
    );
    return documentInc
  } else {
    const productId = new mongoose.Types.ObjectId(pid)
    const documentUpdate = await schema.findOneAndUpdate(
      { _id: cid },
      {
        $addToSet: {
          products: {
            _id: productId,
            quantity: quantity || 1
          }
        }
      },
      { new: true }
    );
    return documentUpdate
  }
}

const deleteProductCart = async (schema, cid, pid) => {
  const document = await schema.findById(cid);
  if (!document) {
    throw boom.notFound(`${schema} not found`);
  }

  if (mongoose.Types.ObjectId.isValid(pid)) {
    const documentInc = await schema.findOneAndUpdate(
      { _id: cid },
      { $pull: { products: { _id: new mongoose.Types.ObjectId(pid) } } },
      { new: true }
    ).lean();

    if (!documentInc) {
      throw boom.notFound(`${schema} found but product not found`);
    }
    return documentInc
  } else {
    throw boom.notFound(`${schema} found but product not found`);
  }
}

const updateCart = async (schema, otherSchema, cid) => {
  const document = await schema.findById(cid);
  if (document === null) {
    throw boom.notFound(`${schema.baseModelName} not found`);
  }

  const newProductsArray = await productsCart(otherSchema);

  let updateDocument;
  if (document.products && document.products.length > 0) {
    updateDocument = await schema.updateOne(
      { _id: cid },
      { $set: { products: newProductsArray } }
    );
  } else {
    updateDocument = await schema.updateOne(
      { _id: cid },
      { $set: { products: newProductsArray } },
      { upsert: true }
    );
  }
  return updateDocument;
}

const updateCartState = async (schema, cid) => {
  const document = await schema.findById(cid);
  if (document === null) {
    throw boom.notFound(`${schema.baseModelName} not found`);
  }

  const documentInc = await schema.findByIdAndUpdate(cid, { state: true });

  if (!documentInc) {
    throw boom.notFound(`${schema.baseModelName} found but product not found`);
  }
  return documentInc
}

const getRandomCart = async (schema) => {
  const randomIndex = Math.floor(Math.random() * 10);
  const randomCart = await schema.findOne().skip(randomIndex).lean();
  return randomCart.products;
}

const productsCart = async (otherSchema) => {
  let products = [];
  const quantityProducts = Math.floor(Math.random() * (6 - 1) + 1);
  const randomIds = await otherSchema.aggregate([{ $sample: { size: quantityProducts } }]);
  products = randomIds.map(e => ({
    _id: e._id,
    quantity: Math.floor(Math.random() * (15 - 1) + 1)
  }));
  return products;
}

const createCart = async (schema, uid) => {
  const document = {
    owner: uid,
    products: []
  }
  let newCart = await schema.create(document);
  return newCart;
}

module.exports = { addProductCart, deleteProductCart, updateCart, updateCartState, getRandomCart, createCart, productsCart }
