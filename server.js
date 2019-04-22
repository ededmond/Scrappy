require('dotenv').config();
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3333;

const logger = require("morgan");
const app = express();

const db = require("./models");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(require('./routes/htmlRoutes')(db));
app.use('/api', require('./routes/apiRoutes')(db));

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});