window.addEventListener('load', () => {
    const inputBusca = document.querySelector('input[id*="txtPesquisa"]');
    const tabelas = [
        document.getElementById('tblProcessosGerados'),
        document.getElementById('tblProcessosRecebidos')
    ].filter(Boolean); // Remove null se alguma tabela não existir

    if (!inputBusca || tabelas.length === 0) {
        console.log('SEI Tools: Campo de busca ou tabelas não encontrados nesta página.');
        return;
    }

    const linhasPorTabela = tabelas.map(tabela =>
        Array.from(tabela.querySelectorAll('tr')).slice(1) // Remove cabeçalho
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

                if (conteudoBusca.includes(termo)) {
                    linha.style.display = '';
                } else {
                    linha.style.display = 'none';
                }
            });
        });
    });

    console.log('SEI Tools: Busca dinâmica aplicada nas tabelas tblProcessosGerados e tblProcessosRecebidos.');
});
