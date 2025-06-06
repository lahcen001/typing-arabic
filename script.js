// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.getElementById('charCount');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    const langToggle = document.getElementById('langToggle');
    const exampleCards = document.querySelectorAll('.example-card');

    // Character counter
    function updateCharCount() {
        const count = inputText.value.length;
        charCount.textContent = count;
        
        // Add visual feedback for character count
        if (count > 500) {
            charCount.style.color = '#ef4444';
        } else if (count > 300) {
            charCount.style.color = '#f59e0b';
        } else {
            charCount.style.color = '#6b7280';
        }
    }

    // Update character count on input
    if (inputText && charCount) {
        inputText.addEventListener('input', updateCharCount);
        updateCharCount(); // Initial count
    }

    // Enhanced Arabic transliteration integration - copy converted text to output
    function setupTransliterationIntegration() {
        if (inputText && outputText) {
            // Listen for transliteration conversion events
            inputText.addEventListener('input', function() {
                // Small delay to let transliteration process the conversion
                setTimeout(() => {
                    // Copy the converted text from input to output area
                    outputText.value = inputText.value;
                }, 100);
            });
            
            // Also listen for keyup events for better responsiveness
            inputText.addEventListener('keyup', function() {
                setTimeout(() => {
                    outputText.value = inputText.value;
                }, 50);
            });
        }
    }

    // Initialize transliteration integration
    setupTransliterationIntegration();

    // Clear button functionality
    if (clearBtn && inputText && outputText) {
        clearBtn.addEventListener('click', function() {
            inputText.value = '';
            outputText.value = '';
            updateCharCount();
            
            // Clear transliteration state if available
            if (typeof Yamli !== 'undefined' && Yamli.clear) {
                Yamli.clear();
            }
            
            // Add visual feedback
            clearBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                clearBtn.style.transform = '';
            }, 150);
            
            // Show success message
            showNotification('Text cleared successfully!', 'success');
        });
    }

    // Copy button functionality - copy from output area
    if (copyBtn && outputText) {
        copyBtn.addEventListener('click', async function() {
            try {
                // Get text from output area (converted Arabic text)
                const textToCopy = outputText.value.trim();
                
                if (textToCopy === '') {
                    showNotification('No text to copy!', 'warning');
                    return;
                }

                await navigator.clipboard.writeText(textToCopy);
                
                // Visual feedback
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.background = '';
                }, 2000);
                
                showNotification('Arabic text copied to clipboard!', 'success');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                showNotification('Failed to copy text', 'error');
            }
        });
    }

    // Example cards functionality
    exampleCards.forEach(card => {
        card.addEventListener('click', function() {
            const exampleText = this.getAttribute('data-text');
            if (inputText && exampleText) {
                inputText.value = exampleText;
                updateCharCount();
                
                // Trigger transliteration conversion
                const event = new Event('input', { bubbles: true });
                inputText.dispatchEvent(event);
                
                // Scroll to editor
                document.querySelector('.editor-section').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Focus on input
                inputText.focus();
                
                // Add visual feedback to card
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                showNotification('Example loaded! Watch the conversion to Arabic.', 'success');
            }
        });

        // Add keyboard support for example cards
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });

    // Language toggle functionality
    if (langToggle) {
        let isArabic = false;
        
        langToggle.addEventListener('click', function() {
            isArabic = !isArabic;
            const span = this.querySelector('span');
            
            if (isArabic) {
                span.textContent = 'العربية';
                document.documentElement.setAttribute('dir', 'rtl');
                document.documentElement.setAttribute('lang', 'ar');
            } else {
                span.textContent = 'English';
                document.documentElement.setAttribute('dir', 'ltr');
                document.documentElement.setAttribute('lang', 'en');
            }
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            maxWidth: '300px'
        });

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        notification.style.background = colors[type] || colors.info;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    function getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || icons.info;
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('.intro-section, .editor-section, .examples-section, .instructions-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to copy
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (copyBtn) copyBtn.click();
        }
        
        // Ctrl/Cmd + Delete to clear
        if ((e.ctrlKey || e.metaKey) && e.key === 'Delete') {
            e.preventDefault();
            if (clearBtn) clearBtn.click();
        }
        
        // Escape to clear focus
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
    });

    // Auto-resize textareas
    function autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', () => autoResize(textarea));
        // Initial resize
        autoResize(textarea);
    });

    // Enhanced transliteration status checking
    let transliterationLoaded = false;
    let transliterationCheckAttempts = 0;
    const maxTransliterationAttempts = 10;
    
    // Check if transliteration is loaded and working
    function checkTransliterationStatus() {
        transliterationCheckAttempts++;
        
        if (typeof Yamli !== 'undefined' && Yamli.init) {
            transliterationLoaded = true;
            showNotification('🎉 Arabic keyboard is ready! Start typing in English.', 'success');
            
            // Add visual indicator
            const indicator = document.createElement('div');
            indicator.innerHTML = '<i class="fas fa-check-circle"></i> Arabic Keyboard Active';
            indicator.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: #10b981;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                font-size: 0.875rem;
                font-weight: 500;
                z-index: 1000;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                animation: slideInLeft 0.5s ease;
            `;
            document.body.appendChild(indicator);
            
            // Remove indicator after 5 seconds
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.style.animation = 'slideOutLeft 0.5s ease';
                    setTimeout(() => indicator.remove(), 500);
                }
            }, 5000);
            
            return true;
        } else if (transliterationCheckAttempts < maxTransliterationAttempts) {
            // Retry after 1 second, up to maxTransliterationAttempts times
            setTimeout(checkTransliterationStatus, 1000);
            return false;
        } else {
            // Max attempts reached
            showNotification('⚠️ Arabic keyboard failed to load. Please check your internet connection.', 'error');
            return false;
        }
    }
    
    // Start checking for transliteration
    setTimeout(checkTransliterationStatus, 500);

    // Add welcome message
    setTimeout(() => {
        if (!transliterationLoaded) {
            showNotification('Welcome! Loading Arabic keyboard...', 'info');
        }
    }, 1000);

    // Add CSS animations for indicators
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutLeft {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(-100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    console.log('Arabic Keyboard App initialized successfully!');
}); 