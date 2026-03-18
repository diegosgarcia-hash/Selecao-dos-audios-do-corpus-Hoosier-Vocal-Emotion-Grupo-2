PennController.ResetPrefix(null);
PennController.DebugOff();

Sequence("Terms","Instructions", randomize("Experiment"), SendResults(), "Final");

Header(
    defaultText
        .css("font-size","1.2em")
        .center()
        .print()
    ,
    defaultTextInput
        .css("font-size","1.2em")
        .center()
        .print()
    ,
    defaultButton
        .css("font-size","1.2em")
        .print()
        .center()
        .wait()
    )
    
    newTrial("Terms",
        newImage("LogoUAST","images.png")
        .center()
        .print()
        ,
        newText(
        "<p style='text-align: center;'><strong>TERMO DE CONSENTIMENTO PARA PARTICIPAÇÃO EM PESQUISA</strong></p>"
            )
        ,
        newText(
        `<p style="text-align: justify;">
            Você foi selecionado(a) para participar da pesquisa <strong>"ANÁLISE DOS PADRÕES ACÚSTICOS DA RAIVA E TRISTEZA NO CORPUS HOOSIER VOCAL EMOTION COLLECTION"</strong>, sob a responsabilidade do pesquisador Diego Silva Garcia e orientador Ebson Wilkerson.<br><br>
            Este formulário é parte de um projeto que objetiva avaliar os padrões acústicos presentes nas emoções raiva e tristeza do corpus Hoosier Vocal Emotion Collection. Sua participação é voluntária e será realizada por meio deste formulário eletrônico, no qual você ouvirá cada áudio do corpus e indicará se os aprova ou não para a análise acústica.<br><br>
            O seu papel durante o teste será ouvir atentamente cada gravação e selecionar os áudios que considerar mais agradáveis, naturais ou familiares, de acordo com sua percepção auditiva. Não há respostas certas ou erradas, buscamos compreender quais amostras vocais são percebidas como mais adequadas para representar as emoções analisadas.<br><br>
            Como sabido, as emoções desempenham um papel fundamental na comunicação, influenciando não apenas a forma como as mensagens são transmitidas, mas também como são interpretadas pelos interlocutores. Elas contribuem para a construção de sentidos, modulam a entonação, o ritmo e a intensidade da fala, e auxiliam na identificação de estados afetivos e intenções comunicativas. No contexto da comunicação vocal, características acústicas como frequência fundamental, intensidade e variações prosódicas são elementos essenciais para a expressão e o reconhecimento das emoções, tornando sua análise relevante para estudos nas áreas de Linguística, Fonoaudiologia, Psicologia e Tecnologia da Fala.<br><br>
            Ao continuar e enviar suas respostas, você concorda que os dados coletados sejam utilizados na pesquisa e na elaboração do TCC. Para quaisquer dúvidas, você pode entrar em contato com o pesquisador responsável:
        </p>`
            )
        ,
        newText("<p style='text-align:center;'><strong>E-mail: diego.sgarcia@ufrpe.br</strong></p>")
        ,
        newText("<p></p>")
        ,
        newTextInput("Nome")
        ,
        newText("<p></p>")
        ,
        newButton("CONCORDO E CONTINUE")
        ,
        newVar("NOME")
            .global()
            .set( getTextInput("Nome") )
        ,
    )

.log( "NOME" , getVar("NOME") )

    newTrial("Instructions",
         
        newText('<p style="text-align: justify;">Para uma melhor compreensão de como o teste irá funcionar, assista ao vídeo abaixo com atenção. Após compreender completamente o conteúdo, clique no botão “INICIAR O TESTE” para iniciar o teste.</p>')
        ,  
        newText("<p></p>")
        ,
        newHtml("yt", `
            <iframe width="560" height="315"
            src="https://www.youtube.com/embed/DrhoFDXpSi4"
            frameborder="0" allowfullscreen>
           </iframe>
          `)
        .center()
        .print()
        ,
        newText("<p></p>")
        ,
        newButton("INICIAR O TESTE")
        .log()
)

Template("lista_de_pseudopalavras.csv",
    row => newTrial ("Experiment",
        newAudio("AudioExperiment", row.audio)
            ,
            
        newText("nome", `<p style="font-size: 1.8em;"><strong>${row.sentenca}</strong></p>`)
            .center()
            .print()
        ,
        
        newText("transcricao", `<p style="font-size: 1.3em; color: #444;">${row.transcricao}</p>`)
            .center()
            .print()
        ,
        
        getAudio("AudioExperiment")
            .play()
        ,
        
        newText("<p></p>")
        ,
                     
        newText("S", row.Aprovar)
        ,
        newText("N", row.Remover)
        ,
        newText("Replay", "<u>OUVIR NOVAMENTE</u>")
        .css("color", "blue")
        ,
        
        newCanvas( "opcoes", 800, 200)
            .add( "center at 20%" , "middle at 50%", getText("S") )
            .add( "center at 50%" , "middle at 75%", getText("Replay") )
            .add( "center at 80%" , "middle at 50%", getText("N") )
            .center()
            .print()
        ,
        
        newVar("RESPOSTA")
            .global()
        ,
        
        newSelector("REPLAY")
            .add( getText("Replay") )
            .callback( getAudio("AudioExperiment").play() )
        ,
        
        newSelector("ESCOLHA")
            .add( getText("S"), getText("N"))
            .keys("S","N")
            .log()
            .wait()
            .test.selected(getText("S"))
                    .success( getVar("RESPOSTA").set(row.Aprovar) )
                    .failure( getVar("RESPOSTA").set(row.Remover) )
    )

    .log("NOME", getVar("NOME"))
    .log("AUDIO", row.audio)
    .log("SENTENCA", row.sentenca)
    .log("TRANSCRICAO", row.transcricao)
    .log("RESPOSTA",    getVar("RESPOSTA"))
    .log("GRUPO", row.grupo)
    .log("ITEM", row.intem)

)
    
newTrial( "Final" ,
    newText("<p style='text-align: justify'><strong>Agradecemos sinceramente a sua participação e o tempo dedicado à realização do teste. Sua colaboração é muito importante para nós. Para encerrar o teste clique no botão “FINALIZAR”.</strong></p>")
    .center()
    .print()
    ,
    newButton("FINALIZAR")
    .wait()
 )

.setOption("countsForProgressBar",false);
