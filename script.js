// SlangAdda AI - Complete JavaScript with All Features

// Extended slang database
const slangDatabase = {
  "rizz": {
    meaning: "Charisma or charm, especially in romantic contexts",
    context: "Used to describe someone's ability to attract others romantically or socially",
    safety: "office-safe",
    example: "He has so much rizz, everyone at the party wanted to talk to him.",
    origin: "Internet slang, popularized on TikTok circa 2022",
    rating: "⭐⭐⭐⭐⭐",
    category: "Gen-Z Romance"
  },
  "delulu": {
    meaning: "Delusional, especially in romantic or unrealistic thinking",
    context: "Used when someone is believing unrealistic scenarios, often romantically",
    safety: "casual",
    example: "She's being delulu if she thinks that celebrity will notice her.",
    origin: "Korean pop culture + internet slang",
    rating: "⭐⭐⭐⭐",
    category: "Internet Culture"
  },
  "chapri": {
    meaning: "Someone trying too hard to be cool, often in a tacky or unrefined way",
    context: "Usually derogatory, describes style, behavior, or attitude",
    safety: "avoid in professional settings",
    example: "Those loud bike modifications are such chapri behavior.",
    origin: "Indian internet slang, North India origin",
    rating: "⭐⭐⭐",
    category: "Indian Slang"
  },
  "bhai scene": {
    meaning: "Asking what's happening or what's the plan",
    context: "Casual greeting among friends to ask about plans or situation",
    safety: "casual",
    example: "Bhai scene kya hai? Kaha ja rahe ho aaj raat?",
    origin: "Hindi/Urdu + youth slang",
    rating: "⭐⭐⭐⭐",
    category: "Hinglish"
  },
  "npc energy": {
    meaning: "Someone who lacks originality or acts predictably like a video game character",
    context: "Comparing people to Non-Player Characters in video games",
    safety: "office-safe",
    example: "He has such NPC energy, always giving the same boring responses.",
    origin: "Gaming + Gen Z internet culture",
    rating: "⭐⭐⭐⭐⭐",
    category: "Gaming Slang"
  },
  "simp": {
    meaning: "Someone who does too much for someone they're attracted to",
    context: "Often used negatively for excessive admiration",
    safety: "casual",
    example: "Stop being a simp and have some self-respect.",
    origin: "Internet slang, early 2020s",
    rating: "⭐⭐⭐",
    category: "Relationships"
  },
  "slay": {
    meaning: "To do something exceptionally well",
    context: "Praise for outstanding performance or appearance",
    safety: "office-safe",
    example: "Your presentation totally slayed!",
    origin: "Drag culture + mainstream internet",
    rating: "⭐⭐⭐⭐⭐",
    category: "Praise"
  },
  "mid": {
    meaning: "Average, mediocre, not special",
    context: "Used to describe something or someone as unremarkable",
    safety: "casual",
    example: "The new movie was pretty mid, nothing special.",
    origin: "Internet slang",
    rating: "⭐⭐⭐",
    category: "Criticism"
  },
  "sus": {
    meaning: "Suspicious or shady",
    context: "Used when something seems off or untrustworthy",
    safety: "casual",
    example: "His story sounds sus to me.",
    origin: "Among Us game + internet slang",
    rating: "⭐⭐⭐⭐",
    category: "Gaming"
  },
  "ghosting": {
    meaning: "Suddenly cutting off all communication without explanation",
    context: "Common in dating but also used in friendships",
    safety: "office-safe",
    example: "She's been ghosting me since our last date.",
    origin: "Dating culture + internet",
    rating: "⭐⭐⭐",
    category: "Relationships"
  }
};

// Quiz questions database
const quizQuestions = [
  {
    question: "What does 'rizz' mean?",
    options: [
      { text: "Charisma or romantic charm", correct: true },
      { text: "A type of dance move", correct: false },
      { text: "Quick movement", correct: false },
      { text: "Food item", correct: false }
    ]
  },
  {
    question: "What does 'delulu' mean?",
    options: [
      { text: "Delicious food", correct: false },
      { text: "Delusional or unrealistic thinking", correct: true },
      { text: "Delayed response", correct: false },
      { text: "Delightful person", correct: false }
    ]
  },
  {
    question: "Which slang means 'suspicious'?",
    options: [
      { text: "Slay", correct: false },
      { text: "Sus", correct: true },
      { text: "Simp", correct: false },
      { text: "Mid", correct: false }
    ]
  },
  {
    question: "What does 'ghosting' mean in dating?",
    options: [
      { text: "Sending ghost emojis", correct: false },
      { text: "Watching horror movies together", correct: false },
      { text: "Suddenly cutting off communication", correct: true },
      { text: "Dressing up as ghosts", correct: false }
    ]
  },
  {
    question: "What does 'NPC energy' refer to?",
    options: [
      { text: "High energy levels", correct: false },
      { text: "Predictable, unoriginal behavior", correct: true },
      { text: "Gaming skills", correct: false },
      { text: "Natural personality charisma", correct: false }
    ]
  }
];

