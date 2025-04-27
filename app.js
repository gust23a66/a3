// Dados de exemplo
const challenges = {
    "Água": [
        { "question": "Qual dessas ações ajuda a economizar água?", "options": ["Tomar banhos longos", "Escovar os dentes com a torneira aberta", "Reutilizar a água da chuva", "Lavar o carro todo dia"], "answer": "Reutilizar a água da chuva" },
        { "question": "Melhor horário para regar plantas:", "options": ["Meio-dia", "Final da tarde", "Manhã cedo", "Qualquer hora"], "answer": "Manhã cedo" }
    ],
    "Energia": [
        { "question": "Qual lâmpada consome menos energia?", "options": ["Incandescente", "Halógena", "LED", "Fluorescente"], "answer": "LED" },
        { "question": "Uma boa prática para economizar energia é:", "options": ["Deixar luzes acesas", "Desligar aparelhos da tomada", "Usar o ar-condicionado o dia todo", "Carregar celular a noite inteira"], "answer": "Desligar aparelhos da tomada" }
    ]
};

let currentQuestion = 0;
let currentTheme = '';
let score = 0;
let errorCount = 0;
let timeLeft = 30;
let timerInterval;
let username = '';

const startButton = document.getElementById("startButton");
const rankingButton = document.getElementById("rankingButton");
const achievementsButton = document.getElementById("achievementsButton");
const musicToggleButton = document.getElementById("musicToggleButton");
const backToLoginButton = document.getElementById("backToLogin");
const backToLoginFromAchievementsButton = document.getElementById("backToLoginFromAchievements");
const gameScreen = document.getElementById("gameScreen");
const loginScreen = document.getElementById("loginScreen");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("options");
const feedbackMessage = document.getElementById("feedbackMessage");
const timeLeftDisplay = document.getElementById("timeLeft");
const errorCountDisplay = document.getElementById("errorCount");
const themeTitle = document.getElementById("themeTitle");

startButton.addEventListener("click", startGame);
rankingButton.addEventListener("click", showRanking);
achievementsButton.addEventListener("click", showAchievements);
backToLoginButton.addEventListener("click", showLoginScreen);
backToLoginFromAchievementsButton.addEventListener("click", showLoginScreen);
musicToggleButton.addEventListener("click", toggleMusic);

let musicPlaying = true;
let audio = new Audio('musica_fundo.mp3');
let acertoAudio = new Audio('acerto.mp3');
let erroAudio = new Audio('erro.mp3');

function toggleMusic() {
    if (musicPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    musicPlaying = !musicPlaying;
}

function startGame() {
    username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Digite seu nome.");
        return;
    }

    loginScreen.style.display = "none";
    gameScreen.style.display = "block";

    score = 0;
    errorCount = 0;
    currentQuestion = 0;
    currentTheme = getRandomTheme();
    loadQuestion();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Para o temporizador
            checkAnswer(null); // Chama a função de verificação com resposta nula
        } else {
            timeLeft--;
            timeLeftDisplay.textContent = `⏳ Tempo restante: ${timeLeft}s`;
        }
    }, 1000);
}

function loadQuestion() {
    const theme = challenges[currentTheme];
    const question = theme[currentQuestion];

    themeTitle.textContent = `Desafio: ${currentTheme}`;
    questionText.textContent = question.question;
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

    // Desabilitar todos os botões após o primeiro clique
    const buttons = document.querySelectorAll('#options button');
    buttons.forEach(button => button.disabled = true);

    if (selected === null) {
        feedbackMessage.textContent = `❌ O tempo acabou! Resposta correta: ${correctAnswer}`;
        errorCount++;
        errorCountDisplay.textContent = `Erros: ${errorCount}/3`;
        erroAudio.play(); // Toca o áudio de erro
    } else if (selected === correctAnswer) {
        feedbackMessage.textContent = "✅ Você acertou!";
        score += 10;
        acertoAudio.play();  // Toca o áudio de acerto
    } else {
        feedbackMessage.textContent = `❌ Resposta correta: ${correctAnswer}`;
        errorCount++;
        errorCountDisplay.textContent = `Erros: ${errorCount}/3`;
        erroAudio.play();  // Toca o áudio de erro
    }

    feedbackMessage.style.display = "block";  // Exibe a mensagem de feedback
    setTimeout(() => {
        feedbackMessage.style.display = "none";  // Oculta após 2 segundos
    }, 2000);

    if (errorCount >= 3) {
        setTimeout(showGameOver, 1000);  // Exibe o "Game Over" se errar 3 vezes
        return;
    }

    currentQuestion++;
    if (currentQuestion >= challenges[currentTheme].length) {
        currentTheme = getRandomTheme();
        currentQuestion = 0;
    }
    loadQuestion();
}


function getRandomTheme() {
    const themes = Object.keys(challenges);
    return themes[Math.floor(Math.random() * themes.length)];
}

function showGameOver() {
    const gameOverMessage = document.getElementById("gameOverMessage");
    const finalScoreElement = document.getElementById("finalScore");

    finalScoreElement.textContent = `Pontuação Final: ${score}`;

    gameOverMessage.style.display = "block";

    document.getElementById("restartButton").addEventListener("click", restartGame);
    document.getElementById("menuButton").addEventListener("click", showLoginScreen);
    document.getElementById("exitButton").addEventListener("click", exitGame);
}

function restartGame() {
    score = 0;
    errorCount = 0;
    timeLeft = 30;
    currentQuestion = 0;
    currentTheme = getRandomTheme();
    loadQuestion();
    startTimer();

    document.getElementById("gameOverMessage").style.display = "none";
}

function showLoginScreen() {
    document.getElementById("loginScreen").style.display = "block";
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("gameOverMessage").style.display = "none";
}

function exitGame() {
    window.close();  // Fecha a janela, se possível
}

function showRanking() {
    alert("Aqui será o ranking!");
}

function showAchievements() {
    alert("Aqui serão suas conquistas!");
}
