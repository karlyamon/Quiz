// Variaveis de controle do Quiz
let perguntasFeitas = [];


// Perguntas do Quiz
const perguntas = [
    //Pergunta 0
    {
     pergunta:"Qual dessas linguagens não é considerada uma linguagem de programação?",
     respostas: ["PHP","Javascript","C++","HTML"],
     correta: "resp3"
    },
    //Pergunta 1
    {
     pergunta:"Em que ano o Brasil foi descoberto?",
     respostas: ["1498","1500","1375","1828"],
     correta: "resp1"
    },
 
     //Pergunta 2
    {
     pergunta:"O que significa a sigla HTML?",
     respostas: ["Hyper Tonto Maluco Legal","Hyper Text Markup Language","Hey Trade More Language","Hyper Text Mark Lang"],
     correta: "resp1"
    },
     //Pergunta 3
    {
     pergunta:"Quais dessas linguagens é considerada uma linguagem de marcação?",
     respostas: ["HTML","Python","C++","PHP"],
     correta: "resp0"
    },
];

var qtdPerguntas = perguntas.length -1;

gerarPergunta(qtdPerguntas);

function gerarPergunta(maxPerguntas){
    //Gerar um número aleatório
    let aleatorio = (Math.random() * maxPerguntas).toFixed();
    //Converter para número
    aleatorio = Number(aleatorio);
    //Mostrar no console qual foi a pergunta sorteada
    console.log('A pergunta sorteada foi a: ' +aleatorio);

    //Verificar se a pergunta sorteada já foi feita
    if (!perguntasFeitas.includes(aleatorio)){
        //Colocar como pergunta feita
        perguntasFeitas.push(aleatorio);

        //Preencher o HTML com os dados da pergunta sorteada
        var p_selecionada = perguntas[aleatorio].pergunta;
        console.log(p_selecionada);

        //Alimentar a pergunta vinda do sorteio
        $('#pergunta').html(p_selecionada);
        //Adicionar indice a pergunta
        $('#pergunta').attr('data-indice',aleatorio);

        //Colocar as respostas
        for(var i = 0; i < 4; i++){
            $('#resp'+ i).html(perguntas[aleatorio].respostas[i]);
        }

        //Embaralhar as respostas
        var pai = $('#respostas');
        var botoes = pai.children();
        
        for(var i = 1; i < botoes.length; i++){
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
        };
      

    
    }else{
        //Se a pergunta já foi feita
        console.log('A Pergunta já foi feita. Sorteando novamente...');
        if (perguntasFeitas.length < qtdPerguntas +1){
            return gerarPergunta(maxPerguntas);
        }else{
            console.log('Acabaram as perguntas!');
            $('#quiz').addClass('oculto');
            $('#mensagem').html('Parabéns você venceu!!!');
            $('#status').removeClass('oculto');

        }
    }
}

$('.resposta').click(function(){
    if($('#quiz').attr('data-status')!== 'travado'){

   
    //Percorrer todas as respostas e desmarcar a classe selecionada
    resetaBotoes();

    //Adicionar a classe selecionada
    $(this).addClass('selecionada');

    }
});


$('#confirm').click(function(){
    //Pegar o indice da pergunta
    var indice = $('#pergunta').attr('data-indice');

    //Qual é a resposta certa
    var respCerta = perguntas[indice].correta;

    //Qual foi a resposta que o usuario selecionou
    $('.resposta').each(function(){
        if($(this).hasClass('selecionada')){
            var respostaEscolhida = $(this).attr('id');

            if(respCerta == respostaEscolhida){
                console.log('Aceeertou mizeraveeeee!');
                proximaPergunta();
            }else{
                console.log('Errrrrrrrrrrroooooooou!');
                $('#quiz').attr('data-status', 'travado');
                $('#confirm').addClass('oculto');
                $('#'+respCerta).addClass('correta');
                $('#'+respostaEscolhida).removeClass('selecionada');
                $('#'+respostaEscolhida).addClass('errada');

                //4 Segundos para dar game over
                setTimeout(function(){
                    gameOver();
                },4000);
            }
        }
    })
});


function newGame(){
    $('#confirm').removeClass('oculto');
    $('#quiz').attr('data-status', 'ok');
    perguntasFeitas = [];
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
    $('#quiz').removeClass('oculto');
    $('#status').addClass('oculto');
}


function proximaPergunta(){

  resetaBotoes();
  gerarPergunta(qtdPerguntas);




}

function resetaBotoes(){
        //Percorrer todas as respostas e desmarcar a classe selecionada
        $('.resposta').each(function(){
            if($(this).hasClass('selecionada')){
                $(this).removeClass('selecionada')
            }
            if($(this).hasClass('correta')){
                $(this).removeClass('correta')
            }
            if($(this).hasClass('errada')){
                $(this).removeClass('errada')
            }
          });
}


function gameOver(){
    $('#quiz').addClass('oculto');
    $('#mensagem').html('Game Over!');
    $('#status').removeClass('oculto');
}


$('#novoJogo').click(function(){
    newGame();
});






