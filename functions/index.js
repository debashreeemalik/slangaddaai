// functions/index.js - Cloud Functions for Firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Update popularity when slang is searched
exports.onSlangSearch = functions.firestore
  .document('searchHistory/{docId}')
  .onCreate(async (snap, context) => {
    const searchData = snap.data();
    
    // Increment search count for the slang term
    const slangRef = admin.firestore().doc(`slang/${searchData.slangId}`);
    await slangRef.update({
      searchCount: admin.firestore.FieldValue.increment(1),
      popularity: admin.firestore.FieldValue.increment(1)
    });
    
    return null;
  });

// Send welcome email on user registration
exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  const userEmail = user.email;
  const userName = user.displayName || user.email.split('@')[0];
  
  // In production, integrate with SendGrid or similar
  console.log(`Welcome email would be sent to: ${userEmail}`);
  
  return null;
});

// Calculate trending slang (runs every 24 hours)
exports.calculateTrending = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const slangSnapshot = await admin.firestore()
      .collection('slang')
      .where('updatedAt', '>=', yesterday)
      .get();
    
    // Calculate trending score based on recent activity
    for (const doc of slangSnapshot.docs) {
      const slangData = doc.data();
      
      // Simple trending algorithm
      const trendingScore = 
        (slangData.searchCount || 0) * 0.5 +
        (slangData.upvotes?.length || 0) * 2 +
        (slangData.shares || 0) * 1.5;
      
      await doc.ref.update({
        trendingScore: trendingScore,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }
    
    return null;
  });
