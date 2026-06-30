
export function createAccount(data){
  return {
    id:Date.now(),
    descricao:data.descricao,
    categoria:data.categoria,
    fornecedor:data.fornecedor,
    valor:Number(data.valor),
    data_vencimento:data.data_vencimento,
    data_pagamento:data.data_pagamento||null,
    status:data.status||'Pendente',
    observacoes:data.observacoes||'',
    createdAt:new Date().toISOString(),
    updatedAt:new Date().toISOString()
  };
}
