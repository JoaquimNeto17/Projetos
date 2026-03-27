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
const HORAS_MENSAIS = 220;

function processarCalculo(e) {
    e.preventDefault();

    const salario = parseFloat(document.getElementById('salario').value) || 0;
    const h50 = parseFloat(document.getElementById('horaExtraDia').value) || 0;
    const h100 = parseFloat(document.getElementById('horaExtraFimSemana').value) || 0;

    if (salario <= 0) {
        alert("⚠️ Por favor, informe um salário válido!");
        return;
    }

    const valorHora = salario / HORAS_MENSAIS;

    const total50 = h50 * (valorHora * 1.5);
    const total100 = h100 * (valorHora * 2.0);
    const extras = total50 + total100;
    const totalGeral = salario + extras;

    const moeda = v => v.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    document.getElementById("resultado").innerText = moeda(totalGeral);
    document.getElementById("resultDetail").innerHTML =
        `💰 Extras: ${moeda(extras)} (Valor hora: ${moeda(valorHora)})`;

    // Correção: agora envia os dados certos
    adicionarAoHistorico(salario, extras, totalGeral);
}

function adicionarAoHistorico(original, extras, novo) {
    const lista = document.getElementById("historyList");

    const emptyMsg = lista.querySelector(".empty-msg");
    if (emptyMsg) emptyMsg.remove();

    const moeda = (v) => v.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });

    const horaAgora = new Date().toLocaleTimeString("pt-BR", {
        hour: '2-digit',
        minute: '2-digit'
    });

    const item = document.createElement("div");
    item.className = "history-item";

    item.innerHTML = `
        <div class="history-left">
            <span class="history-value">${moeda(novo)}</span>
        </div>
        <div class="history-right">
            <span class="history-info">
                Base: ${moeda(original)} • 
                <span style="color: var(--brand-green)">+${moeda(extras)}</span>
            </span>
            <span class="history-time">🕐 ${horaAgora}</span>
        </div>
    `;

    lista.prepend(item);
}