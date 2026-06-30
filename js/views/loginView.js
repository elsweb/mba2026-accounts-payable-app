
import { login, register } from "../auth/auth.js";

export function LoginView(app,onLogin){
  app.innerHTML=`
    <div class='card'>
      <h2>Login</h2>
      <input id='email' placeholder='email'/>
      <input id='password' type='password' placeholder='senha'/>
      <button class='btn btn-primary' id='btnLogin'>Entrar</button>
      <button class='btn' id='btnRegister'>Registrar</button>
    </div>
  `;

  document.getElementById('btnLogin').onclick=async()=>{
    try{
      const u=await login(email.value,password.value);
      onLogin(u);
    }catch(e){alert(e.message);}
  };

  document.getElementById('btnRegister').onclick=async()=>{
    try{
      await register(email.value,password.value);
      alert('Registrado!');
    }catch(e){alert(e.message);}
  };
}
