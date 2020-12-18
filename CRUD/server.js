const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');
const usersRoute = require('./routes/users.routes');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "CRUD USER API",
            description: "CRUD Class",
            contact: {
                name: "daniela ocampo"
            },
        }
    },
    apis: ["routes/users.routes.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log("mireee")
console.log(swaggerDocs);
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/users', usersRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const port = process.env.PORT || 4000;
app.get('/', function(req, res) {
    res.json({ "hello": "world" });
});
const server = app.listen(port, function() {
    console.log('Listening on port ' + port);
});