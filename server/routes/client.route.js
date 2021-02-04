const express = require("express");
const {
  remove,
  update,
  create,
  get,
  getAll,
} = require("../controllers/client.controller.js");

const router = express.Router();

/**
 * @swagger
 * /client:
 *    post:
 *      description: Api for add client
 *      consumes:
 *       - application/json
 *      produces:
 *       - application/json
 *      parameters:
 *       - in: body
 *         name: create
 *         description: For client create
 *         schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              budget:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    description:
 *                      type: string
 *                    cost:
 *                      type: integer
 *      responses:
 *        200:
 *          description: Successfully response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.post("/", create);

/**
 * @swagger
 * /client/{id}:
 *    put:
 *      description: Api for update client
 *      consumes:
 *       - application/json
 *      produces:
 *       - application/json
 *      parameters:
 *       - name: id
 *         in: path
 *         description: client id
 *         required: true
 *         type: integer
 *       - in: body
 *         name: update
 *         description: For client update
 *         schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              budget:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                    description:
 *                      type: string
 *                    cost:
 *                      type: integer
 *                    delete:
 *                      type: boolean
 *                      default: false
 *      responses:
 *        200:
 *          description: Successfully response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.put("/:id", update);

/**
 * @swagger
 * /client/{id}:
 *    delete:
 *      description: remove client
 *      consumes:
 *       - application/json
 *      produces:
 *       - application/json
 *      parameters:
 *       - name: id
 *         in: path
 *         description: client id
 *         required: true
 *         type: integer
 *      responses:
 *        200:
 *          description: Successfully response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.delete("/:id", remove);

/**
 * @swagger
 * /client/{id}:
 *    get:
 *      description: get client by id
 *      consumes:
 *       - application/json
 *      produces:
 *       - application/json
 *      parameters:
 *       - name: id
 *         in: path
 *         description: client id
 *         required: true
 *         type: integer
 *      responses:
 *        200:
 *          description: Successfully response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.get("/:id", get);

/**
 * @swagger
 * /client:
 *    get:
 *      description: get all clients
 *      consumes:
 *       - application/json
 *      produces:
 *       - application/json
 *      parameters:
 *       - name: limit
 *         in: query
 *         description: limit for list
 *         required: true
 *         type: integer
 *       - name: offset
 *         in: query
 *         description: offset for list
 *         required: true
 *         type: integer
 *      responses:
 *        200:
 *          description: Successfully response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.get("/", getAll);

module.exports = router;
