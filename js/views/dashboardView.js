
import { stats } from "../services/accountService.js";

export function DashboardView(app){
  const s=stats();
  app.innerHTML=`
    <div class='grid'>
      <div class='card'>Total: ${s.total}</div>
      <div class='card'>Pago: ${s.pago}</div>
      <div class='card'>Pendente: ${s.pend}</div>
      <div class='card'>Vencido: ${s.venc}</div>
      <div class='card'>Valor Total: ${s.valorTotal}</div>
      <div class='card'>Pago: ${s.valorPago}</div>
      <div class='card'>Pendente: ${s.valorPend}</div>
    </div>
  `;
}
