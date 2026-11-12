// Import the express module
import express from 'express';

// Import mySQL
import mysql2 from 'mysql2';

// Import .env
import dotenv from 'dotenv';
dotenv.config();

// Create a connection pool
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

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

// Create a testing route
app.get('/db-test', async(req, res) => {
    try {
        const [orders] = await pool.query('SELECT * FROM orders ORDER BY timestamp DESC');
        res.send(orders);
    } catch(err) {
        console.error('Database error: ', err);
        res.status(500).sendStatus('Database error occurred.');
    }
});

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

app.post('/submit-order', async(req, res) => {

    // Create a JSON object to store order data
    const order = req.body;
    order.timestamp = new Date();

    // Convert toppings array to a comma-delimited string
    order.toppings = Array.isArray(order.toppings) ?
        order.toppings.join(", ") : "";

    // Define an SQL query to INSERT new order
    const sql = `INSERT INTO orders 
                (fname, lname, email, size, method, toppings, comment)
                VALUES(?, ?, ?, ?, ?, ?, ?)`

    // Create an array of parameters from order data
    const params = [
        order.fname,
        order.lname,
        order.email,
        order.size,
        order.method,
        order.toppings,
        order.comment
    ];
    
    // Execute the query
    const [result] = await pool.execute(sql, params);

    // Get the id from the newly inserted row
    order.id = result.insertId;

    // Display confirmation page
    res.render('confirm', {order});
});

// Add an admin route
app.get('/admin', async(req, res) => {
    try {
        const [orders] = await pool.query('SELECT * FROM orders ORDER BY timestamp DESC');
        res.render('admin', {orders});
    } catch(err) {
        console.error('Database error: ', err);
        res.status(500).sendStatus('Database error occurred.');
    }
});

// Start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});