// User data
let userData = {
  isLoggedIn: false,
  isPro: false,
  quizScore: 0,
  quizStreak: 0,
  searchesToday: 0,
  lastSearchDate: null
};

// Payment configurations
const paymentConfig = {
  razorpayKey: "rzp_test_YOUR_KEY_HERE", // You need to sign up at razorpay.com
  upiId: "slangaddaai@okaxis",
  proMonthlyPrice: 9900, // in paise (₹99)
  proYearlyPrice: 99900, // in paise (₹999)
  donationAmounts: [5000, 10000, 50000, 100000] // in paise
};

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize UI
  initDictionary();
  initQuiz();
  initPayments();
  initNavigation();
  
  // Check if user is logged in (simulated)
  checkLoginStatus();
  
  // Initialize search functionality
  initSearch();
});

function initDictionary() {
  const dictionaryGrid = document.getElementById('dictionaryGrid');
  const dictSearch = document.getElementById('dictSearch');
  const dictSearchBtn = document.getElementById('dictSearchBtn');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  
  let currentDisplayCount = 6;
  
  // Load initial dictionary items
  loadDictionaryItems();
  
  // Dictionary search
  dictSearchBtn.addEventListener('click', searchDictionary);
  dictSearch.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchDictionary();
  });
  
  // Load more button
  loadMoreBtn.addEventListener('click', function() {
    currentDisplayCount += 6;
    loadDictionaryItems();
  });
  
  function loadDictionaryItems() {
    dictionaryGrid.innerHTML = '';
    const terms = Object.keys(slangDatabase);
    
    for (let i = 0; i < Math.min(currentDisplayCount, terms.length); i++) {
      const term = terms[i];
      const slang = slangDatabase[term];
      
      const dictItem = document.createElement('div');
      dictItem.className = 'dict-item';
      dictItem.innerHTML = `
        <div class="dict-term">${term}</div>
        <div class="dict-meaning">${slang.meaning}</div>
        <div class="dict-tags">
          <span class="dict-tag">${slang.category}</span>
          <span class="dict-tag">${slang.safety}</span>
          <span class="dict-tag">${slang.rating}</span>
        </div>
        <button class="read-more view-details" data-term="${term}">
          View Details <i class="fas fa-arrow-right"></i>
        </button>
      `;
      
      dictionaryGrid.appendChild(dictItem);
    }
    
    // Add event listeners to view details buttons
    document.querySelectorAll('.view-details').forEach(btn => {
      btn.addEventListener('click', function() {
        const term = this.getAttribute('data-term');
        showSlangResult(term);
      });
    });
    
    // Hide load more button if all items loaded
    if (currentDisplayCount >= terms.length) {
      loadMoreBtn.style.display = 'none';
    }
  }
  
  function searchDictionary() {
    const searchTerm = dictSearch.value.toLowerCase().trim();
    if (!searchTerm) {
      currentDisplayCount = 6;
      loadDictionaryItems();
      return;
    }
    
    dictionaryGrid.innerHTML = '';
    const terms = Object.keys(slangDatabase);
    let foundCount = 0;
    
    for (const term of terms) {
      if (term.includes(searchTerm) || 
          slangDatabase[term].meaning.toLowerCase().includes(searchTerm) ||
          slangDatabase[term].category.toLowerCase().includes(searchTerm)) {
        
        const slang = slangDatabase[term];
        const dictItem = document.createElement('div');
        dictItem.className = 'dict-item';
        dictItem.innerHTML = `
          <div class="dict-term">${term}</div>
          <div class="dict-meaning">${slang.meaning}</div>
          <div class="dict-tags">
            <span class="dict-tag">${slang.category}</span>
            <span class="dict-tag">${slang.safety}</span>
            <span class="dict-tag">${slang.rating}</span>
          </div>
          <button class="read-more view-details" data-term="${term}">
            View Details <i class="fas fa-arrow-right"></i>
          </button>
        `;
        
        dictionaryGrid.appendChild(dictItem);
        foundCount++;
        
        // Add event listener
        dictItem.querySelector('.view-details').addEventListener('click', function() {
          showSlangResult(term);
        });
      }
    }
    
    if (foundCount === 0) {
      dictionaryGrid.innerHTML = `
        <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 40px;">
          <i class="fas fa-search" style="font-size: 3rem; color: var(--gray); margin-bottom: 20px;"></i>
          <h3>No slang terms found</h3>
          <p>Try searching for something else or suggest this term to be added!</p>
          <button class="suggest-term" style="margin-top: 20px; padding: 10px 20px; background: var(--primary); color: white; border: none; border-radius: 50px; cursor: pointer;">
            Suggest Term
          </button>
        </div>
      `;
    }
    
    loadMoreBtn.style.display = 'none';
  }
}

