import request from 'supertest';
import app from '../src/app.js';

describe('/api/products', () => {

  test('GET /api/products deberia devolver status 200 y un array de productos', async () => {
    const response = await request(app).get('/api/products');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Product List');
    expect(Array.isArray(response.body.payload)).toBe(true);
  });

  test('GET /api/products/p1 deberia devolver un producto existente', async () => {
    const response = await request(app).get('/api/products/p1');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.payload).toBeDefined();
    expect(response.body.payload.id).toBe('p1');
  });

  test('GET /api/products/p10 deberia devolver un error 404', async () => {
    const response = await request(app).get('/api/products/p10');

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Product not found');
  });

  test('POST /api/products deberia crear un producto correctamente', async () => {
    const newProduct = {
      title: "Teclado mecanico",
      price: 150,
      stock: 20
    };

    const response = await request(app)
      .post('/api/products')
      .send(newProduct)

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.payload).toBeDefined();
    expect(response.body.payload.title).toBe("Teclado mecanico");
  });

  test('PUT /api/products/:pid deberia actualizar un producto existente', async() => {
    const updatedProduct = { title: "Mouse actualizado" };

    const response = await request(app)
      .put('/api/products/p1')
      .send(updatedProduct)

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.payload.title).toBe("Mouse actualizado");
  });

  test('DELETE /api/products/:pid deberia eliminar un producto existente', async() => {
    const response = await request(app).delete('/api/products/p1');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });

});