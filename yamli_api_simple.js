// Simplified Yamli API - Clean and Readable Version
// Copyright (c) 2024 - Simplified for educational purposes

(function() {
    'use strict';

    // Global Yamli object
    window.Yamli = window.Yamli || {};

    // Configuration and state
    const config = {
        uiLanguage: 'ar',
        startMode: 'onOrUserDefault',
        settingsPlacement: 'bottomLeft',
        showToggleButton: true,
        showSettingsButton: true,
        enabled: true
    };

    // Simple transliteration mappings
    const transliterationMap = {
        // Basic Arabic letters
        'a': 'ا', 'b': 'ب', 't': 'ت', 'th': 'ث', 'j': 'ج', 'H': 'ح', 'kh': 'خ',
        'd': 'د', 'dh': 'ذ', 'r': 'ر', 'z': 'ز', 's': 'س', 'sh': 'ش', 'S': 'ص',
        'D': 'ض', 'T': 'ط', 'Z': 'ظ', '3': 'ع', 'gh': 'غ', 'f': 'ف', 'q': 'ق',
        'k': 'ك', 'l': 'ل', 'm': 'م', 'n': 'ن', 'h': 'ه', 'w': 'و', 'y': 'ي',
        
        // Common words
        'ahlan': 'أهلاً', 'wa': 'و', 'sahlan': 'سهلاً', 'marhaba': 'مرحباً',
        'kayf': 'كيف', 'halak': 'حالك', 'halik': 'حالك', 'shukran': 'شكراً',
        'min': 'من', 'ila': 'إلى', 'fi': 'في', 'ma3': 'مع', 'anta': 'أنت',
        'anti': 'أنت', 'ana': 'أنا', 'huwa': 'هو', 'hiya': 'هي', 'nahnu': 'نحن',
        'antum': 'أنتم', 'hum': 'هم', 'hunna': 'هن'
    };

    // Core functions
    function transliterate(text) {
        if (!text || typeof text !== 'string') return text;
        
        let result = text;
        
        // Sort by length (longest first) to handle multi-character mappings
        const sortedKeys = Object.keys(transliterationMap).sort((a, b) => b.length - a.length);
        
        for (const key of sortedKeys) {
            const regex = new RegExp('\\b' + key + '\\b', 'gi');
            result = result.replace(regex, transliterationMap[key]);
        }
        
        return result;
    }

    function setupTextarea(element, options = {}) {
        if (!element) return;
        
        const settings = { ...config, ...options };
        
        // Set RTL direction for Arabic
        element.style.direction = 'rtl';
        element.style.textAlign = 'right';
        
        // Add input event listener for real-time transliteration
        element.addEventListener('input', function(e) {
            if (!settings.enabled) return;
            
            const cursorPos = element.selectionStart;
            const text = element.value;
            const transliterated = transliterate(text);
            
            if (text !== transliterated) {
                element.value = transliterated;
                // Restore cursor position
                element.setSelectionRange(cursorPos, cursorPos);
            }
        });

        // Add keydown event for special handling
        element.addEventListener('keydown', function(e) {
            if (!settings.enabled) return;
            
            // Handle space key for word completion
            if (e.key === ' ') {
                const cursorPos = element.selectionStart;
                const text = element.value;
                const beforeCursor = text.substring(0, cursorPos);
                const words = beforeCursor.split(/\s+/);
                const lastWord = words[words.length - 1];
                
                if (lastWord && transliterationMap[lastWord.toLowerCase()]) {
                    const transliterated = transliterationMap[lastWord.toLowerCase()];
                    const newText = text.substring(0, cursorPos - lastWord.length) + 
                                   transliterated + text.substring(cursorPos);
                    element.value = newText;
                    element.setSelectionRange(cursorPos - lastWord.length + transliterated.length, 
                                            cursorPos - lastWord.length + transliterated.length);
                    e.preventDefault();
                }
            }
        });

        console.log('Yamli: Textarea initialized successfully');
    }

    // Public API
    Yamli.init = function(options = {}) {
        Object.assign(config, options);
        console.log('Yamli: Initialized with options:', config);
        return true;
    };

    Yamli.yamlify = function(elementId, options = {}) {
        if (typeof elementId === 'string') {
            const element = document.getElementById(elementId);
            if (element) {
                setupTextarea(element, options);
                console.log('Yamli: Element yamlified:', elementId);
            } else {
                console.warn('Yamli: Element not found:', elementId);
            }
        }
    };

    Yamli.setEnabled = function(enabled) {
        config.enabled = enabled;
        console.log('Yamli: Enabled state changed to:', enabled);
    };

    Yamli.getEnabled = function() {
        return config.enabled;
    };

    Yamli.transliterate = transliterate;

    // Add custom mappings
    Yamli.addMapping = function(roman, arabic) {
        if (typeof roman === 'string' && typeof arabic === 'string') {
            transliterationMap[roman] = arabic;
            console.log('Yamli: Added mapping:', roman, '->', arabic);
        }
    };

    // Remove mappings
    Yamli.removeMapping = function(roman) {
        if (transliterationMap[roman]) {
            delete transliterationMap[roman];
            console.log('Yamli: Removed mapping:', roman);
        }
    };

    // Get all mappings
    Yamli.getMappings = function() {
        return { ...transliterationMap };
    };

    // Version info
    Yamli.version = '1.0.0-simple';
    Yamli.buildNumber = '1000';

    console.log('Yamli Simple API loaded successfully - Version:', Yamli.version);

})(); 