
import { StorageService } from "../storage/storage.js";
import { hash } from "../utils/crypto.js";

const storage=new StorageService();

export async function register(email,password){
  const users=storage.find('users')||[];
  if(users.find(u=>u.email===email)) throw new Error('Usuário já existe');

  const user={id:Date.now(),email,password:await hash(password)};
  users.push(user);
  storage.save('users',users);
  return user;
}

export async function login(email,password){
  const users=storage.find('users')||[];
  const user=users.find(u=>u.email===email);
  if(!user) throw new Error('Usuário não encontrado');

  const hashed=await hash(password);
  if(user.password!==hashed) throw new Error('Senha inválida');

  storage.save('loggedUser',user);
  return user;
}

export function logout(){
  storage.delete('loggedUser');
}

export function getSession(){
  return storage.find('loggedUser');
}
