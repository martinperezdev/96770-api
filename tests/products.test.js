import request from 'supertest';
import mongoose from 'mongoose';

import app from '../src/app.js';
import { ProductModel } from '../src/models/product.model.js';
import { env } from '../src/config/env.js';

beforeAll(async () => {
  await mongoose.connect(env.mongoUriTest);
});

beforeEach(async () => {
  await ProductModel.deleteMany({});

  await ProductModel.insertMany([
    {
      title: 'Mouse gamer',
      price: 100,
      stock: 10,
    },
    {
      title: 'Teclado mecanico',
      price: 150,
      stock: 20,
    },
  ]);
});

afterAll(async () => {
  await ProductModel.deleteMany({});
  await mongoose.connection.close();
});


describe('/api/products', () => {

  test('GET /api/products deberia devolver status 200 y un array de productos', async () => {
    const response = await request(app).get('/api/products');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(Array.isArray(response.body.payload)).toBe(true);
    expect(response.body.payload.length).toBe(2);
  });

  test('GET /api/products/:pid deberia devolver un producto existente', async () => {
    const product = await ProductModel.findOne({ title: 'Mouse gamer' }).lean();

    const response = await request(app).get(`/api/products/${product._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.payload).toBeDefined();
    expect(response.body.payload._id).toBe(product._id.toString());
    expect(response.body.payload.title).toBe('Mouse gamer');
  });

  test('GET /api/products/:pid deberia devolver un error 404', async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const response = await request(app).get(`/api/products/${fakeId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe('error');
  });

  test('POST /api/products deberia crear un producto correctamente', async () => {
    const newProduct = {
      title: 'Monitor 24 pulgadas',
      price: 300,
      stock: 5,
    };

    const response = await request(app)
      .post('/api/products')
      .send(newProduct)

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.payload.title).toBe('Monitor 24 pulgadas');
  });

  test('PUT /api/products/:pid deberia actualizar un producto existente', async () => {
    const product = await ProductModel.findOne({ title: 'Mouse gamer' }).lean();

    const updatedProduct = {
      title: 'Mouse actualizado',
      price: 200,
      stock: 15,
    };

    const response = await request(app)
      .put(`/api/products/${product._id}`)
      .send(updatedProduct);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.payload.title).toBe('Mouse actualizado');
    expect(response.body.payload.price).toBe(200);
  });

  test('DELETE /api/products/:pid deberia eliminar un producto existente', async () => {
    const product = await ProductModel.findOne({ title: 'Mouse gamer' }).lean();

    const response = await request(app).delete(`/api/products/${product._id}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });

});