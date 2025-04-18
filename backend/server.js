// Express helps build the server by managing routing, middleware, and HTTP requests and responses
import express from 'express';
// CORS allows other websites to communicate with the server
import cors from 'cors';
// Path helps with managing file paths
import path from 'path';
// Set up the Express app
const app = express();
// Port number for the server to listen to
const port = 3000;

// Enable CORS for all domains, allows any website to use the server
app.use(cors());
// Tell Express to use the "public" folder
// app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.static(path.join(process.cwd(), '../frontend/public')));

// Array of quotes with authors
const quotes = [
    {
        quote: "Life isn't about getting and having, it's about giving and being.",
        author: "Kevin Kruse",
    },
    {
        quote: "Whatever the mind of man can conceive and believe, it can achieve.",
        author: "Napoleon Hill",
    },
    {
        quote: "Strive not to be a success, but rather to be of value.",
        author: "Albert Einstein",
    },
    {
        quote:
            "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.",
        author: "Robert Frost",
    },
    {
        quote: "I attribute my success to this: I never gave or took any excuse.",
        author: "Florence Nightingale",
    },
    {
        quote: "You miss 100% of the shots you don't take.",
        author: "Wayne Gretzky",
    },
    {
        quote:
            "I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.",
        author: "Michael Jordan",
    },
    {
        quote:
            "The most difficult thing is the decision to act, the rest is merely tenacity.",
        author: "Amelia Earhart",
    }
];

function randomQuote() {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
}

app.get('/', (req, res) => {
    res.send("<p>Backend established.</p>");
});

app.get("/quote", (req, res) => {
    const quote = randomQuote();
    res.json(quote);
});

// Start the server and listen on the 3000 port
app.listen(port, () => {
    // Show in the console that the server is running
    console.log(`Server running on port: ${port}`);
});
