/**
 * Email Spam Detection System - Main JavaScript
 * UI Interactions and Event Handlers
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('Email Spam Detection System - Initializing...');
    
    // Initialize components
    initNavigation();
    initSpamDetector();
    initQuickTest();
    initSmoothScroll();
    
    console.log('✅ Application initialized successfully');
}

/**
 * Initialize navigation
 */
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Toggle mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn?.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
    
    // Active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Initialize spam detector functionality
 */
function initSpamDetector() {
    const emailInput = document.getElementById('emailInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const resultSection = document.getElementById('resultSection');
    
    // Analyze button click
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            const text = emailInput?.value.trim();
            
            if (!text) {
                showError('Please enter email text to analyze');
                return;
            }
            
            if (text.length < 10) {
                showError('Please enter at least 10 characters');
                return;
            }
            
            // Hide previous results
            hideError();
            resultSection?.classList.remove('show');
            
            // Show loading
            loading?.classList.add('show');
            
            // Simulate analysis delay (for realism)
            setTimeout(() => {
                try {
                    const result = analyzeEmail(text);
                    displayResult(result);
                    loading?.classList.remove('show');
                } catch (error) {
                    showError(error.message || 'An error occurred during analysis');
                    loading?.classList.remove('show');
                }
            }, 800);
        });
    }
    
    // Clear button click
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            emailInput.value = '';
            resultSection?.classList.remove('show');
            hideError();
            emailInput?.focus();
        });
    }
    
    // Enter key to analyze (Shift+Enter for new line)
    if (emailInput) {
        emailInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                analyzeBtn?.click();
            }
        });
    }
}

/**
 * Display analysis result
 */
function displayResult(result) {
    const resultSection = document.getElementById('resultSection');
    const resultHeader = document.getElementById('resultHeader');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultLabel = document.getElementById('resultLabel');
    const resultConfidence = document.getElementById('resultConfidence');
    const spamBar = document.getElementById('spamBar');
    const hamBar = document.getElementById('hamBar');
    const spamProb = document.getElementById('spamProb');
    const hamProb = document.getElementById('hamProb');
    const resultMessage = document.getElementById('resultMessage');
    
    // Remove previous classes
    resultSection.classList.remove('spam-result', 'ham-result');
    
    // Add appropriate class
    resultSection.classList.add(result.isSpam ? 'spam-result' : 'ham-result');
    
    // Update icon and title
    if (result.isSpam) {
        resultIcon.className = 'fas fa-ban';
        resultTitle.textContent = '🚫 SPAM DETECTED';
    } else {
        resultIcon.className = 'fas fa-check-circle';
        resultTitle.textContent = '✓ LEGITIMATE EMAIL';
    }
    
    // Update details
    resultLabel.textContent = result.label;
    resultConfidence.textContent = `${result.confidence}%`;
    
    // Update probability bars
    spamBar.style.width = `${result.spamProbability}%`;
    hamBar.style.width = `${result.hamProbability}%`;
    spamProb.textContent = `${result.spamProbability}%`;
    hamProb.textContent = `${result.hamProbability}%`;
    
    // Update message
    if (result.isSpam) {
        if (result.confidence > 90) {
            resultMessage.textContent = '⚠️ This email shows strong spam characteristics. We recommend deleting it.';
        } else if (result.confidence > 75) {
            resultMessage.textContent = '⚠️ This email is likely spam. Review carefully before responding.';
        } else {
            resultMessage.textContent = '⚠️ This email may be spam. Proceed with caution.';
        }
    } else {
        if (result.confidence > 90) {
            resultMessage.textContent = '✓ This email appears to be legitimate. Safe to respond.';
        } else if (result.confidence > 75) {
            resultMessage.textContent = '✓ This email is likely legitimate. Safe to respond.';
        } else {
            resultMessage.textContent = '✓ This email appears legitimate.';
        }
    }
    
    // Show result with animation
    resultSection.classList.remove('show');
    setTimeout(() => {
        resultSection.classList.add('show');
        
        // Scroll to result
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 10);
}

/**
 * Show error message
 */
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    if (errorText) {
        errorText.textContent = message;
    }
    
    errorMessage.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

/**
 * Hide error message
 */
function hideError() {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.classList.remove('show');
}

/**
 * Initialize quick test buttons
 */
function initQuickTest() {
    const quickTestBtns = document.querySelectorAll('.quick-test-btn');
    const emailInput = document.getElementById('emailInput');
    
    quickTestBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.getAttribute('data-text');
            if (emailInput && text) {
                emailInput.value = text;
                
                // Add animation effect
                emailInput.style.borderColor = '#667eea';
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                }, 300);
                
                // Auto-analyze
                setTimeout(() => {
                    document.getElementById('analyzeBtn')?.click();
                }, 300);
            }
        });
    });
}

/**
 * Initialize smooth scrolling
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = toast.querySelector('i');
    
    if (toastMessage) {
        toastMessage.textContent = message;
    }
    
    // Set icon based on type
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle';
        toastIcon.style.color = '#48bb78';
    } else if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
        toastIcon.style.color = '#f56565';
    } else if (type === 'info') {
        toastIcon.className = 'fas fa-info-circle';
        toastIcon.style.color = '#4299e1';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Global functions for external access
window.showToast = showToast;
window.analyzeEmail = analyzeEmail;