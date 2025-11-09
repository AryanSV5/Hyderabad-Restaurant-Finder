# Dify Restaurant Chatbot

A web application built with Total.js framework that integrates with Dify AI to help users find restaurants in Hyderabad based on cuisine preferences.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/dify-restaurant-chatbot.git
cd dify-restaurant-chatbot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Dify API Credentials

Copy the example config file and add your credentials:

```bash
cp config.example.js config.js
```

Then open `config.js` and replace the placeholder values with your actual Dify API credentials:

```javascript
dify: {
    baseUrl: 'https://api.dify.ai/v1',  // Your Dify API base URL
    apiKey: 'YOUR_DIFY_API_ACCESS_KEY'  // Your actual API key from Dify
}
```

### 4. Run the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The application will be available at: `http://localhost:3000`

## Project Structure

```
Dify Bot/
├── controllers/          # Route controllers
│   └── default.js       # Main controller with API integration
├── views/               # HTML templates
│   └── index.html       # Chat interface
├── public/              # Static assets
│   ├── css/
│   │   └── style.css    # Styling
│   └── js/
│       └── app.js       # Frontend JavaScript
├── config.js            # Configuration file
├── index.js             # Application entry point
└── package.json         # Dependencies
```

## How It Works

1. User enters a cuisine query (e.g., "Italian restaurants")
2. Frontend sends the query to `/api/chat` endpoint
3. Backend controller forwards the request to Dify API
4. Dify processes the query through your chatflow
5. Response is returned and displayed in the chat interface
6. Conversation context is maintained across messages

## Dify API Integration

The application uses the Dify Chat API with the following features:
- Blocking response mode for immediate replies
- Conversation ID tracking for context
- User identification for session management

## Customization

- **Port**: Change the port in `config.js` (default: 3000)
- **Styling**: Modify `public/css/style.css`
- **UI Text**: Update `views/index.html`
- **API Logic**: Edit `controllers/default.js`

## Troubleshooting

If you encounter issues:
1. Ensure your Dify API credentials are correct in `config.js`
2. Check that your Dify chatflow is published and accessible
3. Verify the API base URL format (should end with `/v1`)
4. Check console for error messages

## Requirements

- Node.js 12 or higher
- Active Dify account with API access
- Published Dify chatflow application

## Support

For issues related to:
- Total.js framework: https://www.totaljs.com/
- Dify platform: https://dify.ai/

## License

MIT
