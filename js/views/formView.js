import {
  save,
  getAll,
  remove,
  update
} from "../services/accountService.js";

export function FormView(app, refresh) {

  const contas = getAll();

  app.innerHTML = `
    <div class="card">
      <h3>Nova Conta</h3>
      
      <select id="tipo">
        <option value="payable">Conta a Pagar</option>
        <option value="receivable">Conta a Receber</option>
      </select>

      <input id="descricao" placeholder="Descrição">
      <input id="fornecedor" placeholder="Fornecedor">
      <input id="categoria" placeholder="Categoria">
      <input id="valor" type="number" step="0.01" placeholder="Valor">
      <input id="venc" type="date">
      <button class="btn btn-primary" id="save">
        Salvar
      </button>
    </div>

    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Fornecedor</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Vencimento</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          ${contas.length
      ? contas.map(c => `
                <tr>
                  <td>${c.tipo === "receivable"
          ? "Conta a Receber"
          : "Conta a Pagar"
        }</td>

                  <td>${c.descricao}</td>
                  <td>${c.fornecedor}</td>
                  <td>${c.categoria}</td>
                  <td>R$ ${Number(c.valor).toFixed(2)}</td>
                  <td>${c.data_vencimento}</td>
                  <td>${c.status ?? "Pendente"}</td>

                  <td>
                    <button
                      class="btn-pay"
                      data-id="${c.id}"
                    >
                      ${c.tipo === "receivable"
          ? "Receber"
          : "Pagar"
        }
                    </button>

                    <button
                      class="btn-delete"
                      data-id="${c.id}"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              `).join("")
      : `<tr><td colspan="8">Nenhuma conta cadastrada.</td></tr>`
    }
        </tbody>
      </table>
    </div>
  `;

  document.getElementById("save").onclick = () => {

    save({
      tipo: document.getElementById("tipo").value,
      descricao: document.getElementById("descricao").value,
      fornecedor: document.getElementById("fornecedor").value,
      categoria: document.getElementById("categoria").value,
      valor: Number(document.getElementById("valor").value),
      data_vencimento: document.getElementById("venc").value,
      status: "Pendente"
    });

    refresh();
  };

  document.querySelectorAll(".btn-delete").forEach(btn => {
    btn.onclick = () => {
      remove(Number(btn.dataset.id));
      refresh();
    };
  });

  document.querySelectorAll(".btn-pay").forEach(btn => {
    btn.onclick = () => {

      const conta = contas.find(c => c.id === Number(btn.dataset.id));

      update(Number(btn.dataset.id), {
        ...conta,
        status: conta.tipo === "receivable" ? "Recebido" : "Pago",
        data_pagamento: new Date().toISOString().split("T")[0]
      });

      refresh();
    };
  });

}