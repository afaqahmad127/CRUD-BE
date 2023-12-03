import express from 'express';
import {
	auditLogMiddleware,
	authenticate,
	validate,
} from '../../middleware/index.js';
import { login, signUp, updateUser } from '../../validation/index.js';
import { controllers } from './controllers.js';
import { whoHasAccess } from '../../middleware/index.js';
import { ROLE } from '../../constants/index.js';

export const authRoute = express.Router();

/**
 * @swagger
 *     components:
 *       schemas:
 *         SignUp:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: John Doe
 *             email:
 *               type: string
 *               example: johndoe@example.com
 *             password:
 *               type: string
 *               example: 123456
 *           required:
 *             - name
 *             - email
 *             - password
 *         Login:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: johndoe@example.com
 *             password:
 *               type: string
 *               example: 123456
 *           required:
 *             - email
 *             - password
 *         UpdateUser:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: john
 *           required:
 *             - name
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User Sign Up
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *       '201':
 *         description: User account created successfully.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 201
 *                 response: Success
 *                 message: Some success message here
 *               data: {}
 *       '409':
 *         description: Conflict - User account with the provided email already exists.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 409
 *                 response: Conflict
 *                 message: Some error message here
 *               data: {}
 *       '400':
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 400
 *                 response: Bad Request
 *                 message: Some error message here
 *               data: {}
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 500
 *                 response: Internal Server Error
 *                 message: Some error message here
 *               data: {}
 */

authRoute.post(
	'/signup',
	auditLogMiddleware('signUp'),
	validate(signUp),
	controllers.signUp
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User Login
 *     description: Give a QR CODE url and two factor auth enable or not?.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       '200':
 *         description: User information regarding two factor auth.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 200
 *                 response: Success
 *                 message: Some success message here
 *               data: {}
 *       '404':
 *         description: User account with the provided email already not found.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 404
 *                 response: Not found
 *                 message: Some error message here
 *               data: {}
 *       '400':
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 400
 *                 response: Bad Request
 *                 message: Some error message here
 *               data: {}
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 500
 *                 response: Internal Server Error
 *                 message: Some error message here
 *               data: {}
 */
authRoute.post(
	'/login',
	auditLogMiddleware('login'),
	validate(login),
	controllers.login
);
/**
 * @swagger
 * /auth/profile:
 *   get:
 *     tags:
 *       - Auth
 *     summary: User Profile
 *     description: Get User Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User Profile.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 200
 *                 response: Success
 *                 message: Some success message here
 *               data: {}
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 500
 *                 response: Internal Server Error
 *                 message: Some error message here
 *               data: {}
 */
authRoute.get(
	'/profile',
	auditLogMiddleware('profile'),
	authenticate,
	whoHasAccess(ROLE.USER),
	controllers.profile
);
/**
 * @swagger
 * /auth/{id}:
 *   delete:
 *     tags:
 *       - Auth
 *     summary: Delete User Account
 *     description: Delete User Profile
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description:  User Profile deleted.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 200
 *                 response: Success
 *                 message: Some success message here
 *               data: {}
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 500
 *                 response: Internal Server Error
 *                 message: Some error message here
 *               data: {}
 */

/**
 * @swagger
 * /auth/{id}:
 *   put:
 *     tags:
 *       - Auth
 *     summary: Update user
 *     description: Update a user account.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       '200':
 *         description: User Updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 200
 *                 response: Success
 *                 message: Some success message here
 *               data: {}
 *       '409':
 *         description: Conflict.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 409
 *                 response: Conflict
 *                 message: Some error message here
 *               data: {}
 *       '400':
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 400
 *                 response: Bad Request
 *                 message: Some error message here
 *               data: {}
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 500
 *                 response: Internal Server Error
 *                 message: Some error message here
 *               data: {}
 */

authRoute
	.route('/:id')
	.delete(
		auditLogMiddleware('delete user'),
		authenticate,
		whoHasAccess(ROLE.ADMIN),
		controllers.deleteUser
	)
	.put(
		auditLogMiddleware('update user'),
		authenticate,
		whoHasAccess(ROLE.USER),
		validate(updateUser),
		controllers.updateUser
	);
