const route = require("express").Router({ mergeParams: true }); // create route

// import controller
const { authController } = require("../controller");

route.post("/login", authController.login);

module.exports = route;

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  descripiton: Authentication API
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: login user
 *    tags: [Authentication]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *    responses:
 *      200:
 *        description: returns specific user by user id
 *        content:
 *           application/json:
 *            example: {
 *                      "meta": { "success": true, "message": "login succesful", "info": { "limit": -1, "offset": -1, "total": 1 } },
 *                      "data": {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVhZTI5MzEwZTNiOTQzNDQ4NjZkNjUiLCJ1c2VySWQiOiJiazEiLCJuYW1lIjoiYmsgMSIsImVtYWlsIjoiYmsxQG1haWwuY29tIiwicm9sZSI6MywiaWF0IjoxNjE3NzEzNjk4LCJleHAiOjE2MTc3NDI0OTh9.dXxC0q9KO1Nz36jx9dEeF40Kz3AVSMIFkmbnD-ztGfY"}
 *                      }
 *      400:
 *        description: returns error bad request
 *        content:
 *           application/json:
 *            example: {"meta": { "success": false, "message": "email required"}, "data":null }
 *      500:
 *        description: some error server
 */
