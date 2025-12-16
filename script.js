// SlangAdda AI - Enhanced Shared JavaScript Functions
// This file contains functions used across all pages

// AD MANAGEMENT FUNCTIONS
function initializeAds() {
  // Load ad scripts (example for Google AdSense)
  /*
  const adScript = document.createElement('script');
  adScript.async = true;
  adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX';
  adScript.crossOrigin = 'anonymous';
  document.head.appendChild(adScript);
  */
  
  // Placeholder for ad loading
  loadPlaceholderAds();
}

function loadPlaceholderAds() {
  // This function loads placeholder ads
  // In production, replace with actual ad network code
  document.querySelectorAll('.ad-unit').forEach((ad, index) => {
    setTimeout(() => {
      if (ad.classList.contains('horizontal')) {
        ad.innerHTML = `
          <div style="background: white; padding: 10px; border-radius: 8px; text-align: center;">
            <strong style="color: var(--primary);">Ad Space Available</strong>
            <p style="margin: 5px 0; font-size: 0.8rem;">Contact: ads@slangadda.ai</p>
            <small>Advertisement supports free access</small>
          </div>
        `;
      } else {
        ad.innerHTML = `
          <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
            <strong style="color: var(--primary); display: block; margin-bottom: 10px;">Sponsored</strong>
            <p style="margin: 10px 0; font-size: 0.9rem;">Your ad here reaches 50K+ monthly users</p>
            <button style="background: var(--primary); color: white; border: none; padding: 8px 16px; border-radius: 20px; cursor: pointer; margin-top: 10px;">
              Learn More
            </button>
          </div>
        `;
      }
    }, index * 500);
  });
}

// Update initializeCommonFeatures function
function initializeCommonFeatures() {
  
  // Initialize ads
  initializeAds();
}
// Global state
let currentHeroTitleIndex = 0;
let heroRotationInterval;
let isQuickSearchVisible = false;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Common initialization
  initializeCommonFeatures();
  
  // Page-specific initialization
  if (document.querySelector('.hero')) {
    console.log('Home page loaded - Initializing interactive features');
    initializeInteractiveHero();
    initializeSupportSection();
  }
  
  if (document.querySelector('.dictionary-content')) {
    console.log('Dictionary page loaded');
    // Dictionary-specific initialization will be in dictionary.js
  }
  
  if (document.querySelector('.quiz-selection')) {
    console.log('Quiz page loaded');
    // Quiz-specific initialization will be in quiz.js
  }
  
  // Initialize animations
  initializeAnimations();
});

function initializeCommonFeatures() {
  // Mobile menu toggle (to be implemented)
  setupMobileMenu();
  
  // Smooth scrolling for anchor links
  setupSmoothScrolling();
  
  // Suggestion modal
  setupSuggestionModal();
  
  // Share functionality
  setupShareButtons();
  
  // Modal handlers
  setupModalHandlers();
  
  // Copy UPI ID functionality
  setupCopyUPIButtons();
  
  // Tooltips
  initializeTooltips();
}

// INTERACTIVE HERO SECTION
function initializeInteractiveHero() {
  console.log('Initializing interactive hero...');
  
  // Dynamic title rotation
  setupTitleRotation();
  
  // Interactive feature buttons
  setupInteractiveFeatures();
  
  // Quick search toggle
  setupQuickSearchToggle();
  
  // Floating elements hover effects
  setupFloatingElements();
  
  // Hero button animations
  setupHeroButtonAnimations();
}

function setupTitleRotation() {
  const titles = [
    "Decode Indian Slang",
    "Understand Gen-Z Language",
    "Bridge Cultural Gaps",
    "Master Internet Lingo"
  ];
  
  const subtitles = [
    "No subscriptions, no tracking, just pure knowledge sharing.",
    "Free forever. Because understanding shouldn't have a price tag.",
    "Join thousands who've unlocked the secret language of India.",
    "From 'rizz' to 'delulu' - we've got you covered."
  ];
  
  const titleElement = document.getElementById('dynamic-title');
  const subtitleElement = document.getElementById('dynamic-subtitle');
  
  if (!titleElement || !subtitleElement) return;
  
  // Clear any existing interval
  if (heroRotationInterval) {
    clearInterval(heroRotationInterval);
  }
  
  // Rotate title every 5 seconds
  heroRotationInterval = setInterval(() => {
    currentHeroTitleIndex = (currentHeroTitleIndex + 1) % titles.length;
    
    // Fade out
    titleElement.style.opacity = '0';
    subtitleElement.style.opacity = '0';
    
    setTimeout(() => {
      // Update content
      titleElement.innerHTML = `${titles[currentHeroTitleIndex]}<br><span class="typing-text">Without Paywalls or Ads</span>`;
      subtitleElement.textContent = subtitles[currentHeroTitleIndex];
      
      // Fade in
      titleElement.style.opacity = '1';
      subtitleElement.style.opacity = '1';
      
      // Trigger typing animation
      const typingText = document.querySelector('.typing-text');
      if (typingText) {
        typingText.classList.remove('typing-text');
        void typingText.offsetWidth; // Trigger reflow
        typingText.classList.add('typing-text');
      }
    }, 300);
  }, 5000);
  
  // Pause rotation on hover
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
      if (heroRotationInterval) {
        clearInterval(heroRotationInterval);
      }
    });
    
    heroSection.addEventListener('mouseleave', () => {
      setupTitleRotation();
    });
  }
}

