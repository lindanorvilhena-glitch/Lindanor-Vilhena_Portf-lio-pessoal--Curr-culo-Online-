/**
 * VALIDACÃO DO FORMULÁRIO DE CONTATO
 * 
 * @param {Event} event - Evento de submit do formulário
 * @returns {boolean} - Retorna false para impedir envio real (simulação)
 */
function validarFormulario(event) {
    // Impede o comportamento padrão de envio do formulário
    event.preventDefault();

    // Obtem os valores dos campos e remove espaços em branco
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Variável para controlar se há erros
    let temErro = false;

    // ---------- VALIDAÇÃO DO NOME ----------
    if (nome === '') {
        mostrarErro('nome', 'erroNome', 'Por favor, preencha seu nome.');
        temErro = true;
    } else if (nome.length < 3) {
        mostrarErro('nome', 'erroNome', 'O nome deve ter pelo menos 3 caracteres.');
        temErro = true;
    } else {
        limparErro('nome', 'erroNome');
    }

    // ---------- VALIDAÇÃO DO E-MAIL ----------
    // Expressão regular para validar formato de e-mail
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
        mostrarErro('email', 'erroEmail', 'Por favor, preencha seu e-mail.');
        temErro = true;
    } else if (!regexEmail.test(email)) {
        mostrarErro('email', 'erroEmail', 'Por favor, digite um e-mail valido (ex: usuario@dominio.com).');
        temErro = true;
    } else {
        limparErro('email', 'erroEmail');
    }

    // ---------- VALIDAÇÃO DA MENSAGEM ----------
    if (mensagem === '') {
        mostrarErro('mensagem', 'erroMensagem', 'Por favor, escreva uma mensagem.');
        temErro = true;
    } else if (mensagem.length < 10) {
        mostrarErro('mensagem', 'erroMensagem', 'A mensagem deve ter pelo menos 10 caracteres.');
        temErro = true;
    } else {
        limparErro('mensagem', 'erroMensagem');
    }

    // ---------- SE NÃO HOUVER ERROS, SIMULA O ENVIO ----------
    if (!temErro) {
        // Limpa todos os campos do formulário
        document.getElementById('formContato').reset();

        // Exibe mensagem de sucesso
        mostrarModalSucesso();
    }

    // Retorna false para nao enviar o formulário de verdade
    return false;
}

/**
 * MOSTRAR ERRO EM UM CAMPO
 * 
 * @param {string} inputId - ID do input com erro
 * @param {string} erroId - ID do span de erro
 * @param {string} mensagem - Mensagem de erro a exibir
 */
function mostrarErro(inputId, erroId, mensagem) {
    const input = document.getElementById(inputId);
    const erro = document.getElementById(erroId);

    // Adiciona classe que muda a borda para vermelho
    input.classList.add('input-erro');

    // Mostra a mensagem de erro
    erro.textContent = mensagem;
    erro.classList.add('ativo');
}

/**
 * LIMPAR ERRO DE UM CAMPO
 * Remove a classe de erro e esconde a mensagem.
 * 
 * @param {string} inputId - ID do input
 * @param {string} erroId - ID do span de erro
 */
function limparErro(inputId, erroId) {
    const input = document.getElementById(inputId);
    const erro = document.getElementById(erroId);

    // Remove a classe de erro
    input.classList.remove('input-erro');

    // Esconde a mensagem de erro
    erro.classList.remove('ativo');
    erro.textContent = '';
}

/**
 * MOSTRAR MODAL DE SUCESSO
 * Cria e exibe uma caixa modal informando que a mensagem foi enviada.
 */
function mostrarModalSucesso() {
    // Verifica se o modal ja existe na página
    let modal = document.getElementById('modalSucesso');

    // Se não existir, cria o modal dinamicamente
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalSucesso';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-conteudo">
                <h2>&#10004; Sucesso!</h2>
                <p>Mensagem enviada com sucesso!</p>
                <p>Em breve entrarei em contato com voce.</p>
                <button onclick="fecharModal()">OK</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Mostra o modal adicionando a classe 'ativo'
    modal.classList.add('ativo');
}

/**
 * FECHAR MODAL DE SUCESSO
 * Esconde a caixa modal.
 */
function fecharModal() {
    const modal = document.getElementById('modalSucesso');
    if (modal) {
        modal.classList.remove('ativo');
    }
}

/**
 * FECHAR MODAL AO CLICAR FORA
 * Se o usuario clicar fora da caixa do modal, ele fecha.
 */
document.addEventListener('click', function(event) {
    const modal = document.getElementById('modalSucesso');
    if (modal && modal.classList.contains('ativo')) {
        // Verifica se o clique foi fora do conteudo do modal
        if (event.target === modal) {
            fecharModal();
        }
    }
});

/**
 * MENU RESPONSIVO
 * Abre ou fecha o menu em telas pequenas.
 */
function toggleMenu() {
    const menuLinks = document.getElementById('menuLinks');
    menuLinks.classList.toggle('ativo');
}

/**
 * FECHAR MENU AO CLICAR EM UM LINK
 * Em mobile, fecha o menu automaticamente ao clicar em um link.
 */
function fecharMenu() {
    const menuLinks = document.getElementById('menuLinks');
    // So fecha se estiver no modo mobile (tela pequena)
    if (window.innerWidth <= 768) {
        menuLinks.classList.remove('ativo');
    }
}

/**
 * Alterna entre os temas claro e escuro do site.
 */
function alternarTema() {
    const body = document.body;
    const botao = document.querySelector('.tema-btn');

    // Adiciona ou remove a classe 'tema-escuro'
    body.classList.toggle('tema-escuro');

    // Verifica qual tema esta ativo
    const temaEscuroAtivo = body.classList.contains('tema-escuro');

    // Muda o ícone do botão
    if (temaEscuroAtivo) {
        botao.innerHTML = '&#9790;'; // Lua (tema escuro)
        botao.setAttribute('aria-label', 'Mudar para tema claro');
    } else {
        botao.innerHTML = '&#9788;'; // Sol (tema claro)
        botao.setAttribute('aria-label', 'Mudar para tema escuro');
    }

    // Salva a preferência no localStorage
    localStorage.setItem('temaEscuro', temaEscuroAtivo);
}

/**
 * CARREGAR TEMA SALVO
 * Ao carregar a página, verifica se o usuário tinha
 */
function carregarTemaSalvo() {
    const temaEscuroSalvo = localStorage.getItem('temaEscuro');

    // Se o usuario tinha salvo o tema escuro
    if (temaEscuroSalvo === 'true') {
        document.body.classList.add('tema-escuro');
        document.querySelector('.tema-btn').innerHTML = '&#9790;';
    }
}

// Executa a função quando a página termina de carregar
window.addEventListener('DOMContentLoaded', carregarTemaSalvo);

/*
 * FECHAR MENU AO REDIMENSIONAR A TELA
 */
window.addEventListener('resize', function() {
    const menuLinks = document.getElementById('menuLinks');
    if (window.innerWidth > 768) {
        menuLinks.classList.remove('ativo');
    }
});