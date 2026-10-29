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

app.set('view engine', 'ejs');

// Define a default route ("/")
app.get('/', (req, res) => {
    // res.send('Welcome to Pete\'s \'Za');
    res.render('home');
});

// Add a contact route to display a contact view page
app.get('/contact-us', (req, res) => {
    res.render('contact');
});

// app.get('/confirm', (req, res) => {
//     res.render('confirm');
// });

app.get('/menu', (req, res) => {
    res.render('menu');
});

app.post('/submit-order', (req, res) => {

    // Create a JSON object to store order data
    const order = req.body;
    order['timestamp'] = new Date();

    // Add order object to orders array
    orders.push(order);

    console.log(orders);

    // Display confirmation page
    res.render('confirm', {order});
});

// Add an admin route
app.get('/admin', (req, res) => {
    res.render('admin', {orders});
});

// Start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});