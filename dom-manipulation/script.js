
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



// Configuration
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API
const SYNC_INTERVAL = 30000; // 30 seconds
const LOCAL_STORAGE_KEY = 'savedQuotes';
const SESSION_STORAGE_KEY = 'lastViewedQuote';
const LAST_SYNC_KEY = 'lastSyncTimestamp';

// State variables
let quotes = [];
let currentCategory = null;
let syncInterval;
let lastServerQuotes = [];

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categoryButtons = document.getElementById('categoryButtons');
const exportQuotesBtn = document.getElementById('exportQuotes');
const importFileInput = document.getElementById('importFile');
const manualSyncBtn = document.getElementById('manualSync');
const syncStatus = document.getElementById('syncStatus');
const conflictResolution = document.getElementById('conflictResolution');
const conflictMessage = document.getElementById('conflictMessage');

// Initialize the app
function init() {
    loadQuotes();
    createAddQuoteForm();
    setupEventListeners();
    showRandomQuote();
    updateCategoryButtons();
    startSyncInterval();
}

// Load quotes from local storage
function loadQuotes() {
    const savedQuotes = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedQuotes) {
        try {
            quotes = JSON.parse(savedQuotes);
            lastServerQuotes = [...quotes]; // Initialize with local data
        } catch (e) {
            console.error("Failed to parse saved quotes", e);
            quotes = getDefaultQuotes();
        }
    } else {
        quotes = getDefaultQuotes();
    }
}

// Get default quotes if none exist
function getDefaultQuotes() {
    return [
        { text: "The only way to do great work is to love what you do.", category: "work" },
        { text: "Life is what happens when you're busy making other plans.", category: "life" },
        { text: "In the middle of difficulty lies opportunity.", category: "inspiration" }
    ];
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quotes));
    localStorage.setItem(LAST_SYNC_KEY, Date.now());
}

// Setup event listeners
function setupEventListeners() {
    newQuoteBtn.addEventListener('click', showRandomQuote);
    exportQuotesBtn.addEventListener('click', exportQuotes);
    importFileInput.addEventListener('change', importFromJsonFile);
    manualSyncBtn.addEventListener('click', syncWithServer);
}

// Create the form for adding quotes
function createAddQuoteForm() {
    const form = document.getElementById('addQuoteForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addQuote();
    });
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
        showSyncMessage('Please enter both quote text and category', 'error');
        return;
    }
    
    // Check for duplicates
    const isDuplicate = quotes.some(quote => 
        quote.text.toLowerCase() === text.toLowerCase() && 
        quote.category.toLowerCase() === category.toLowerCase()
    );
    
    if (isDuplicate) {
        showSyncMessage('This quote already exists in this category!', 'error');
        return;
    }
    
    // Add new quote
    const newQuote = { text, category };
    quotes.push(newQuote);
    
    // Save and update UI
    saveQuotes();
    updateUIAfterAdd();
    
    // Auto-sync with server
    syncWithServer();
}

// Update UI after adding quote
function updateUIAfterAdd() {
    showRandomQuote();
    updateCategoryButtons();
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
            
            showSyncMessage(`Successfully imported ${validQuotes.length} quotes`, 'success');
            
        } catch (error) {
            console.error("Import error:", error);
            showSyncMessage(`Error importing quotes: ${error.message}`, 'error');
        }
        
        // Reset file input
        event.target.value = '';
    };
    
    fileReader.onerror = function() {
        showSyncMessage("Error reading file", 'error');
        event.target.value = '';
    };
    
    fileReader.readAsText(file);
}

// ==================== SERVER SYNC FUNCTIONS ====================

// Fetch quotes from server with proper headers
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(SERVER_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }
        
        const data = await response.json();
        
        // In our mock implementation, we'll extract quotes from the response
        // For a real API, you would return data directly if it's the quotes array
        return data.map(item => ({
            text: item.title || item.text || "Default quote text",
            category: item.category || "uncategorized"
        }));
        
    } catch (error) {
        console.error("Failed to fetch quotes from server:", error);
        throw error;
    }
}

// Post quotes to server
async function postQuotesToServer(quotesToPost) {
    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(quotesToPost)
        });
        
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Failed to post quotes to server:", error);
        throw error;
    }
}

// Sync quotes between local and server
async function syncQuotes() {
    try {
        showSyncMessage("Starting sync with server...", 'info');
        
        // 1. Get current server state
        const serverQuotes = await fetchQuotesFromServer();
        
        // 2. Post our local changes to server
        const localChanges = findLocalChanges(quotes, lastServerQuotes);
        if (localChanges.length > 0) {
            await postQuotesToServer(localChanges);
        }
        
        // 3. Check for conflicts
        const conflicts = findConflicts(quotes, serverQuotes);
        
        if (conflicts.length > 0) {
            showConflictUI(conflicts, serverQuotes);
        } else {
            // No conflicts, merge changes
            const mergedQuotes = mergeQuotes(quotes, serverQuotes);
            quotes = mergedQuotes;
            lastServerQuotes = [...mergedQuotes];
            saveQuotes();
            updateUIAfterAdd();
            showSyncMessage("Sync completed successfully", 'success');
        }
        
        return true;
    } catch (error) {
        console.error("Sync error:", error);
        showSyncMessage("Sync failed: " + error.message, 'error');
        return false;
    }
}

// Find changes made locally since last sync
function findLocalChanges(currentQuotes, lastSyncedQuotes) {
    const changes = [];
    
    // Find new quotes added locally
    currentQuotes.forEach(quote => {
        if (!lastSyncedQuotes.some(sq => sq.text === quote.text)) {
            changes.push(quote);
        }
    });
    
    // Find modified quotes
    currentQuotes.forEach(quote => {
        const lastSyncedQuote = lastSyncedQuotes.find(sq => sq.text === quote.text);
        if (lastSyncedQuote && lastSyncedQuote.category !== quote.category) {
            changes.push(quote);
        }
    });
    
    return changes;
}

