const IPINFO_API_KEY = ''; // Your IPInfo API key
const WHOIS_API_KEY = ''; // Your Whois API key
const PAGESPEED_API_KEY = ''; // Your PageSpeed API key

// Get DOM elements
const analyzeBtn = document.getElementById('analyzeBtn');
const websiteInput = document.getElementById('website');
const resultsDiv = document.getElementById('results');

// Analyze button click event
analyzeBtn.addEventListener('click', () => {
    let website = websiteInput.value.trim();
    if (website) {
        // Basic URL validation and correction
        if (!/^https?:\/\//i.test(website)) {
            website = 'http://' + website; // Prepend HTTP if missing
        }
        resultsDiv.innerHTML = `<p>Analyzing ${website}...</p>`;
        getWebsiteInfo(website);
    } else {
        alert('Please enter a website URL');
    }
});

// Fetch all website data
async function getWebsiteInfo(website) {
    try {
        const ipInfo = await getIPInfo(website);
        const domainInfo = await getDomainInfo(website);
        const pageSpeedInfo = await getPageSpeed(website);
        const seoAnalysis = analyzeSEO(website);

        displayResults(ipInfo, domainInfo, pageSpeedInfo, seoAnalysis);
    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = `<p>Sorry, something went wrong. ${error.message}</p>`;
    }
}

// IP and DNS Info using IPinfo API
async function getIPInfo(website) {
    const domain = extractDomain(website);
    const response = await fetch(`https://127.0.0.1:3001/api/ipinfo/${domain}`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch IP information: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country,
        org: data.org,
    };
}

// Domain Name Info using Whois API
async function getDomainInfo(website) {
    const response = await fetch(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${WHOIS_API_KEY}&domainName=${website}&outputFormat=JSON`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch domain information: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
        domainName: data.WhoisRecord.domainName,
        registrar: data.WhoisRecord.registrarName,
        createdDate: data.WhoisRecord.createdDateNormalized,
        updatedDate: data.WhoisRecord.updatedDateNormalized,
    };
}

// Website Performance using Google PageSpeed API
async function getPageSpeed(website) {
    const response = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${website}&key=${PAGESPEED_API_KEY}`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch page speed information: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
        performanceScore: data.lighthouseResult.categories.performance.score * 100,
        firstContentfulPaint: data.lighthouseResult.audits['first-contentful-paint'].displayValue,
        speedIndex: data.lighthouseResult.audits['speed-index'].displayValue,
    };
}

// Basic SEO Analysis
function analyzeSEO(website) {
    const tags = document.querySelectorAll('meta');
    const seoScore = tags.length > 5 ? 'Good' : 'Needs Improvement';
    return { seoScore };
}

// Display results in the UI
function displayResults(ipInfo, domainInfo, pageSpeedInfo, seoAnalysis) {
    resultsDiv.innerHTML = `
        <div class="result-item">
            <h3>IP and Location Info</h3>
            <p>IP Address: ${ipInfo.ip}</p>
            <p>Location: ${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country}</p>
            <p>Organization: ${ipInfo.org}</p>
        </div>
        <div class="result-item">
            <h3>Domain Info</h3>
            <p>Domain Name: ${domainInfo.domainName}</p>
            <p>Registrar: ${domainInfo.registrar}</p>
            <p>Created Date: ${domainInfo.createdDate}</p>
            <p>Updated Date: ${domainInfo.updatedDate}</p>
        </div>
        <div class="result-item">
            <h3>Performance Info</h3>
            <p>Performance Score: ${pageSpeedInfo.performanceScore}</p>
            <p>First Contentful Paint: ${pageSpeedInfo.firstContentfulPaint}</p>
            <p>Speed Index: ${pageSpeedInfo.speedIndex}</p>
        </div>
        <div class="result-item">
            <h3>SEO Analysis</h3>
            <p>SEO Score: ${seoAnalysis.seoScore}</p>
        </div>
    `;
}

// Helper function to extract domain from URL
function extractDomain(url) {
    try {
        const domain = new URL(url).hostname;
        return domain;
    } catch (error) {
        throw new Error('Invalid URL format. Please enter a valid website URL.');
    }
}
