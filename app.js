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

    const loginScreen = document.getElementById("loginScreen");
    const gameScreen = document.getElementById("gameScreen");
    const rankingScreen = document.getElementById("rankingScreen");
    const achievementsScreen = document.getElementById("achievementsScreen");
    const feedbackMessage = document.getElementById("feedbackMessage");
    const gameOverMessage = document.getElementById("gameOverMessage");
    const timeLeftDisplay = document.getElementById("timeLeft");
    const errorCountDisplay = document.getElementById("errorCount");

    // Áudios
    const audio = new Audio('musica_fundo.mp3');
    const acertoAudio = new Audio('acerto.mp3');
    const erroAudio = new Audio('erro.mp3');
    let musicPlaying = true;

    // Dados dos desafios
    const challenges = {
        "Água": [
            { question: "Qual dessas ações ajuda a economizar água?", options: ["Tomar banhos longos", "Escovar os dentes com a torneira aberta", "Reutilizar a água da chuva", "Lavar o carro todo dia"], answer: "Reutilizar a água da chuva" },
            { question: "Melhor horário para regar plantas:", options: ["Meio-dia", "Final da tarde", "Manhã cedo", "Qualquer hora"], answer: "Manhã cedo" }
        ],
        "Energia": [
            { question: "Qual lâmpada consome menos energia?", options: ["Incandescente", "Halógena", "LED", "Fluorescente"], answer: "LED" },
            { question: "Uma boa prática para economizar energia é:", options: ["Deixar luzes acesas", "Desligar aparelhos da tomada", "Usar o ar-condicionado o dia todo", "Carregar celular a noite inteira"], answer: "Desligar aparelhos da tomada" }
        ]
    };

    let username = "";
    let currentTheme = "";
    let currentQuestion = 0;
    let score = 0;
    let errorCount = 0;
    let timeLeft = 30;
    let timerInterval;

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

    function startGame() {
        username = document.getElementById("username").value.trim();
        if (!username) {
            alert("Por favor, digite seu nome!");
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
        currentTheme = getRandomTheme();
        timeLeft = 30;
        timeLeftDisplay.textContent = `⏳ Tempo restante: ${timeLeft}s`;
        errorCountDisplay.textContent = `Erros: ${errorCount}/3`;
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
        const theme = challenges[currentTheme];
        const question = theme[currentQuestion];
        document.getElementById("themeTitle").textContent = `Desafio: ${currentTheme}`;
        document.getElementById("questionText").textContent = question.question;

        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = '';

        question.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => checkAnswer(option);
            optionsContainer.appendChild(button);
        });
    }

    function checkAnswer(selected) {
        const correctAnswer = challenges[currentTheme][currentQuestion].answer;
        if (selected === correctAnswer) {
            feedbackMessage.textContent = "✅ Você acertou!";
            score += 10;
            acertoAudio.play();
        } else {
            feedbackMessage.textContent = `❌ Resposta correta: ${correctAnswer}`;
            errorCount++;
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
        currentQuestion++;
        if (currentQuestion >= challenges[currentTheme].length) {
            currentTheme = getRandomTheme();
            currentQuestion = 0;
        }
        loadQuestion();
    }
    // Quando o jogador perde (ex: 3 erros), chamar essa função:
    function showGameOver() {
        const gameOverMessage = document.getElementById("gameOverMessage");
        const finalScore = document.getElementById("finalScore");
    
        // Esconde as outras telas
        document.getElementById("gameScreen").style.display = "none";
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("rankingScreen").style.display = "none";
        document.getElementById("achievementsScreen").style.display = "none";
    
        // Atualiza o placar final
        finalScore.textContent = `Pontuação Final: ${score}`;
    
        // Mostra a tela de Game Over
        gameOverMessage.style.display = "block";  // <<<<< adiciona esta linha!!!
        setTimeout(() => {
            gameOverMessage.classList.add("show"); 
        }, 50); // Pequeno delay para o transition do CSS funcionar
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
    }

    function showRanking() {
        alert("Aqui será o ranking!");
    }

    function showAchievements() {
        alert("Aqui serão suas conquistas!");
    }

    function exitGame() {
        window.close();
    }

    // Eventos
    startButton.addEventListener("click", startGame);
    rankingButton.addEventListener("click", showRanking);
    achievementsButton.addEventListener("click", showAchievements);
    musicToggleButton.addEventListener("click", toggleMusic);
    backToLoginButton.addEventListener("click", showLoginScreen);
    backToLoginFromAchievementsButton.addEventListener("click", showLoginScreen);
    restartButton.addEventListener("click", () => {
        gameOverMessage.style.display = "none";
        startGame();
    });
    menuButton.addEventListener("click", showLoginScreen);
    exitButton.addEventListener("click", exitGame);
});
