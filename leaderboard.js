import { ref, push, query, orderByChild, limitToLast, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const db = window.firebaseDB;
const scoresRef = ref(db, "scores");

// Submit the score and provide feedback
function submitScore() {
  const nickname = document.getElementById("nickname").value.trim();
  const score = parseInt(document.getElementById("score").textContent);
  if (!nickname) {
    alert("Please enter a nickname.");
    return;
  }

  push(scoresRef, { name: nickname, score: score })
    .then(() => {
      alert("Score submitted successfully!");
      document.getElementById("nickname").value = "";
      document.getElementById("gameOver").style.display = "none";
    })
    .catch((error) => {
      alert("Error submitting score: " + error.message);
    });
}

// Load the leaderboard
function updateLeaderboard() {
  const leaderboardList = document.getElementById("leaderboardList");
  leaderboardList.innerHTML = "";
  const topScores = query(scoresRef, orderByChild("score"), limitToLast(5));
  onValue(topScores, (snapshot) => {
    let items = [];
    snapshot.forEach(child => items.push(child.val()));
    items.sort((a, b) => b.score - a.score);
    for (let entry of items) {
      const li = document.createElement("li");
      li.textContent = `${entry.name}: ${entry.score}`;
      leaderboardList.appendChild(li);
    }
  });
}

// Allow pressing Enter to submit score
document.addEventListener("keydown", function(e) {
  if (e.key === "Enter" && document.getElementById("gameOver").style.display === "block") {
    submitScore();
  }
});

updateLeaderboard();
window.submitScore = submitScore;