function setupInteractiveFeatures() {
  document.querySelectorAll('.feature.interactive').forEach(feature => {
    // Click to search
    feature.addEventListener('click', function() {
      const term = this.getAttribute('data-term');
      if (term) {
        searchTerm(term);
      }
    });
    
    // Hover effects
    feature.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
      this.style.borderColor = 'var(--primary)';
    });
    
    feature.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
      this.style.borderColor = 'transparent';
    });
  });
}

function setupQuickSearchToggle() {
  const quickSearchToggle = document.getElementById('quick-search-toggle');
  const quickSearchContainer = document.getElementById('quickSearchContainer');
  
  if (!quickSearchToggle || !quickSearchContainer) return;
  
  quickSearchToggle.addEventListener('click', function() {
    isQuickSearchVisible = !isQuickSearchVisible;
    
    if (isQuickSearchVisible) {
      quickSearchContainer.classList.remove('hidden');
      document.getElementById('quickSearch').focus();
    } else {
      quickSearchContainer.classList.add('hidden');
    }
  });
  
  // Quick search functionality
  const quickSearchBtn = document.getElementById('quickSearchBtn');
  const quickSearchInput = document.getElementById('quickSearch');
  
  if (quickSearchBtn && quickSearchInput) {
    quickSearchBtn.addEventListener('click', performSearch);
    quickSearchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') performSearch();
    });
  }
  
  // Suggestion tags
  document.querySelectorAll('.suggestion-tag').forEach(tag => {
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      const term = this.getAttribute('data-term');
      searchTerm(term);
    });
  });
}

function setupFloatingElements() {
  document.querySelectorAll('.float-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
      this.style.transform = 'translateY(-10px) scale(1.1)';
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.zIndex = '';
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
}

function setupHeroButtonAnimations() {
  const heroButtons = document.querySelectorAll('.hero-btn');
  heroButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05) translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) translateY(0)';
    });
  });
}

function searchTerm(term) {
  if (!term) return;
  
  // Show loading state
  const searchInput = document.getElementById('quickSearch');
  if (searchInput) {
    searchInput.value = term;
    searchInput.classList.add('searching');
  }
  
  // Navigate to dictionary page with search term
  setTimeout(() => {
    if (window.location.pathname.includes('dictionary.html')) {
      // If already on dictionary page, trigger search
      if (typeof window.searchDictionary === 'function') {
        window.searchDictionary(term);
      }
    } else {
      // Navigate to dictionary page
      window.location.href = `dictionary.html?search=${encodeURIComponent(term)}`;
    }
  }, 500);
}

function performSearch() {
  const term = document.getElementById('quickSearch').value.trim();
  if (term) {
    searchTerm(term);
  }
}

// SUPPORT SECTION
function initializeSupportSection() {
  console.log('Initializing support section...');
  
  // Generate QR pattern
  generateQRPattern();
  
  // Copy UPI ID buttons
  setupCopyUPIButtons();
  
  // Amount chips
  setupAmountChips();
  
  // Custom support
  setupCustomSupport();
  
  // Community actions
  setupCommunityActions();
  
  // Progress meter animation
  animateProgressMeter();
}

function generateQRPattern() {
  const qrDots = document.querySelector('.qr-dots');
  if (!qrDots) return;
  
  qrDots.innerHTML = '';
  
  // Create 8x8 grid of dots (64 total)
  for (let i = 0; i < 64; i++) {
    const dot = document.createElement('div');
    dot.className = 'qr-dot';
    
    // Create a pseudo-random pattern that looks like a QR code
    // Position-based randomness for consistent pattern
    const row = Math.floor(i / 8);
    const col = i % 8;
    
    // Create pattern areas (corners and center)
    const isCorner = (row < 3 && col < 3) || 
                     (row < 3 && col > 4) || 
                     (row > 4 && col < 3);
    
    const isCenter = row >= 3 && row <= 4 && col >= 3 && col <= 4;
    
    if (isCorner || isCenter || Math.random() > 0.5) {
      dot.classList.add('filled');
    }
    
    qrDots.appendChild(dot);
  }
}

