import { stats, getAll } from "../services/accountService.js";
import { post } from "../services/api.js";

export function DashboardView(app){

  const s = stats();

  app.innerHTML = `
    <div style="display:flex;justify-content:flex-end;margin-bottom:20px;">
      <button class="btn btn-primary" id="send-api">
        Enviar dados para API
      </button>
    </div>

    <div class="grid">
      <div class="card">Total: ${s.total}</div>
      <div class="card">Pago: ${s.pago}</div>
      <div class="card">Pendente: ${s.pend}</div>
      <div class="card">Vencido: ${s.venc}</div>
      <div class="card">Valor Total: ${s.valorTotal}</div>
      <div class="card">Valor Pago: ${s.valorPago}</div>
      <div class="card">Valor Pendente: ${s.valorPend}</div>
    </div>
  `;

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