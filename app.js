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

    restartButtonWin.addEventListener("click", () => {
        winScreen.style.display = "none";
        startGame();
    });
    
    menuButtonWin.addEventListener("click", showLoginScreen);
    
   
const audio = new Audio('musica_fundo.mp3');
audio.loop = true;
audio.addEventListener('canplaythrough', () => {
    if (musicPlaying) audio.play();
});

audio.loop = true;
const acertoAudio = new Audio('acerto.mp3');
const erroAudio = new Audio('erro.mp3');
let musicPlaying = true;


   let correctAnswersCount = 0;
   let correctStreak = 0; 
   let gamesPlayed = 0;
   let shuffledThemes = [];
   let currentThemeIndex = 0;
   let correctByTheme = {};
   let startTime = 0;
   let questionStartTime = 0;

  
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
        "question": "Água invisível é aquela que:",
        "options": [
            "É usada em produtos sem percebermos",
            "É potável, mas transparente demais",
            "Só aparece na conta de luz",
            "Evapora muito rápido"
        ],
        "answer": "É usada em produtos sem percebermos"
    },
    {
        "question": "Qual é o ciclo natural da água?",
        "options": [
            "Evaporação → Condensação → Precipitação → Infiltração",
            "Evaporação → Precipitação → Condensação → Infiltração",
            "Condensação → Precipitação → Evaporação → Infiltração",
            "Precipitação → Evaporação → Condensação → Infiltração"
        ],
        "answer": "Evaporação → Condensação → Precipitação → Infiltração"
    },
    {
        "question": "O que é a água subterrânea?",
        "options": [
            "Água armazenada em rios e lagos",
            "Água armazenada em aquíferos abaixo da superfície",
            "Água presente na atmosfera",
            "Água proveniente da chuva"
        ],
        "answer": "Água armazenada em aquíferos abaixo da superfície"
    },
    {
        "question": "Qual é o principal uso da água doce no mundo?",
        "options": [
            "Consumo humano",
            "Agricultura",
            "Indústria",
            "Geração de energia"
        ],
        "answer": "Agricultura"
    },
    {
        "question": "O que é o desperdício de água?",
        "options": [
            "Uso excessivo sem necessidade",
            "Uso consciente e controlado",
            "Uso apenas para consumo humano",
            "Uso para geração de energia"
        ],
        "answer": "Uso excessivo sem necessidade"
    },
    {
        "question": "Como podemos economizar água ao lavar roupas?",
        "options": [
            "Lavar pequenas quantidades de roupas",
            "Lavar roupas com água quente",
            "Usar a máquina de lavar com capacidade máxima",
            "Lavar roupas com sabão em pó"
        ],
        "answer": "Usar a máquina de lavar com capacidade máxima"
    },
    {
        "question": "Qual é o impacto do desmatamento na água?",
        "options": [
            "Aumento da disponibilidade de água",
            "Diminuição da qualidade da água",
            "Aumento da quantidade de água doce",
            "Nenhum impacto"
        ],
        "answer": "Diminuição da qualidade da água"
    },
    {
        "question": "O que é a poluição da água?",
        "options": [
            "Presença de substâncias prejudiciais nos corpos d'água",
            "Aumento da quantidade de água doce",
            "Uso consciente da água",
            "Nenhum impacto"
        ],
        "answer": "Presença de substâncias prejudiciais nos corpos d'água"
    },
    {
        "question": "Como podemos evitar a poluição da água?",
        "options": [
            "Jogando lixo nos rios",
            "Usando produtos químicos na agricultura",
            "Tratando o esgoto antes de despejá-lo",
            "Nenhuma das anteriores"
        ],
        "answer": "Tratando o esgoto antes de despejá-lo"
    },
    {
        "question": "O que é a dessalinização da água?",
        "options": [
            "Processo de remoção de sal da água do mar",
            "Processo de purificação da água potável",
            "Processo de aumento da salinidade da água",
            "Nenhuma das anteriores"
        ],
        "answer": "Processo de remoção de sal da água do mar"
    },
    {
        "question": "Qual é a principal fonte de água potável no Brasil?",
        "options": [
            "Rios e lagos",
            "Aquíferos subterrâneos",
            "Água da chuva",
            "Dessalinização"
        ],
        "answer": "Rios e lagos"
    },
    {
        "question": "O que é o desperdício de água na agricultura?",
        "options": [
            "Uso excessivo de água para irrigação",
            "Uso controlado de água para irrigação",
            "Uso de técnicas de irrigação eficientes",
            "Nenhuma das anteriores"
        ],
        "answer": "Uso excessivo de água para irrigação"
    },
    {
        "question": "Como podemos economizar água na cozinha?",
        "options": [
            "Deixando a torneira aberta ao lavar pratos",
            "Usando a máquina de lavar louça com capacidade máxima",
            "Lavar pratos com água corrente",
            "Nenhuma das anteriores"
        ],
        "answer": "Usando a máquina de lavar louça com capacidade máxima"
    },
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
        "question": "Qual lâmpada consome menos energia?",
        "options": ["Incandescente", "Halógena", "LED", "Fluorescente"],
        "answer": "LED"
    },
    {
        "question": "Uma boa prática para economizar energia é:",
        "options": ["Deixar luzes acesas", "Desligar aparelhos da tomada", "Usar o ar-condicionado o dia todo", "Carregar celular a noite inteira"],
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
    },
    {
        "question": "Qual é a principal fonte de energia elétrica no Brasil?",
        "options": ["Carvão mineral", "Energia solar", "Energia hidrelétrica", "Energia nuclear"],
        "answer": "Energia hidrelétrica"
    },
    {
        "question": "O que é energia renovável?",
        "options": ["Energia proveniente de fontes que se esgotam rapidamente", "Energia proveniente de fontes que se renovam naturalmente", "Energia proveniente de fontes nucleares", "Energia proveniente de fontes fósseis"],
        "answer": "Energia proveniente de fontes que se renovam naturalmente"
    },
    {
        "question": "Qual é a principal vantagem da energia solar?",
        "options": ["É inesgotável e não polui", "É barata e fácil de instalar", "É mais eficiente que a energia eólica", "É mais barata que a energia hidrelétrica"],
        "answer": "É inesgotável e não polui"
    },
    {
        "question": "O que é energia nuclear?",
        "options": ["Energia proveniente da fissão de átomos", "Energia proveniente da fusão de átomos", "Energia proveniente da decomposição de matéria orgânica", "Energia proveniente da queima de combustíveis fósseis"],
        "answer": "Energia proveniente da fissão de átomos"
    },
    {
        "question": "Qual é a principal desvantagem da energia nuclear?",
        "options": ["Emissão de gases poluentes", "Geração de resíduos radioativos", "Custo elevado de instalação", "Dependência de fontes externas"],
        "answer": "Geração de resíduos radioativos"
    },
    {
        "question": "O que é energia geotérmica?",
        "options": ["Energia proveniente da decomposição de matéria orgânica", "Energia proveniente da radiação solar", "Energia proveniente do calor interno da Terra", "Energia proveniente da queima de biomassa"],
        "answer": "Energia proveniente do calor interno da Terra"
    },
    {
        "question": "Qual é a principal fonte de energia no setor de transporte?",
        "options": ["Energia elétrica", "Energia solar", "Combustíveis fósseis", "Energia nuclear"],
        "answer": "Combustíveis fósseis"
    },
    {
        "question": "O que é eficiência energética?",
        "options": ["Uso de mais energia para realizar uma tarefa", "Uso de menos energia para realizar uma tarefa", "Uso de energia renovável", "Uso de energia nuclear"],
        "answer": "Uso de menos energia para realizar uma tarefa"
    },
    {
        "question": "Qual é a principal vantagem da energia eólica?",
        "options": ["É inesgotável e não polui", "É barata e fácil de instalar", "É mais eficiente que a energia solar", "É mais barata que a energia hidrelétrica"],
        "answer": "É inesgotável e não polui"
    },
    {
        "question": "O que é energia biomassa?",
        "options": ["Energia proveniente da decomposição de matéria orgânica", "Energia proveniente da queima de combustíveis fósseis", "Energia proveniente da fissão de átomos", "Energia proveniente da fusão de átomos"],
        "answer": "Energia proveniente da decomposição de matéria orgânica"
    },
    {
        "question": "Qual é a principal desvantagem da energia solar?",
        "options": ["Emissão de gases poluentes", "Geração de resíduos radioativos", "Dependência de condições climáticas", "Custo elevado de instalação"],
        "answer": "Dependência de condições climáticas"
    },
    {
        "question": "O que é energia hidráulica?",
        "options": ["Energia proveniente da decomposição de matéria orgânica", "Energia proveniente da queima de combustíveis fósseis", "Energia proveniente do movimento da água", "Energia proveniente da fissão de átomos"],
        "answer": "Energia proveniente do movimento da água"
    },
    {
        "question": "Qual é a principal vantagem da energia hidrelétrica?",
        "options": ["É inesgotável e não polui", "É barata e fácil de instalar", "É mais eficiente que a energia solar", "É mais barata que a energia eólica"],
        "answer": "É inesgotável e não polui"
    },
    {
        "question": "O que é energia de biomassa?",
        "options": ["Energia proveniente da decomposição de matéria orgânica", "Energia proveniente da queima de combustíveis fósseis", "Energia proveniente da fissão de átomos", "Energia proveniente da fusão de átomos"],
        "answer": "Energia proveniente da decomposição de matéria orgânica"
    },
    {
        "question": "Qual é a principal desvantagem da energia eólica?",
        "options": ["Emissão de gases poluentes", "Geração de resíduos radioativos", "Dependência de condições climáticas", "Custo elevado de instalação"],
        "answer": "Dependência de condições climáticas"
    }],
    
    "Lixo": [
    {
        "question": "Qual cor da lixeira é destinada ao descarte de papel?",
        "options": ["Azul", "Verde", "Amarela", "Preta"],
        "answer": "Azul"
    },
    {
        "question": "Onde devemos descartar pilhas e baterias?",
        "options": ["No lixo comum", "Na lixeira amarela", "Em pontos de coleta específicos", "Na lixeira verde"],
        "answer": "Em pontos de coleta específicos"
    },
    {
        "question": "O que é o chorume?",
        "options": ["Gás produzido pela decomposição de lixo", "Líquido resultante da decomposição de resíduos orgânicos", "Resíduo sólido proveniente da reciclagem", "Produto químico utilizado na limpeza de lixeiras"],
        "answer": "Líquido resultante da decomposição de resíduos orgânicos"
    },
    {
        "question": "Qual material demora mais para se decompor no meio ambiente?",
        "options": ["Vidro", "Papel", "Plástico", "Metal"],
        "answer": "Plástico"
    },
    {
        "question": "O que é reciclagem?",
        "options": ["Transformar resíduos em novos produtos", "Queimar lixo para reduzir volume", "Enterrar lixo em aterros sanitários", "Jogar lixo em terrenos baldios"],
        "answer": "Transformar resíduos em novos produtos"
    },
    {
        "question": "Qual é a principal vantagem da compostagem?",
        "options": ["Reduzir a quantidade de lixo orgânico", "Produzir energia elétrica", "Gerar empregos na indústria", "Aumentar a produção de lixo"],
        "answer": "Reduzir a quantidade de lixo orgânico"
    },
    {
        "question": "O que é coleta seletiva?",
        "options": ["Separar o lixo por tipo de material", "Misturar todos os tipos de lixo", "Queimar o lixo", "Enterrar o lixo em aterros"],
        "answer": "Separar o lixo por tipo de material"
    },
    {
        "question": "O que deve ser descartado na lixeira verde?",
        "options": ["Vidro", "Papel", "Plástico", "Metal"],
        "answer": "Vidro"
    },
    {
        "question": "Qual é o destino adequado para resíduos eletrônicos?",
        "options": ["Lixo comum", "Pontos de coleta específicos", "Lixeira amarela", "Lixeira preta"],
        "answer": "Pontos de coleta específicos"
    },
    {
        "question": "O que é lixo orgânico?",
        "options": ["Resíduos de origem vegetal ou animal", "Resíduos de metais", "Resíduos de plásticos", "Resíduos de vidro"],
        "answer": "Resíduos de origem vegetal ou animal"
    },
    {
        "question": "Quanto tempo o plástico pode levar para se decompor?",
        "options": ["De 1 a 5 anos", "De 10 a 100 anos", "De 100 a 500 anos", "Mais de 1000 anos"],
        "answer": "Mais de 1000 anos"
    },
    {
        "question": "Qual é a cor da lixeira destinada ao lixo orgânico?",
        "options": ["Preta", "Verde", "Amarela", "Azul"],
        "answer": "Preta"
    },
    {
        "question": "O que é aterro sanitário?",
        "options": ["Local adequado para o descarte de lixo", "Lugar onde o lixo é queimado", "Área onde o lixo é enterrado sem controle", "Local onde o lixo é reciclado"],
        "answer": "Local adequado para o descarte de lixo"
    },
    {
        "question": "Qual é o principal objetivo da política dos 3Rs (Reduzir, Reutilizar, Reciclar)?",
        "options": ["Aumentar a produção de lixo", "Reduzir o impacto ambiental dos resíduos", "Facilitar o descarte de lixo", "Promover o consumo excessivo"],
        "answer": "Reduzir o impacto ambiental dos resíduos"
    },
    {
        "question": "O que é lixo eletrônico?",
        "options": ["Resíduos de aparelhos eletrônicos descartados", "Resíduos de alimentos", "Resíduos de papel", "Resíduos de vidro"],
        "answer": "Resíduos de aparelhos eletrônicos descartados"
    },
    {
        "question": "Qual é a cor da lixeira destinada ao descarte de metais?",
        "options": ["Amarela", "Azul", "Verde", "Preta"],
        "answer": "Amarela"
    },
    {
        "question": "O que é compostagem?",
        "options": ["Processo de decomposição controlada de matéria orgânica", "Queima de lixo orgânico", "Enterro de lixo orgânico", "Transformação de lixo orgânico em plástico"],
        "answer": "Processo de decomposição controlada de matéria orgânica"
    },
    {
        "question": "Qual é o destino adequado para resíduos de construção civil?",
        "options": ["Lixo comum", "Pontos de coleta específicos", "Lixeira amarela", "Lixeira preta"],
        "answer": "Pontos de coleta específicos"
    },
    {
        "question": "O que é lixo reciclável?",
        "options": ["Resíduos que podem ser transformados em novos produtos", "Resíduos que não podem ser reutilizados", "Resíduos que devem ser queimados", "Resíduos que devem ser enterrados"],
        "answer": "Resíduos que podem ser transformados em novos produtos"
    },
    {
        "question": "Qual é a cor da lixeira destinada ao descarte de resíduos de saúde?",
        "options": ["Branca", "Preta", "Amarela", "Verde"],
        "answer": "Amarela"
    },
    {
        "question": "Qual é a principal vantagem da reciclagem do papel?",
        "options": ["Reduzir o consumo de madeira", "Aumentar a produção de lixo", "Poluir mais o meio ambiente", "Consumir mais energia"],
        "answer": "Reduzir o consumo de madeira"
    },
    {
        "question": "O que é lixo industrial?",
        "options": ["Resíduos gerados por processos industriais", "Resíduos de alimentos", "Resíduos de papel", "Resíduos de vidro"],
        "answer": "Resíduos gerados por processos industriais"
    },
    {
        "question": "Qual é a cor da lixeira destinada ao descarte de resíduos domiciliares?",
        "options": ["Preta", "Verde", "Amarela", "Azul"],
        "answer": "Preta"
    }],

       "Alimentação": [
    {
        "question": "Uma alimentação sustentável inclui:",
        "options": ["Alimentos ultraprocessados", "Produtos locais e sazonais", "Refrigerantes", "Fast food"],
        "answer": "Produtos locais e sazonais"
    },
    {
        "question": "Comer menos carne ajuda o planeta porque:",
        "options": ["Reduz a emissão de gases poluentes", "Gera mais lixo", "Desmata florestas", "Aumenta a energia elétrica"],
        "answer": "Reduz a emissão de gases poluentes"
    },
    {
        "question": "Desperdício de alimentos pode ser evitado com:",
        "options": ["Compras em excesso", "Guardar sobras corretamente", "Jogar fora alimentos com aparência feia", "Ignorar datas de validade"],
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
    },
    {
        "question": "Uma forma de reduzir o desperdício é:",
        "options": ["Comer fora todos os dias", "Reaproveitar sobras de alimentos", "Comprar mais do que precisa", "Evitar hortas caseiras"],
        "answer": "Reaproveitar sobras de alimentos"
    },
    {
        "question": "Qual prática ajuda na sustentabilidade alimentar?",
        "options": ["Consumir fast food", "Comer alimentos industrializados", "Preferir produtos de época", "Desperdiçar comida"],
        "answer": "Preferir produtos de época"
    },
    {
        "question": "Alimentos processados normalmente contêm:",
        "options": ["Poucos ingredientes", "Alto teor de açúcar e sódio", "Vitaminas naturais", "Baixas calorias"],
        "answer": "Alto teor de açúcar e sódio"
    },
    {
        "question": "Reduzir o consumo de carne contribui para:",
        "options": ["Mais desmatamento", "Maior uso de água", "Menor emissão de gases de efeito estufa", "Aumento da poluição"],
        "answer": "Menor emissão de gases de efeito estufa"
    },
    {
        "question": "Como as feiras livres ajudam o meio ambiente?",
        "options": ["Produzem lixo", "Oferecem produtos locais", "Usam embalagens plásticas", "Geram mais trânsito"],
        "answer": "Oferecem produtos locais"
    },
    {
        "question": "Um exemplo de proteína vegetal é:",
        "options": ["Carne bovina", "Frango", "Feijão", "Peixe"],
        "answer": "Feijão"
    },
    {
        "question": "Qual é uma vantagem do consumo de alimentos locais?",
        "options": ["Aumenta o uso de combustíveis", "Reduz transporte e poluição", "Encarece a comida", "Reduz qualidade"],
        "answer": "Reduz transporte e poluição"
    },
    {
        "question": "Evitar o desperdício de comida também ajuda a:",
        "options": ["Poluir menos", "Gastar mais", "Usar mais energia", "Produzir mais lixo"],
        "answer": "Poluir menos"
    },
    {
        "question": "O que significa sazonais?",
        "options": ["Alimentos vendidos só à noite", "Produtos importados", "Alimentos da estação", "Comida de festa"],
        "answer": "Alimentos da estação"
    },
    {
        "question": "O que podemos fazer com cascas de frutas e legumes?",
        "options": ["Jogar fora", "Usar para adubo ou receitas", "Descartar com lixo comum", "Evitar ao máximo"],
        "answer": "Usar para adubo ou receitas"
    },
    {
        "question": "Qual dessas práticas reduz impacto ambiental na alimentação?",
        "options": ["Comprar produtos processados", "Cozinhar mais em casa", "Usar embalagens descartáveis", "Desperdiçar sobras"],
        "answer": "Cozinhar mais em casa"
    },
    {
        "question": "O que é alimentação consciente?",
        "options": ["Comer rapidamente", "Escolher alimentos pelo preço apenas", "Pensar nos impactos sociais e ambientais", "Comer o que tem vontade"],
        "answer": "Pensar nos impactos sociais e ambientais"
    },
    {
        "question": "Por que preferir alimentos orgânicos?",
        "options": ["Porque são mais baratos", "Porque vêm de longe", "Porque não usam agrotóxicos", "Porque duram mais"],
        "answer": "Porque não usam agrotóxicos"
    },
    {
        "question": "O que podemos fazer com alimentos perto do vencimento?",
        "options": ["Jogar fora", "Aproveitar em receitas", "Deixar estragar", "Doar a supermercados"],
        "answer": "Aproveitar em receitas"
    },
    {
        "question": "Como a produção de carne afeta o planeta?",
        "options": ["Ajuda na preservação", "Reduz o uso de água", "Gasta muita água e energia", "Aumenta as áreas verdes"],
        "answer": "Gasta muita água e energia"
    },
    {
        "question": "Uma atitude sustentável na alimentação é:",
        "options": ["Evitar hortas", "Reaproveitar alimentos", "Comer só fast food", "Comer mais carne"],
        "answer": "Reaproveitar alimentos"
    },
    {
        "question": "Por que comer frutas da estação é sustentável?",
        "options": ["Porque duram menos", "Porque são importadas", "Porque precisam de menos recursos para cultivo", "Porque são menos nutritivas"],
        "answer": "Porque precisam de menos recursos para cultivo"
    },
    {
        "question": "Uma boa prática é:",
        "options": ["Ignorar validade dos alimentos", "Comprar a granel e evitar embalagens", "Comprar embalagens grandes", "Evitar feiras"],
        "answer": "Comprar a granel e evitar embalagens"
    },
    {
        "question": "A produção local de alimentos contribui para:",
        "options": ["Mais trânsito urbano", "Redução das emissões de transporte", "Maior gasto energético", "Mais embalagens plásticas"],
        "answer": "Redução das emissões de transporte"
    },
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
let currentDifficulty = "dificil"; // padrão


  
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
    gamesPlayed = 0;
    correctByTheme = {
        "Água": 0,
        "Energia": 0,
        "Lixo": 0,
        "Alimentação": 0
    };

    timeLeft = getInitialTimeByDifficulty();
    timeLeftDisplay.textContent = `⏳ Tempo restante: ${timeLeft}s`;
    errorCountDisplay.textContent = `Erros: ${errorCount}/3`;

    // Inicializa os temas e questões embaralhadas
    shuffledThemes = shuffleArray(Object.keys(challenges));
    currentThemeIndex = 0;
    currentTheme = shuffledThemes[currentThemeIndex];
    shuffledQuestions = shuffleArray([...challenges[currentTheme]]);

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
        questionStartTime = Date.now(); 
    
        const question = shuffledQuestions[currentQuestion];
    if (!question) return;

        document.getElementById("themeTitle").textContent = `Desafio: ${question.tema}`;
        document.getElementById("questionText").textContent = question.question;
    
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
    if (!current) return;

    const correctAnswer = current.answer;
    
        const timeTaken = (Date.now() - questionStartTime) / 1000;
        let bonus = 0;
    
        if (timeTaken <= 3) {
            bonus = 5;
        } else if (timeTaken <= 6) {
            bonus = 3;
        } else if (timeTaken <= 10) {
            bonus = 1;
        }
    
        if (selected === correctAnswer) {
            feedbackMessage.textContent = "✅ Você acertou!";
            score += 10 + bonus;
            correctAnswersCount++;
            correctStreak++;
    
            timeLeft += 5;
            timeLeftDisplay.textContent = `⏳ Tempo restante: ${timeLeft}s`;
    
            acertoAudio.play();
            document.getElementById("scoreValue").textContent = score;
    
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
        setTimeout(() => feedbackMessage.style.display = "none", 2000);
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
        updateRanking();
        loginScreen.style.display = "none";
        gameScreen.style.display = "none";
        rankingScreen.style.display = "none";
        achievementsScreen.style.display = "none";
        gameOverMessage.style.display = "none";
    
        document.getElementById("finalScoreWin").textContent = `Pontuação Final: ${score}`;
      
        winScreen.style.display = "block";
    
        setTimeout(() => {
            winScreen.classList.add("show");
        }, 50);
    }
    
  function escolherDificuldade(nivel) {
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

    const existingPlayerIndex = players.findIndex(player => player.name === username);

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
        updateRanking();
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
    
     
        let achievements = JSON.parse(localStorage.getItem("achievements")) || [];
        if (!achievements.includes(achievementName)) {
            achievements.push(achievementName);
            localStorage.setItem("achievements", JSON.stringify(achievements));
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
        startGame();
    });
    menuButton.addEventListener("click", showLoginScreen);
    exitButton.addEventListener("click", exitGame);
});