function setupAmountChips() {
  document.querySelectorAll('.amount-chip').forEach(chip => {
    chip.addEventListener('click', function() {
      // Remove active class from all chips
      document.querySelectorAll('.amount-chip').forEach(c => {
        c.style.background = '';
        c.style.color = '';
        c.style.borderColor = '';
      });
      
      // Style active chip
      this.style.background = 'var(--primary)';
      this.style.color = 'white';
      this.style.borderColor = 'var(--primary)';
      
      const amount = this.getAttribute('data-amount');
      showSupportModal(amount);
    });
  });
}

function setupCustomSupport() {
  const supportNowBtn = document.querySelector('.support-now');
  const customAmountInput = document.getElementById('customSupport');
  
  if (supportNowBtn && customAmountInput) {
    supportNowBtn.addEventListener('click', function() {
      const amount = customAmountInput.value;
      if (amount && amount >= 10) {
        showSupportModal(amount);
      } else {
        alert('Please enter at least ₹10');
        customAmountInput.focus();
      }
    });
    
    customAmountInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        supportNowBtn.click();
      }
    });
  }
}

function setupCommunityActions() {
  // Share action
  const shareAction = document.querySelector('.share-action');
  if (shareAction) {
    shareAction.addEventListener('click', function() {
      const url = window.location.href;
      const text = 'Join me in supporting SlangAdda AI - Free Indian slang decoder!';
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    });
  }
  
  // Suggest action
  const suggestAction = document.querySelector('.suggest-action');
  if (suggestAction) {
    suggestAction.addEventListener('click', function() {
      const suggestionModal = document.getElementById('suggestionModal');
      if (suggestionModal) {
        suggestionModal.style.display = 'flex';
      }
    });
  }
  
  // Contribute action
  const contributeAction = document.querySelector('.contribute-action');
  if (contributeAction) {
    contributeAction.addEventListener('click', function() {
      showContributeModal();
    });
  }
}

function animateProgressMeter() {
  const meterFill = document.getElementById('meter-fill');
  const goalPercentage = document.getElementById('goal-percentage');
  
  if (!meterFill || !goalPercentage) return;
  
  // Current progress (42% in example)
  const targetWidth = 42;
  let currentWidth = 0;
  
  // Animate after a short delay
  setTimeout(() => {
    const interval = setInterval(() => {
      if (currentWidth >= targetWidth) {
        clearInterval(interval);
        return;
      }
      currentWidth++;
      meterFill.style.width = currentWidth + '%';
      goalPercentage.textContent = currentWidth + '%';
    }, 20);
  }, 1000);
}

function showContributeModal() {
  alert('🎯 Want to contribute your skills? Awesome!\n\nWe need help with:\n\n✨ Adding new slang terms\n📝 Improving explanations\n💻 Website development\n🎨 Design improvements\n\n📧 Email us at: contribute@slangadda.ai\n\nThank you for wanting to help! 🙏');
}

