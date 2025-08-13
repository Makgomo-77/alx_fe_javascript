
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
function addQuoteForm() {
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
// Quotes array with default values
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "work" },
    { text: "Life is what happens when you're busy making other plans.", category: "life" },
    { text: "In the middle of difficulty lies opportunity.", category: "inspiration" }
];

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categoryButtons = document.getElementById('categoryButtons');
const exportQuotesBtn = document.getElementById('exportQuotes');
const importFileInput = document.getElementById('importFile');
const clearStorageBtn = document.getElementById('clearLocalStorage');
const storageStatus = document.getElementById('storageStatus');

// Current selected category
let currentCategory = null;

// Storage keys
const LOCAL_STORAGE_KEY = 'savedQuotes';
const SESSION_STORAGE_KEY = 'lastViewedQuote';

// Initialize the app
function init() {
    loadQuotes();
    createAddQuoteForm();
    setupEventListeners();
    showRandomQuote();
    updateCategoryButtons();
    updateStorageStatus();
}

// Load quotes from local storage
function loadQuotes() {
    const savedQuotes = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedQuotes) {
        try {
            const parsedQuotes = JSON.parse(savedQuotes);
            if (Array.isArray(parsedQuotes) {
                quotes = parsedQuotes;
            }
        } catch (e) {
            console.error("Failed to parse saved quotes", e);
        }
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quotes));
    updateStorageStatus();
}

// Update storage status display
function updateStorageStatus() {
    const quoteCount = quotes.length;
    storageStatus.textContent = `${quoteCount} ${quoteCount === 1 ? 'quote' : 'quotes'} saved in local storage`;
}

// Create the form for adding quotes
function createAddQuoteForm() {
    const form = document.getElementById('addQuoteForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addQuote();
    });
}

// Setup event listeners
function setupEventListeners() {
    newQuoteBtn.addEventListener('click', showRandomQuote);
    exportQuotesBtn.addEventListener('click', exportQuotes);
    importFileInput.addEventListener('change', importFromJsonFile);
    clearStorageBtn.addEventListener('click', clearLocalStorage);
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
    
    // Store last viewed quote in session storage
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(quote));
}

// Display a specific quote
function displayQuote(quote) {
    quoteDisplay.innerHTML = `
        <div class="quote-text">"${quote.text}"</div>
        <div class="quote-category">— ${quote.category}</div>
    `;
}

// Add a new quote
function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
    
    const text = textInput.value.trim();
    const category = categoryInput.value.trim();
    
    if (!text || !category) {
        alert('Please enter both quote text and category');
        return;
    }
    
    // Check for duplicates
    const isDuplicate = quotes.some(quote => 
        quote.text.toLowerCase() === text.toLowerCase() && 
        quote.category.toLowerCase() === category.toLowerCase()
    );
    
    if (isDuplicate) {
        alert('This quote already exists in this category!');
        return;
    }
    
    // Add new quote
    const newQuote = { text, category };
    quotes.push(newQuote);
    
    // Save to local storage
    saveQuotes();
    
    // Clear form
    textInput.value = '';
    categoryInput.value = '';
    
    // Update UI
    updateUIAfterAdd();
}

// Update UI after adding quote
function updateUIAfterAdd() {
    showRandomQuote();
    updateCategoryButtons();
    
    // Visual feedback
    quoteDisplay.style.backgroundColor = '#e8f5e9';
    setTimeout(() => {
        quoteDisplay.style.backgroundColor = '';
    }, 1000);
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

// Set the current category
function setCategory(category) {
    currentCategory = category;
    showRandomQuote();
}

// Export quotes to JSON file
function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes-export.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const fileReader = new FileReader();
    
    fileReader.onload = function(e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            
            if (!Array.isArray(importedQuotes)) {
                throw new Error("Imported data is not an array");
            }
            
            // Validate each quote
            const validQuotes = importedQuotes.filter(quote => 
                quote && typeof quote === 'object' && 
                'text' in quote && 'category' in quote
            );
            
            if (validQuotes.length === 0) {
                throw new Error("No valid quotes found in the file");
            }
            
            // Add to existing quotes (filtering duplicates)
            validQuotes.forEach(newQuote => {
                const isDuplicate = quotes.some(existingQuote => 
                    existingQuote.text.toLowerCase() === newQuote.text.toLowerCase() && 
                    existingQuote.category.toLowerCase() === newQuote.category.toLowerCase()
                );
                
                if (!isDuplicate) {
                    quotes.push(newQuote);
                }
            });
            
            // Save and update UI
            saveQuotes();
            updateCategoryButtons();
            showRandomQuote();
            
            alert(`Successfully imported ${validQuotes.length} quotes`);
            
        } catch (error) {
            console.error("Import error:", error);
            alert(`Error importing quotes: ${error.message}`);
        }
        
        // Reset file input
        event.target.value = '';
    };
    
    fileReader.onerror = function() {
        alert("Error reading file");
        event.target.value = '';
    };
    
    fileReader.readAsText(file);
}

// Clear local storage
function clearLocalStorage() {
    if (confirm("Are you sure you want to clear all saved quotes? This cannot be undone.")) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        quotes = [];
        saveQuotes();
        updateCategoryButtons();
        showRandomQuote();
        alert("All quotes have been cleared");
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);