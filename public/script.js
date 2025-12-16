// script.js - Main JavaScript for SlangAdda AI
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the application
  initApp();
});

// Global variables
let currentUser = null;
let slangData = [];

// Initialize application
function initApp() {
  // Check if user is logged in
  checkAuthStatus();
  
  // Load slang data
  loadSlangData();
  
  // Set up event listeners
  setupEventListeners();
  
  // Initialize animations
  initAnimations();
  
  // Check for URL parameters (for search)
  handleUrlParams();
}

// Check authentication status
function checkAuthStatus() {
  const userData = localStorage.getItem('slangadda_user');
  if (userData) {
    currentUser = JSON.parse(userData);
    updateUIForLoggedInUser();
  }
}

// Update UI for logged in user
function updateUIForLoggedInUser() {
  const loginBtn = document.querySelector('.login-btn');
  if (loginBtn && currentUser) {
    loginBtn.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name.split(' ')[0]}`;
    loginBtn.onclick = () => window.location.href = 'pages/profile.html';
  }
}

// Load initial slang data
function loadSlangData() {
  // In a real app, this would fetch from an API
  // For now, use mock data
  slangData = [
    {
      id: 1,
      term: 'rizz',
      meaning: 'Charisma, attractiveness, or charm',
      fullMeaning: 'The ability to attract or charm someone, often through confidence, humor, or style.',
      category: 'Gen-Z',
      safety: 'safe',
      example: 'He has so much rizz, everyone wants to be around him.',
      origin: 'Short for "charisma", popularized on TikTok',
      usage: 'Casual, social media',
      popularity: 95,
      tags: ['romance', 'personality', 'positive']
    },
    {
      id: 2,
      term: 'delulu',
      meaning: 'Delusional, unrealistic thinking',
      fullMeaning: 'Being overly optimistic or believing in unrealistic scenarios, often in a humorous or self-aware way.',
      category: 'Internet',
      safety: 'safe',
      example: 'I\'m being delulu thinking I\'ll finish this project in one day.',
      origin: 'Internet slang, popular in fan communities',
      usage: 'Casual, humorous',
      popularity: 88,
      tags: ['humor', 'self-awareness', 'internet']
    },
    {
      id: 3,
      term: 'chapri',
      meaning: 'Someone trying too hard to be cool',
      fullMeaning: 'A person, typically male, who adopts flashy but tasteless fashion and behavior to appear cool or wealthy.',
      category: 'Indian',
      safety: 'caution',
      example: 'That chapri guy with the loud bike is causing a scene again.',
      origin: 'Indian internet slang',
      usage: 'Informal, can be derogatory',
      popularity: 82,
      tags: ['fashion', 'behavior', 'indian']
    },
    {
      id: 4,
      term: 'scene kya hai?',
      meaning: 'What\'s the plan/situation?',
      fullMeaning: 'A casual way to ask about current plans, situation, or what is happening.',
      category: 'Hinglish',
      safety: 'safe',
      example: 'Bhai, scene kya hai for tonight?',
      origin: 'Hindi-English mix, popular in North India',
      usage: 'Casual, conversational',
      popularity: 75,
      tags: ['planning', 'conversation', 'hinglish']
    },
    {
      id: 5,
      term: 'NPC energy',
      meaning: 'Boring or predictable behavior',
      fullMeaning: 'Acting in a routine, unoriginal way without independent thought, like a non-playable character in video games.',
      category: 'Gaming',
      safety: 'safe',
      example: 'He has such NPC energy, always doing the same thing every day.',
      origin: 'Gaming community, popularized online',
      usage: 'Casual, humorous criticism',
      popularity: 70,
      tags: ['gaming', 'behavior', 'humor']
    }
  ];
  
  // Update trending chips
  updateTrendingChips();
}

// Update trending chips with data
function updateTrendingChips() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  
  // Clear existing chips
  carousel.innerHTML = '';
  
  // Sort by popularity and take top 5
  const trending = [...slangData]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5);
  
  // Create chips
  trending.forEach((slang, index) => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.dataset.id = slang.id;
    chip.dataset.term = slang.term;
    
    // Add emoji based on category
    let emoji = '🔥';
    if (slang.category === 'Gen-Z') emoji = '👑';
    else if (slang.category === 'Indian') emoji = '🇮🇳';
    else if (slang.category === 'Hinglish') emoji = '💬';
    else if (slang.category === 'Gaming') emoji = '🎮';
    
    chip.innerHTML = `${emoji} ${slang.term}`;
    
    // Add click event
    chip.addEventListener('click', () => {
      searchSlang(slang.term);
    });
    
    carousel.appendChild(chip);
  });
}

// Set up event listeners
function setupEventListeners() {
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  const decodeBtn = document.getElementById('decodeBtn');
  
  if (decodeBtn) {
    decodeBtn.addEventListener('click', handleSearch);
  }
  
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
  }
  
  // CTA button
  const ctaBtn = document.getElementById('ctaBtn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.focus();
      } else {
        window.location.href = 'pages/dictionary.html';
      }
    });
  }
  
  // Floating slang terms
  const floatingTerms = document.querySelectorAll('.floating span');
  floatingTerms.forEach(term => {
    term.addEventListener('click', function() {
      const slangTerm = this.textContent.split(' ')[0];
      searchSlang(slangTerm);
    });
  });
  
  // Mobile menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  
  // Pro upgrade buttons
  const proButtons = document.querySelectorAll('.pro-card button, .pro');
  proButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!currentUser) {
        e.preventDefault();
        showLoginModal();
      }
    });
  });
}

// Handle search
function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  const searchTerm = searchInput.value.trim();
  
  if (searchTerm) {
    // Save search to history if user is logged in
    if (currentUser) {
      saveToSearchHistory(searchTerm);
    }
    
    // Navigate to dictionary page with search term
    window.location.href = `pages/dictionary.html?search=${encodeURIComponent(searchTerm)}`;
  } else {
    showToast('Please enter a slang term to decode!', 'warning');
    searchInput.focus();
  }
}

// Search slang function (for direct calls)
function searchSlang(term) {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = term;
    handleSearch();
  } else {
    window.location.href = `pages/dictionary.html?search=${encodeURIComponent(term)}`;
  }
}

// Save to search history
function saveToSearchHistory(term) {
  if (!currentUser) return;
  
  let history = JSON.parse(localStorage.getItem('search_history') || '[]');
  
  // Add term if not already in recent history
  if (!history.includes(term.toLowerCase())) {
    history.unshift(term.toLowerCase());
    
    // Keep only last 10 searches
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    
    localStorage.setItem('search_history', JSON.stringify(history));
  }
}

// Initialize animations
function initAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.card, .audience-row span, .chip').forEach(el => {
    observer.observe(el);
  });
}

// Handle URL parameters
function handleUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search');
  
  if (searchParam && document.getElementById('searchInput')) {
    document.getElementById('searchInput').value = searchParam;
  }
}

// Toggle mobile menu
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

// Show login modal
function showLoginModal() {
  const modalHtml = `
    <div class="modal-overlay" id="loginModal">
      <div class="modal">
        <button class="modal-close">&times;</button>
        <h2>Login to SlangAdda AI</h2>
        <form id="loginForm">
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="loginEmail" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="loginPassword" required>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
          <p class="modal-footer">Don't have an account? <a href="#" id="switchToSignup">Sign up</a></p>
        </form>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  // Add modal styles
  const style = document.createElement('style');
  style.textContent = `
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000;
    }
    .modal {
      background: white;
      padding: 40px;
      border-radius: var(--radius);
      width: 90%;
      max-width: 400px;
      position: relative;
      box-shadow: var(--shadow-lg);
    }
    .modal-close {
      position: absolute;
      top: 15px;
      right: 15px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: var(--gray);
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }
    .form-group input {
      width: 100%;
      padding: 12px;
      border: 1px solid var(--gray-light);
      border-radius: 8px;
      font-family: inherit;
    }
    .modal-footer {
      margin-top: 20px;
      text-align: center;
      color: var(--gray);
    }
    .modal-footer a {
      color: var(--primary);
      text-decoration: none;
      font-weight: 500;
    }
  `;
  document.head.appendChild(style);
  
  // Add event listeners
  document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('loginModal').remove();
    style.remove();
  });
  
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('switchToSignup').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('loginModal').remove();
    showSignupModal();
  });
}

