import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById
} from '../repositories/products.repository.js'

import { createError } from '../utils/createError.js';
import { successResponse } from '../utils/apiResponse.js';

export async function getProducts(req, res, next) {
  try {
    const products = await getAllProducts();

    return successResponse(res, {
      message: 'Products retrieved successfully',
      payload: products
    });
  } catch (error) {
    next(error);
  }
};

export async function getProduct(req, res, next) {
  try {
    const { pid } = req.params;

    const product = await getProductById(pid);
    if (!product) {
      return next(createError("Product not found", 404));
    };

    return successResponse(res, {
      message: 'Product found',
      payload: product
    });
  } catch (error) {
    next(error);
  }
};

export async function createNewProduct(req, res, next) {
  try {
    const { title, price, stock } = req.body;

    if (!title || price === undefined || stock === undefined) {
      return next(createError('Title, price and stock are required', 400));
    }

    const product = await createProduct({
      title,
      price,
      stock
    });

    return successResponse(res, {
      statusCode: 201,
      message: 'Product created successfully',
      payload: product
    });
  } catch (error) {
    next(error);
  }
};

export async function updateProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const { title, price, stock } = req.body;

    const product = await updateProductById(pid, {
      title,
      price,
      stock
    });

    if (!product) {
      return next(createError('Product not found', 404));
    }

    return successResponse(res, {
      message: 'Product updated successfully',
      payload: product
    });
  } catch (error) {
    next(error);
  }
};

export async function deleteProduct(req, res, next) {
  try {
    const { pid } = req.params;

    const product = await deleteProductById(pid);

    if (!product) {
      return next(createError('Product not found', 404));
    };

    return successResponse(res, {
      message: 'Product deleted successfully',
      payload: product
    });
  } catch (error) {
    next(error);
  }
}