const checkbox = document.getElementById('toggleBusca');
const status = document.getElementById('statusBusca');

// Carrega a preferência salva
chrome.storage.sync.get(['buscaAtiva'], (data) => {
    const ativa = data.buscaAtiva !== false; // padrão é true
    checkbox.checked = ativa;
    statusBusca.textContent = ativa ? 'Ativada' : 'Desativada';
});

// Salva quando altera o checkbox
checkbox.addEventListener('change', () => {
    const ativa = checkbox.checked;
    chrome.storage.sync.set({ buscaAtiva: ativa });
    statusBusca.textContent = ativa ? 'Ativada' : 'Desativada';
});
