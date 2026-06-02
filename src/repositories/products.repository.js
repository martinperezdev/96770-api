import mongoose from 'mongoose';
import { ProductModel } from '../models/product.model.js';

export async function getAllProducts() {
  return ProductModel.find().select("-createdAt -updatedAt").lean();
}

export async function getProductById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return ProductModel.findById(id).select("-createdAt -updatedAt").lean();
}

export async function createProduct(data) {
  const { title, price, stock } = data;

  const product = await ProductModel.create({ title, price, stock })

  return {
    _id: product._id,
    title: product.title,
    price: product.price,
    stock: product.stock
  };
}

export async function updateProductById(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const { title, price, stock } = data;

  return ProductModel.findByIdAndUpdate(
    id,
    {
      title,
      price,
      stock,
    },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  )
    .select("-createdAt -updatedAt")
    .lean();
}

export async function deleteProductById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  
  return ProductModel.findByIdAndDelete(id).select("-createdAt -updatedAt").lean();
}