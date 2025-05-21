function ativarBuscaDinamica() {
    const inputBusca = document.querySelector('input[id*="txtPesquisa"]');
    const tabelas = [
        document.getElementById('tblProcessosGerados'),
        document.getElementById('tblProcessosRecebidos')
    ].filter(Boolean);

    if (!inputBusca || tabelas.length === 0) {
        console.log('SEI Tools: Campo de busca ou tabelas não encontrados nesta página.');
        return;
    }

    const linhasPorTabela = tabelas.map(tabela =>
        Array.from(tabela.querySelectorAll('tr')).slice(1)
    );

    inputBusca.addEventListener('input', () => {
        const termo = inputBusca.value.trim().toLowerCase();

        linhasPorTabela.forEach(linhas => {
            linhas.forEach(linha => {
                const link = linha.querySelector('a[href*="id_procedimento"]');

                if (!link) {
                    linha.style.display = '';
                    return;
                }

                const aria = (link.getAttribute('aria-label') || '').toLowerCase();
                const mouseover = (link.getAttribute('onmouseover') || '').toLowerCase();
                const textoLink = (link.innerText || '').toLowerCase();

                const conteudoBusca = `${aria} ${mouseover} ${textoLink}`;

                linha.style.display = conteudoBusca.includes(termo) ? '' : 'none';
            });
        });
    });

    console.log('SEI Tools: Busca dinâmica ativada.');
}


// Carregar configurações e ativar funcionalidades
chrome.storage.sync.get(['buscaAtiva'], (data) => {
    const buscaAtiva = data.buscaAtiva !== false; // padrão: true
    if (buscaAtiva) {
        ativarBuscaDinamica();
    } else {
        console.log('SEI Tools: Busca dinâmica desativada pelo usuário.');
    }

    // todo
    // if (data.marcarNaoLido) ativarMarcarNaoLido();
    // if (data.visualizacaoNautilus) ativarVisualizacaoNautilus();
});
