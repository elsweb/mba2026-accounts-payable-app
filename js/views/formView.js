import { save } from "../services/accountService.js";

export function FormView(app, refresh) {
  app.innerHTML = `
    <div class="card">
      <h3>Nova Conta</h3>

      <input id="descricao" placeholder="Descrição">
      <input id="fornecedor" placeholder="Fornecedor">
      <input id="categoria" placeholder="Categoria">
      <input id="valor" type="number" step="0.01" placeholder="Valor">
      <input id="venc" type="date">

      <button class="btn btn-primary" id="save">
        Salvar
      </button>
    </div>
  `;

  const btnSave = document.getElementById("save");

  btnSave.addEventListener("click", () => {

    save({
      descricao: document.getElementById("descricao").value,
      fornecedor: document.getElementById("fornecedor").value,
      categoria: document.getElementById("categoria").value,
      valor: Number(document.getElementById("valor").value),
      data_vencimento: document.getElementById("venc").value
    });

    refresh();
  });
}