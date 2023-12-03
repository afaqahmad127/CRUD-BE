import winston from 'winston';

// Define the logger configuration
const auditLogger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
	transports: [
		new winston.transports.File({
			filename: 'src/audit/info.audit.log',
			level: 'info',
		}), // Log to a file
		new winston.transports.File({
			filename: 'src/audit/error.audit.log',
			level: 'error',
		}), // Log to a file
	],
});

// Create a middleware to log user actions
export const logAction = (req, action, status, data) => {
	const { user } = req; // Assuming you've set the user in the request object after authentication
	if (status === 'info') {
		auditLogger[status]({
			timestamp: new Date().toISOString(),
			user: user?.email || null, // Adjust as needed based on your authentication setup
			action,
			url: req.originalUrl,
			path: req.path,
			method: req.method,
			ip: req.ip,
		});
	} else if (status === 'error') {
		auditLogger[status]({
			timestamp: new Date().toISOString(),
			user: user?.email || null, // Adjust as needed based on your authentication setup
			action,
			url: req.originalUrl,
			path: req.path,
			method: req.method,
			data,
			ip: req.ip,
		});
	}
};
