// ATUALIZAÇÃO DO RELÓGIO EM TEMPO REAL
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

// LÓGICA DE CÁLCULO
function calcular(event) {
    event.preventDefault();
    
    let salarioInput = document.getElementById("salario");
    let salario = parseFloat(salarioInput.value);

    if (isNaN(salario) || salario <= 0) {
        alert("⚠️ Por favor, informe um salário válido!");
        return;
    }

    let percentual = obterPercentual(salario);
    let valorAumento = salario * percentual;
    let novoSalario = salario + valorAumento;

    const moeda = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Exibe no Card
    document.getElementById("resultado").innerText = moeda(novoSalario);
    document.getElementById("detalheAumento").innerHTML = `📈 Ganho de ${moeda(valorAumento)} <span style="color: #10b981;">(+${(percentual * 100).toFixed(0)}%)</span>`;

    adicionarAoHistorico(salario, percentual, novoSalario);
}

function obterPercentual(s) {
    if (s <= 1200) return 0.16;
    if (s <= 2000) return 0.12;
    if (s <= 3000) return 0.10;
    return 0.05;
}

function adicionarAoHistorico(original, perc, novo) {
    const lista = document.getElementById("historyList");
    
    // Remove a mensagem de "vazio" se ela existir
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
    item.className = "history-item"; // Classe principal para o Flexbox

    // Nova estrutura HTML compatível com o CSS atualizado
    item.innerHTML = `
        <div class="history-left">
            <span class="history-value">${moeda(novo)}</span>
        </div>
        <div class="history-right">
            <span class="history-info">
                Base: ${moeda(original)} • 
                <span style="color: var(--brand-green)">+${(perc * 100).toFixed(0)}%</span>
            </span>
            <span class="history-time">🕐 ${horaAgora}</span>
        </div>
    `;

    // Adiciona o novo item no topo da lista
    lista.prepend(item);
}