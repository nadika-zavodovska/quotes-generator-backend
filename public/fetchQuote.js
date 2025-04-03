// Async function fetches a random quote from the server
async function fetchQuote() {
    try {
        // Fetch data from the backend at the specified URL
        const response = await fetch('http://localhost:3000/quote');
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

// When the button with id 'new-quote' is clicked, call the fetchQuote function
document.getElementById('new-quote').addEventListener('click', fetchQuote);

// Call the fetchQuote function when the page first loads
fetchQuote();