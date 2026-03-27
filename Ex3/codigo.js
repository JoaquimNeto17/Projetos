document.addEventListener("DOMContentLoaded", function () {
    const btnCalcular = document.getElementById("btnCalcular");
    const historyList = document.getElementById("historyList");
    const clearBtn = document.getElementById("clearHistoryBtn");

    btnCalcular.addEventListener("click", function () {
        const funcionarios = Number(document.getElementById("funcionarios").value);
        const resultadoDiv = document.getElementById("resultado");
        const detailDiv = document.getElementById("resultDetail");

        if (isNaN(funcionarios) || funcionarios <= 0) {
            alert("⚠️ Informe uma quantidade válida de funcionários!");
            return;
        }

        let valorPorPessoa;
        if (funcionarios <= 49) valorPorPessoa = 4.50;
        else if (funcionarios <= 99) valorPorPessoa = 4.10;
        else if (funcionarios <= 149) valorPorPessoa = 3.80;
        else valorPorPessoa = 3.60;

        const valorTotal = funcionarios * valorPorPessoa;
        const formatar = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // Atualiza UI
        resultadoDiv.innerText = formatar(valorTotal);
        detailDiv.innerText = `${funcionarios} colaboradores × ${formatar(valorPorPessoa)}`;

        // Histórico
        if (historyList.querySelector('.empty-msg')) historyList.innerHTML = '';
        const item = document.createElement("div");
        item.className = "history-item";
        item.innerHTML = `<strong>${formatar(valorTotal)}</strong><br><span>${funcionarios} funcionários • ${new Date().toLocaleTimeString()}</span>`;
        historyList.prepend(item);
    });

    clearBtn.addEventListener("click", () => {
        historyList.innerHTML = '<p class="empty-msg">Nenhum cálculo recente.</p>';
    });
});

// Relógio brasileiro
setInterval(() => {
    const el = document.getElementById("dataHora");
    if (el) {
        const d = new Date();
        el.innerHTML = `📅 ${d.toLocaleDateString("pt-BR")} | 🕐 ${d.toLocaleTimeString("pt-BR")}`;
    }
}, 1000);