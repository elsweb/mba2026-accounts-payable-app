
import { getSession, logout } from "./auth/auth.js";
import { LoginView } from "./views/loginView.js";
import { DashboardView } from "./views/dashboardView.js";
import { FormView } from "./views/formView.js";

const app = document.getElementById('app');

function render() {
  const user = getSession();
  if (!user) {
    LoginView(app, (u) => render());
    return;
  }

  app.innerHTML = `
    <button id='logout' class='btn'>Logout</button>
    <div id='dashboard'></div>
    <div id='form'></div>
  `;

  document.getElementById('logout').onclick = () => {
    logout();
    render();
  };

  DashboardView(document.getElementById('dashboard'));
  FormView(document.getElementById('form'), render);
}

render();
