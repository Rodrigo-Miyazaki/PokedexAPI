var config = {
	port: process.env.PORT || 3000,
	db: process.env.MONGODB_URI  || "mongodb+srv://admin:xzeEGlTqaiun2gCi@cluster0.fvahm.mongodb.net/pokedex?retryWrites=true&w=majority",
	test_port: 2001,
	test_db: "mongodb://localhost/pokedex"
};
module.exports = config;