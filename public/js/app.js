// Chat application JavaScript
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const messagesContainer = document.getElementById('messages');
const sendBtn = document.getElementById('sendBtn');
const sendBtnText = document.getElementById('sendBtnText');
const sendBtnLoader = document.getElementById('sendBtnLoader');

let conversationId = null;

// Handle form submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    userInput.value = '';
    
    // Disable send button
    setLoading(true);

    try {
        // Send message to backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: message,
                conversation_id: conversationId
            })
        });

        if (!response.ok) {
            throw new Error('Failed to get response from server');
        }

        const data = await response.json();
        
        // Update conversation ID if provided
        if (data.conversation_id) {
            conversationId = data.conversation_id;
        }

        // Add bot response to chat
        if (data.answer) {
            addMessage(data.answer, 'bot');
        } else {
            throw new Error('No answer received');
        }

    } catch (error) {
        console.error('Error:', error);
        showError('Sorry, something went wrong. Please try again.');
    } finally {
        setLoading(false);
    }
});

// Add message to chat interface
function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (type === 'bot') {
        contentDiv.innerHTML = `<strong>Assistant:</strong> ${escapeHtml(text)}`;
    } else {
        contentDiv.textContent = text;
    }
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    messagesContainer.appendChild(errorDiv);
    
    // Remove error after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Toggle loading state
function setLoading(loading) {
    sendBtn.disabled = loading;
    userInput.disabled = loading;
    
    if (loading) {
        sendBtnText.style.display = 'none';
        sendBtnLoader.style.display = 'inline-block';
    } else {
        sendBtnText.style.display = 'inline';
        sendBtnLoader.style.display = 'none';
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Auto-focus on input
userInput.focus();