function initQuiz() {
  let currentQuestion = 0;
  let score = 0;
  let streak = 0;
  
  const quizQuestion = document.getElementById('quizQuestion');
  const quizScore = document.getElementById('quizScore');
  const quizStreak = document.getElementById('quizStreak');
  const nextQuestionBtn = document.getElementById('nextQuestion');
  const quizOptions = document.querySelector('.quiz-options');
  
  // Load first question
  loadQuestion(currentQuestion);
  
  // Next question button
  nextQuestionBtn.addEventListener('click', function() {
    currentQuestion = (currentQuestion + 1) % quizQuestions.length;
    loadQuestion(currentQuestion);
    resetOptions();
  });
  
  // Quiz type buttons
  document.querySelectorAll('.start-quiz').forEach(btn => {
    btn.addEventListener('click', function() {
      const parent = this.closest('.quiz-type');
      if (parent.classList.contains('pro-feature') && !userData.isPro) {
        showProModal();
        return;
      }
      
      alert('Starting quiz! This would load a full quiz in a real implementation.');
    });
  });
  
  function loadQuestion(index) {
    const question = quizQuestions[index];
    quizQuestion.innerHTML = `
      <p><strong>Q${index + 1}:</strong> ${question.question}</p>
      <div class="quiz-options">
        ${question.options.map((opt, i) => `
          <button class="quiz-option" data-correct="${opt.correct}">
            ${opt.text}
          </button>
        `).join('')}
      </div>
    `;
    
    // Add event listeners to new options
    document.querySelectorAll('.quiz-option').forEach(option => {
      option.addEventListener('click', function() {
        const isCorrect = this.getAttribute('data-correct') === 'true';
        
        // Disable all options
        document.querySelectorAll('.quiz-option').forEach(opt => {
          opt.disabled = true;
          if (opt.getAttribute('data-correct') === 'true') {
            opt.classList.add('correct');
          } else if (opt === this && !isCorrect) {
            opt.classList.add('wrong');
          }
        });
        
        // Update score
        if (isCorrect) {
          score += 10;
          streak++;
        } else {
          streak = 0;
        }
        
        quizScore.textContent = score;
        quizStreak.textContent = streak;
        
        // Show next button
        nextQuestionBtn.style.display = 'inline-flex';
      });
    });
  }
  
  function resetOptions() {
    nextQuestionBtn.style.display = 'none';
    quizScore.textContent = score;
    quizStreak.textContent = streak;
  }
}

function initPayments() {
  // UPI Copy button
  document.getElementById('copyUpiBtn').addEventListener('click', function() {
    navigator.clipboard.writeText(paymentConfig.upiId).then(() => {
      const originalText = this.textContent;
      this.textContent = '✓ Copied!';
      this.style.background = 'var(--success)';
      
      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = 'var(--primary)';
      }, 2000);
    });
  });
  
  // Donation buttons
  document.querySelectorAll('.donate-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const amount = parseInt(this.getAttribute('data-amount'));
      showPaymentModal('donation', amount);
    });
  });
  
  // Pro upgrade buttons
  document.getElementById('proMonthlyBtn').addEventListener('click', function() {
    showPaymentModal('pro_monthly', paymentConfig.proMonthlyPrice / 100);
  });
  
  document.getElementById('proYearlyBtn').addEventListener('click', function() {
    showPaymentModal('pro_yearly', paymentConfig.proYearlyPrice / 100);
  });
  
  document.getElementById('proUpgradeBtn').addEventListener('click', function() {
    showProModal();
  });
  
  // Card payment button
  document.getElementById('cardPayBtn').addEventListener('click', function() {
    showPaymentModal('choose_amount', 0);
  });
}

