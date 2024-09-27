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

function keepServerAlive() {

    console.log('Keeping the server alive...');
    let x = 0;

    const fetchActivationPatch = async () => {
        try {
            const response = await fetch('https://anotebookbackend.onrender.com/activate');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(x++)

        } catch (error) {
            console.error('Error fetching activation patch:', error);
        }
    };

    setInterval(() => {
        fetchActivationPatch();
    }, 780000);
}

app.get('/activate', (req, res) => {
    res.json({
        data: 'success',
        message: "Activation patch successfully fetched"
    })
})

app.listen(PORT, () => {
    keepServerAlive()
    console.log(`Server is running on PORT ${PORT}`);
});