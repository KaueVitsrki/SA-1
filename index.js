let nomeCadastro = document.getElementById('nomeCadastro');
let emailCadastro = document.getElementById('emailCadastro');
let senhaCadastro = document.getElementById('senhaCadastro');
let nomeLogin = document.getElementById('nomeLogin');
let emailLogin = document.getElementById('emailLogin');
let senhaLogin = document.getElementById('senhaLogin');
let alterarNome = document.getElementById('nomeUsuarioCrud');
let novaSenha = document.getElementById('novaSenha');
let senhaDelet = document.getElementById('senhaDeletar');
let senhaDeletConf = document.getElementById('senhaDeletConf');
let usuariosCadastro = [];
let usuarioLogado = {};

function Cadastrar(){
    let flagEmail = 0;  
    usuariosCadastro = JSON.parse(localStorage.getItem('usuarios'));

    if(nomeCadastro.value == '' ||  emailCadastro.value == '' || senhaCadastro.value == ''){
        return alert('Erro!!! Todos os campos devem ser preenchidos!!');
    };
    
    if(usuariosCadastro == null){
        usuariosCadastro = [];
        UsuarioCadastro()

        window.location.href = "telaLogin.html";  
    }else{
        for (let i in usuariosCadastro) {
            if(usuariosCadastro[i].email == emailCadastro.value){
                flagEmail++;
            };
        };

        if(flagEmail >= 1){
            alert('Usuario já cadastrado!');
        }else{
            UsuarioCadastro();
            window.location.href = "telaLogin.html";
            flagEmail = 0; 
        };
    };
};

function Logar(){
    let log = false;
    let usuarioExiste = false;

    usuariosCadastro = JSON.parse(localStorage.getItem('usuarios'));
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if(nomeLogin.value == '' || emailLogin.value == '' || senhaLogin.value == ''){
        return alert('Erro!!! Todos os campos devem ser preenchidos!!');
    };

    for (let i in usuariosCadastro) {
        if(usuariosCadastro[i].email == emailLogin.value){
            usuarioExiste = true;
        };

        if(usuariosCadastro[i].nome == nomeLogin.value && usuariosCadastro[i].senha == senhaLogin.value && usuariosCadastro[i].email == emailLogin.value){
            log = true;
        };
    };

    if(usuarioExiste != true){
        return alert('Usuário não cadastrado!');
    };

    if(log == true){
        usuarioLogado = {
            nome: nomeLogin.value,
            email: emailLogin.value
        };
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        window.location.href = "telaCRUD.html";
    }else {
        alert('Erro!!! Nome ou senha incorretos.');
    };
};

function AlterarNome(){
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    usuariosCadastro = JSON.parse(localStorage.getItem('usuarios'));

    if(alterarNome.value != ''){
        for (let i in usuariosCadastro) {
            if(usuariosCadastro[i].email == usuarioLogado.email){
                
                usuariosCadastro[i].nome = alterarNome.value;
                usuarioLogado.nome = alterarNome.value;

                localStorage.setItem('usuarios', JSON.stringify(usuariosCadastro));
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            };  
        };
    }else {
        alert('Erro!! Campo vazio.');
    };
    location.reload();
};

function AlterarSenha(){
    let senhaAtual = document.getElementById('senhaAtual');
    let senhaAtualCon = document.getElementById('senhaAtualCon');
    usuariosCadastro = JSON.parse(localStorage.getItem('usuarios'));
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if(novaSenha.value == '' || senhaAtual.value == '' || senhaAtualCon.value == ''){
        return alert('Erro! Preencha todos os campos para efetuar a troca')
    }

        for (let i in usuariosCadastro) {
            if(usuariosCadastro[i].email == usuarioLogado.email){          
                if(senhaAtual.value == usuariosCadastro[i].senha && senhaAtualCon.value == usuariosCadastro[i].senha){
                    usuariosCadastro[i].senha = novaSenha.value;
                    localStorage.setItem('usuarios', JSON.stringify(usuariosCadastro));
                }else{
                    alert('Senha incorreta.');
                };
            };
        };
    location.reload();
};

function DeletarConta(){
    usuariosCadastro = JSON.parse(localStorage.getItem('usuarios'));
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    for (let i in usuariosCadastro) {    
        if(usuariosCadastro[i].email == usuarioLogado.email){
            if(senhaDelet.value == usuariosCadastro[i].senha && senhaDeletConf.value == usuariosCadastro[i].senha){
                    
                usuariosCadastro.splice(i, 1);
                usuarioLogado = '';

                localStorage.setItem('usuarios', JSON.stringify(usuariosCadastro));
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

                alert('Conta deletada');
                window.location.href = "telaCadastro.html";  
            }else if(senhaDelet.value != usuariosCadastro[i].senha || senhaDeletConf.value != usuariosCadastro[i].senha){
                alert('Senha incorreta.');
            };
        };
    }; 
};

function DesconectarConta(){
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    usuarioLogado = '';

    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    window.location.href = "telaLogin.html";
};

function MostrarDados(){
    usuariosCadastro = JSON.parse(localStorage.getItem('usuarios'));
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    for (let i in usuariosCadastro) {
        if(usuariosCadastro[i].email == usuarioLogado.email){
          document.getElementById('mostrarChave').innerHTML = 'chave: ' + usuariosCadastro[i].chave;  
        };
    }; 

    document.getElementById('mostrarEmail').innerHTML = 'email: ' + JSON.parse(localStorage.getItem('usuarioLogado')).email;
    document.getElementById('nomeLogado').innerHTML = 'nome: ' + JSON.parse(localStorage.getItem('usuarioLogado')).nome;
};

function UsuarioCadastro(){
    usuario = {
        nome: nomeCadastro.value,
        email: emailCadastro.value,
        senha: senhaCadastro.value,
        chave: '',
    };

    usuariosCadastro.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosCadastro));
};

function MostrarNome(){
    document.getElementById('nomeLogado').innerHTML = JSON.parse(localStorage.getItem('usuarioLogado')).nome;
};

function CadastrarTag(){
    let tag = document.getElementById('tag');
    usuariosCadastro = JSON.parse(localStorage.getItem('usuarios'));
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if(tag.value != ''){
        for (let i in usuariosCadastro) {
            if(usuariosCadastro[i].email == usuarioLogado.email){
                usuariosCadastro[i].chave = tag.value;

                localStorage.setItem('usuarios', JSON.stringify(usuariosCadastro));
            };
        };
    }else {
        alert('Erro!! Tag inválida.');
    };
    location.reload();
};

function DeletarChave(){
    usuariosCadastro = JSON.parse(localStorage.getItem('usuarios'));
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    for (let i in usuariosCadastro) {
        if(usuariosCadastro[i].email == usuarioLogado.email){
            usuariosCadastro[i].chave = '';

            localStorage.setItem('usuarios', JSON.stringify(usuariosCadastro));
        };
    };
    location.reload();
};

function Simular(){
    tag.value = 'F9 13 09 99'; 
};