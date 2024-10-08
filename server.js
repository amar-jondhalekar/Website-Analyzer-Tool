const fs = require('fs');
const https = require('http');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a simple route to serve an HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define the paths to your key and certificate
const serverOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH || 'C:\\Program Files\\OpenSSL-Win64\\bin\\server.key'),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH || 'C:\\Program Files\\OpenSSL-Win64\\bin\\server.cert'),
};

// Add this route in your server.js file
app.get('/api/ipinfo/:domain', async (req, res) => {
    const domain = req.params.domain;

    // Use the IPInfo API to fetch the IP information
    try {
        const response = await fetch(`http://ipinfo.io/${domain}/json?token=${IPINFO_API_KEY}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch IP information' });
    }
});


// Create the HTTPS server
const server = http.createServer(serverOptions, app);

// Start the server with error handling
const PORT = process.env.PORT || 3001;
server.listen(PORT, (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    } else {
        console.log(`Server is running at https://localhost:${PORT}`);
    }
});
