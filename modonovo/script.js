const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const acertoSom = new Audio('acerto.mp3');
const erroSom = new Audio('erro.mp3');

// Jogador e variáveis do jogo
let player = { x: 170, width: 60, height: 60 };
let trash = [];
let score = 0;
let lives = 3;
let gameInterval;
let trashInterval;
let gameOver = false;


// Imagens
const binImg = new Image();
binImg.src = 'bin.png';

const trashImg = new Image();
trashImg.src = 'trash.png';

const organicTrashImg = new Image();
organicTrashImg.src = 'organic_trash.png';

const heartImg = new Image();
heartImg.src = 'heart.png';

const backgroundImg = new Image();
backgroundImg.src = 'fundo.png'; // Substitua pelo nome real da sua imagem de fundo

const specialTrashImg = new Image();
specialTrashImg.src = 'special_trash.png'; // Substitua pelo nome do seu arquivo

// Início do jogo
function startGame() {
  document.getElementById('gameOverScreen').style.display = 'none';
  score = 0;
  lives = 3;
  trash = [];
  gameOver = false;
  document.getElementById('score').innerText = score;

  if (gameInterval) clearInterval(gameInterval);
  if (trashInterval) clearInterval(trashInterval);

  gameInterval = setInterval(updateGame, 20);
  trashInterval = setInterval(spawnTrash, 1000);

  isPaused = false;
document.getElementById('pauseMenu').style.display = 'none';
document.getElementById('pauseButton').textContent = '⏸';

drawHearts(); // mostra os corações no início

}

// Desenhar corações (vidas)
const heartFullImg = new Image();
heartFullImg.src = 'heart_full.png';

const heartEmptyImg = new Image();
heartEmptyImg.src = 'heart_empty.png';

function drawHearts() {
  const container = document.getElementById('livesContainer');
  container.innerHTML = '';
  const totalLives = 3;
  for (let i = 0; i < totalLives; i++) {
    const img = document.createElement('img');
    img.src = i < lives ? heartFullImg.src : heartEmptyImg.src;
    container.appendChild(img);
  }
}


// Atualização do jogo
function updateGame() {
  if (gameOver || isPaused) return; // Adicione "isPaused" aqui

  
  if (gameOver) return;

  if (isPaused) return; // <-- pausa o jogo


  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fundo
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

  // Jogador
  ctx.drawImage(binImg, player.x, canvas.height - player.height, player.width, player.height);

  // Lixo
  for (let i = 0; i < trash.length; i++) {
    let t = trash[i];
    t.y += 4;

    const img = 
      t.type === 'organic' ? organicTrashImg :
      t.type === 'special' ? specialTrashImg :
      trashImg;

    ctx.drawImage(img, t.x, t.y, t.size, t.size);

    // Colisão com a lixeira
    if (
      t.y + t.size >= canvas.height - player.height &&
      t.x < player.x + player.width &&
      t.x + t.size > player.x
    ) {
      if (t.type === 'recycle') {
        score++;
        acertoSom.play();
      } else if (t.type === 'organic') {
        erroSom.play();
        lives--;
        if (lives <= 0) endGame();
      } else if (t.type === 'special') {
        score += 10;
        acertoSom.play(); // ou um som especial
      }

      trash.splice(i, 1);
      i--;
      document.getElementById('score').innerText = score;
      drawHearts();
    }

    // Se cair no chão (sem penalidade)
    else if (t.y > canvas.height) {
      trash.splice(i, 1);
      i--;
    }
  }
}

  function voltarParaMenu() {
    window.location.href = "../index.html"; // volta para a raiz
  }


// Gerar lixo
function spawnTrash() {
  let size = 30;
  let x = Math.random() * (canvas.width - size);
  let random = Math.random();
  let type;

  if (random < 0.1) {
    type = 'special'; // 10% de chance
  } else if (random < 0.3) {
    type = 'organic'; // 20% (de 0.1 até 0.3)
  } else {
    type = 'recycle'; // 70%
  }

  trash.push({ x, y: 0, size, type });
}


// Fim de jogo
function endGame() {
  clearInterval(gameInterval);
  clearInterval(trashInterval);
  gameOver = true;
  document.getElementById('finalScore').innerText = `Pontuação final: ${score}`;
  document.getElementById('gameOverScreen').style.display = 'flex';
  document.body.classList.add('game-over');
}

// Reiniciar
function restartGame() {
  document.body.classList.remove('game-over');
  startGame();
}

// Controle por teclado (setas)
document.addEventListener('keydown', function (e) {
  const speed = 20;
  if (e.key === 'ArrowLeft' && player.x > 0) {
    player.x -= speed;
  } else if (e.key === 'ArrowRight' && player.x + player.width < canvas.width) {
    player.x += speed;
  }
});

// Controle por mouse (arrastar)
canvas.addEventListener('mousemove', function (e) {
  const rect = canvas.getBoundingClientRect();
  let mouseX = e.clientX - rect.left;
  if (mouseX < 0) mouseX = 0;
  if (mouseX > canvas.width - player.width) mouseX = canvas.width - player.width;
  player.x = mouseX;
});

// Controle por toque (touch) para celular
canvas.addEventListener('touchmove', function (e) {
  e.preventDefault(); // evita scroll da página enquanto toca
  const rect = canvas.getBoundingClientRect();
  let touchX = e.touches[0].clientX - rect.left;
  if (touchX < 0) touchX = 0;
  if (touchX > canvas.width - player.width) touchX = canvas.width - player.width;
  player.x = touchX;
}, { passive: false });

window.onload = function () {
  loadImages(startGame);
};
function loadImages(callback) {
  let loaded = 0;
  const total = 5; // Número total de imagens

  function checkLoaded() {
    loaded++;
    if (loaded === total) callback();
  }

  binImg.onload = checkLoaded;
  trashImg.onload = checkLoaded;
  organicTrashImg.onload = checkLoaded;
  backgroundImg.onload = checkLoaded;
  specialTrashImg.onload = checkLoaded;

  // Carregue os corações separadamente
  heartFullImg.onload = checkLoaded;
  heartEmptyImg.onload = checkLoaded;
}


// Ajustar canvas para dispositivos móveis
function ajustarCanvas() {
  const maxWidth = 500;
  const screenWidth = window.innerWidth;
  const width = Math.min(screenWidth - 20, maxWidth); // margem lateral
  const height = width * 1.25; // proporção 4:5

  canvas.width = width;
  canvas.height = height;
}

window.addEventListener('resize', ajustarCanvas);
window.onload = function () {
  ajustarCanvas();
  startGame();
};


let isPaused = false;

function togglePause() {
  isPaused = !isPaused;
  document.getElementById('pauseMenu').style.display = isPaused ? 'flex' : 'none';
  document.getElementById('pauseButton').textContent = isPaused ? '▶' : '⏸';
}



