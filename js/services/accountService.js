
import { StorageService } from "../storage/storage.js";
import { createAccount } from "../models/account.js";

const storage = new StorageService();
const KEY = 'accounts';

export function getAll() {
  return storage.find(KEY) || [];
}

export function save(account) {
  const list = getAll();
  list.push(createAccount(account));
  storage.save(KEY, list);
}

export function update(id, data) {
  const list = getAll().map(a => {
    if (a.id === id) {
      return { ...a, ...data, updatedAt: new Date().toISOString() };
    }
    return a;
  });
  storage.save(KEY, list);
}

export function remove(id) {
  const list = getAll().filter(a => a.id !== id);
  storage.save(KEY, list);
}

export function stats() {
  const list = getAll();

  const pagar = list.filter(a => a.tipo === "payable");
  const receber = list.filter(a => a.tipo === "receivable");

  const soma = arr => arr.reduce((s, a) => s + Number(a.valor || 0), 0);

  return {
    pagar: {
      total: pagar.length,
      pago: pagar.filter(a => a.status === "Pago").length,
      pend: pagar.filter(a => a.status === "Pendente").length,
      venc: pagar.filter(a => a.status === "Vencido").length,
      valorTotal: soma(pagar),
      valorPago: soma(pagar.filter(a => a.status === "Pago")),
      valorPend: soma(pagar.filter(a => a.status === "Pendente"))
    },

    receber: {
      total: receber.length,
      pago: receber.filter(a => a.status === "Pago").length,
      pend: receber.filter(a => a.status === "Pendente").length,
      venc: receber.filter(a => a.status === "Vencido").length,
      valorTotal: soma(receber),
      valorPago: soma(receber.filter(a => a.status === "Pago")),
      valorPend: soma(receber.filter(a => a.status === "Pendente"))
    }
  };
}
