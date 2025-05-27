// Async function fetches a random quote from the server
async function fetchQuote() {
    try {
        // Fetch data from the backend at the specified URL
        const response = await fetch('https://nadika-zavodovska-quote-server.hosting.codeyourfuture.io/quote');
        
        // Convert the response from the server into JSON
        const data = await response.json();
        // Add the text of the quote and author from the data to the quote and author elements
        document.getElementById('quote').innerText = `"${data.quote}"`;
        document.getElementById('author').innerText = `— ${data.author}`;
    } catch (error) {
        // If there's an error, log it to the console
        console.error('Error fetching quote:', error);
    }
}

// When the button with id 'new-quote' is clicked, clear the status message and call the fetchQuote function
document.getElementById('new-quote').addEventListener('click', () => {
    document.getElementById('form-status-message').textContent = '';
    fetchQuote();
});

// #region Form add a new quote 
// Add addEventListener when click on submit button 
document.getElementById('quote-form').addEventListener('submit', async function (e) {
    // Stop page from reloading 
    e.preventDefault();
    // Get texts from quote, author inputs, and status message field
    const quote = document.getElementById('new-quote-text').value.trim();
    const author = document.getElementById('new-quote-author').value.trim();
    const statusMessage = document.getElementById('form-status-message');

    // Display red alert message, if quote or author fields are empty 
    if (!quote || !author) {
        statusMessage.textContent = 'Quote and author fields are required.';
        statusMessage.style.color = 'red';
        return;
    }

    // Sending the quote and author to the server 
    try {
        const response = await fetch(
            'https://nadika-zavodovska-quote-server.hosting.codeyourfuture.io/quote',
            {
                method: 'POST',
                // Send data in JSON
                headers: { 'Content-Type': 'application/json' },
                // Convert our data to JSON string
                body: JSON.stringify({ quote, author }),
            }
        );
        // Wait for the response. Assign result of the response to result variable 
        const result = await response.json();

        // If something went WebTransportDatagramDuplexStream, show a red error message
        if (!response.ok) {
            statusMessage.textContent = result.message || 'Error adding quote.';
            statusMessage.style.color = 'red';
        } else {
            // Show green message, if response was successful
            statusMessage.textContent = 'Quote added successfully.';
            statusMessage.style.color = 'green';
            // Clear the form 
            document.getElementById('quote-form').reset();
            // Display the new quote on the page 
            document.getElementById('quote').innerText = `"${quote}"`;
            document.getElementById('author').innerText = `— ${author}`;
        }
    } catch (err) {
        // If we get an error, failing to connect to the ServiceWorkerRegistration, show red message alert 
        statusMessage.textContent = 'Error: Failed to connect to the server!';
        statusMessage.style.color = 'red';
    }
});

// #endregion Form add a new quote 

// Call the fetchQuote function when the page first loads
fetchQuote();