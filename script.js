document.addEventListener("DOMContentLoaded", () => {
  
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.main-nav ul');
  const overlay = document.querySelector('.nav-overlay');

  burger.addEventListener('click', () => {
    const isOpen = burger.classList.contains('active');
    isOpen ? closeMenu() : openMenu();
});

burger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        burger.click();
    };
});

overlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.classList.contains('active')) {
        closeMenu();
    };
});

function openMenu() {
    burger.classList.add('active');
    nav.classList.add('active');
    overlay.classList.add('active');

    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
}

function closeMenu() {
    burger.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');

    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
};

// Breadcrumbs

    const breadcrumbs = document.getElementById("breadcrumbs");
    if (breadcrumbs) {

    const path = window.location.pathname.split("/").pop() || "index.html";
    const pageName = getPageName(path);

    let trail = JSON.parse(sessionStorage.getItem("breadcrumbTrail")) || [];

    const existingIndex = trail.findIndex(p => p.path === path);
    
    if (pageName === "Početna") {
    trail = [{ name: "Početna", path }];
  } else if (existingIndex !== -1) {
    trail = trail.slice(0, existingIndex + 1);
  } else {
    trail.push({ name: pageName, path });
  }


    sessionStorage.setItem("breadcrumbTrail", JSON.stringify(trail));

    breadcrumbs.innerHTML = trail.map((item, i) => {
      if (i === trail.length - 1) {
      return `<span class="current">${item.name}</span>`;
    } else {
      return `<a href="${item.path}">${item.name}</a>`;
    }
  }).join(" / ");

 
  function getPageName(file) {
    if (file === "pocetna.html" || file === "index.html") return "Početna";
      return file.replace(".html", "").replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  }

// Kviz

nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

  const intro = document.getElementById("quiz-intro");
  const readyScreen = document.getElementById("quiz-ready");
  const quiz = document.getElementById("quiz");

  const startBtn = document.getElementById("start-quiz");
  const beginBtn = document.getElementById("begin-quiz");

  const questionEl = document.getElementById("question");
  const answerButtons = document.querySelectorAll("#answers button");
  const feedbackEl = document.getElementById("feedback");
  const progressEl = document.getElementById("progress");

  const questions = [
    {
      question: "Riječ: glȃva",
      correct: "dugosilazni"
    },
    {
      question: "Riječ: vòda",
      correct: "kratkouzlazni"
    },
    {
      question: "Riječ: rȍditelj",
      correct: "kratkosilazni"
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let canClick = true;

  intro.style.display = "block";
  readyScreen.style.display = "none";
  quiz.style.display = "none";
  
  startBtn.addEventListener("click", () => {
    intro.style.display = "none";
    readyScreen.style.display = "block";
  });
  
  beginBtn.addEventListener("click", () => {
    readyScreen.style.display = "none";
    quiz.style.display = "block";
    showQuestion();
  });

  function showQuestion() {
    canClick = true;
    feedbackEl.textContent = "";

    answerButtons.forEach(btn => {
      btn.disabled = false;
      btn.classList.remove("correct", "wrong");
    });

    questionEl.textContent = questions[currentQuestion].question;
    progressEl.textContent = `Pitanje ${currentQuestion + 1} / ${questions.length}`;
  }

    answerButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (!canClick) return;
      canClick = false;

      const selected = button.dataset.answer;
      const correct = questions[currentQuestion].correct;

      if (selected === correct) {
        button.classList.add("correct");
        feedbackEl.textContent = "✅ Točno!";
        score++;
      } else {
        button.classList.add("wrong");
        feedbackEl.textContent = `❌ Netočno — točan odgovor je: ${correct}`;
      }

      answerButtons.forEach(btn => btn.disabled = true);

      setTimeout(() => {
        currentQuestion++;

        if (currentQuestion < questions.length) {
          showQuestion();
        } else {
          showResult();
        }
      }, 1200);
      });
      });

  function showResult() {
  questionEl.textContent = "🎉 Kviz završen!";

  const total = questions.length;
  const percent = Math.round((score / total) * 100);

  let message = "";
  let emoji = "";

  if (percent === 100) {
    message = "Savršeno! Naglasci su ti jača strana 😎";
    emoji = "🏆";
  } else if (percent >= 70) {
    message = "Odlično ti ide! Još malo i to je to! 👏";
    emoji = "✨";
  } else if (percent >= 40) {
    message = "Dobro ti ide, ali trebaš još malo vježbe 🙂";
    emoji = "🎧";
  } else {
    message = "Nema veze, svaki pokušaj je mali napredak 💪";
    emoji = "📘";
  }

  feedbackEl.innerHTML = `
    <span style="font-size: 2.5rem; display: block; margin-bottom: 12px;">
      ${emoji}
    </span>

    <p style="margin-bottom: 8px;">
      Osvojio/la si ${score} / ${total} boda.
    </p>

    <p>${message}</p>
  `;

  progressEl.textContent = "";

  const answers = document.getElementById("answers");

  answers.style.display = "flex";
  answers.style.justifyContent = "center";

  answers.innerHTML = `
  <button id="restart" style="width: 200px;">
    Igraj ponovno 🔁
  </button>
  `;  

  document.getElementById("restart").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    location.reload();
  });
}

});