// Start periodic sync with server
function startSyncInterval() {
    // Clear existing interval if any
    if (syncInterval) {
        clearInterval(syncInterval);
    }
    
    // Start new interval
    syncInterval = setInterval(async () => {
        await syncQuotes();
    }, SYNC_INTERVAL);
    
    // Initial sync
    syncQuotes();
}

// ==================== SERVER SYNC FUNCTIONS ====================

// Start periodic sync with server
function startSyncInterval() {
    syncInterval = setInterval(syncWithServer, SYNC_INTERVAL);
    syncWithServer(); // Initial sync
}

// Sync quotes with server
async function syncWithServer() {
    try {
        showSyncMessage("Syncing with server...", 'info');
        
        // Get current server state
        const serverQuotes = await fetchServerQuotes();
        
        // Check for conflicts
        const conflicts = findConflicts(quotes, serverQuotes);
        
        if (conflicts.length > 0) {
            showConflictUI(conflicts, serverQuotes);
        } else {
            // No conflicts, merge changes
            const mergedQuotes = mergeQuotes(quotes, serverQuotes);
            quotes = mergedQuotes;
            lastServerQuotes = [...mergedQuotes];
            saveQuotes();
            updateUIAfterAdd();
            showSyncMessage("Quotes synced with server!", 'success');
        }
    } catch (error) {
        console.error("Sync error:", error);
        showSyncMessage("Sync failed: " + error.message, 'error');
    }
}

// Configuration
const LOCAL_STORAGE_KEY = 'savedQuotes';
const FILTER_STORAGE_KEY = 'lastCategoryFilter';

// Initial quotes
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "work" },
    { text: "Life is what happens when you're busy making other plans.", category: "life" },
    { text: "In the middle of difficulty lies opportunity.", category: "inspiration" }
];

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categoryButtons = document.getElementById('categoryButtons');
const categoryFilter = document.getElementById('categoryFilter');

// Current filter state
let currentFilter = null;

// Initialize the app
function init() {
    loadQuotes();
    setupEventListeners();
    populateCategories();
    restoreFilterPreference();
    showRandomQuote();
}

// Load quotes from local storage
function loadQuotes() {
    const savedQuotes = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedQuotes) {
        try {
            quotes = JSON.parse(savedQuotes);
        } catch (e) {
            console.error("Failed to parse saved quotes", e);
        }
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quotes));
}

// Setup event listeners
function setupEventListeners() {
    newQuoteBtn.addEventListener('click', showRandomQuote);
    categoryFilter.addEventListener('change', handleCategoryFilterChange);
    
    const form = document.getElementById('addQuoteForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addQuote();
    });
}

// Populate category filter options
function populateCategories() {
    // Clear existing options except "All Categories"
    while (categoryFilter.options.length > 1) {
        categoryFilter.remove(1);
    }
    
    // Clear category buttons
    categoryButtons.innerHTML = '';
    
    // Get all unique categories
    const categories = [...new Set(quotes.map(quote => quote.category))];
    
    // Add "All Categories" button
    const allButton = document.createElement('button');
    allButton.textContent = 'All Categories';
    allButton.onclick = () => setCategoryFilter(null);
    allButton.className = !currentFilter ? 'active' : '';
    categoryButtons.appendChild(allButton);
    
    // Add category options to select and buttons
    categories.forEach(category => {
        // Add to dropdown
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
        
        // Add as button
        const button = document.createElement('button');
        button.textContent = category;
        button.onclick = () => setCategoryFilter(category);
        button.className = currentFilter === category ? 'active' : '';
        categoryButtons.appendChild(button);
    });
    
    // Set selected value in dropdown
    if (currentFilter) {
        categoryFilter.value = currentFilter;
    } else {
        categoryFilter.value = 'all';
    }
}

// Handle category filter change from dropdown
function handleCategoryFilterChange(event) {
    const value = event.target.value;
    setCategoryFilter(value === 'all' ? null : value);
}

// Set the current category filter
function filterQuote(category) {
    currentFilter = category;
    
    // Save filter preference
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(currentFilter));
    
    // Update UI
    updateActiveFilterButtons();
    showRandomQuote();
}

// Update active state of filter buttons
function updateActiveFilterButtons() {
    const buttons = categoryButtons.querySelectorAll('button');
    buttons.forEach(button => {
        const isAllButton = button.textContent === 'All Categories';
        const matchesFilter = 
            (!currentFilter && isAllButton) || 
            (currentFilter && button.textContent === currentFilter);
        
        button.className = matchesFilter ? 'active' : '';
    });
    
    // Update dropdown selection
    categoryFilter.value = currentFilter || 'all';
}

// Restore filter preference from storage
function restoreFilterPreference() {
    const savedFilter = localStorage.getItem(FILTER_STORAGE_KEY);
    if (savedFilter) {
        try {
            currentFilter = JSON.parse(savedFilter);
        } catch (e) {
            console.error("Failed to parse saved filter", e);
        }
    }
}

// Display a random quote filtered by current category
function selectedCategory() {
    let filteredQuotes = currentFilter 
        ? quotes.filter(quote => quote.category === currentFilter)
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
    
    // Update UI
    populateCategories();
    showRandomQuote();
    
    // Clear form
    textInput.value = '';
    categoryInput.value = '';
}

// Initialize the application
document.addEventListener('DOMContentLoaded', init);
            