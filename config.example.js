// Configuration file for Dify API integration
// Copy this file to config.js and add your actual API credentials
module.exports = {
    port: 3000,
    
    // Dify API Configuration
    dify: {
        baseUrl: 'https://api.dify.ai/v1',  // Your Dify API base URL
        apiKey: 'YOUR_DIFY_API_ACCESS_KEY',  // Your Dify API access key
        
        // Optional: User identifier for the chat session
        user: 'restaurant-seeker'
    }
};
