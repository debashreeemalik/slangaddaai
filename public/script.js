// script.js - Updated with Firebase
import firebaseService from './firebase-config.js';

document.addEventListener('DOMContentLoaded', function() {
  initApp();
});

// Global variables
let currentUser = null;
let slangData = [];

// Initialize application with Firebase
async function initApp() {
  // Check authentication state
  firebaseService.onAuthStateChange(async (user) => {
    if (user) {
      currentUser = user;
      await loadUserProfile(user.uid);
      updateUIForLoggedInUser();
    } else {
      currentUser = null;
      updateUIForLoggedOutUser();
    }
  });
  
  // Load initial slang data
  await loadSlangData();
  
  // Set up event listeners
  setupEventListeners();
  
  // Initialize animations
  initAnimations();
  
  // Check for URL parameters
  handleUrlParams();
}

// Load user profile from Firestore
async function loadUserProfile(userId) {
  const result = await firebaseService.getUserProfile(userId);
  if (result.success) {
    // Store additional user data
    currentUser.profile = result.data;
  }
}

// Load slang data from Firestore
async function loadSlangData() {
  const result = await firebaseService.getSlangTerms({ limit: 10 });
  if (result.success) {
    slangData = result.data;
    updateTrendingChips();
  } else {
    // Fallback to mock data
    loadMockSlangData();
  }
}

// Update trending chips with Firebase data
function updateTrendingChips() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  
  carousel.innerHTML = '';
  
  slangData.slice(0, 5).forEach((slang) => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.dataset.id = slang.id;
    chip.dataset.term = slang.term;
    
    let emoji = '🔥';
    if (slang.category === 'Gen-Z') emoji = '👑';
    else if (slang.category === 'Indian') emoji = '🇮🇳';
    else if (slang.category === 'Hinglish') emoji = '💬';
    else if (slang.category === 'Gaming') emoji = '🎮';
    
    chip.innerHTML = `${emoji} ${slang.term}`;
    chip.addEventListener('click', () => searchSlang(slang.term));
    
    carousel.appendChild(chip);
  });
}

// Set up event listeners with Firebase
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
  document.querySelectorAll('.floating span').forEach(term => {
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
}

// Handle search with Firebase
async function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  const searchTerm = searchInput.value.trim();
  
  if (searchTerm) {
    // Save to search history if user is logged in
    if (currentUser) {
      // Find slang ID by term
      const slangTerm = slangData.find(s => 
        s.term.toLowerCase() === searchTerm.toLowerCase()
      );
      
      if (slangTerm) {
        await firebaseService.addToSearchHistory(currentUser.uid, slangTerm.id);
      }
    }
    
    // Navigate to dictionary page with search term
    window.location.href = `pages/dictionary.html?search=${encodeURIComponent(searchTerm)}`;
  } else {
    showToast('Please enter a slang term to decode!', 'warning');
    searchInput.focus();
  }
}

// Show login modal with Firebase
function showLoginModal() {
  const modalHtml = `
    <div class="modal-overlay" id="loginModal">
      <div class="modal">
        <button class="modal-close">&times;</button>
        <h2>Login to SlangAdda AI</h2>
        
        <div class="auth-tabs">
          <button class="auth-tab active" data-tab="login">Login</button>
          <button class="auth-tab" data-tab="signup">Sign Up</button>
        </div>
        
        <!-- Login Form -->
        <form id="loginForm" class="auth-form active">
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="loginEmail" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="loginPassword" required>
          </div>
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-sign-in-alt"></i> Login
          </button>
          
          <div class="divider">or</div>
          
          <button type="button" id="googleLogin" class="btn btn-outline">
            <i class="fab fa-google"></i> Continue with Google
          </button>
        </form>
        
        <!-- Signup Form -->
        <form id="signupForm" class="auth-form">
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
            <input type="password" id="signupPassword" required minlength="6">
          </div>
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-user-plus"></i> Create Account
          </button>
        </form>
        
        <p class="modal-footer">
          By continuing, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
        </p>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  addModalStyles();
  
  // Add tab switching
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      
      // Update active tab
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show active form
      document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
      });
      document.getElementById(`${tabName}Form`).classList.add('active');
    });
  });
  
  // Close modal
  document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('loginModal').remove();
  });
  
  // Form submissions
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('signupForm').addEventListener('submit', handleSignup);
  document.getElementById('googleLogin').addEventListener('click', handleGoogleLogin);
}

// Handle Firebase login
async function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const submitBtn = e.target.querySelector('button[type="submit"]');
  
  // Show loading
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
  submitBtn.disabled = true;
  
  const result = await firebaseService.loginUser(email, password);
  
  if (result.success) {
    showToast('Login successful!', 'success');
    document.getElementById('loginModal').remove();
  } else {
    showToast(result.error, 'error');
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
}

// Handle Firebase signup
async function handleSignup(e) {
  e.preventDefault();
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const submitBtn = e.target.querySelector('button[type="submit"]');
  
  // Show loading
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
  submitBtn.disabled = true;
  
  const result = await firebaseService.registerUser(email, password, name);
  
  if (result.success) {
    showToast('Account created successfully!', 'success');
    document.getElementById('loginModal').remove();
  } else {
    showToast(result.error, 'error');
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
}

// Handle Google login
async function handleGoogleLogin() {
  const btn = document.getElementById('googleLogin');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Continuing with Google...';
  btn.disabled = true;
  
  const result = await firebaseService.loginWithGoogle();
  
  if (result.success) {
    showToast('Login successful!', 'success');
    document.getElementById('loginModal').remove();
  } else {
    showToast(result.error, 'error');
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

// Logout function
async function logout() {
  const result = await firebaseService.logoutUser();
  if (result.success) {
    showToast('Logged out successfully', 'info');
    window.location.href = '../index.html';
  }
}

// Add modal styles
function addModalStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .auth-tabs {
      display: flex;
      margin-bottom: 25px;
      border-bottom: 2px solid var(--gray-light);
    }
    .auth-tab {
      flex: 1;
      padding: 15px;
      background: none;
      border: none;
      font-size: 16px;
      font-weight: 600;
      color: var(--gray);
      cursor: pointer;
      transition: var(--transition);
      position: relative;
    }
    .auth-tab.active {
      color: var(--primary);
    }
    .auth-tab.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--primary);
    }
    .auth-form {
      display: none;
    }
    .auth-form.active {
      display: block;
    }
    .divider {
      text-align: center;
      margin: 20px 0;
      color: var(--gray);
      position: relative;
    }
    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: var(--gray-light);
    }
    .divider span {
      background: white;
      padding: 0 15px;
      position: relative;
    }
    .btn-outline {
      background: white;
      border: 2px solid var(--gray-light);
      color: var(--dark);
      width: 100%;
      padding: 12px;
    }
    .btn-outline:hover {
      border-color: var(--primary);
      color: var(--primary);
    }
  `;
  document.head.appendChild(style);
}

// Export functions
window.slangadda = {
  searchSlang,
  showLoginModal,
  logout,
  getCurrentUser: () => currentUser,
  getSlangData: () => slangData,
  firebaseService
};
