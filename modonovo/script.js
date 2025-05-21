const isPC = !/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
const canvas = document.getElementById('gameCanvas');
const acertoSom = new Audio('acerto.mp3');
const erroSom = new Audio('erro.mp3');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';

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
let lastHeartScore = 0; // para controlar o próximo coração


// Imagens
const binImg = new Image();
binImg.src = 'bin.png';

const trashImg = new Image();
trashImg.src = 'trash.png';

const organicTrashImg = new Image();
organicTrashImg.src = 'organic_trash.png';

const metalTrashImg = new Image();
metalTrashImg.src = 'metal_trash.png';

const glassTrashImg = new Image();
glassTrashImg.src = 'glass_trash.png';

const plasticTrashImg = new Image();
plasticTrashImg.src = 'plastic_trash.png';

const bananaTrashImg = new Image();
bananaTrashImg.src = 'banana.png';

const backgroundImg = new Image();
backgroundImg.src = 'fundo.png'; // Substitua pelo nome real da sua imagem de fundo

const specialTrashImg = new Image();
specialTrashImg.src = 'special_trash.png'; // Substitua pelo nome do seu arquivo

const heartItemImg = new Image();
heartItemImg.src = 'heart_item.png';

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
  if (isMobile()) {
    player.width = canvas.width * 0.18;
    player.height = canvas.height * 0.11;
  } else {
    player.width = canvas.width * 0.08;
    player.height = canvas.height * 0.14;
  }

  // Centraliza após ajustar
  player.x = (canvas.width - player.width) / 2;
}




function updateGame() {
  if (gameOver || isPaused) return;

if (score >= lastSpeedIncreaseScore + 10 && fallSpeed < 20) {
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
  t.type === 'banana' ? bananaTrashImg :
  t.type === 'organic' ? organicTrashImg :
  t.type === 'special' ? specialTrashImg :
  t.type === 'metal' ? metalTrashImg :
  t.type === 'glass' ? glassTrashImg :
  t.type === 'plastic' ? plasticTrashImg :
   t.type === 'heart' ? heartItemImg :
  trashImg;


  ctx.drawImage(img, t.x, t.y, t.width, t.height);

  const lixoBateuNoChao = t.y + t.height >= canvas.height;
  const colidiuComLixeira =
    t.x < player.x + player.width &&
    t.x + t.width > player.x &&
    t.y + t.height >= canvas.height - player.height;

if (colidiuComLixeira) {
  const tipo = t.type;
  trash.splice(i, 1);
  i--;

  if (tipo === 'organic' || tipo === 'banana') {
    erroSom.currentTime = 0;
    erroSom.play();
    lives--;
    if (lives <= 0) endGame();
  } else if (tipo === 'heart') {
    // ❤️ Coleta o coração — ganha 1 vida até no máx 3
    if (lives < 3) {
      lives++;
      drawHearts();
    }
    acertoSom.currentTime = 0;
    acertoSom.play();
  } else {
    acertoSom.currentTime = 0;
    acertoSom.play();

    switch (tipo) {
      case 'recycle': score += 1; break;
      case 'metal': score += 2; break;
      case 'plastic': score += 3; break;
      case 'glass': score += 4; break;
      case 'special': score += 10; break;
    }
  }

  document.getElementById('score').innerText = score;
  drawHearts();
}
else if (lixoBateuNoChao) {
  // Remove qualquer lixo que caiu no chão, sem penalizar
  trash.splice(i, 1);
  i--;
}

}
}


  




  function voltarParaMenu() {
    window.location.href = "../index.html"; // volta para a raiz
  }


// Gerar lixo
// Gerar lixo
function spawnTrash() {
  if (isPaused || gameOver) return;

  let baseWidth, baseHeight;

  if (isMobile()) {
    baseWidth = canvas.width * 0.09;   // antes 0.08 → menor
    baseHeight = canvas.height * 0.06;
  } else {
    baseWidth = canvas.width * 0.04;   // antes 0.05 → menor
    baseHeight = canvas.height * 0.06;
  }

  let x = Math.random() * (canvas.width - baseWidth);

  // Sorteio do tipo
 // Sorteio do tipo
const random = Math.random();
let type;

if (random < 0.05) {
  type = 'banana'; // 🍌 novo tipo
} else if (random < 0.15) {
  type = 'organic'; // outros orgânicos
} else if (random < 0.35) {
  type = 'metal';
} else if (random < 0.55) {
  type = 'plastic';
} else if (random < 0.75) {
  type = 'glass';
} else if (random < 0.9) {
  type = 'recycle';
} else {
  type = 'special';
}

  trash.push({ x, y: 0, width: baseWidth, height: baseHeight, type });

// Se pontuação chegou a múltiplos de 250 e não já gerou nesse intervalo
if (score >= lastHeartScore + 100) {
  spawnHeartItem(); // gera o coração
  lastHeartScore = score;
}

}


function spawnHeartItem() {
  let baseWidth = canvas.width * 0.05;
  let baseHeight = canvas.height * 0.05;
  let x = Math.random() * (canvas.width - baseWidth);

  trash.push({ x, y: 0, width: baseWidth, height: baseHeight, type: 'heart' });
}


function endGame() {
  clearInterval(gameInterval);
  clearInterval(trashInterval);
  gameOver = true;

  setTimeout(() => {
    document.getElementById('finalScore').innerText = `Pontuação final: ${score}`;
    document.getElementById('gameOverScreen').style.display = 'flex';
    document.body.classList.add('game-over');
  }, 300); // pequeno atraso
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





function loadImages(callback) {
  let loaded = 0;
  const total = 7;

  function checkLoaded() {
    loaded++;
    if (loaded === total) callback();
  }

 const images = [
  binImg, trashImg, organicTrashImg, backgroundImg, specialTrashImg, heartFullImg, heartEmptyImg, bananaTrashImg , heartItemImg
];

  images.forEach(img => {
    if (img.complete) {
      checkLoaded();
    } else {
      img.onload = checkLoaded;
    }
  });
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

  const scaleX = canvas.width / rect.width;
  const touchX = (e.touches[0].clientX - rect.left) * scaleX;

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
