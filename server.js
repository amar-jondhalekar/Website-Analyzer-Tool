require('dotenv').config(); // Load environment variables
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = 3001;
const IPINFO_API_KEY = process.env.IPINFO_API_KEY; // Use environment variable for API key

// Enable CORS
app.use(cors({
    origin: 'http://127.0.0.1:3000'
}));

app.use(morgan('combined')); // Log requests

// Root route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Validate IP format
const isValidIP = (ip) => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);

// IP Info API endpoint
app.get('/api/ipinfo/:ip', async (req, res) => {
    const ip = req.params.ip;
    if (!isValidIP(ip)) {
        return res.status(400).json({ error: 'Invalid IP address format' });
    }
    try {
        const response = await axios.get(`https://ipinfo.io/${ip}?token=${IPINFO_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response received from IPInfo API' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server running at http://127.0.0.1:${PORT}`);
});