// Show signup modal
function showSignupModal() {
  const modalHtml = `
    <div class="modal-overlay" id="signupModal">
      <div class="modal">
        <button class="modal-close">&times;</button>
        <h2>Join SlangAdda AI</h2>
        <form id="signupForm">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" id="signupName" required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="signupEmail" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="signupPassword" required>
          </div>
          <button type="submit" class="btn btn-primary">Create Account</button>
          <p class="modal-footer">Already have an account? <a href="#" id="switchToLogin">Login</a></p>
        </form>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  // Add event listeners
  document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('signupModal').remove();
  });
  
  document.getElementById('signupForm').addEventListener('submit', handleSignup);
  document.getElementById('switchToLogin').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signupModal').remove();
    showLoginModal();
  });
}

// Handle login
function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  // Mock login - in real app, this would be an API call
  if (email && password) {
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('slangadda_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Successful login
      currentUser = user;
      localStorage.setItem('slangadda_user', JSON.stringify(user));
      
      showToast('Login successful!', 'success');
      updateUIForLoggedInUser();
      
      // Close modal
      document.getElementById('loginModal').remove();
      document.querySelector('style[data-modal-style]')?.remove();
    } else {
      showToast('Invalid email or password', 'error');
    }
  }
}

// Handle signup
function handleSignup(e) {
  e.preventDefault();
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  
  if (name && email && password) {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('slangadda_users') || '[]');
    
    if (users.some(u => u.email === email)) {
      showToast('User already exists with this email', 'error');
      return;
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // In real app, this would be hashed
      joinDate: new Date().toISOString(),
      isPro: false,
      searchHistory: []
    };
    
    users.push(newUser);
    localStorage.setItem('slangadda_users', JSON.stringify(users));
    
    // Auto login
    currentUser = newUser;
    localStorage.setItem('slangadda_user', JSON.stringify(newUser));
    
    showToast('Account created successfully!', 'success');
    updateUIForLoggedInUser();
    
    // Close modal
    document.getElementById('signupModal').remove();
  }
}

// Show toast notification
function showToast(message, type = 'info') {
  // Remove existing toasts
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();
  
  // Create toast
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .toast {
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 3000;
      animation: slideIn 0.3s ease;
      box-shadow: var(--shadow-lg);
    }
    .toast-success { background: var(--success); }
    .toast-error { background: var(--danger); }
    .toast-warning { background: var(--warning); }
    .toast-info { background: var(--primary); }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(toast);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.remove();
    style.remove();
  }, 3000);
}

// Logout function
function logout() {
  localStorage.removeItem('slangadda_user');
  currentUser = null;
  updateUIForLoggedInUser();
  showToast('Logged out successfully', 'info');
  window.location.href = '../index.html';
}

// Export functions for use in other files
window.slangadda = {
  searchSlang,
  showLoginModal,
  logout,
  getCurrentUser: () => currentUser,
  getSlangData: () => slangData
};
