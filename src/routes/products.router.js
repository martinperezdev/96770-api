import { Router } from 'express';
import { getProducts, getProduct, createNewProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';

const router = Router();

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Obtener todos los productos
 *    description: Devuelve el listado completo de productos disponibles
 *    tags:
 *      - Products
 *    responses:
 *      200:
 *        description: Lista de productos obtenida correctamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductsResponse'
 */
router.get('/', getProducts);
/**
 * @swagger
 * /api/products/{pid}:
 *  get:
 *    summary: Obtener un producto por ID
 *    description: Devuelve un producto especifico a partir de su ID
 *    tags:
 *      - Products
 *    parameters:
 *      - in: path
 *        name: pid
 *        required: true
 *        description: ID del producto
 *        schema:
 *          type: string
 *        example: p1
 *    responses:
 *      200:
 *        description: Producto encontrado correctamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductResponse'
 *      404:
 *        description: Producto no encontrado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:pid', getProduct);
/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Crear un producto
 *    description: Crear un producto
 *    tags:
 *      - Products
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ProductInput'
 *    responses:
 *      201:
 *        description: Product created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductResponse'
 *      400:
 *        description: Invalid product data
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', createNewProduct);
/**
 * @swagger
 * /api/products/{pid}:
 *   put:
 *     summary: Actualizar un producto
 *     description: Actualiza un producto existente a partir de su ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: ID del producto a actualizar
 *         schema:
 *           type: string
 *         example: p1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:pid', updateProduct);
/**
 * @swagger
 * /api/products/{pid}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Elimina un producto existente a partir de su ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: string
 *         example: p1
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:pid', deleteProduct);

export default router;