// SUPPORT MODAL
function showSupportModal(amount) {
  const modal = document.getElementById('supportModal');
  const modalBody = document.getElementById('modalBody');
  
  if (!modal || !modalBody) {
    console.warn('Support modal elements not found');
    return;
  }
  
  const impactMessages = {
    50: "₹50 helps keep SlangAdda running for 5 hours",
    100: "₹100 supports 10+ student searches",
    200: "₹200 covers a day of server costs",
    500: "₹500 helps us add 50+ new terms"
  };
  
  const impactMessage = impactMessages[amount] || `₹${amount} helps keep SlangAdda free for everyone`;
  
  modalBody.innerHTML = `
    <div class="support-confirmation animate-in">
      <div class="confirmation-header">
        <i class="fas fa-heart"></i>
        <h3>Amazing! You're Supporting Free Knowledge 🌟</h3>
        <p>${impactMessage}</p>
      </div>
      
      <div class="support-details">
        <div class="detail-card">
          <div class="detail-label">Support Amount</div>
          <div class="detail-value">₹${amount}</div>
        </div>
        
        <div class="detail-card">
          <div class="detail-label">Payment Method</div>
          <div class="detail-value">UPI (Recommended)</div>
        </div>
        
        <div class="qr-display">
          <div class="qr-simulated">
            <div class="qr-simulated-inner">
              <div class="qr-pattern">
                ${Array(25).fill('<div class="qr-cell"></div>').join('')}
              </div>
              <div class="qr-amount">₹${amount}</div>
            </div>
          </div>
          <p class="qr-instruction">Scan with any UPI app</p>
        </div>
        
        <div class="upi-info">
          <p><strong>Or send directly to:</strong></p>
          <div class="upi-id-display">
            <code>slangadda@ybl</code>
            <button class="copy-btn-small" onclick="copyUPIId()">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
        
        <div class="impact-statement">
          <i class="fas fa-seedling"></i>
          <p>Your support directly helps students, parents, and professionals understand each other better.</p>
        </div>
      </div>
      
      <div class="support-actions-modal">
        <button class="action-btn primary" onclick="copyUPIId()">
          <i class="fas fa-copy"></i> Copy UPI ID
        </button>
        <button class="action-btn secondary" onclick="closeSupportModal()">
          I'll Support Later
        </button>
      </div>
      
      <div class="thank-you-note">
        <p><i class="fas fa-hands-heart"></i> Thank you for being part of this movement!</p>
      </div>
    </div>
  `;
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  // Animate QR cells
  setTimeout(() => {
    const qrCells = document.querySelectorAll('.qr-cell');
    qrCells.forEach((cell, index) => {
      setTimeout(() => {
        cell.style.opacity = '1';
        cell.style.transform = 'scale(1)';
      }, index * 10);
    });
  }, 100);
}

function closeSupportModal() {
  const modal = document.getElementById('supportModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// COMMON FUNCTIONS
function setupMobileMenu() {
  // Create mobile menu button if on mobile
  if (window.innerWidth <= 768) {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      const menuBtn = document.createElement('button');
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      menuBtn.className = 'mobile-menu-btn';
      menuBtn.style.cssText = `
        background: var(--primary);
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: var(--radius);
        cursor: pointer;
        display: none;
      `;
      
      navbar.insertBefore(menuBtn, navbar.querySelector('nav'));
      
      const nav = navbar.querySelector('nav');
      nav.style.cssText = `
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 20px;
        box-shadow: var(--shadow);
        flex-direction: column;
        gap: 15px;
      `;
      
      menuBtn.addEventListener('click', () => {
        const isVisible = nav.style.display === 'flex';
        nav.style.display = isVisible ? 'none' : 'flex';
        menuBtn.innerHTML = isVisible ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
      });
      
      // Show/hide based on screen size
      const updateMenu = () => {
        if (window.innerWidth <= 768) {
          menuBtn.style.display = 'block';
          nav.style.display = 'none';
        } else {
          menuBtn.style.display = 'none';
          nav.style.display = 'flex';
        }
      };
      
      updateMenu();
      window.addEventListener('resize', updateMenu);
    }
  }
}

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || href.startsWith('#!') || href.startsWith('#')) return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile menu if open
        const mobileMenu = document.querySelector('.navbar nav');
        if (mobileMenu && mobileMenu.style.display === 'flex') {
          mobileMenu.style.display = 'none';
          const menuBtn = document.querySelector('.mobile-menu-btn');
          if (menuBtn) {
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
          }
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
}

function setupSuggestionModal() {
  const suggestionBtn = document.getElementById('suggestSlangBtn');
  const suggestionLink = document.getElementById('suggestLink');
  
  if (suggestionBtn) {
    suggestionBtn.addEventListener('click', () => {
      const modal = document.getElementById('suggestionModal');
      if (modal) modal.style.display = 'flex';
    });
  }
  
  if (suggestionLink) {
    suggestionLink.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById('suggestionModal');
      if (modal) modal.style.display = 'flex';
    });
  }
}

function setupShareButtons() {
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const platform = this.getAttribute('data-platform') || 'whatsapp';
      sharePage(platform);
    });
  });
}

function setupModalHandlers() {
  // Close buttons
  document.querySelectorAll('.close-modal, .cancel-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  });
  
  // Close when clicking outside
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  });
  
  // Suggestion form submission
  const submitSuggestionBtn = document.getElementById('submitSuggestion');
  if (submitSuggestionBtn) {
    submitSuggestionBtn.addEventListener('click', submitSuggestion);
  }
}

function setupCopyUPIButtons() {
  document.querySelectorAll('.copy-upi, .copy-upi-btn, .copy-upi-full').forEach(btn => {
    btn.addEventListener('click', copyUPIId);
  });
}