function initNavigation() {
  // CTA button goes to dictionary
  document.getElementById('ctaBtn').addEventListener('click', function() {
    document.getElementById('dictionary').scrollIntoView({ behavior: 'smooth' });
  });
  
  // Nav links smooth scroll
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Login button
  document.getElementById('loginBtn').addEventListener('click', function() {
    if (userData.isLoggedIn) {
      showUserMenu();
    } else {
      showLoginModal();
    }
  });
}

function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const decodeBtn = document.getElementById('decodeBtn');
  const chips = document.querySelectorAll('.chip');
  
  // Create modal for results
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <div class="slang-result">
        <h3 id="slang-term"></h3>
        <p><strong>Meaning:</strong> <span id="slang-meaning"></span></p>
        <p><strong>Context:</strong> <span id="slang-context"></span></p>
        <p><strong>Safety:</strong> <span id="slang-safety"></span></p>
        <p><strong>Example:</strong> "<span id="slang-example"></span>"</p>
        <p><strong>Origin:</strong> <span id="slang-origin"></span></p>
        <p><strong>Rating:</strong> <span id="slang-rating"></span></p>
        <p><strong>Category:</strong> <span id="slang-category"></span></p>
        ${!userData.isPro ? `
          <div class="pro-upsell" style="margin-top: 20px; padding: 15px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: var(--radius);">
            <p style="color: #92400e; margin-bottom: 10px;"><i class="fas fa-crown"></i> <strong>Pro Tip:</strong> Get detailed regional variations and usage statistics</p>
            <button class="upgrade-btn" id="modalUpgradeBtn" style="padding: 8px 16px; font-size: 0.9rem;">Upgrade to Pro</button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  const closeModal = modal.querySelector('.close-modal');
  const slangTerm = document.getElementById('slang-term');
  const slangMeaning = document.getElementById('slang-meaning');
  const slangContext = document.getElementById('slang-context');
  const slangSafety = document.getElementById('slang-safety');
  const slangExample = document.getElementById('slang-example');
  const slangOrigin = document.getElementById('slang-origin');
  const slangRating = document.getElementById('slang-rating');
  const slangCategory = document.getElementById('slang-category');
  
  // Search/Decode button
  decodeBtn.addEventListener('click', function() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      showSlangResult(searchTerm);
      searchInput.value = '';
      
      // Track search
      userData.searchesToday++;
      console.log(`Search performed: ${searchTerm}. Total today: ${userData.searchesToday}`);
      
      // Show ad every 3 searches (simulated)
      if (userData.searchesToday % 3 === 0 && !userData.isPro) {
        console.log("Ad opportunity: User has made 3 searches");
        // In real implementation: showAd();
      }
    } else {
      alert('Please enter a slang term to decode!');
      searchInput.focus();
    }
  });
  
  // Enter key in search
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      decodeBtn.click();
    }
  });
  
  // Chip clicks
  chips.forEach(chip => {
    chip.addEventListener('click', function() {
      const slang = this.getAttribute('data-slang');
      searchInput.value = slang;
      decodeBtn.click();
    });
  });
  
  // Function to show slang result
  function showSlangResult(term) {
    const slang = slangDatabase[term.toLowerCase()];
    
    if (slang) {
      slangTerm.textContent = term;
      slangMeaning.textContent = slang.meaning;
      slangContext.textContent = slang.context;
      
      // Set safety with color
      let safetyColor = '#10b981'; // green for office-safe
      if (slang.safety === 'casual') safetyColor = '#f59e0b'; // orange
      if (slang.safety === 'avoid in professional settings') safetyColor = '#ef4444'; // red
      
      slangSafety.innerHTML = `<span style="color: ${safetyColor}; font-weight: 600;">${slang.safety}</span>`;
      
      slangExample.textContent = slang.example;
      slangOrigin.textContent = slang.origin;
      slangRating.textContent = slang.rating;
      slangCategory.textContent = slang.category;
      
      modal.style.display = 'flex';
      
      // Add upgrade button listener
      const modalUpgradeBtn = document.getElementById('modalUpgradeBtn');
      if (modalUpgradeBtn) {
        modalUpgradeBtn.addEventListener('click', function() {
          modal.style.display = 'none';
          showProModal();
        });
      }
    } else {
      // If slang not found
      slangTerm.textContent = term;
      slangMeaning.textContent = "We're still learning this one!";
      slangContext.textContent = "This slang might be very new or regional.";
      slangSafety.innerHTML = '<span style="color: #f59e0b;">Unknown</span>';
      slangExample.textContent = "Help us by submitting an example!";
      slangOrigin.textContent = "Unknown - Help us document it!";
      slangRating.textContent = "Not yet rated";
      slangCategory.textContent = "Uncategorized";
      
      modal.style.display = 'flex';
    }
  }
  
  // Close modal
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Also close payment modal
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });
}

function showPaymentModal(type, amount) {
  const modal = document.getElementById('paymentModal');
  const modalTitle = document.getElementById('modalTitle');
  const paymentDetails = document.getElementById('paymentDetails');
  
  let title = '';
  let detailsHTML = '';
  
  switch(type) {
    case 'donation':
      title = `Donate ₹${amount}`;
      detailsHTML = `
        <div class="payment-option">
          <h4><i class="fas fa-qrcode"></i> UPI QR Code</h4>
          <p>Scan with any UPI app to pay ₹${amount}</p>
          <div class="qr-code-large" style="margin: 20px 0;">
            <!-- QR code would be generated here -->
            <div style="width: 200px; height: 200px; background: #f0f0f0; margin: 0 auto; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 3rem;">
              ₹${amount}
            </div>
          </div>
          <p style="text-align: center; font-family: monospace; font-size: 1.2rem; margin: 15px 0;">${paymentConfig.upiId}</p>
          <button class="copy-upi" style="width: 100%; margin-bottom: 15px;" onclick="copyToClipboard('${paymentConfig.upiId}')">
            Copy UPI ID
          </button>
        </div>
        
        <div class="payment-option">
          <h4><i class="fas fa-credit-card"></i> Card / Net Banking</h4>
          <p>Pay securely via Razorpay</p>
          <button class="card-pay-btn" onclick="processRazorpayPayment(${amount * 100}, 'Donation: ₹${amount}')" style="width: 100%; margin: 20px 0;">
            <i class="fas fa-lock"></i> Pay ₹${amount} Now
          </button>
        </div>
        
        <div class="payment-note">
          <p><i class="fas fa-info-circle"></i> All payments are secure and encrypted. Receipt will be emailed.</p>
        </div>
      `;
      break;
      
    case 'pro_monthly':
      title = 'Upgrade to Pro Monthly';
      detailsHTML = `
        <div class="payment-summary">
          <h4>Pro Monthly Plan - ₹99</h4>
          <ul style="margin: 20px 0; padding-left: 20px;">
            <li>Unlimited slang lookups</li>
            <li>Ad-free experience</li>
            <li>Full quiz access</li>
            <li>Blog articles</li>
            <li>Priority support</li>
          </ul>
        </div>
        
        <div class="payment-options">
          <div class="payment-option">
            <button class="payment-method-btn" onclick="processRazorpayPayment(${paymentConfig.proMonthlyPrice}, 'Pro Monthly - ₹99')">
              <i class="fas fa-credit-card"></i> Credit/Debit Card
            </button>
          </div>
          
          <div class="payment-option">
            <button class="payment-method-btn" onclick="showUpiPayment(${99})">
              <i class="fas fa-mobile-alt"></i> UPI
            </button>
          </div>
          
          <div class="payment-option">
            <button class="payment-method-btn" onclick="showNetBanking()">
              <i class="fas fa-university"></i> Net Banking
            </button>
          </div>
        </div>
        
        <div class="security-note">
          <p><i class="fas fa-shield-alt"></i> 7-day money-back guarantee</p>
          <p><i class="fas fa-lock"></i> 256-bit SSL encryption</p>
        </div>
      `;
      break;
      
    case 'choose_amount':
      title = 'Choose Amount';
      detailsHTML = `
        <div class="amount-options">
          <h4>Select donation amount</h4>
          <div class="amount-buttons" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0;">
            <button class="amount-btn" onclick="showPaymentModal('donation', 50)">₹50</button>
            <button class="amount-btn" onclick="showPaymentModal('donation', 100)">₹100</button>
            <button class="amount-btn" onclick="showPaymentModal('donation', 500)">₹500</button>
            <button class="amount-btn" onclick="showPaymentModal('donation', 1000)">₹1000</button>
          </div>
          
          <div class="custom-amount" style="margin: 20px 0;">
            <h5>Or enter custom amount</h5>
            <div style="display: flex; gap: 10px; margin-top: 10px;">
              <input type="number" id="customAmount" placeholder="Enter amount" style="flex: 1; padding: 10px; border: 2px solid var(--gray-light); border-radius: var(--radius);">
              <button onclick="processCustomAmount()" style="background: var(--primary); color: white; border: none; padding: 10px 20px; border-radius: var(--radius); cursor: pointer;">Pay</button>
            </div>
          </div>
        </div>
      `;
      break;
  }
  
  modalTitle.textContent = title;
  paymentDetails.innerHTML = detailsHTML;
  modal.style.display = 'flex';
}

function showProModal() {
  const modal = document.getElementById('paymentModal');
  const modalTitle = document.getElementById('modalTitle');
  const paymentDetails = document.getElementById('paymentDetails');
  
  modalTitle.textContent = 'Upgrade to SlangAdda Pro';
  paymentDetails.innerHTML = `
    <div class="pro-benefits">
      <h4>Why go Pro?</h4>
      <div class="benefits-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
        <div class="benefit">
          <i class="fas fa-infinity"></i>
          <p>Unlimited searches</p>
        </div>
        <div class="benefit">
          <i class="fas fa-ad"></i>
          <p>Ad-free experience</p>
        </div>
        <div class="benefit">
          <i class="fas fa-brain"></i>
          <p>Advanced quizzes</p>
        </div>
        <div class="benefit">
          <i class="fas fa-newspaper"></i>
          <p>Exclusive articles</p>
        </div>
        <div class="benefit">
          <i class="fas fa-chart-line"></i>
          <p>Usage analytics</p>
        </div>
        <div class="benefit">
          <i class="fas fa-headset"></i>
          <p>Priority support</p>
        </div>
      </div>
    </div>
    
    <div class="pricing-options" style="margin: 30px 0;">
      <div class="pricing-option" style="background: #f8fafc; padding: 20px; border-radius: var(--radius); margin-bottom: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h5 style="margin: 0;">Monthly</h5>
            <p style="margin: 5px 0; color: var(--gray);">Cancel anytime</p>
          </div>
          <div style="text-align: right;">
            <h3 style="margin: 0; color: var(--primary);">₹99</h3>
            <p style="margin: 0; color: var(--gray);">per month</p>
          </div>
        </div>
        <button onclick="showPaymentModal('pro_monthly', 99)" style="width: 100%; margin-top: 15px; padding: 12px; background: var(--gradient); color: white; border: none; border-radius: var(--radius); font-weight: 600; cursor: pointer;">
          Choose Monthly
        </button>
      </div>
      
      <div class="pricing-option" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: var(--radius);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h5 style="margin: 0;">Yearly</h5>
            <p style="margin: 5px 0; color: #92400e;">Save ₹189</p>
          </div>
          <div style="text-align: right;">
            <h3 style="margin: 0; color: #92400e;">₹999</h3>
            <p style="margin: 0; color: #92400e;">per year</p>
          </div>
        </div>
        <button onclick="showPaymentModal('pro_yearly', 999)" style="width: 100%; margin-top: 15px; padding: 12px; background: #92400e; color: white; border: none; border-radius: var(--radius); font-weight: 600; cursor: pointer;">
          Choose Yearly (Save 16%)
        </button>
      </div>
    </div>
    
    <div class="guarantee" style="text-align: center; margin-top: 20px; padding: 15px; background: #d1fae5; border-radius: var(--radius); color: #065f46;">
      <p style="margin: 0;"><i class="fas fa-shield-alt"></i> <strong>7-day money-back guarantee</strong> - Love it or get a full refund</p>
    </div>
  `;
  
  modal.style.display = 'flex';
}

function showLoginModal() {
  const modal = document.getElementById('paymentModal');
  const modalTitle = document.getElementById('modalTitle');
  const paymentDetails = document.getElementById('paymentDetails');
  
  modalTitle.textContent = 'Login to SlangAdda';
  paymentDetails.innerHTML = `
    <div class="login-form">
      <div class="login-options">
        <button class="social-login" style="width: 100%; padding: 15px; margin-bottom: 15px; background: #4285f4; color: white; border: none; border-radius: var(--radius); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;">
          <i class="fab fa-google"></i> Continue with Google
        </button>
        
        <button class="social-login" style="width: 100%; padding: 15px; margin-bottom: 15px; background: #1877f2; color: white; border: none; border-radius: var(--radius); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;">
          <i class="fab fa-facebook"></i> Continue with Facebook
        </button>
      </div>
      
      <div class="divider" style="text-align: center; margin: 20px 0; position: relative;">
        <span style="background: white; padding: 0 15px; color: var(--gray);">or</span>
        <hr style="position: absolute; top: 50%; left: 0; right: 0; z-index: -1; border: none; border-top: 1px solid var(--gray-light);">
      </div>
      
      <div class="email-login">
        <input type="email" placeholder="Email address" style="width: 100%; padding: 15px; margin-bottom: 15px; border: 2px solid var(--gray-light); border-radius: var(--radius);">
        <input type="password" placeholder="Password" style="width: 100%; padding: 15px; margin-bottom: 15px; border: 2px solid var(--gray-light); border-radius: var(--radius);">
        <button onclick="simulateLogin()" style="width: 100%; padding: 15px; background: var(--gradient); color: white; border: none; border-radius: var(--radius); font-weight: 600; cursor: pointer;">
          Login
        </button>
      </div>
      
      <div class="login-links" style="text-align: center; margin-top: 20px;">
        <a href="#" style="color: var(--primary); text-decoration: none; display: block; margin-bottom: 10px;">Create new account</a>
        <a href="#" style="color: var(--gray); text-decoration: none; font-size: 0.9rem;">Forgot password?</a>
      </div>
    </div>
  `;
  
  modal.style.display = 'flex';
}

// Simulated functions (in real implementation, these would connect to backend)
function simulateLogin() {
  userData.isLoggedIn = true;
  document.getElementById('loginBtn').innerHTML = '<i class="fas fa-user"></i> My Account';
  document.getElementById('paymentModal').style.display = 'none';
  alert('Successfully logged in! (This is a demo)');
}

function checkLoginStatus() {
  // Check localStorage for login status
  const savedLogin = localStorage.getItem('slangadda_login');
  if (savedLogin === 'true') {
    userData.isLoggedIn = true;
    document.getElementById('loginBtn').innerHTML = '<i class="fas fa-user"></i> My Account';
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard: ' + text);
  });
}

function processRazorpayPayment(amount, description) {
  // This is a simulated payment function
  // In real implementation, you would use Razorpay's actual API
  alert(`Payment simulation: ${description}\nAmount: ₹${amount/100}\n\nIn real implementation, this would open Razorpay checkout.`);
  
  // Simulate successful payment
  if (description.includes('Pro')) {
    userData.isPro = true;
    alert('🎉 Welcome to SlangAdda Pro! All features unlocked.');
  }
  
  document.getElementById('paymentModal').style.display = 'none';
}

// Initialize random search placeholder
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const randomSlangs = Object.keys(slangDatabase);
  const randomSlang = randomSlangs[Math.floor(Math.random() * randomSlangs.length)];
  searchInput.placeholder = `Try: '${randomSlang}' or 'yeh banda alag hi rizz hai'`;
  
  // Simulate ad display
  setInterval(() => {
    if (!userData.isPro && Math.random() > 0.7) {
      console.log("Ad display opportunity");
    }
  }, 30000);
});

// Newsletter subscription
document.querySelector('.subscribe-btn').addEventListener('click', function() {
  const emailInput = document.querySelector('.newsletter-form input');
  if (emailInput.value && emailInput.value.includes('@')) {
    alert('Thanks for subscribing to our newsletter! You\'ll receive weekly slang updates.');
    emailInput.value = '';
  } else {
    alert('Please enter a valid email address.');
  }
});

// Read more buttons in blog
document.querySelectorAll('.read-more').forEach(btn => {
  if (!btn.classList.contains('view-details')) {
    btn.addEventListener('click', function() {
      alert('In a real implementation, this would open the full blog article.');
    });
  }
});
