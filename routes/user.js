const route = require("express").Router({ mergeParams: true }); // create route

// import controller
const { userController, authController } = require("../controller");

// define route
route.get("/", userController.getUsers);
route.post("/", userController.addUser);
route.put("/updateclass", userController.updateUsersClass);
route.put(
  "/counseling",
  authController.isAuthenticated,
  userController.id.counseling
);
route.put("/:_id", userController.id.updateUser);
route.delete("/:_id", userController.id.deleteUser);
route.get(
  "/siswamasalah",
  authController.isAuthenticated,
  userController.getSiswaMasalah
);
route.get("/:userid", userController.id.getUser);

module.exports = route;

// documentation

/**
 * @swagger
 * tags:
 *  name: User
 *  descripiton: user managing API
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    user:
 *      type: object
 *      required:
 *        - userId
 *        - name
 *        - address
 *        - role
 *        - email
 *        - password
 *        - status
 *      properties:
 *        userId:
 *          type: string
 *        name:
 *          type: string
 *        address:
 *          type: object
 *          required:
 *            - zipcode
 *          properties:
 *            zipcode:
 *              type: number
 *            street:
 *              type: string
 *        role:
 *          type: number
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        status:
 *          type: bool
 *      example:
 *        userId: sis1606018
 *        name: sisdong
 *        address:
 *            zipcode: 44184
 *            street: kp.sukabarang lalalal jawa barat
 *        role: 1
 *        email: siswa1@skl.ac.id
 *        password: 11223344
 *        status: true
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * /user:
 *  get:
 *    summary: returns all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: return all users
 *        content:
 *           application/json:
 *            example: {
 *                      "meta": { "success": true, "message": "get data users", "info": { "limit": 10, "offset": 1, "total": 25 } },
 *                      "data": [{ "userId": "sis1606018", "address": { "zipcode": 44184, "street": "kp.sukabarang lalalal jawa barat" }, "role": 1, "email": "siswa1@skl.ac.id", "password": 11223344, "status": true }]
 *                     }
 *      500:
 *        description: some error server
 */

/**
 * @swagger
 * /user/{userid}:
 *  get:
 *    summary: returns specific user by user id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: userid
 *        schema:
 *          type: string
 *          required: true
 *        description: user id
 *    responses:
 *      200:
 *        description: returns specific user by user id
 *        content:
 *           application/json:
 *            example: {
 *                      "meta": { "success": true, "message": "get data user", "info": { "limit": -1, "offset": -1, "total": 1 } },
 *                      "data": { "userId": "sis1606018", "address": { "zipcode": 44184, "street": "kp.sukabarang lalalal jawa barat" }, "role": 1, "email": "siswa1@skl.ac.id", "password": 11223344, "status": true }
 *                     }
 *      400:
 *        description: returns update user
 *        content:
 *           application/json:
 *            example: {"meta": { "success": false, "message": "user not found"}, "data":null }
 *      500:
 *        description: some error server
 */

/**
 * @swagger
 * /user:
 *  post:
 *    summary: create new user
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/user'
 *    responses:
 *      200:
 *        description: returns specific user by user id
 *        content:
 *           application/json:
 *            example: {
 *                      "meta": { "success": true, "message": "add user succesful", "info": { "limit": -1, "offset": -1, "total": 1 } },
 *                      "data": { "userId": "sis1606018", "address": { "zipcode": 44184, "street": "kp.sukabarang lalalal jawa barat" }, "role": 1, "email": "siswa1@skl.ac.id", "password": 11223344, "status": true }
 *                     }
 *      500:
 *        description: some error server
 */

/**
 * @swagger
 * /user/{_id}:
 *  put:
 *    summary: update user
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: _id
 *        schema:
 *          type: string
 *          required: true
 *        description: id from auto generate db not userId
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/user'
 *    responses:
 *      200:
 *        description: returns update user
 *        content:
 *           application/json:
 *            example: {
 *                      "meta": { "success": true, "message": "get data user", "info": { "limit": -1, "offset": -1, "total": 1 } },
 *                      "data": { "userId": "sis1606018", "address": { "zipcode": 44184, "street": "kp.sukabarang lalalal jawa barat" }, "role": 1, "email": "siswa1@skl.ac.id", "password": 11223344, "status": true }
 *                     }
 *      400:
 *        description: returns error bad request
 *        content:
 *           application/json:
 *            example: {"meta": { "success": false, "message": "_id not valid value"}, "data":null }
 *      500:
 *        description: some error server
 */

/**
 * @swagger
 * /user/{_id}:
 *  delete:
 *    summary: delete specific user by _id
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: _id
 *        schema:
 *          type: string
 *          required: true
 *        description: id from auto generate db not userId
 *    responses:
 *      200:
 *        description: delete specific user by _id
 *        content:
 *           application/json:
 *            example: {
 *                      "meta": { "success": true, "message": "delete succesful", "info": { "limit": -1, "offset": -1, "total": 1 } },
 *                      "data": { "userId": "sis1606018", "address": { "zipcode": 44184, "street": "kp.sukabarang lalalal jawa barat" }, "role": 1, "email": "siswa1@skl.ac.id", "password": 11223344, "status": true }
 *                     }
 *      400:
 *        description: returns error bad request
 *        content:
 *           application/json:
 *            example: {"meta": { "success": false, "message": "user not found"}, "data":null }
 *      500:
 *        description: some error server
 */

/**
 * @swagger
 * /user:
 *  put:
 *    summary: update users class
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              required:
 *                - ids
 *                - class
 *              properties:
 *                ids:
 *                  type: array
 *                class:
 *                  type: string
 *              example:
 *                ids: ['60632a85d781b026fcabe82c','605ae2a410e3b94344866d66']
 *                class: infc
 *    responses:
 *      200:
 *        description: returns update user
 *        content:
 *           application/json:
 *      400:
 *        description: returns error bad request
 *        content:
 *           application/json:
 *            example: {"meta": { "success": false, "message": "_id not valid value"}, "data":null }
 *      500:
 *        description: some error server
 */

/**
 * @swagger
 * /user/siswamasalah:
 *  get:
 *    summary: get siswa masalah
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: return all users
 *        content:
 *           application/json:
 *            example: {
 *                      "meta": { "success": true, "message": "get data users", "info": { "limit": 10, "offset": 1, "total": 25 } },
 *                      "data": [{ "userId": "sis1606018", "address": { "zipcode": 44184, "street": "kp.sukabarang lalalal jawa barat" }, "role": 1, "email": "siswa1@skl.ac.id", "password": 11223344, "status": true }]
 *                     }
 *      500:
 *        description: some error server
 */

/**
 * @swagger
 * /user/counseling:
 *  put:
 *    summary: add counseling user
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              required:
 *                - _id
 *                - counseling
 *              properties:
 *                _id:
 *                  type: string
 *                counseling:
 *                  type: string
 *                status:
 *                  type: string
 *              example:
 *                _id: 60632a85d781b026fcabe82c
 *                counseling: susah diatur
 *                status: pass
 *    responses:
 *      200:
 *        description: returns update user
 *        content:
 *           application/json:
 *      400:
 *        description: returns error bad request
 *        content:
 *           application/json:
 *            example: {"meta": { "success": false, "message": "_id not valid value"}, "data":null }
 *      500:
 *        description: some error server
 */
