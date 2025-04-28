document.addEventListener('DOMContentLoaded', () => {
    // Elementos da interface
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
    
    restartButtonWin.addEventListener("click", () => {
        winScreen.style.display = "none";
        startGame();
    });
    
    menuButtonWin.addEventListener("click", showLoginScreen);
    // Áudios
    // Áudios
const audio = new Audio('musica_fundo.mp3');
audio.loop = true; // <<<<<< adicionar aqui!
const acertoAudio = new Audio('acerto.mp3');
const erroAudio = new Audio('erro.mp3');
let musicPlaying = true;


   let correctAnswersCount = 0; // Quantidade de respostas corretas
   let correctStreak = 0; // Acertos seguidos
   let gamesPlayed = 0; // Partidas jogadas
   let shuffledThemes = shuffleArray(Object.keys(challenges)); // Embaralha os temas
   let currentThemeIndex = 0;
   let correctByTheme = {};
  




    // Dados dos desafios
    const challenges = {
        "Água": [
    {
        "question": "O que é a água reciclada?",
        "options": [
            "Água proveniente de fontes naturais",
            "Água tratada para reutilização",
            "Água da chuva",
            "Nenhuma das anteriores"
        ],
        "answer": "Água tratada para reutilização"
    }],
       
 

        "Energia": [
   
    {
        "question": "Qual é a principal desvantagem da energia eólica?",
        "options": ["Emissão de gases poluentes", "Geração de resíduos radioativos", "Dependência de condições climáticas", "Custo elevado de instalação"],
        "answer": "Dependência de condições climáticas"
    }],
    
    "Lixo": [
    
    {
        "question": "Qual é a cor da lixeira destinada ao descarte de resíduos domiciliares?",
        "options": ["Preta", "Verde", "Amarela", "Azul"],
        "answer": "Preta"
    }],

       "Alimentação": [
  
    {
        "question": "Reaproveitar sobras de comida em novas receitas ajuda a:",
        "options": ["Poluir mais", "Economizar e reduzir o lixo", "Gastar mais gás", "Comprar mais alimentos"],
        "answer": "Economizar e reduzir o lixo"
    }
]

    }

    let username = "";
    let currentTheme = "";
    let currentQuestion = 0;
    let score = 0;
    let errorCount = 0;
    let timeLeft = 30;
    let timerInterval;
    let shuffledQuestions = [];


    // Funções principais
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
            [array[i], array[j]] = [array[j], array[i]]; // troca os elementos
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
        gameScreen.style.display = "block";
    
        if (musicPlaying) audio.play();
    
        resetGame();
    }
    

    function resetGame() {
        score = 0;
        errorCount = 0;
        currentQuestion = 0;
        timeLeft = 30;
        correctAnswersCount = 0;
        correctStreak = 0;
        gamesPlayed = 0;
        correctByTheme = {
            "Água": 0,
            "Energia": 0,
            "Lixo": 0,
            "Alimentação": 0
        };
    
        // Exibe o tempo e os erros no início
        timeLeftDisplay.textContent = `⏳ Tempo restante: ${timeLeft}s`;
        errorCountDisplay.textContent = `Erros: ${errorCount}/3`;
    
        // Embaralha os temas de forma aleatória
        let shuffledThemes = shuffleArray(Object.keys(challenges)); 
    
        // Junta todas as perguntas de todos os temas em uma única lista
        let allQuestions = [];
        shuffledThemes.forEach(tema => {
            challenges[tema].forEach(pergunta => {
                allQuestions.push({ ...pergunta, tema }); // Adiciona o tema à pergunta
            });
        });
    
        // Embaralha todas as perguntas
        shuffledQuestions = shuffleArray(allQuestions);
    
        // Começa o jogo com as perguntas embaralhadas
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
                showGameOver();
            }
        }, 1000);
    }

    function loadQuestion() {
        const question = shuffledQuestions[currentQuestion]; // agora usa a lista embaralhada
    
        document.getElementById("themeTitle").textContent = `Desafio: ${question.tema}`;
        document.getElementById("questionText").textContent = question.question;
    
        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = '';
    
        // Embaralha as opções também
        const shuffledOptions = shuffleArray([...question.options]);
    
        shuffledOptions.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => checkAnswer(option);
            optionsContainer.appendChild(button);
        });
    }
    
    function checkAnswer(selected) {
        const correctAnswer = shuffledQuestions[currentQuestion].answer;
        if (selected === correctAnswer) {
            feedbackMessage.textContent = "✅ Você acertou!";
            score += 10;
            correctAnswersCount++;
            correctStreak++;
    
            // +5 segundos ao acertar
            timeLeft += 2;
            timeLeftDisplay.textContent = `⏳ Tempo restante: ${timeLeft}s`;
    
            acertoAudio.play();
    
            // Conquistas
            if (correctAnswersCount === 5) {
                unlockAchievement("Respondeu 5 Perguntas Corretamente 🎓");
                const tema = shuffledQuestions[currentQuestion].tema;
                correctByTheme[tema]++;
                const venceu = Object.values(correctByTheme).every(count => count >= 5);
if (venceu) {
    clearInterval(timerInterval);
    showWinScreen();
    return;
}


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
        } else {
            feedbackMessage.textContent = `❌ Resposta correta: ${correctAnswer}`;
            errorCount++;
            correctStreak = 0; // Errou? Zera a sequência
            erroAudio.play();
        }
    
        feedbackMessage.style.display = "block";
        setTimeout(() => feedbackMessage.style.display = "none", 2000);
    
        errorCountDisplay.textContent = `Erros: ${errorCount}/3`;
    
        if (errorCount >= 3) {
            clearInterval(timerInterval);
            setTimeout(showGameOver, 1000);
            return;
        }
    
        nextQuestion();
    }
    
    function nextQuestion() {
        currentQuestion++;  // Avança para a próxima pergunta
    
        // Verifica se todas as perguntas do tema atual foram respondidas
        if (currentQuestion >= shuffledQuestions.length) {
            currentThemeIndex++;  // Avança para o próximo tema
    
            // Se todos os temas foram completados, o jogo termina
            if (currentThemeIndex >= shuffledThemes.length) {
                clearInterval(timerInterval);  // Para o cronômetro
                showWinScreen();  // Chama a tela de vitória
                return;
            }
    
            // Carrega o próximo tema e embaralha as perguntas do novo tema
            currentTheme = shuffledThemes[currentThemeIndex];
            shuffledQuestions = shuffleArray([...challenges[currentTheme]]);
            currentQuestion = 0;  // Reseta o contador de perguntas para o novo tema
        }
    
        loadQuestion();  // Carrega a próxima pergunta
    }
    
    
    function showWinScreen() {
        loginScreen.style.display = "none";
        gameScreen.style.display = "none";
        rankingScreen.style.display = "none";
        achievementsScreen.style.display = "none";
        gameOverMessage.style.display = "none";
    
        document.getElementById("finalScoreWin").textContent = `Pontuação Final: ${score}`;
        
        const winScreen = document.getElementById("winScreen");
        winScreen.style.display = "block";
    
        setTimeout(() => {
            winScreen.classList.add("show");
        }, 50);
    }
    
    
    // Quando o jogador perde (ex: 3 erros), chamar essa função:
    function showGameOver() {
        if (errorCount === 0) {
            unlockAchievement("Partida Perfeita 🎯");
            gamesPlayed++;
            if (gamesPlayed === 5) {
                unlockAchievement("Jogou 5 Partidas 🎮");
            }
            if (errorCount === 0) {
                unlockAchievement("Zero Erros 🌟");
            }
            if (timeLeft > 15) {
                unlockAchievement("Tempo Sobrando ⏳");
            }
            if (errorCount === 2) {
                unlockAchievement("Resiliente 💪");
            }
        }
    
        // --- >>>> Parte nova para salvar corretamente <<<< ---
        let players = JSON.parse(localStorage.getItem("ranking")) || [];
    
        const existingPlayer = players.find(player => player.name === username);
    
        if (existingPlayer) {
            if (score > existingPlayer.score) {
                existingPlayer.score = score;
            }
        } else {
            players.push({ name: username, score: score });
        }
    
        players.sort((a, b) => b.score - a.score);
        localStorage.setItem("ranking", JSON.stringify(players));
        // -----------------------------------------------------
    
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
        document.getElementById("winScreen").style.display = "none"; // 👈 ADICIONE ISTO
    }
    
    function toggleDarkMode() {
        // Alterna o modo escuro
        document.body.classList.toggle('dark-mode');
        gameScreen.classList.toggle('dark-mode');
        loginScreen.classList.toggle('dark-mode');
        rankingScreen.classList.toggle('dark-mode');
        achievementsScreen.classList.toggle('dark-mode');
        gameOverMessage.classList.toggle('dark-mode');
        
        // Atualiza o texto do botão para o modo correto
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
    
        // Exemplo de lista de jogadores
        const rankingList = document.getElementById("rankingList");
        const players = JSON.parse(localStorage.getItem("ranking")) || [];
    
        // Organiza do maior para o menor
        players.sort((a, b) => b.score - a.score);
    
        // Exibe
        rankingList.innerHTML = players.map(player => `<p>${player.name}: ${player.score} pontos</p>`).join('');
    }
    

    function showAchievements() {
        loginScreen.style.display = "none";
        gameScreen.style.display = "none";
        rankingScreen.style.display = "none";
        gameOverMessage.style.display = "none";
        achievementsScreen.style.display = "block";
    
        const achievementsList = document.getElementById("achievementsList");
        achievementsList.innerHTML = "";
    
        const achievements = JSON.parse(localStorage.getItem("achievements")) || [];
        achievements.forEach(achievement => {
            const p = document.createElement("p");
            p.textContent = `🏅 ${achievement}`;
            achievementsList.appendChild(p);
        });
    }
    

    function unlockAchievement(achievementName) {
        const achievementsList = document.getElementById("achievementsList");
        const achievementItem = document.createElement("p");
        achievementItem.textContent = `🏅 ${achievementName}`;
        achievementsList.appendChild(achievementItem);
    
        // Salvar conquista no localStorage
        let achievements = JSON.parse(localStorage.getItem("achievements")) || [];
        if (!achievements.includes(achievementName)) {
            achievements.push(achievementName);
            localStorage.setItem("achievements", JSON.stringify(achievements));
        }
    }
    
    

    function exitGame() {
        window.close();
    }

    // Eventos
    startButton.addEventListener("click", startGame);
    rankingButton.addEventListener("click", showRanking);
    achievementsButton.addEventListener("click", showAchievements);
    musicToggleButton.addEventListener("click", toggleMusic);
    darkModeToggleButton.addEventListener("click", toggleDarkMode);
    backToLoginButton.addEventListener("click", showLoginScreen);
    backToLoginFromAchievementsButton.addEventListener("click", showLoginScreen);
    restartButton.addEventListener("click", () => {
        gameOverMessage.style.display = "none";
        startGame();
    });
    menuButton.addEventListener("click", showLoginScreen);
    exitButton.addEventListener("click", exitGame);
});
