// Import the express module
import express from 'express';

// Create an instance of an express app
const app = express();

// Define a port number for the server to listen on
const PORT = 3000;

// Create an array to store orders
const orders = [];

// Enable static file serving
app.use(express.static('public'));

// Add "middleware" to allow the app to parse form data
// Access form data through req.body
app.use(express.urlencoded({extended: true}));

// Define a default route ("/")
app.get('/', (req, res) => {
    // res.send('Welcome to Pete\'s \'Za');
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

// Add a contact route to display a contact view page
app.get('/contact-us', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/contact.html`);
});

app.get('/confirm', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirm.html`);
});

app.get('/menu', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/menu.html`);
});

app.post('/submit-order', (req, res) => {

    // Create a JSON object to store order data
    const order = req.body;
    order['timestamp'] = new Date();

    // Add order object to orders array
    orders.push(order);

    console.log(orders);

    // Display confirmation page
    res.sendFile(`${import.meta.dirname}/views/confirm.html`);
});

// Add an admin route
app.get('/admin', (req, res) => {
    res.send(orders);
});

// Start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});