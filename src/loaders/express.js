import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { protectedRouter, unProtectedRouter } from '../routes/index.js';

export default async function expressLoader({ app }) {
	app.use(cors());
	app.use(helmet());

	app.use(express.json());
	app.use(bodyParser.json());
	// Apply the rate limiting middleware to all requests
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
			standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
			legacyHeaders: false, // Disable the `X-RateLimit-*` headers
		})
	);

	app.get('/', (req, res, next) => {
		res.redirect('/api-docs');
		next();
	});
	app.use('/api', protectedRouter);
	app.use('/', unProtectedRouter);
}
