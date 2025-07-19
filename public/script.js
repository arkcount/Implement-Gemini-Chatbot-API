const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const userMessage = input.value.trim();
    if (!userMessage) return;

    appeendMessage('user', userMessage);
    input.value = '';

    setTimeout(() => {
        appeendMessage('bot', 'Gemini is thinking...');
    }, 1000);

    // function appeendMessage(sender, message) {
    //     const msg = document.createElement('div');
    //     msg.classList.add('message', sender);
    //     msg.textContent = text;
    //     chatBox.appendChild(msg);
    //     chatBox.scrollTop = chatBox.scrollHeight;
    // }

    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            appendMessage('bot', data.reply);
        })
        .catch(error => {
            console.error('Error sending Message:', error);
            appendMessage('bot', 'Error: Could not get a response.');
        });
});
