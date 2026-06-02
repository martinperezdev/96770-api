import { ProductModel } from '../models/product.model.js';
import { logger } from '../utils/logger.js';

const initialProducts = [
  {
    title: 'Mouse gamer',
    price: 100,
    stock: 10,
  },
  {
    title: 'Teclado mecánico',
    price: 150,
    stock: 20,
  },
  {
    title: 'Monitor 24 pulgadas',
    price: 300,
    stock: 5,
  }
];

export async function seedProducts() {
  const productsCount = await ProductModel.estimatedDocumentCount();

  if (productsCount > 0) {
    logger.info({
      msg: 'Products seed skipped',
      reason: 'Products already exist',
    });

    return;
  }

  const products = await ProductModel.insertMany(initialProducts);

  logger.info({
    msg: 'Products seed completed',
    products: products.map((product) => product._id),
  });
}