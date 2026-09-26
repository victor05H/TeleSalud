document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  if (user === 'admin' && pass === 'admin123') {
    localStorage.setItem('currentUser', JSON.stringify({ name: 'Administrador Sistema', role: 'admin' }));

    window.location.href = 'vistas/ver_citas.html';
  } else if (user === '12345678' && pass === 'usuario123') {
    localStorage.setItem('currentUser', JSON.stringify({ name: 'Asegurado Paciente', role: 'usuario' }));

    window.location.href = 'vistas/citas.html';
  } else {
    errorMsg.style.display = 'block';
  }
});
