const express = require("express");
const cors = require("cors");
const config = require("./app/config");
const setupContactRoutes = require("./app/routes/contact.routes");
const { BadRequestError } = require("./app/helpers/errors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

setupContactRoutes(app);

app.get("/", (req, res) => {
    res.json({
        message: "Hello world!"
    });
});

//handle 404 response
app.use((req, res, next) => {
    next(new BadRequestError(404, "Resource not found"));
});

//define error - handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});


const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Server is running !! ${PORT}`);
});