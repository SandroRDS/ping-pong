var tela = document.querySelector("canvas");
var desenhar = tela.getContext("2d");
var larguraRaquete = 10, alturaRaquete = 75;
var X_raquete1, Y_raquete1, X_raquete2, Y_raquete2;
var taxaDeMovimentoRaquete = 25, taxaDeMovimentoBola = 2;
var bateu, numeroBatidas, aumentoDeVelocidade = 0.2;
var horizontal = {};
var vertical = {};
var raioBola = 10, X_bola, Y_bola;
var renderizacaoBola;
var pontosRaquete1, pontosRaquete2, limitePontos;
var jogador1, jogador2;

//Linha do meio do campo
desenhar.fillStyle = "white";
desenhar.fillRect(0, 249, 1280, 3);

function iniciarJogo()
{
    document.getElementById("play").disabled = true;
    
    jogador1 = prompt("Apelido do Jogador 1:");
    jogador2 = prompt("Apelido do Jogador 2:");
    limitePontos = prompt("Quantidade máxima de pontos para vitória:");

    pontosRaquete1 = 0;
    pontosRaquete2 = 0;
    document.getElementById("jogador1").innerHTML = jogador1;
    document.getElementById("jogador2").innerHTML = jogador2;
    document.getElementById("pontos_raquete1").innerHTML = pontosRaquete1;
    document.getElementById("pontos_raquete2").innerHTML = pontosRaquete2;

    X_raquete1 = 50;
    Y_raquete1 = 200;
    X_raquete2 = 1230;
    Y_raquete2 = 200;
    
    X_bola = 640;
    Y_bola = 250;
    horizontal["esquerda"] = Math.floor(Math.random() * 2) == 0 ? false : true;
    horizontal["direita"] = !horizontal["esquerda"];
    vertical["cima"] = Math.floor(Math.random() * 2) == 0 ? false : true;
    vertical["baixo"] = !vertical["cima"]; 

    bateu = false;
    numeroBatidas = 0;
    taxaDeMovimentoBola = 2;

    desenharRaquete1();
    desenharRaquete2();

    renderizacaoBola = setInterval(movimentarBola, 10);
}


function finalizarJogo(vencedor)
{
    if(vencedor == 1)
    {
        var jogadorVencedor = jogador1;
    }
    else
    {
        var jogadorVencedor = jogador2;
    }
    alert(`Parabéns, ${jogadorVencedor}!! Você venceu!\n\nPlacar: ${pontosRaquete1}x${pontosRaquete2}`);

    document.getElementById("play").disabled = false;
}


function movimentarBola()
{
    renderizarTela();

    if(horizontal["esquerda"])
    {
        X_bola -= taxaDeMovimentoBola;
        
        //Testando se a bola invadiu o campo da raquete 1
        if(X_bola - raioBola <= 0)
        {
            contabilizarPonto(2);
        }
        
        //Testando colisão da raquete 1 na extremidade de cima da bola
        if((Y_bola - raioBola <= Y_raquete1 + alturaRaquete) && (Y_bola - raioBola >= Y_raquete1))
        {
            if((X_bola >= X_raquete1) && (X_bola <= X_raquete1 + larguraRaquete))
            {
                horizontal["esquerda"] = false;
                horizontal["direita"] = true;
                bateu = true;
            }
        }

        //Testando colisão da raquete 1 na extremidade de baixo da bola
        if((Y_bola + raioBola >= Y_raquete1) && (Y_bola + raioBola <= Y_raquete1 + alturaRaquete))
        {
            if((X_bola >= X_raquete1) && (X_bola <= X_raquete1 + larguraRaquete))
            {
                horizontal["esquerda"] = false;
                horizontal["direita"] = true;
                bateu = true;
            }
        }
    }
    else
    {
        X_bola += taxaDeMovimentoBola;
        
        //Testando se a bola invadiu o campo da raquete 2
        if(X_bola + raioBola >= 1280)
        {
            contabilizarPonto(1);
        }

        //Testando colisão da raquete 2 na extremidade de cima da bola
        if((Y_bola - raioBola <= Y_raquete2 + alturaRaquete) && (Y_bola - raioBola >= Y_raquete2))
        {
            if((X_bola >= X_raquete2) && (X_bola <= X_raquete2 + larguraRaquete))
            {
                horizontal["esquerda"] = true;
                horizontal["direita"] = false;
                bateu = true;
            }
        }

        //Testando colisão da raquete 2 na extremidade de baixo da bola
        if((Y_bola + raioBola >= Y_raquete2) && (Y_bola + raioBola <= Y_raquete2 + alturaRaquete))
        {
            if((X_bola >= X_raquete2) && (X_bola <= X_raquete2 + larguraRaquete))
            {
                horizontal["esquerda"] = true;
                horizontal["direita"] = false;
                bateu = true;
            }
        }

    }

    if(vertical["cima"])
    {
        Y_bola -= taxaDeMovimentoBola;
        if(Y_bola - raioBola <= 0)
        {
            vertical["cima"] = false;
            vertical["baixo"] = true;
        }
    }
    else
    {
        Y_bola += taxaDeMovimentoBola;
        if(Y_bola + raioBola >= 500)
        {
            vertical["cima"] = true;
            vertical["baixo"] = false;
        }
    }

    if(bateu)
    {
        numeroBatidas++;
        bateu = false;
    }

    if(numeroBatidas >= 5)
    {
        numeroBatidas = 0;
        taxaDeMovimentoBola += aumentoDeVelocidade;
        console.log(taxaDeMovimentoBola);
    }
}


