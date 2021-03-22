const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routers = require("../routers/index.router");

                                      
app.use(cors());
app.use(bodyParser.urlencoded({ "extended": "true" }));            
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: "application/vnd.api+json" })); 

app.use(routers);

// Serve only the static files form the dist directory
app.use(express.static('./dist/PokedexWeb'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/PokedexWeb/'}),
);





module.exports = app;