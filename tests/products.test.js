import request from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

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

function createToken(role) {
  return jwt.sign(
    {
      id: 'test-user-id',
      email: `${role}@test.com`,
      role,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn
    }
  )
}


describe('/api/products', () => {

  describe('GET / -> listar todos los productos', () => {
    test('Deberia devolver status 200 y un array de productos', async () => {
      const response = await request(app).get('/api/products');

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(Array.isArray(response.body.payload)).toBe(true);
      expect(response.body.payload.length).toBe(2);
    });
  })

  describe('GET /:pid -> encontrar un producto por su id', () => {
    test('Deberia devolver un producto existente', async () => {
      const product = await ProductModel.findOne({ title: 'Mouse gamer' }).lean();

      const response = await request(app).get(`/api/products/${product._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.payload).toBeDefined();
      expect(response.body.payload._id).toBe(product._id.toString());
      expect(response.body.payload.title).toBe('Mouse gamer');
    });

    test('Deberia devolver un error 404', async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const response = await request(app).get(`/api/products/${fakeId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
    });
  });

  describe('POST / -> crear un producto', () => {
    test('Deberia crear un producto correctamente', async () => {
      const adminToken = createToken('admin');

      const newProduct = {
        title: 'Monitor 24 pulgadas',
        price: 300,
        stock: 5,
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newProduct)

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.payload.title).toBe('Monitor 24 pulgadas');
    });

    test('Sin token deberia devolver 401', async () => {
      const newProduct = {
        title: 'Monitor 24 pulgadas',
        price: 300,
        stock: 5,
      };

      const response = await request(app)
        .post('/api/products')
        .send(newProduct)

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
    });

    test('Con token user deberia devolver 403', async () => {
      const userToken = createToken('user');

      const newProduct = {
        title: 'Monitor 24 pulgadas',
        price: 300,
        stock: 5,
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${userToken}`)
        .send(newProduct)

      expect(response.statusCode).toBe(403);
      expect(response.body.status).toBe('error');
    });
  })

  describe('PUT /:pid -> editar un producto', () => {
    test('Deberia actualizar un producto existente', async () => {
      const adminToken = createToken('admin');
      const product = await ProductModel.findOne({ title: 'Mouse gamer' }).lean();
  
      const updatedProduct = {
        title: 'Mouse actualizado',
        price: 200,
        stock: 15,
      };
  
      const response = await request(app)
        .put(`/api/products/${product._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updatedProduct);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.payload.title).toBe('Mouse actualizado');
      expect(response.body.payload.price).toBe(200);
    });
  });

  describe('DELETE /:pid -> eliminar un product', () => {
    test('Deberia eliminar un producto existente', async () => {
      const adminToken = createToken('admin');
      const product = await ProductModel.findOne({ title: 'Mouse gamer' }).lean();
  
      const response = await request(app)
        .delete(`/api/products/${product._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
  
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
    });
  })

});