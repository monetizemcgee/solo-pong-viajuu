import { ref, push, query, orderByChild, limitToLast, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const db = window.firebaseDB;
const scoresRef = ref(db, "scores");

function submitScore() {
  const nickname = document.getElementById("nickname").value;
  const score = parseInt(document.getElementById("score").textContent);
  if (nickname) {
    push(scoresRef, { name: nickname, score: score });
    document.getElementById("nickname").value = "";
    document.getElementById("gameOver").style.display = "none";
  }
}

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

updateLeaderboard();
window.submitScore = submitScore;
