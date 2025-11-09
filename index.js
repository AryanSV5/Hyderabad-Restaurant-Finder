// Total.js application entry point
require('total4');

// Load configuration
const CONFIG = require('./config');

// Start the server
HTTP('release', { port: CONFIG.port || 3000 });

console.log('=================================');
console.log('Dify Restaurant Chatbot');
console.log('Server running on port:', CONFIG.port || 3000);
console.log('Open: http://localhost:' + (CONFIG.port || 3000));
console.log('=================================');
