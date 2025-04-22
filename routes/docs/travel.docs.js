/**
 * @swagger
 * tags:
 *   name: Travels
 *   description: end points para la gestión de viajes
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Travels:
 *       type: object
 *       required:
 *         - destino
 *         - presupuesto
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the users
 *         destino:
 *           type: string
 *           description: The travel's destination
 *         presupuesto:
 *           type: integer
 *           description: The travel's budget
 *       example:
 *         destino: paris
 *         presupuesto: 1000
 */

/**
 * @swagger
 * /api/travels:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Obtener todos los viajes
 *     tags: [Travels]
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 next:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 2
 *                     items:
 *                       type: integer
 *                       example: 10
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Travels'
 *       '400':
 *         description: Error al obtener los viajes
 */


/**
 * @swagger
 * /api/create_travels:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Crear un nuevo viaje
 *     tags: [Travels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *                $ref: '#/components/schemas/Travels'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Travels'
 *       '400':
 *         description: Error al crear un viaje
 */

/**
 * @swagger
 * /api/update_travel/{id}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     summary: Actualizar un viaje
 *     tags: [Travels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The travel's id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *                $ref: '#/components/schemas/Travels'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Travels'
 *       '400':
 *         description: Error al actualizar el viaje
 */

/**
 * @swagger
 * /api/delete_travel/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     summary: Eliminar un viaje
 *     tags: [Travels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The travel's id
 *     responses:
 *       '204':
 *         description: Success
 *       '400':
 *         description: Error al obtener los viajes
 */