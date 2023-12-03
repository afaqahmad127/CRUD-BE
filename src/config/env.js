const environment = {
	port: process.env.PORT || 2023,
	nodeEnv: process.env.NODE_ENV || 'development',
	mongodbUri: process.env.DB_URI || 'mongodb://0.0.0.0:27017/CRUD',
	jwtSecret: process.env.JSON_WEB_TOKEN || 'CRUD_BY_Sr_Software_Engineer_MERN',
};

export default environment;
