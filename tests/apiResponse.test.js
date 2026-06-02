import { jest } from '@jest/globals';
import { successResponse, errorResponse } from '../src/utils/apiResponse.js';

//function para crear un objeto 'res' falso
function createMockResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }
};

describe('apiResponse helpers', () => {

  test('successResponse deberia enviar una respuesta exitosa con status 200, message, payload', () => {
    const res = createMockResponse();

    successResponse(res, {
      message: 'Products retrieved successfully',
      payload: [
        {
          title: "Monitor curvo",
          price: 100,
          stock: 8
        }
      ]
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Products retrieved successfully',
      payload: [
        {
          title: "Monitor curvo",
          price: 100,
          stock: 8
        }
      ]
    });
  });

  test('errorResponse deberia responder con estructura de error', () => {
    const res = createMockResponse();

    errorResponse(res, {
      statusCode: 404,
      message: 'Product not found'
    });

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Product not found'
    });
  });

});