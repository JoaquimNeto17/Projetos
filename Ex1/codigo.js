// ATUALIZAÇÃO DO RELÓGIO
function atualizarRelogio() {
    const el = document.getElementById("dataHora");
    if (el) {
        const agora = new Date();
        const data = agora.toLocaleDateString("pt-BR");
        const hora = agora.toLocaleTimeString("pt-BR");
        el.innerHTML = `📅 ${data} | 🕐 ${hora}`;
    }
}
setInterval(atualizarRelogio, 1000);
atualizarRelogio();

// LÓGICA DE CÁLCULO DE HORAS EXTRAS
const HORAS_MENSAIS = 220; // Padrão CLT comum

function processarCalculo(e) {
    e.preventDefault();

    const salario = parseFloat(document.getElementById('salario').value);
    const h50 = parseFloat(document.getElementById('horaExtraDia').value) || 0;
    const h100 = parseFloat(document.getElementById('horaExtraFimSemana').value) || 0;

    if (isNaN(salario) || salario <= 0) {
        alert("⚠️ Por favor, informe um salário válido!");
        return;
    }

    // Valor da hora comum
    const valorHora = salario / HORAS_MENSAIS;
    
    // Cálculos com adicionais
    const total50 = h50 * (valorHora * 1.5);
    const total100 = h100 * (valorHora * 2.0);
    const totalGeral = salario + total50 + total100;

    const moeda = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Atualiza UI
    document.getElementById("resultado").innerText = moeda(totalGeral);
    document.getElementById("resultDetail").innerHTML = 
        `💰 Extras: ${moeda(total50 + total100)} (Valor hora: ${moeda(valorHora)})`;

    adicionarAoHistorico(totalGeral, h50 + h100);
}

function adicionarAoHistorico(total, qtdHoras) {
    const lista = document.getElementById("historyList");
    const empty = lista.querySelector(".empty-msg");
    if (empty) empty.remove();

    const moeda = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const horaLog = new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
    const item = document.createElement("div");
    item.className = "history-item";
    item.innerHTML = `
        <p>${moeda(total)}</p>
        <span>⏱️ ${qtdHoras} horas extras • ${horaLog}</span>
    `;
    lista.prepend(item);
}

function limparHistorico() {
    document.getElementById("historyList").innerHTML = '<p class="empty-msg">Nenhum cálculo realizado.</p>';
}