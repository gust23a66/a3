document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById("startButton");
    const rankingButton = document.getElementById("rankingButton");
    const achievementsButton = document.getElementById("achievementsButton");
    const musicToggleButton = document.getElementById("musicToggleButton");
    const backToLoginButton = document.getElementById("backToLogin");
    const backToLoginFromAchievementsButton = document.getElementById("backToLoginFromAchievements");

    const gameScreen = document.getElementById("gameScreen");
    const loginScreen = document.getElementById("loginScreen");
    const feedbackMessage = document.getElementById("feedbackMessage");
    const timeLeftDisplay = document.getElementById("timeLeft");
    const errorCountDisplay = document.getElementById("errorCount");

    const rankingScreen = document.getElementById("rankingScreen");
    const achievementsScreen = document.getElementById("achievementsScreen");

    // Inicializar os áudios
    let audio = new Audio('musica_fundo.mp3'); // Música de fundo
    let acertoAudio = new Audio('acerto.mp3'); // Som de acerto
    let erroAudio = new Audio('erro.mp3'); // Som de erro

    // Carregar os áudios
    audio.load();
    acertoAudio.load();
    erroAudio.load();

    // Variável de controle de estado da música
    let musicPlaying = true;

    // Função para alternar o estado da música
    function toggleMusic() {
        if (musicPlaying) {
            audio.pause(); // Pausa a música
            musicToggleButton.textContent = "🔇 Ligar Música"; // Atualiza o texto do botão
        } else {
            audio.play(); // Reproduz a música
            musicToggleButton.textContent = "🔈 Desligar Música"; // Atualiza o texto do botão
        }
        musicPlaying = !musicPlaying; // Alterna o estado
    }
    

    // Botão de alternar áudio
    musicToggleButton.addEventListener("click", toggleMusic);

    // O resto do código (iniciar o jogo, alternar telas, etc.) continua o mesmo


    // Dados de exemplo de desafios
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
    

    // Lógica dos botões
    startButton.addEventListener("click", startGame);
    rankingButton.addEventListener("click", showRanking);
    achievementsButton.addEventListener("click", showAchievements);
    backToLoginButton.addEventListener("click", showLoginScreen);
    backToLoginFromAchievementsButton.addEventListener("click", showLoginScreen);

    restartButton.addEventListener("click", () => {
        gameOverMessage.style.display = "none";
        startGame(); // Reinicia o jogo
    });
    
    menuButton.addEventListener("click", showMenu);
    exitButton.addEventListener("click", exitGame);



    function toggleMusic() {
        if (musicPlaying) {
            audio.pause(); // Pausa a música
            musicToggleButton.textContent = "🔇 Ligar Música"; // Altera o texto para "Ligar Música"
        } else {
            audio.play(); // Toca a música
            musicToggleButton.textContent = "🔈 Desligar Música"; // Altera o texto para "Desligar Música"
        }
        musicPlaying = !musicPlaying; // Alterna o estado
    }
    
    

    function startGame() {
        username = document.getElementById("username").value.trim();
        if (!username) {
            alert("Por favor, digite seu nome!");
            return;
        }
    
        loginScreen.style.display = "none";
        gameScreen.style.display = "block";
    
        // Não iniciar a música automaticamente; só tocar se `musicPlaying` for true
        if (musicPlaying) {
            audio.play();  // Toca a música somente se estiver no estado 'ligado'
            musicToggleButton.textContent = "🔈 Desligar Música"; // Atualiza o texto do botão
        } else {
            musicToggleButton.textContent = "🔇 Ligar Música"; // Atualiza o texto do botão para refletir que a música está desligada
        }
    
        score = 0;
        errorCount = 0;
        currentQuestion = 0;
        currentTheme = getRandomTheme();
        loadQuestion();
        startTimer();
    }
    
    
    

    function startTimer() {
        // Se já existir um intervalo de temporizador, limpe-o primeiro
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        timeLeft = 30; // Reinicie o tempo
        timeLeftDisplay.textContent = `⏳ Tempo restante: ${timeLeft}s`; // Atualize a tela com o tempo reiniciado
    
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval); // Para o temporizador
                checkAnswer(null); // Chama a função de verificação com resposta nula
            } else {
                timeLeft--;
                timeLeftDisplay.textContent = `⏳ Tempo restante: ${timeLeft}s`; // Atualize o tempo
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
        
        const buttons = document.querySelectorAll('#options button');
        buttons.forEach(button => button.disabled = true);
    
        if (selected === null) {
            feedbackMessage.textContent = `❌ O tempo acabou! Resposta correta: ${correctAnswer}`;
            erroAudio.play(); // Reproduz o som de erro
            errorCount++;
        } else if (selected === correctAnswer) {
            feedbackMessage.textContent = "✅ Você acertou!";
            acertoAudio.play(); // Reproduz o som de acerto
            score += 10;
        } else {
            feedbackMessage.textContent = `❌ Resposta correta: ${correctAnswer}`;
            erroAudio.play(); // Reproduz o som de erro
            errorCount++;
        }
    
        feedbackMessage.style.display = "block";  // Exibe a mensagem de feedback
        setTimeout(() => {
            feedbackMessage.style.display = "none";  // Oculta após 2 segundos
        }, 2000);
    
        errorCountDisplay.textContent = `Erros: ${errorCount}/3`;
    
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
        document.getElementById("finalScore").textContent = `Pontuação Final: ${score}`;

        gameOverMessage.style.display = "block";
        gameOverMessage.classList.add("show");
    }

    function restartGame() {
        // Limpar o intervalo do temporizador existente e reiniciar o tempo
        clearInterval(timerInterval);
        
        // Resetar o estado do jogo
        score = 0;
        errorCount = 0;
        currentQuestion = 0;
        currentTheme = getRandomTheme();
        loadQuestion();
        startTimer(); // Reiniciar o tempo e o temporizador
        
        // Esconder tela de Game Over e mostrar a tela de jogo
        gameOverMessage.style.display = "none";
        gameScreen.style.display = "block";
    }
    function showMenu() {
        gameOverMessage.style.display = "none";
        showLoginScreen();
    }

    function exitGame() {
        window.close();  // Fecha a janela (pode não funcionar em alguns navegadores)
    }

    function showLoginScreen() {
        document.getElementById("loginScreen").style.display = "block";
        document.getElementById("gameScreen").style.display = "none";
        document.getElementById("gameOverMessage").style.display = "none";
    }

    function showRanking() {
        alert("Aqui será o ranking!");
    }

    function showAchievements() {
        alert("Aqui serão suas conquistas!");
    }
});

