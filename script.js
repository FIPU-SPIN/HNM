document.addEventListener("DOMContentLoaded", () => {

const questions = [
  { word: "glava", answer: "kratkouzlazni" },
  { word: "rȃk", answer: "dugosilazni" },
  { word: "pìsati", answer: "kratkouzlazni" }
];

let currentQuestion = 0;
let score = 0;

let questionEl;
let feedbackEl;
let progressEl;

const intro = document.getElementById("quiz-intro");
const quiz = document.getElementById("quiz");
const startBtn = document.getElementById("start-quiz");

quiz.style.display = "none";

function cacheElements() {
  questionEl = document.getElementById("question");
  feedbackEl = document.getElementById("feedback");
  progressEl = document.getElementById("progress");
}

function attachAnswerHandlers() {
  const buttons = document.querySelectorAll("#answers button");
  buttons.forEach(button => {
    button.addEventListener("click", handleAnswer);
  });
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = `Koji je naglasak u riječi: "${q.word}"?`;
  feedbackEl.textContent = "";
  feedbackEl.className = "";
  progressEl.textContent = `Pitanje ${currentQuestion + 1} / ${questions.length}`;
}

function handleAnswer(event) {
  const userAnswer = event.target.dataset.answer;
  const correctAnswer = questions[currentQuestion].answer;

  if (userAnswer === correctAnswer) {
    feedbackEl.textContent = "Točno!";
    feedbackEl.className = "correct";
    score++;
  } else {
    feedbackEl.textContent = `Netočno. Točan odgovor je: ${correctAnswer}`;
    feedbackEl.className = "wrong";
  }

  currentQuestion++;

  setTimeout(() => {
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1200);
}

function showResult() {
  quiz.innerHTML = `
    <div class="result-box">
      <h2>🎉 Kviz završen!</h2>
      <p class="result-score">Točno: <strong>${score}</strong> / ${questions.length}</p>
      <button id="retry">Pokušaj ponovno</button>
    </div>
  `;

  document.getElementById("retry").addEventListener("click", restartQuiz);
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  quiz.style.display = "none";
  intro.style.display = "block";

  quiz.innerHTML = `
    <p id="question"></p>

    <div id="answers">
      <button data-answer="kratkosilazni">Kratkosilazni</button>
      <button data-answer="kratkouzlazni">Kratkouzlazni</button>
      <button data-answer="dugosilazni">Dugosilazni</button>
      <button data-answer="dugouzlazni">Dugouzlazni</button>
    </div>

    <p id="feedback"></p>
    <p id="progress"></p>
  `;
}

startBtn.addEventListener("click", () => {
  intro.style.display = "none";
  quiz.style.display = "block";

  cacheElements();
  attachAnswerHandlers();
  showQuestion();
});

});
