import { logAction } from '../utils/index.js';

export const auditLogMiddleware = (action) => {
	return (req, res, next) => {
		logAction(req, action, 'info');
		next();
	};
};
