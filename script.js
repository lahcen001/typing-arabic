// Global variables
let isArabic = true;
let currentLanguage = 'ar';

// DOM elements
const inputText = document.getElementById('inputText');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const exportBtn = document.getElementById('exportBtn');
const printBtn = document.getElementById('printBtn');
const langToggle = document.getElementById('langToggle');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const lineCount = document.getElementById('lineCount');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');
    
    // Set up event listeners
    setupEventListeners();
    
    // Update initial stats
    updateStats();
    
    // Set initial language
    updateLanguage();
    
    console.log('Application initialized successfully');
});

// Initialize Yamli functionality - simplified version
function initializeYamli() {
    // Yamli is now initialized directly in the HTML
    // This function is kept for compatibility but does nothing
    console.log('Yamli initialization handled in HTML');
}

// Set up event listeners
function setupEventListeners() {
    // Input text area events
    if (inputText) {
        inputText.addEventListener('input', updateStats);
        inputText.addEventListener('keyup', updateStats);
        inputText.addEventListener('paste', () => {
            setTimeout(updateStats, 100);
        });
    }
    
    // Button events
    if (clearBtn) {
        clearBtn.addEventListener('click', clearText);
    }
    
    if (copyBtn) {
        copyBtn.addEventListener('click', copyText);
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportText);
    }
    
    if (printBtn) {
        printBtn.addEventListener('click', printText);
    }
    
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Update text statistics
function updateStats() {
    if (!inputText) return;
    
    const text = inputText.value;
    const characters = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split('\n').length;
    
    if (charCount) charCount.textContent = characters;
    if (wordCount) wordCount.textContent = words;
    if (lineCount) lineCount.textContent = lines;
}

// Clear text
function clearText() {
    if (inputText) {
        inputText.value = '';
        inputText.focus();
        updateStats();
        showNotification('Text cleared successfully', 'success');
    }
}

// Copy text to clipboard
async function copyText() {
    if (!inputText || !inputText.value.trim()) {
        showNotification('No text to copy', 'warning');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(inputText.value);
        showNotification('Text copied to clipboard!', 'success');
    } catch (error) {
        console.error('Copy failed:', error);
        // Fallback method
        inputText.select();
        document.execCommand('copy');
        showNotification('Text copied to clipboard!', 'success');
    }
}

// Export text as HTML file
function exportText() {
    if (!inputText || !inputText.value.trim()) {
        showNotification('No text to export', 'warning');
        return;
    }
    
    const text = inputText.value;
    const html = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Arabic Text</title>
    <style>
        body {
            font-family: 'Noto Sans Arabic', Arial, sans-serif;
            line-height: 1.8;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
            direction: rtl;
            text-align: right;
        }
        .content {
            white-space: pre-wrap;
            font-size: 1.1rem;
        }
    </style>
</head>
<body>
    <div class="content">${text}</div>
</body>
</html>`;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arabic-text.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Text exported successfully!', 'success');
}

// Print text
function printText() {
    if (!inputText || !inputText.value.trim()) {
        showNotification('No text to print', 'warning');
        return;
    }
    
    const text = inputText.value;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>Print Arabic Text</title>
    <style>
        body {
            font-family: 'Noto Sans Arabic', Arial, sans-serif;
            line-height: 1.8;
            padding: 2rem;
            direction: rtl;
            text-align: right;
        }
        .content {
            white-space: pre-wrap;
            font-size: 12pt;
        }
        @media print {
            body { margin: 0; padding: 1rem; }
        }
    </style>
</head>
<body>
    <div class="content">${text}</div>
</body>
</html>`);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
    
    showNotification('Print dialog opened', 'success');
}

// Toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    isArabic = currentLanguage === 'ar';
    updateLanguage();
}

// Update language display
function updateLanguage() {
    const langSpan = langToggle?.querySelector('span');
    if (langSpan) {
        langSpan.textContent = currentLanguage === 'ar' ? 'العربية' : 'English';
    }
    
    // Update document language and direction
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(event) {
    if (event.ctrlKey || event.metaKey) {
        switch (event.key.toLowerCase()) {
            case 'enter':
                event.preventDefault();
                copyText();
                break;
            case 'delete':
                event.preventDefault();
                clearText();
                break;
            case 'l':
                event.preventDefault();
                toggleLanguage();
                break;
            case 's':
                event.preventDefault();
                exportText();
                break;
            case 'p':
                event.preventDefault();
                printText();
                break;
        }
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Utility function to format text
function formatText(text) {
    return text
        .replace(/\n/g, '<br>')
        .replace(/\s{2,}/g, ' ')
        .trim();
}

// Error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Console welcome message
console.log(`
🎹 Yamli Arabic Keyboard Application
📝 Features: Real-time transliteration, Export, Print, Statistics
⌨️  Shortcuts: Ctrl+Enter (Copy), Ctrl+Delete (Clear), Ctrl+L (Language), Ctrl+S (Export), Ctrl+P (Print)
🔧 Status: Ready
`); 