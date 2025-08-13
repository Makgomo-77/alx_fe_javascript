
// Initial quotes database
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "work" },
    { text: "Life is what happens when you're busy making other plans.", category: "life" },
    { text: "In the middle of difficulty lies opportunity.", category: "inspiration" },
    { text: "Simplicity is the ultimate sophistication.", category: "design" },
    { text: "Stay hungry, stay foolish.", category: "inspiration" },
    { text: "The best way to predict the future is to invent it.", category: "future" }
];

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categoryButtons = document.getElementById('categoryButtons');

// Current selected category (null means all categories)
let currentCategory = null;

// Initialize the app
function init() {
    // Display a random quote on load
    showRandomQuote();
    
    // Set up event listeners
    newQuoteBtn.addEventListener('click', showRandomQuote);
    
    // Create category buttons
    updateCategoryButtons();
}

// Display a random quote
function showRandomQuote() {
    let filteredQuotes = currentCategory 
        ? quotes.filter(quote => quote.category === currentCategory)
        : quotes;
    
    if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = '<p>No quotes available for this category.</p>';
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    
    displayQuote(quote);
}

// Display a specific quote
function displayQuote(quote) {
    quoteDisplay.innerHTML = `
        <div class="quote-text">"${quote.text}"</div>
        <div class="quote-category">— ${quote.category}</div>
    `;
}

// Add a new quote to the database
function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
    
    const text = textInput.value.trim();
    const category = categoryInput.value.trim();
    
    if (text && category) {
        const newQuote = { text, category };
        quotes.push(newQuote);
        
        // Clear inputs
        textInput.value = '';
        categoryInput.value = '';
        
        // Update UI
        showRandomQuote();
        updateCategoryButtons();
    } else {
        alert('Please enter both quote text and category');
    }
}

// Update category buttons
function updateCategoryButtons() {
    // Get all unique categories
    const categories = [...new Set(quotes.map(quote => quote.category))];
    
    // Create buttons
    let buttonsHTML = '<button onclick="setCategory(null)">All Categories</button>';
    
    categories.forEach(category => {
        buttonsHTML += `<button onclick="setCategory('${category}')">${category}</button>`;
    });
    
    categoryButtons.innerHTML = buttonsHTML;
}

// Set the current category and show a quote
function setCategory(category) {
    currentCategory = category;
    showRandomQuote();
}

// Initialize the application
init();