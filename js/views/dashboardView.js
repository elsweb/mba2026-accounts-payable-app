import { stats, getAll } from "../services/accountService.js";
import { post } from "../services/api.js";

export function DashboardView(app) {

  const s = stats();

  app.innerHTML = `
    <div style="display:flex;justify-content:flex-end;margin-bottom:20px;">
      <button class="btn btn-primary" id="send-api">
        Enviar dados para API
      </button>
    </div>

    <div class="grid">
      <!-- CONTAS A PAGAR -->
      <div class="bloco">
        <h3 class="toggle" data-target="pagar">
          ▶ Contas a Pagar
        </h3>

        <div id="pagar" class="conteudo" style="display:none;">
          <div class="card">Total: ${s.pagar.total}</div>
          <div class="card">Pago: ${s.pagar.pago}</div>
          <div class="card">Pendente: ${s.pagar.pend}</div>
          <div class="card">Vencido: ${s.pagar.venc}</div>
          <div class="card">Valor Total: R$ ${s.pagar.valorTotal.toFixed(2)}</div>
          <div class="card">Valor Pago: R$ ${s.pagar.valorPago.toFixed(2)}</div>
          <div class="card">Valor Pendente: R$ ${s.pagar.valorPend.toFixed(2)}</div>
        </div>
      </div>

      <!-- CONTAS A RECEBER -->
      <div class="bloco">
        <h3 class="toggle" data-target="receber">
          ▶ Contas a Receber
        </h3>

        <div id="receber" class="conteudo" style="display:none;">
          <div class="card">Total: ${s.receber.total}</div>
          <div class="card">Pago: ${s.receber.pago}</div>
          <div class="card">Pendente: ${s.receber.pend}</div>
          <div class="card">Vencido: ${s.receber.venc}</div>
          <div class="card">Valor Total: R$ ${s.receber.valorTotal.toFixed(2)}</div>
          <div class="card">Valor Recebido: R$ ${s.receber.valorPago.toFixed(2)}</div>
          <div class="card">Valor Pendente: R$ ${s.receber.valorPend.toFixed(2)}</div>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll(".toggle").forEach(item => {

    item.addEventListener("click", () => {

      const alvo = document.getElementById(item.dataset.target);

      const aberto = alvo.style.display === "block";

      alvo.style.display = aberto ? "none" : "block";

      item.textContent = (aberto ? "▶ " : "▼ ") +
        item.textContent.replace("▶ ", "").replace("▼ ", "");

    });

  });

  document.getElementById("send-api").onclick = async () => {

    try {

      window.open("https://webdec.requestcatcher.com/", "_blank");

      setTimeout(async () => {
        const contas = getAll();

        await post(contas);

        alert("Dados enviados com sucesso!");
      }, 1000);

    } catch (error) {

      console.error(error);

      alert("Erro ao enviar os dados para a API.");

    }

  };

}