
import { StorageService } from "../storage/storage.js";
import { createAccount } from "../models/account.js";

const storage=new StorageService();
const KEY='accounts';

export function getAll(){
  return storage.find(KEY)||[];
}

export function save(account){
  const list=getAll();
  list.push(createAccount(account));
  storage.save(KEY,list);
}

export function update(id,data){
  const list=getAll().map(a=>{
    if(a.id===id){
      return {...a,...data,updatedAt:new Date().toISOString()};
    }
    return a;
  });
  storage.save(KEY,list);
}

export function remove(id){
  const list=getAll().filter(a=>a.id!==id);
  storage.save(KEY,list);
}

export function stats(){
  const list=getAll();
  const total=list.length;
  const pago=list.filter(a=>a.status==='Pago').length;
  const pend=list.filter(a=>a.status==='Pendente').length;
  const venc=list.filter(a=>a.status==='Vencido').length;
  const valorTotal=list.reduce((s,a)=>s+a.valor,0);
  const valorPago=list.filter(a=>a.status==='Pago').reduce((s,a)=>s+a.valor,0);
  const valorPend=list.filter(a=>a.status==='Pendente').reduce((s,a)=>s+a.valor,0);
  return {total,pago,pend,venc,valorTotal,valorPago,valorPend};
}
