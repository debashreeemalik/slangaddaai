// SlangAdda AI - Shared JavaScript Functions
// This file contains functions used across all pages

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Common initialization
  initializeCommonFeatures();
  
  // Page-specific initialization
  if (document.querySelector('.dictionary-content')) {
    console.log('Dictionary page loaded');
  }
  
  if (document.querySelector('.quiz-selection')) {
    console.log('Quiz page loaded');
  }
});

function initializeCommonFeatures() {
  // Mobile menu toggle (to be implemented)
  setupMobileMenu();
  
  // Smooth scrolling for anchor links
  setupSmoothScrolling();
  
  // Donation button handlers
  setupDonationButtons();
  
  // Suggestion modal
  setupSuggestionModal();
  
  // Share functionality
  setupShareButtons();
}

function setupMobileMenu() {
  // In a real implementation, add hamburger menu for mobile
  // For now, we'll keep the desktop nav
}

function setupSmoothScrolling() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only process internal anchor links
      if (href === '#' || href.startsWith('#!')) return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

function setupDonationButtons() {
  // Setup donation buttons if they exist on the page
  document.querySelectorAll('.donate-btn, .chai-option, .amount-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const amount = this.getAttribute('data-amount') || 
                    this.textContent.match(/₹(\d+)/)?.[1] || 
                    50;
      showDonationModal(amount);
    });
  });
}

function setupSuggestionModal() {
  const suggestionBtn = document.getElementById('suggestSlangBtn');
  if (suggestionBtn) {
    suggestionBtn.addEventListener('click', showSuggestionModal);
  }
}

function setupShareButtons() {
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const platform = this.getAttribute('data-platform');
      sharePage(platform);
    });
  });
}

// Global modal functions
function showDonationModal(amount) {
  // This would be implemented based on the page
  // Each page has its own implementation
  console.log(`Donation modal for ₹${amount}`);
  alert(`Thank you for considering a ₹${amount} donation!\n\nUPI ID: slangadda@ybl\n\nScan QR on homepage to donate.`);
}

function showSuggestionModal() {
  // Each page has its own suggestion modal
  console.log('Show suggestion modal');
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
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
}

// Common utility functions
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getRandomSlang() {
  const terms = Object.keys(slangDatabase);
  return terms[Math.floor(Math.random() * terms.length)];
}

// Initialize tooltips
function initializeTooltips() {
  const tooltips = document.querySelectorAll('[data-tooltip]');
  tooltips.forEach(el => {
    el.addEventListener('mouseenter', function() {
      const tooltipText = this.getAttribute('data-tooltip');
      showTooltip(this, tooltipText);
    });
    
    el.addEventListener('mouseleave', function() {
      hideTooltip();
    });
  });
}

function showTooltip(element, text) {
  // Tooltip implementation would go here
}

function hideTooltip() {
  // Hide tooltip implementation
}

// Error handling
window.addEventListener('error', function(e) {
  console.error('Error occurred:', e.error);
  // In production, you might want to log this to a service
});

// Service Worker for PWA (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // You can register a service worker here for offline functionality
    // navigator.serviceWorker.register('/sw.js');
  });
}
