import express from 'express';

// routes
import { authRoute } from './auth/index.js';
import { postRoute } from './post/index.js';

const protectedRouter = express.Router();
const unProtectedRouter = express.Router();

// Protected Routes
// protectedRouter.use("/product", productRoute);

// Un-Protected Routes
unProtectedRouter.use('/auth', authRoute);
unProtectedRouter.use('/post', postRoute);

export { protectedRouter, unProtectedRouter };
