// Import the express module
import express from 'express';

// Create an instance of an express app
const app = express();

// Define a port number for the server to listen on
const PORT = 3000;

// Enable static file serving
app.use(express.static('public'));

// Define a default route ("/")
app.get('/', (req, res) => {
    // res.send('Welcome to Pete\'s \'Za');
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

// Start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});