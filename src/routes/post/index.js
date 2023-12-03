import express from 'express';
import {
	auditLogMiddleware,
	authenticate,
	validate,
} from '../../middleware/index.js';
import {
	createPost,
	deletePost,
	getPost,
	updatePost,
} from '../../validation/index.js';
import controllers from './controllers.js';
import { whoHasAccess } from '../../middleware/roleBaseAccessControl.js';
import { ROLE } from '../../constants/misc.js';

export const postRoute = express.Router();
/**
 * @swagger
 *     components:
 *       schemas:
 *         CreatePost:
 *           type: object
 *           properties:
 *             body:
 *               type: string
 *               example: John Doe
 *             userId:
 *               type: string
 *               example: 65663d1bdf4446e2a7544002
 *           required:
 *             - body
 *             - userId
 *         UpdatePost:
 *           type: object
 *           properties:
 *             body:
 *               type: string
 *               example: John Doe
 *           required:
 *             - body
 */

/**
 * @swagger
 * /post:
 *   post:
 *     tags:
 *       - Post
 *     summary: Create Post
 *     description: Creates a new Post account.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePost'
 *     responses:
 *       '201':
 *         description: Post created successfully.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 201
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

/**
 * @swagger
 * /post:
 *   get:
 *     tags:
 *       - Post
 *     summary: get all Posts
 *     description: get all Posts
 *     responses:
 *       '200':
 *         description: get all Posts successfully.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 200
 *                 response: Success
 *                 message: Some success message here
 *               data: []
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
postRoute
	.route('/')
	.post(
		auditLogMiddleware('Post create'),
		authenticate,
		whoHasAccess(ROLE.USER),
		validate(createPost),
		controllers.create
	)
	.get(auditLogMiddleware('Get ALl Posts'), controllers.getAll);

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     tags:
 *       - Post
 *     summary: Get Post by ID
 *     description: Retrieves Post information by their ID from the database.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Post
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved Post by ID.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 200
 *                 response: Success
 *                 message: Post retrieved successfully
 *               data: {}
 *       '400':
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 400
 *                 response: Bad Request
 *                 message: The provided ID is not a valid MongoDB ObjectID
 *               data: {}
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 500
 *                 response: Internal Server Error
 *                 message: An internal server error occurred
 *               data: {}
 */

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     tags:
 *       - Post
 *     summary: Delete Post by ID
 *     description: Delete Post information by their ID from the database.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Post
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully Deleted Post by ID.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 200
 *                 response: Success
 *                 message: Post Deleted successfully
 *               data: {}
 *       '400':
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 400
 *                 response: Bad Request
 *                 message: The provided ID is not a valid MongoDB ObjectID
 *               data: {}
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               meta:
 *                 status: 500
 *                 response: Internal Server Error
 *                 message: An internal server error occurred
 *               data: {}
 */

/**
 * @swagger
 * /post/{id}:
 *   put:
 *     tags:
 *       - Post
 *     summary: Update Post
 *     description: Update a Post account.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Post
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePost'
 *     responses:
 *       '200':
 *         description: Post Updated successfully.
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

postRoute
	.route('/:id')
	.get(
		auditLogMiddleware('post read'),
		authenticate,
		whoHasAccess(ROLE.USER),
		validate(getPost),
		controllers.read
	)
	.delete(
		auditLogMiddleware('post delete'),
		authenticate,
		whoHasAccess(ROLE.ADMIN),
		validate(deletePost),
		controllers.delete
	)
	.put(
		auditLogMiddleware('post update'),
		authenticate,
		whoHasAccess(ROLE.USER),
		validate(updatePost),
		controllers.update
	);
