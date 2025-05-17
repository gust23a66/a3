document.addEventListener('DOMContentLoaded', () => {

    const startButton = document.getElementById("startButton");
    const rankingButton = document.getElementById("rankingButton");
    const achievementsButton = document.getElementById("achievementsButton");
    const musicToggleButton = document.getElementById("musicToggleButton");
    const backToLoginButton = document.getElementById("backToLogin");
    const backToLoginFromAchievementsButton = document.getElementById("backToLoginFromAchievements");
    const restartButton = document.getElementById("restartButton");
    const menuButton = document.getElementById("menuButton");
    const exitButton = document.getElementById("exitButton");
    const darkModeToggleButton = document.getElementById("darkModeToggleButton");
    const winScreen = document.getElementById("winScreen");
    const temas = ["lixo", "energia", "alimentacao", "agua"];


    const loginScreen = document.getElementById("loginScreen");
    const gameScreen = document.getElementById("gameScreen");
    const rankingScreen = document.getElementById("rankingScreen");
    const achievementsScreen = document.getElementById("achievementsScreen");
    const feedbackMessage = document.getElementById("feedbackMessage");
    const gameOverMessage = document.getElementById("gameOverMessage");
    const timeLeftDisplay = document.getElementById("timeLeft");
    const errorCountDisplay = document.getElementById("errorCount");
    const restartButtonWin = document.getElementById("restartButtonWin");
    const menuButtonWin = document.getElementById("menuButtonWin");
    const difficultyScreen = document.getElementById("difficultyScreen");
    const ALL_ACHIEVEMENTS = [
    "Primeira Vitória",
    "Perfeição Verde",
    "Quase Lá!",
    "Persistente",
    "Viciado em Sustentabilidade",
    "Rápido no Gatilho",
    "Relâmpago Verde",
    "Sem Pressa",
    "Rei da Reciclagem",
    "Herói da Energia",
    "Mestre da Alimentação",
    "Desafio Aceito",
    "Veterano Verde",
    "Aprendiz Verde",
    "Primeiro Erro",
    "Sem Segunda Chance",
    "Começo Promissor",
    "Primeira Resposta Correta ✅",
    "Respondeu 5 Perguntas Corretamente 🎓",
    "Acertou 3 seguidas 🔥",
    "Pontuação 100 🔥",
    "Partida Perfeita 🎯",
    "Jogou 5 Partidas 🎮",
    "Zero Erros 🌟",
    "Tempo Sobrando ⏳",
    "Resiliente 💪",
    "Acabou o tempo ⏰",
    "Resposta Rápida ⚡"
];



    restartButtonWin.addEventListener("click", () => {
        winScreen.style.display = "none";
        startGame();
    });
    
    menuButtonWin.addEventListener("click", showLoginScreen);
    
   let musicPlaying = true;

const audio = new Audio('musica_fundo.mp3');
audio.loop = true;
audio.addEventListener('canplaythrough', () => { 
    if (musicPlaying) audio.play();
});

audio.loop = true;
const acertoAudio = new Audio('acerto.mp3');
const erroAudio = new Audio('erro.mp3');

   let gamesPlayed = parseInt(localStorage.getItem("gamesPlayed") || "0");
   let correctAnswersCount = 0;
   let correctStreak = 0; 
   let shuffledThemes = [];
   let currentThemeIndex = 0;
   let startTime = 0;
   let questionStartTime = 0;
   let gameStartTime = 0;
   let errorsMade = 0;
   let correctByTheme = {
  "Lixo": 0,
  "Energia": 0,
  "Água": 0,
  "Alimentação": 0
};



  
difficultyScreen.addEventListener("click", (e) => {
    if (e.target.classList.contains("difficultyBtn")) {
        const nivel = e.target.getAttribute("data-dificuldade");
        escolherDificuldade(nivel);
    }
});


  
  const challenges = {
        "Água": [
    {
        "question": "Qual dessas ações ajuda a economizar água?",
        "options": [
            "Tomar banhos longos",
            "Escovar os dentes com a torneira aberta",
            "Reutilizar a água da chuva",
            "Lavar o carro todo dia"
        ],
        "answer": "Reutilizar a água da chuva"
    },
   ],
       
 

        "Energia": [
    {
        "question": "Qual lâmpada consome menos energia?",
        "options": ["Incandescente", "Halógena", "LED", "Fluorescente"],
        "answer": "LED"
    },
    ],
    
    "Lixo": [
    {
        "question": "Qual cor da lixeira é destinada ao descarte de papel?",
        "options": ["Azul", "Verde", "Amarela", "Preta"],
        "answer": "Azul"
    },
   ],

       "Alimentação": [
    {
        "question": "Uma alimentação sustentável inclui:",
        "options": ["Alimentos ultraprocessados", "Produtos locais e sazonais", "Refrigerantes", "Fast food"],
        "answer": "Produtos locais e sazonais"
    },
    
]

    }


    let username = "";
    let currentTheme = "";
    let currentQuestion = 0;
    let score = 0;
    let currentSessionAchievements = [];
    let errorCount = 0;
    let timeLeft = 30;
    let timerInterval;
    let shuffledQuestions = [];
    let currentDifficulty = "dificil"; 
    let perdeuSeguidas = parseInt(localStorage.getItem("perdeuSeguidas") || "0");


  
    function toggleMusic() {
        if (musicPlaying) {
            audio.pause();
            musicToggleButton.textContent = "🔇 Ligar Música";
        } else {
            audio.play();
            musicToggleButton.textContent = "🔈 Desligar Música";
        }
        musicPlaying = !musicPlaying;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; 
        }
        return array;
    }
    


    function startGame() {
        username = document.getElementById("username").value.trim();
        if (!username) {
            feedbackMessage.textContent = "⚠️ Por favor, digite seu nome!";
            feedbackMessage.style.display = "block";
            setTimeout(() => {
                feedbackMessage.style.display = "none";
            }, 2000);
            return;
        }
    
           loginScreen.style.display = "none";
    difficultyScreen.style.display = "block";
    
        if (musicPlaying) audio.play();
    
       
    }
    

   function resetGame() {
    score = 0;
    errorCount = 0;
    currentQuestion = 0;
    correctAnswersCount = 0;
    correctStreak = 0;
    correctByTheme = {
        "Água": 0,
        "Energia": 0,
        "Lixo": 0,
        "Alimentação": 0
    };

    timeLeft = getInitialTimeByDifficulty();
    timeLeftDisplay.textContent = `⏳ Tempo restante: ${timeLeft}s`;
    errorCountDisplay.textContent = `Erros: ${errorCount}/3`;

 
   shuffledQuestions = shuffleArray(
    Object.entries(challenges).flatMap(([tema, perguntas]) =>
        perguntas.map(pergunta => ({ ...pergunta, tema }))
    )
);
currentQuestion = 0;


    loadQuestion();
    startTimer();
}

    
    

    function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = `⏳ Tempo restante: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            unlockAchievement("Acabou o tempo ⏰");  
            showGameOver();
        }
    }, 1000);
}

    function loadQuestion() {
        questionStartTime = Date.now(); 
    
        const question = shuffledQuestions[currentQuestion];
    
       document.getElementById("themeTitle").textContent = `Tema: ${question.tema}`;

        document.getElementById("questionText").textContent = question.question;
    
if (!question.options || question.options.length === 0) {
    feedbackMessage.textContent = "⚠️ Pergunta inválida. Verifique os dados.";
    return;
}

        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = '';
    
        const shuffledOptions = shuffleArray([...question.options]);
    
        shuffledOptions.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => checkAnswer(option);
            optionsContainer.appendChild(button);
        });
    }
    
   function checkAnswer(selected) {
    const current = shuffledQuestions[currentQuestion];
   


    const correctAnswer = current.answer;

    const timeTaken = (Date.now() - questionStartTime) / 1000;
    let bonus = 0;

    if (timeTaken <= 3) {
        bonus = 5;
        if (timeTaken <= 2) {
            unlockAchievement("Resposta Rápida ⚡");  
        }
    } else if (timeTaken <= 6) {
        bonus = 3;
    } else if (timeTaken <= 10) {
        bonus = 1;
    }

    if (selected === correctAnswer) {
        correctAnswersCount++;
        feedbackMessage.textContent = "✅ Você acertou!";
        score += 10 + bonus;
        if (correctAnswersCount === 5) {
    unlockAchievement("Respondeu 5 Perguntas Corretamente 🎓");
}
        correctStreak++;

        timeLeft = Math.min(timeLeft + 5, getInitialTimeByDifficulty());

        timeLeftDisplay.textContent = `⏳ Tempo restante: ${timeLeft}s`;

        acertoAudio.play();
        document.getElementById("scoreValue").textContent = score;

      const tema = current.tema;

correctByTheme[tema] = (correctByTheme[tema] || 0) + 1;

if (correctByTheme[tema] === 5) {
    unlockAchievement(`Mestre da ${tema}`);
}

const venceu = Object.values(correctByTheme).every(count => count >= 5);
if (venceu) {
    clearInterval(timerInterval);
    showWinScreen();
    return;
}


        if (correctStreak === 3) {
            unlockAchievement("Acertou 3 seguidas 🔥");
        }
        if (score === 10) {
            unlockAchievement("Primeira Resposta Correta ✅");
        }
        if (score >= 100) {
            unlockAchievement("Pontuação 100 🔥");
        }

        nextQuestion();
    } else {
        feedbackMessage.textContent = `❌ Resposta correta: ${correctAnswer}`;
        errorCount++;
        correctStreak = 0;
        erroAudio.play();

        errorCountDisplay.textContent = `Erros: ${errorCount}/3`;

        if (errorCount >= 3) {
            clearInterval(timerInterval);
            setTimeout(showGameOver, 1000);
        } else {
            nextQuestion();
        }
    }

    feedbackMessage.style.display = "block";
    setTimeout(() => (feedbackMessage.style.display = "none"), 2000);
}
    
    
    function nextQuestion() {
        currentQuestion++;
    
        
        if (currentQuestion >= shuffledQuestions.length) {
            currentThemeIndex++;
            if (currentThemeIndex >= shuffledThemes.length) {
                clearInterval(timerInterval); 
                showWinScreen(); 
                return;
            }
            currentTheme = shuffledThemes[currentThemeIndex];
            shuffledQuestions = shuffleArray([...challenges[currentTheme]]);
            currentQuestion = 0;
        }
    
        loadQuestion(); 
    }
    
    
    function showWinScreen() {
        unlockAchievement("Primeira Vitória");

if (errorCount === 0 && timeLeft > 15) {
    unlockAchievement("Perfeição Verde");
}
    updateRanking();
    loginScreen.style.display = "none";
    gameScreen.style.display = "none";
    rankingScreen.style.display = "none";
    achievementsScreen.style.display = "none";
    gameOverMessage.style.display = "none";

    document.getElementById("finalScoreWin").textContent = `Pontuação Final: ${score}`;
    
   
    const sessionAchievementsDiv = document.getElementById("sessionAchievements");
    if (currentSessionAchievements.length > 0) {
        sessionAchievementsDiv.innerHTML = "<h3>🏆 Conquistas desbloqueadas:</h3>" +
            "<ul>" + currentSessionAchievements.map(a => `<li>🏅 ${a}</li>`).join('') + "</ul>";
    } else {
        sessionAchievementsDiv.innerHTML = "<p>Nenhuma conquista desbloqueada nesta partida.</p>";
    }

    winScreen.style.display = "block";

    setTimeout(() => {
        winScreen.classList.add("show");
    }, 50);


    currentSessionAchievements = [];
    gamesPlayed++;
    localStorage.setItem("gamesPlayed", gamesPlayed);

if (gamesPlayed === 1) {
    unlockAchievement("Aprendiz Verde");
}
if (gamesPlayed === 10) {
    unlockAchievement("Veterano Verde");
}
if (gamesPlayed === 20) {
    unlockAchievement("Viciado em Sustentabilidade");
}

perdeuSeguidas = 0;
localStorage.setItem("perdeuSeguidas", perdeuSeguidas);


}

    
  function escolherDificuldade(nivel) {
    if (nivel === "dificil") {
    unlockAchievement("Desafio Aceito");
}
    currentDifficulty = nivel;
    switch (nivel) {
        case "facil":
            timeLeft = 100;
            break;
        case "medio":
            timeLeft = 60;
            break;
        case "dificil":
            timeLeft = 30;
            break;
        default:
            timeLeft = 30;
    }

    difficultyScreen.style.display = "none";
    gameScreen.style.display = "block";

    resetGame();
}

function getInitialTimeByDifficulty() {
    switch(currentDifficulty) {
        case "facil": return 100;
        case "medio": return 60;
        case "dificil": return 30;
        default: return 30;
    }
}

       function updateRanking() {
    let players = JSON.parse(localStorage.getItem("ranking")) || [];

   const existingPlayerIndex = players.findIndex(player => player.name.toLowerCase() === username.toLowerCase());

    if (existingPlayerIndex !== -1) {
        if (score > players[existingPlayerIndex].score) {
            players[existingPlayerIndex].score = score;
        }
    } else {
        players.push({ name: username, score: score });
    }

    players.sort((a, b) => b.score - a.score);

    localStorage.setItem("ranking", JSON.stringify(players));
}
 
    function showGameOver() {
        if (score >= 80 && errorCount >= 3) {
    unlockAchievement("Quase Lá!");
}

    updateRanking();

    if (errorCount === 0) {
        unlockAchievement("Partida Perfeita 🎯");
        gamesPlayed++;
        localStorage.setItem("gamesPlayed", gamesPlayed);

        if (gamesPlayed === 5) {
            unlockAchievement("Jogou 5 Partidas 🎮");
        }
        unlockAchievement("Zero Erros 🌟");

        if (timeLeft > 15) {
            unlockAchievement("Tempo Sobrando ⏳");
        }
    }

   
    if (errorCount === 2) {
        unlockAchievement("Resiliente 💪");
    }

    const gameOverMessage = document.getElementById("gameOverMessage");
    const finalScore = document.getElementById("finalScore");

    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("rankingScreen").style.display = "none";
    document.getElementById("achievementsScreen").style.display = "none";

    finalScore.textContent = `Pontuação Final: ${score}`;

    gameOverMessage.style.display = "block";
    setTimeout(() => {
        gameOverMessage.classList.add("show");
    }, 50);

gamesPlayed++;
localStorage.setItem("gamesPlayed", gamesPlayed);

if (gamesPlayed === 1) {
    unlockAchievement("Aprendiz Verde");
}
if (gamesPlayed === 10) {
    unlockAchievement("Veterano Verde");
}
if (gamesPlayed === 20) {
    unlockAchievement("Viciado em Sustentabilidade");
}

perdeuSeguidas++;
localStorage.setItem("perdeuSeguidas", perdeuSeguidas);

if (perdeuSeguidas === 3) {
    unlockAchievement("Persistente");
}


}
    
    

    function getRandomTheme() {
        const themes = Object.keys(challenges);
        return themes[Math.floor(Math.random() * themes.length)];
    }

    function showLoginScreen() {
        loginScreen.style.display = "block";
        gameScreen.style.display = "none";
        rankingScreen.style.display = "none";
        achievementsScreen.style.display = "none";
        gameOverMessage.style.display = "none";
        document.getElementById("winScreen").style.display = "none"; 
    }
    
    function toggleDarkMode() {
        
        document.body.classList.toggle('dark-mode');
        gameScreen.classList.toggle('dark-mode');
        loginScreen.classList.toggle('dark-mode');
        rankingScreen.classList.toggle('dark-mode');
        achievementsScreen.classList.toggle('dark-mode');
        gameOverMessage.classList.toggle('dark-mode');
        
     
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggleButton.textContent = "☀️ Modo Claro";
        } else {
            darkModeToggleButton.textContent = "🌙 Modo Black";
        }
    }
    
    

    function showRanking() {
        loginScreen.style.display = "none";
        gameScreen.style.display = "none";
        achievementsScreen.style.display = "none";
        gameOverMessage.style.display = "none";
        rankingScreen.style.display = "block";
    
        
        const rankingList = document.getElementById("rankingList");
        const players = JSON.parse(localStorage.getItem("ranking")) || [];
    
        players.sort((a, b) => b.score - a.score);
    
      
        rankingList.innerHTML = players.map(player => `<p>${player.name}: ${player.score} pontos</p>`).join('');
    }
    
    function verificarConquistasFinais() {
    if (errorCount === 0) {
        unlockAchievement("Partida Perfeita 🎯");
        unlockAchievement("Zero Erros 🌟");

        if (timeLeft > 15) {
            unlockAchievement("Tempo Sobrando ⏳");
        }
    }

    if (score >= 80 && errorCount >= 3) {
        unlockAchievement("Quase Lá!");
    }

    if (errorCount === 2) {
        unlockAchievement("Resiliente 💪");
    }

    if (gamesPlayed === 1) {
        unlockAchievement("Aprendiz Verde");
    } else if (gamesPlayed === 10) {
        unlockAchievement("Veterano Verde");
    } else if (gamesPlayed === 20) {
        unlockAchievement("Viciado em Sustentabilidade");
    }

    if (perdeuSeguidas === 3) {
        unlockAchievement("Persistente");
    }
}


    function showAchievements() {
    loginScreen.style.display = "none";
    gameScreen.style.display = "none";
    rankingScreen.style.display = "none";
    gameOverMessage.style.display = "none";
    achievementsScreen.style.display = "block";

    const achievementsList = document.getElementById("achievementsList");
    achievementsList.innerHTML = "";

    const unlocked = JSON.parse(localStorage.getItem("achievements")) || [];

    ALL_ACHIEVEMENTS.forEach(achievement => {
        const p = document.createElement("p");
        p.textContent = unlocked.includes(achievement)
            ? `🏅 ${achievement}`
            : `🔒 ${achievement}`;
        achievementsList.appendChild(p);
    });
}

    
function unlockAchievement(achievementName) {
    let achievements = JSON.parse(localStorage.getItem("achievements")) || [];

    if (!achievements.includes(achievementName)) {
        achievements.push(achievementName);
        localStorage.setItem("achievements", JSON.stringify(achievements));
        
       
        currentSessionAchievements.push(achievementName);
    }
}
 

    function exitGame() {
        window.close();
    }

  
    startButton.addEventListener("click", startGame);
    rankingButton.addEventListener("click", showRanking);
    achievementsButton.addEventListener("click", showAchievements);
    musicToggleButton.addEventListener("click", toggleMusic);
    darkModeToggleButton.addEventListener("click", toggleDarkMode);
    backToLoginButton.addEventListener("click", showLoginScreen);
    backToLoginFromAchievementsButton.addEventListener("click", showLoginScreen);
    restartButton.addEventListener("click", () => {
        gameOverMessage.style.display = "none";
        gameScreen.style.display = "block";
       resetGame();
    });
    menuButton.addEventListener("click", showLoginScreen);
    exitButton.addEventListener("click", exitGame);
});


function abrirModoColeta() {
  window.location.href = "modonovo/index.html";
}

