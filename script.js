// SlangAdda AI - JavaScript Functionality

// Slang database with meanings, context, and safety ratings
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
  }
};

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const searchInput = document.getElementById('searchInput');
  const decodeBtn = document.getElementById('decodeBtn');
  const ctaBtn = document.getElementById('ctaBtn');
  const chips = document.querySelectorAll('.chip');
  const donateButtons = document.querySelectorAll('.donate-btn');
  const upgradeBtn = document.querySelector('.upgrade-btn');
  
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
      
      // Track with analytics (simulated)
      console.log(`User searched for: ${term}`);
      
      // Show ad after 2 seconds (simulated)
      setTimeout(() => {
        console.log("Showing ad opportunity...");
      }, 2000);
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
  
  // Search/Decode button click
  decodeBtn.addEventListener('click', function() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      showSlangResult(searchTerm);
      searchInput.value = '';
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
  
  // CTA button click
  ctaBtn.addEventListener('click', function() {
    searchInput.focus();
    showSlangResult('rizz'); // Show example
  });
  
  // Chip clicks
  chips.forEach(chip => {
    chip.addEventListener('click', function() {
      const slang = this.getAttribute('data-slang');
      searchInput.value = slang;
      showSlangResult(slang);
    });
  });
  
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
  
  // Donation buttons
  donateButtons.forEach(button => {
    button.addEventListener('click', function() {
      const amount = this.getAttribute('data-amount');
      alert(`Thank you for considering a ₹${amount} donation!\n\nIn a real implementation, this would redirect to a payment gateway like Razorpay, PayPal, or UPI.`);
      
      // Track donation click
      console.log(`Donation clicked: ₹${amount}`);
    });
  });
  
  // Upgrade button
  if (upgradeBtn) {
    upgradeBtn.addEventListener('click', function() {
      alert('Upgrade to Pro!\n\nPro Features:\n✅ Unlimited slang lookups\n✅ Ad-free experience\n✅ Advanced context explanations\n✅ Downloadable slang lists\n✅ Priority new slang updates\n\nMonthly: ₹99 | Yearly: ₹999');
    });
  }
  
  // Floating animation for chips on hover
  chips.forEach(chip => {
    chip.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.05)';
    });
    
    chip.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add subtle animation to cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe cards for animation
  document.querySelectorAll('.card, .audience-row span').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
  
  // Auto-fill random slang on page load (for demo)
  const randomSlangs = Object.keys(slangDatabase);
  const randomSlang = randomSlangs[Math.floor(Math.random() * randomSlangs.length)];
  searchInput.placeholder = `Try: '${randomSlang}' or 'yeh banda alag hi rizz hai'`;
  
  // Show welcome message
  setTimeout(() => {
    console.log("SlangAdda AI loaded successfully!");
    console.log("Ready for monetization through ads and donations!");
  }, 1000);
});

// Function to simulate ad display (for demo)
function showAd() {
  console.log("Ad displayed - revenue generated!");
}

// Simulate page views for analytics
setInterval(() => {
  // In real implementation, this would send data to Google Analytics
  console.log("Page view tracked for analytics");
}, 30000);
