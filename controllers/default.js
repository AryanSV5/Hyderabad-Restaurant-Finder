// Main controller for routes
const CONFIG = require('../config');
const https = require('https');

// Home page route
exports.install = function() {
    
    // Serve the main page
    ROUTE('GET /', function() {
        var self = this;
        self.layout('');
        self.view('index');
    });

    // API endpoint for chat
    ROUTE('POST /api/chat', chat, ['json']);
};

// Chat handler - communicates with Dify API
function chat() {
    
    const self = this;
    const body = self.body;
    const query = body.query;
    const conversationId = body.conversation_id || '';

    // Validate input
    if (!query || query.trim() === '') {
        self.json({ success: false, error: 'Query is required' });
        return;
    }

    // Validate configuration
    if (!CONFIG.dify.baseUrl || CONFIG.dify.baseUrl === 'YOUR_DIFY_API_BASE_URL') {
        self.json({ success: false, error: 'Dify API base URL not configured' });
        return;
    }

    if (!CONFIG.dify.apiKey || CONFIG.dify.apiKey === 'YOUR_DIFY_API_ACCESS_KEY') {
        self.json({ success: false, error: 'Dify API key not configured' });
        return;
    }

    // Prepare request to Dify API
    const requestBody = {
        inputs: {},
        query: query,
        response_mode: 'blocking',
        user: CONFIG.dify.user || 'default-user'
    };

    // Add conversation_id if it exists
    if (conversationId) {
        requestBody.conversation_id = conversationId;
    }

    const postData = JSON.stringify(requestBody);

    const options = {
        hostname: 'api.dify.ai',
        port: 443,
        path: '/v1/chat-messages',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + CONFIG.dify.apiKey,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                
                if (res.statusCode === 200) {
                    // Send response back to client
                    self.json({
                        success: true,
                        answer: response.answer || 'No response from AI',
                        conversation_id: response.conversation_id,
                        message_id: response.message_id
                    });
                } else {
                    console.error('Dify API Error:', res.statusCode, data);
                    self.json({ 
                        success: false, 
                        error: 'Failed to communicate with Dify API',
                        details: response
                    });
                }
            } catch (error) {
                console.error('Error parsing response:', error);
                self.json({ 
                    success: false, 
                    error: 'Failed to parse API response',
                    message: error.message
                });
            }
        });
    });

    req.on('error', (error) => {
        console.error('Request error:', error);
        self.json({ 
            success: false, 
            error: 'Failed to communicate with Dify API',
            details: error.message
        });
    });

    req.write(postData);
    req.end();
}
