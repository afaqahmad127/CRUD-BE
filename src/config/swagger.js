import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config from '../config/index.js';

export const swaggerSetup = (app) => {
	/** SWAGGER IMPLEMENTATION */
	const options = {
		definition: {
			openapi: '3.1.0',
			info: {
				title: 'APIS',
				version: '0.1.0',
				description: 'This is a documentation with Swagger',
			},
			servers: [
				{
					name: 'Development',
					url: `http://localhost:${config.env.port}`,
				},
			],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT',
					},
				},
			},
		},
		apis: ['./src/routes/**/*.js'],
	};

	const specs = swaggerJsdoc(options);
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
