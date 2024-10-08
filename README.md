# Website Analyzer Tool

This project is a **Website Analyzer Tool** built using **Node.js**, **Express**, and several third-party APIs such as **IPInfo**, **Whois**, and **Google PageSpeed Insights**. The tool allows users to analyze various aspects of a website, such as IP information, domain details, website performance, and basic SEO checks.

#Author 
    -Amar Jondhalekar 
    
## Features

- **IP & Location Info**: Uses the IPInfo API to retrieve the IP address, location, and organization details of a website.
- **Domain Info**: Uses the Whois API to fetch domain registration details, including the registrar, creation date, and update date.
- **Performance Info**: Leverages Google's PageSpeed Insights API to assess website performance metrics like performance score, speed index, and time to first contentful paint.
- **SEO Analysis**: Provides a basic SEO analysis based on meta tags and other key elements.

## Project Structure

```
your-project/
├── public/
│   ├── index.html            # Frontend UI
│   ├── script.js             # Client-side logic and API interaction
│   └── style.css             # Styling for the UI
├── server.js                 # Main server file (Express server with HTTPS support)
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Locked versions of dependencies
└── .env                      # Environment variables (API keys, port, etc.)
```

## Prerequisites

Before running the project, ensure you have the following:

- **Node.js** installed (v14+ recommended)
- **OpenSSL** installed (for HTTPS with a self-signed certificate)
- API keys from:
  - [IPInfo](https://ipinfo.io/)
  - [Whois XML API](https://whoisxmlapi.com/)
  - [Google PageSpeed](https://developers.google.com/speed/docs/insights/v5/get-started)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/website-analyzer-tool.git
   cd website-analyzer-tool
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Generate a self-signed SSL certificate (for local HTTPS):

   ```bash
   openssl req -nodes -new -x509 -keyout server.key -out server.cert
   ```

4. Add your environment variables in a `.env` file:

   ```bash
   IPINFO_API_KEY=your_ipinfo_api_key
   WHOIS_API_KEY=your_whois_api_key
   PAGESPEED_API_KEY=your_pagespeed_api_key
   PORT=3001
   ```

## Running the Application

To start the server:

```bash
npm start
```

The server will start on **https://localhost:3001**.

To test the functionality:

1. Open the browser and go to **https://localhost:3001**.
2. Enter a website URL in the input field and click "Analyze."
3. The results for IP info, domain info, website performance, and SEO analysis will be displayed.

## Handling Self-Signed Certificate Warnings

Since you're using a self-signed certificate for local development, you might encounter SSL warnings in your browser. To bypass this:

- Trust the certificate manually by importing it into your browser (see detailed instructions in the [docs](https://developer.mozilla.org/en-US/docs/Mozilla/Security/Server-side_TLS#manually_managing_certificates_for_testing)).
  
For production environments, use a certificate from a trusted Certificate Authority (CA).

## Known Issues

- **SSL Protocol Error**: If using a self-signed certificate, ensure you’ve trusted the certificate in your browser.
- **API Rate Limits**: Be mindful of rate limits on the third-party APIs. You may need to upgrade to higher plans depending on usage.

## Future Enhancements

- **Detailed SEO Analysis**: Add more sophisticated SEO checks (meta descriptions, alt text for images, etc.).
- **UI Enhancements**: Improve the design of the results display.
- **Error Handling Improvements**: Provide more detailed error messages for API failures.