function copyUPIId() {
  const upiId = 'slangadda@ybl';
  
  navigator.clipboard.writeText(upiId).then(() => {
    // Show success feedback
    const originalText = this?.innerHTML || 'Copy UPI ID';
    const successHTML = '<i class="fas fa-check"></i> Copied!';
    
    if (this) {
      const originalBg = this.style.background;
      const originalColor = this.style.color;
      
      this.innerHTML = successHTML;
      this.style.background = 'var(--success)';
      this.style.color = 'white';
      
      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.background = originalBg;
        this.style.color = originalColor;
      }, 2000);
    } else {
      // Fallback if button not available
      alert(`UPI ID copied to clipboard: ${upiId}`);
    }
    
    // Analytics event (if implemented)
    trackEvent('copy_upi', { upi_id: upiId });
  }).catch(err => {
    console.error('Failed to copy UPI ID:', err);
    alert('Failed to copy UPI ID. Please copy manually: ' + upiId);
  });
}

function sharePage(platform) {
  const url = window.location.href;
  const title = document.title;
  const text = `Check out SlangAdda AI - Free Indian slang decoder!`;
  
  let shareUrl = '';
  switch(platform) {
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      break;
    default:
      shareUrl = url;
  }
  
  if (shareUrl !== url) {
    window.open(shareUrl, '_blank', 'width=600,height=400,menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
  }
  
  // Analytics event
  trackEvent('share_page', { platform: platform });
}

function submitSuggestion() {
  const term = document.getElementById('slangTerm')?.value.trim();
  const meaning = document.getElementById('slangMeaning')?.value.trim();
  
  if (!term || !meaning) {
    alert('Please fill at least the slang term and its meaning');
    return;
  }
  
  // Simulate submission
  const submitBtn = document.getElementById('submitSuggestion');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    alert(`✅ Thank you!\n\nWe've received your suggestion for "${term}".\n\nWe'll review it and add it to our dictionary soon.`);
    
    // Reset form
    document.getElementById('slangTerm').value = '';
    document.getElementById('slangMeaning').value = '';
    document.getElementById('slangContext')?.value = '';
    document.getElementById('slangExample')?.value = '';
    document.getElementById('userEmail')?.value = '';
    
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    // Close modal
    const modal = document.getElementById('suggestionModal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    
    // Analytics event
    trackEvent('submit_suggestion', { term: term });
  }, 1500);
}

function initializeAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Optional: Stop observing after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements with animation classes
  document.querySelectorAll('.stat, .reason, .mission-stat, .contribute-card, .testimonial-card').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}

function initializeTooltips() {
  const tooltips = document.querySelectorAll('[data-tooltip]');
  tooltips.forEach(el => {
    el.addEventListener('mouseenter', function(e) {
      const tooltipText = this.getAttribute('data-tooltip');
      const tooltip = document.createElement('div');
      tooltip.className = 'custom-tooltip';
      tooltip.textContent = tooltipText;
      
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.position = 'fixed';
      tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
      tooltip.style.left = (rect.left + rect.width/2 - tooltip.offsetWidth/2) + 'px';
      
      this._tooltip = tooltip;
    });
    
    el.addEventListener('mouseleave', function() {
      if (this._tooltip) {
        this._tooltip.remove();
        this._tooltip = null;
      }
    });
  });
}

// Utility functions
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getRandomSlang() {
  // This would use the slang database
  const terms = ['rizz', 'delulu', 'chapri', 'savage', 'vibe', 'sus', 'based'];
  return terms[Math.floor(Math.random() * terms.length)];
}

function trackEvent(eventName, data = {}) {
  // In production, integrate with analytics service
  console.log(`Event: ${eventName}`, data);
  
  // Example: Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, data);
  }
}

// Performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Error handling
window.addEventListener('error', function(e) {
  console.error('Error occurred:', e.error);
  // In production, send to error tracking service
  trackEvent('error', {
    message: e.message,
    filename: e.filename,
    lineno: e.lineno,
    colno: e.colno
  });
});

// Service Worker for PWA (optional)
if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
  window.addEventListener('load', function() {
    // You can register a service worker here for offline functionality
    /*
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
    */
  });
}

// Export functions for use in other scripts
window.SlangAdda = {
  searchTerm,
  showSupportModal,
  closeSupportModal,
  copyUPIId,
  sharePage,
  formatNumber,
  getRandomSlang,
  debounce,
  throttle
};

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
  if (heroRotationInterval) {
    clearInterval(heroRotationInterval);
  }
});
