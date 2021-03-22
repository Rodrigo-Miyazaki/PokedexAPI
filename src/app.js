const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routers = require("../routers/index.router");
const path = require('path');
                                      
app.use(cors());
app.use(bodyParser.urlencoded({ "extended": "true" }));            
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: "application/vnd.api+json" })); 

console.log(__dirname)
app.use(express.static(path.join(__dirname, '../routers')));
console.log()
app.use(routers);







module.exports = app;