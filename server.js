const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const elasticClient = require('./elasticsearch');
const studentsRoute = require('./routes/students.route');

const app = express();

const PORT = process.env.PORT || 5000;

// Increase the limit for URL-encoded and JSON bodies
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(express.json({ limit: '500mb' })); // Set limit for JSON bodies
app.use(morgan('tiny'));

app.use(cors({
    origin: "*",
}));

elasticClient.info()
    .then(response => console.log(response.tagline))
    .catch(error => console.error(error));

app.use('/', studentsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});