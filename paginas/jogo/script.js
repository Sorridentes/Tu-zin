// Obtém a referência para os objetos móveis
const objeto1 = document.getElementById("objeto1");
const objeto2 = document.getElementById("objeto2");

// Obtém o tamanho da área
const tama1 = parseFloat(document.getElementById("objeto1").getBoundingClientRect().width);
const areaX = parseFloat(document.getElementById("arena").getBoundingClientRect().width) - tama1;
const areaY = parseFloat(document.getElementById("arena").getBoundingClientRect().height) - tama1;

// Pontuações iniciais dos objetos
let vida1 = parseInt(document.getElementById("vida1").innerHTML);
let vida2 = parseInt(document.getElementById("vida2").innerHTML);
let colisao = parseInt(document.getElementById("colisao").innerHTML);
let porc1 = document.getElementById("g1").children;
let porc2 = document.getElementById("g2").children;

let posX1 = 2;
let posY1 = 2;
let posX2 = areaX - 2;
let posY2 = areaY - 2;

function zerar() {
    // Posições iniciais dos objetos
    posX1 = 2;
    posY1 = 2;
    posX2 = areaX - 2;
    posY2 = areaY - 2;

    colisao = 0;
    document.getElementById("colisao").innerHTML = colisao;

    vida1 = 100;
    document.getElementById("vida1").textContent = vida1;
    porc1[0].offset.baseVal = vida1 / 100;

    vida2 = 100;
    document.getElementById("vida2").textContent = vida2;
    porc2[0].offset.baseVal = vida2 / 100;


    // Adiciona um ouvinte de evento para as teclas pressionadas
    document.addEventListener("keydown", moverObjetos);

    // Inicializa a posição inicial dos objetos na tela
    atualizarPosicao();

}



// Função para atualizar a posição dos objetos na tela
function atualizarPosicao() {
    objeto1.style.left = posX1 + "px";
    objeto1.style.top = posY1 + "px";
    objeto2.style.left = posX2 + "px";
    objeto2.style.top = posY2 + "px";
}

// Função para mover os objetos com base nas teclas pressionadas
function moverObjetos(event) {
    // Obtém o código da tecla pressionada
    const tecla = event.key;

    // Move o objeto1
    if (tecla === "a") {
        posX1 -= 10;
    } else if (tecla === "d") {
        posX1 += 10;
    } else if (tecla === "w") {
        posY1 -= 10;
    } else if (tecla === "s") {
        posY1 += 10;
    }

    // Valida se o objeto1 está na arena
    if (posX1 > areaX) {
        posX1 = areaX;
    }
    if (posX1 < 0) {
        posX1 = 0;
    }
    if (posY1 > areaY) {
        posY1 = areaY;
    }
    if (posY1 < 0) {
        posY1 = 0;
    }


    // Move o objeto2
    if (tecla === "ArrowLeft") {
        posX2 -= 10;
    } else if (tecla === "ArrowRight") {
        posX2 += 10;
    } else if (tecla === "ArrowUp") {
        posY2 -= 10;
    } else if (tecla === "ArrowDown") {
        posY2 += 10;
    }

    // Valida se o objeto2 está na arena
    if (posX2 > areaX) {
        posX2 = areaX;
    }
    if (posX2 < 0) {
        posX2 = 0;
    }
    if (posY2 > areaY) {
        posY2 = areaY;
    }
    if (posY2 < 0) {
        posY2 = 0;
    }

    // Verifica se os objetos se chocaram
    if (verificarColisao()) {
        // Incrementa a pontuação de cada objeto
        colisao++;
        document.getElementById("colisao").innerHTML = colisao;

        vida1 -= Math.floor(Math.random() * 20);
        document.getElementById("vida1").textContent = vida1;
        porc1[0].offset.baseVal = vida1 / 100;

        vida2 -= Math.floor(Math.random() * 20);
        document.getElementById("vida2").textContent = vida2;
        porc2[0].offset.baseVal = vida2 / 100;
        // Reposiciona os objetos em lugares aleatórios
        reposicionarObjetos();
        if(colisao >= 5){
            document.removeEventListener('keydown', moverObjetos)
        }
        setTimeout(() => {
            if (colisao >= 5) {
                if (vida1 > vida2) {
                    alert("Jogador 1 GANHOU");
                } else {
                    alert("Jogador 2 GANHOU");
                }
                zerar();
            }
        }, 500)

    }

    // Atualiza a posição dos objetos na tela
    atualizarPosicao();
}

// Função para verificar se os objetos se chocaram
function verificarColisao() {
    const retangulo1 = objeto1.getBoundingClientRect();
    const retangulo2 = objeto2.getBoundingClientRect();
    return !(
        retangulo1.right < retangulo2.left ||
        retangulo1.left > retangulo2.right ||
        retangulo1.bottom < retangulo2.top ||
        retangulo1.top > retangulo2.bottom
    );
}

// Função para reposicionar os objetos em lugares aleatórios
function reposicionarObjetos() {
    do {
        posX1 = Math.floor(Math.random() * areaX);
        posY1 = Math.floor(Math.random() * areaY);
        posX2 = Math.floor(Math.random() * areaX);
        posY2 = Math.floor(Math.random() * areaY);
        atualizarPosicao()
    } while (verificarColisao())
}


// Inicializa a posição inicial dos objetos na tela
zerar();