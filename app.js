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
        "Água": [{
            "question": "Qual dessas ações ajuda a economizar água?",
            "options": [
                "Tomar banhos longos",
                "Escovar os dentes com a torneira aberta",
                "Reutilizar a água da chuva",
                "Lavar o carro todo dia"
            ],
            "answer": "Reutilizar a água da chuva"
        },
            {
                "question": "Melhor horário para regar plantas:",
                "options": [
                    "Meio-dia",
                    "Final da tarde",
                    "Manhã cedo",
                    "Qualquer hora"
                ],
                "answer": "Manhã cedo"
            },
            {
                "question": "Qual equipamento economiza mais água ao lavar louça?",
                "options": [
                    "Mangueira com jato forte",
                    "Esponja nova",
                    "Torneira arejadora",
                    "Sabão em barra"
                ],
                "answer": "Torneira arejadora"
            },
            {
                "question": "Ao lavar o carro de forma sustentável, o ideal é:",
                "options": [
                    "Usar mangueira com água corrente",
                    "Levar a lava-rápido todo dia",
                    "Usar balde e pano",
                    "Usar sabão demais para limpar melhor"
                ],
                "answer": "Usar balde e pano"
            },
            {
                "question": "Descargas modernas com duplo acionamento servem para:",
                "options": [
                    "Liberar mais água",
                    "Liberar menos água em cada uso",
                    "Deixar o vaso mais limpo",
                    "Evitar entupimentos"
                ],
                "answer": "Liberar menos água em cada uso"
            },
            {
                "question": "Qual dessas atitudes evita o desperdício de água?",
                "options": [
                    "Lavar a calçada com mangueira",
                    "Revisar vazamentos regularmente",
                    "Usar água quente para limpar tudo",
                    "Deixar a torneira pingando"
                ],
                "answer": "Revisar vazamentos regularmente"
            },
            {
                "question": "Água invisível é aquela que:",
                "options": [
                    "É usada em produtos sem percebermos",
                    "É potável, mas transparente demais",
                    "Só aparece na conta de luz",
                    "Evapora muito rápido"
                ],
                "answer": "É usada em produtos sem percebermos"
            }
        ],
        "Energia": [{
            "question": "Qual lâmpada consome menos energia?",
            "options": ["Incandescente", "Halógena", "LED", "Fluorescente"],
            "answer": "LED"
        },
            {
                "question": "Uma boa prática para economizar energia é:",
                "options": ["Deixar luzes acesas", "Desligar aparelhos da tomada", "Usar o ar-condicionado o dia todo",
                            "Carregar celular a noite inteira"],
                "answer": "Desligar aparelhos da tomada"
            },
            {
                "question": "Painéis solares são usados para:",
                "options": ["Esquentar a casa", "Produzir energia elétrica limpa", "Controlar o clima", "Filtrar água"],
                "answer": "Produzir energia elétrica limpa"
            },
            {
                "question": "Energia eólica vem de:",
                "options": ["Sol", "Água", "Vento", "Carvão"],
                "answer": "Vento"
            },
            {
                "question": "Eletrodomésticos com selo Procel A são:",
                "options": ["Mais bonitos", "Mais baratos", "Mais econômicos", "Mais pesados"],
                "answer": "Mais econômicos"
            }],
        "Lixo": [{
            "question": "Qual é a cor da lixeira para papel?",
            "options": ["Azul", "Vermelha", "Verde", "Amarela"],
            "answer": "Azul"
        },
            {
                "question": "Vidros devem ser descartados:",
                "options": ["No lixo orgânico", "Na lixeira verde", "Com restos de comida", "Com pilhas e baterias"],
                "answer": "Na lixeira verde"
            },
            {
                "question": "Qual material demora mais para se decompor?",
                "options": ["Papel", "Vidro", "Casca de banana", "Papelão"],
                "answer": "Vidro"
            },
            {
                "question": "Reciclar ajuda a:",
                "options": ["Aumentar o lixo", "Economizar recursos naturais", "Poluir menos", "Ambas anteriores"],
                "answer": "Ambas anteriores"
            },
            {
                "question": "Lixo eletrônico deve ser descartado:",
                "options": ["No lixo comum", "Em pontos de coleta especiais", "Na rua", "Com lixo reciclável"],
                "answer": "Em pontos de coleta especiais"
            }],
        "Alimentação": [{
            "question": "Uma alimentação sustentável inclui:",
            "options": ["Alimentos ultraprocessados", "Produtos locais e sazonais", "Refrigerantes", "Fast food"],
            "answer": "Produtos locais e sazonais"
        },
            {
                "question": "Comer menos carne ajuda o planeta porque:",
                "options": ["Reduz a emissão de gases poluentes", "Gera mais lixo", "Desmata florestas",
                            "Aumenta a energia elétrica"],
                "answer": "Reduz a emissão de gases poluentes"
            },
            {
                "question": "Desperdício de alimentos pode ser evitado com:",
                "options": ["Compras em excesso", "Guardar sobras corretamente", "Jogar fora alimentos com aparência feia",
                            "Ignorar datas de validade"],
                "answer": "Guardar sobras corretamente"
            },
            {
                "question": "Plantar alimentos em casa ajuda porque:",
                "options": ["Gera lixo", "Evita o supermercado", "Reduz embalagem e transporte", "É caro"],
                "answer": "Reduz embalagem e transporte"
            },
            {
                "question": "Alimentos orgânicos são melhores pois:",
                "options": ["Usam mais veneno", "São mais processados", "Não usam agrotóxicos", "Duram menos"],
                "answer": "Não usam agrotóxicos"
            }]
    }

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
            timeLeft += 2; // Adiciona 5 segundos
            timeLeftDisplay.textContent = `⏳ Tempo restante: ${timeLeft}s`; // Atualiza o tempo na tela
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

// Salva no ranking
let players = JSON.parse(localStorage.getItem("ranking")) || [];
players.push({ name: username, score: score });
localStorage.setItem("ranking", JSON.stringify(players));


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
