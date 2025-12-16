const slangDB = {
  rizz: {
    meaning: "Natural charm or confidence, especially while flirting.",
    example: "He pulled her without trying — pure rizz.",
    origin: "Gen-Z / Internet",
    safe: true,
    pro: true
  },
  chapri: {
    meaning: "Someone behaving cheap or attention-seeking.",
    example: "Ignore him, total chapri vibes.",
    origin: "Indian slang",
    safe: false,
    pro: false
  }
};

const trending = ["rizz", "chapri", "delulu", "bhai scene"];

const carousel = document.getElementById("trendingCarousel");

trending.forEach(word => {
  const div = document.createElement("div");
  div.className = "trend-item";
  div.innerText = word;
  div.onclick = () => showResult(word);
  carousel.appendChild(div);
});

function searchSlang() {
  const value = document.getElementById("searchInput").value.toLowerCase();
  showResult(value);
}

function showResult(word) {
  const data = slangDB[word];
  if (!data) return;

  document.getElementById("slangWord").innerText = word;
  document.getElementById("slangMeaning").innerText = data.meaning;
  document.getElementById("slangExample").innerText = data.example;

  document.getElementById("resultCard").classList.remove("hidden");
}

function playAudio() {
  const utter = new SpeechSynthesisUtterance(
    document.getElementById("slangWord").innerText
  );
  utter.lang = "en-IN";
  speechSynthesis.speak(utter);
}
