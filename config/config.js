var config = {
	port: process.env.DB_URL || 3000,
	db: process.env.MONGOLAB_URI || "mongodb://localhost/pokedex",
	test_port: 2001,
	test_db: "mongodb://localhost/pokedex"
};
module.exports = config;