function contabilizarPonto(time)
{
    clearInterval(renderizacaoBola);
    
    if(time == 1)
    {
        pontosRaquete1++;
    }
    else
    {
        pontosRaquete2++;
    }

    document.getElementById("pontos_raquete1").innerHTML = pontosRaquete1;
    document.getElementById("pontos_raquete2").innerHTML = pontosRaquete2;

    if((pontosRaquete1 >= limitePontos) || (pontosRaquete2 >= limitePontos))
    {
        finalizarJogo(time);
    }
    else
    {
        setTimeout(function(){
            X_bola = 640;
            Y_bola = 250;
            horizontal["esquerda"] = !horizontal["esquerda"];
            horizontal["direita"] = !horizontal["direita"];
            taxaDeMovimentoBola = 2;
            numeroBatidas = 0;
            renderizacaoBola = setInterval(movimentarBola, 10);
        }, 1000);
    }
}

function desenharBola()
{
    desenhar.beginPath();
    desenhar.fillStyle = "black";
    desenhar.arc(X_bola, Y_bola, raioBola, 0, 2*Math.PI);
    desenhar.fill();

    desenhar.beginPath();
    desenhar.fillStyle = "#dbdbdb";
    desenhar.arc(X_bola, Y_bola, raioBola-1, 0, 2*Math.PI);
    desenhar.fill();
}

function desenharRaquete1()
{
    desenhar.fillStyle = "#de6e28";
    desenhar.fillRect(X_raquete1, Y_raquete1, larguraRaquete, alturaRaquete);
}

function desenharRaquete2()
{
    desenhar.fillStyle = "#4989ad";
    desenhar.fillRect(X_raquete2, Y_raquete2, larguraRaquete, alturaRaquete);
}

function captarMovimento(evento)
{
    var codigo = evento.keyCode;

    switch(codigo)
    {
        //Cima -> Raquete 1
        case 38:
            if(Y_raquete1 > 0)
            {
                Y_raquete1 -= taxaDeMovimentoRaquete;
            }
            break;
        
        //Baixo -> Raquete 1
        case 40:
            if(Y_raquete1 + alturaRaquete < 500)
            {
                Y_raquete1 += taxaDeMovimentoRaquete;
            }
            break;
        
        //Baixo -> Raquete 2
        case 83:
            if(Y_raquete2 + alturaRaquete < 500)
            {
                Y_raquete2 += taxaDeMovimentoRaquete;
            }
            break;
        
        //Cima -> Raquete 2
        case 87:
            if(Y_raquete2 > 0)
            {
                Y_raquete2 -= taxaDeMovimentoRaquete;
            }
            break;
    }

    renderizarTela();

    return false;
}


function renderizarTela()
{
    limparTela();
    desenharRaquete1();
    desenharRaquete2();
    desenharBola();
} 


function limparTela()
{
    desenhar.fillStyle = "rgb(136, 255, 89)";
    desenhar.fillRect(0, 0, 1280, 500);
    desenhar.fillStyle = "white";
    desenhar.fillRect(0, 249, 1280, 3);
}

document.onkeydown = captarMovimento;