document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  if (user === 'admin' && pass === '123') {
    localStorage.setItem('currentUser', JSON.stringify({ name: 'Administrador Sistema', role: 'admin' }));
    // Redirección directa al panel de administración para admin
    window.location.href = 'vistas/ver_citas.html';
  } else if (user === 'usuario' && pass === '123') {
    localStorage.setItem('currentUser', JSON.stringify({ name: 'Asegurado Paciente', role: 'usuario' }));
    // Redirección a la vista de agendamiento para usuario regular
    window.location.href = 'vistas/citas.html';
  } else {
    errorMsg.style.display = 'block';
  }
});
