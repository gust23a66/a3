const isPC = !/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const acertoSom = new Audio('acerto.mp3');
const erroSom = new Audio('erro.mp3');

// Jogador e variáveis do jogo
let baseWidth = 60;
let baseHeight = 60;

if (isPC) {
  baseWidth = 80;
  baseHeight = 80;
}
let player = { x: 170, width: 60, height: 60 };
let lastSpeedIncreaseScore = 0;



let trash = [];
let score = 0;
let lives = 3;
let gameInterval;
let trashInterval;
let gameOver = false;
let fallSpeed = 4;
let elapsedTime = 0;


// Imagens
const binImg = new Image();
binImg.src = 'bin.png';

const trashImg = new Image();
trashImg.src = 'trash.png';

const organicTrashImg = new Image();
organicTrashImg.src = 'organic_trash.png';




const backgroundImg = new Image();
backgroundImg.src = 'fundo.png'; // Substitua pelo nome real da sua imagem de fundo

const specialTrashImg = new Image();
specialTrashImg.src = 'special_trash.png'; // Substitua pelo nome do seu arquivo

// Início do jogo
function startGame() {
 
  fallSpeed = 4;
elapsedTime = 0;
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
function ajustarCanvas() {
  const maxWidth = 500;
  const width = Math.min(window.innerWidth - 20, maxWidth);
  const height = width * 1.25;

  canvas.width = width;
  canvas.height = height;
}

// Sempre ajustar quando a tela mudar
window.addEventListener("resize", () => {
  ajustarCanvas();
  ajustarTamanhos(); // adiciona isso!
});

document.addEventListener("DOMContentLoaded", () => {
  ajustarCanvas();
  ajustarTamanhos(); // ✅ agora sim é executado
  loadImages(startGame);
});


function ajustarTamanhos() {
  player.x = (canvas.width - player.width) / 2;

  if (isMobile()) {
    player.width = 60;
    player.height = 50;
  } else {
    player.width = 40;    // ajuste como quiser
    player.height = 80;
  }
}



function updateGame() {
  if (gameOver || isPaused) return;

if (score >= lastSpeedIncreaseScore + 10 && fallSpeed < 15) {
  fallSpeed += 0.5;
  lastSpeedIncreaseScore = score;
}


  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fundo
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

  // Jogador
  ctx.drawImage(binImg, player.x, canvas.height - player.height, player.width, player.height);

  // Lixo
  for (let i = 0; i < trash.length; i++) {
    let t = trash[i];
    t.y += fallSpeed;

    const img = 
      t.type === 'organic' ? organicTrashImg :
      t.type === 'special' ? specialTrashImg :
      trashImg;

    let drawSize = t.size;
    if (t.type === 'special') {
      drawSize *= 1.5;
    }

    ctx.drawImage(img, t.x, t.y, t.width, t.height);


    // Colisão
    if (
  t.y + t.height >= canvas.height - player.height &&
  t.x < player.x + player.width &&
  t.x + t.width > player.x
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
        acertoSom.play();
      }

      trash.splice(i, 1);
      i--;
      document.getElementById('score').innerText = score;
      drawHearts();
    } else if (t.y > canvas.height) {
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
  if (isPaused || gameOver) return;

let baseWidth, baseHeight;

if (isMobile()) {
  baseWidth = 25;
  baseHeight = 25;
} else {
  baseWidth = 15;  // 👈 Aqui você define a largura no PC
  baseHeight = 40; // 👈 Aqui a altura no PC
}

let x = Math.random() * (canvas.width - baseWidth);

  let random = Math.random();
  let type;

  if (random < 0.1) {
    type = 'special';
  
  } else if (random < 0.3) {
    type = 'organic';
  } else {
    type = 'recycle';
  }

trash.push({ x, y: 0, width: baseWidth, height: baseHeight, type });


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




// Controle por toque (touch) para celular
// Mouse
canvas.addEventListener("mousemove", function (e) {
  const rect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / rect.width;
  const mouseX = (e.clientX - rect.left) * scaleX;

  player.x = Math.min(Math.max(mouseX - player.width / 2, 0), canvas.width - player.width);
});


// Toque
canvas.addEventListener('touchmove', function (e) {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const touchX = e.touches[0].clientX - rect.left;
  player.x = Math.min(Math.max(touchX - player.width / 2, 0), canvas.width - player.width);
}, { passive: false });




function loadImages(callback) {
  let loaded = 0;
  const total = 7;

  function checkLoaded() {
    loaded++;
    if (loaded === total) callback();
  }

  const images = [binImg, trashImg, organicTrashImg, backgroundImg, specialTrashImg, heartFullImg, heartEmptyImg];

  images.forEach(img => {
    if (img.complete) {
      checkLoaded();
    } else {
      img.onload = checkLoaded;
    }
  });
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

window.addEventListener("load", () => {
  ajustarCanvas();
  ajustarTamanhos();  // ✅ importante
  loadImages(startGame);
});





let isPaused = false;

function togglePause() {
  isPaused = !isPaused;
  document.getElementById('pauseMenu').style.display = isPaused ? 'flex' : 'none';
  document.getElementById('pauseButton').textContent = isPaused ? '▶' : '⏸';
}




let moveInterval = null;

function startMoving(direction) {
  stopMoving(); // evita múltiplos intervalos
  moveInterval = setInterval(() => {
    if (direction === 'left' && player.x > 0) {
      player.x -= 10;
    } else if (direction === 'right' && player.x + player.width < canvas.width) {
      player.x += 10;
    }
  }, 16); // 60 FPS
}

function stopMoving() {
  if (moveInterval) {
    clearInterval(moveInterval);
    moveInterval = null;
  }
}


function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function handleTouch(e) {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const touchX = e.touches[0].clientX - rect.left;
  const clampedX = Math.min(Math.max(touchX - player.width / 2, 0), canvas.width - player.width);
  player.x = clampedX;
}

canvas.addEventListener('touchstart', handleTouch, { passive: false });
canvas.addEventListener('touchmove', handleTouch, { passive: false });



function isMobile() {
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

function ativarTelaCheiaMobile() {
  if (
    isMobile() &&
    !document.fullscreenElement &&
    document.documentElement.requestFullscreen
  ) {
    document.documentElement.requestFullscreen();
  }
  canvas.removeEventListener('touchstart', ativarTelaCheiaMobile);
  canvas.removeEventListener('click', ativarTelaCheiaMobile);
}

// Apenas no mobile: ativa fullscreen no primeiro toque ou clique
canvas.addEventListener('touchstart', ativarTelaCheiaMobile);
canvas.addEventListener('click', ativarTelaCheiaMobile);
