const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'admin') {
  alert('Acceso no autorizado.');
  window.location.href = '../index.html';
} else {
  document.getElementById('userDisplayName').innerText = currentUser.name;
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = '../index.html';
}

function cargarCitas() {
  const citas = JSON.parse(localStorage.getItem('citas')) || [];
  const tbody = document.querySelector('#tablaCitas tbody');
  const alertError = document.getElementById('alertError');
  const emptyState = document.getElementById('emptyState');
  tbody.innerHTML = '';

  if (citas.length === 0) {
    emptyState.style.display = 'block';
    alertError.style.display = 'none';
    return;
  } else {
    emptyState.style.display = 'none';
  }

  const conteoHorarios = {};
  citas.forEach(c => {
    const key = `${c.doctor}_${c.fechaHora}`;
    conteoHorarios[key] = (conteoHorarios[key] || 0) + 1;
  });

  let hayConflicto = false;

  citas.forEach(cita => {
    const tr = document.createElement('tr');
    const key = `${cita.doctor}_${cita.fechaHora}`;
    const esDuplicado = conteoHorarios[key] > 1;

    if (esDuplicado) {
      hayConflicto = true;
      tr.classList.add('conflict-row');
    }

    const fechaFormateada = cita.fechaHora.replace('T', ' ');

    tr.innerHTML = `
      <td><strong>${cita.paciente}</strong><br><small style="color:#666">DNI: ${cita.documento}</small></td>
      <td>${cita.email}</td>
      <td>${cita.especialidad}</td>
      <td><strong>${cita.doctor}</strong></td>
      <td><strong>${fechaFormateada}</strong></td>
      <td style="max-width: 160px;">${cita.motivo}</td>
      <td>
        ${esDuplicado 
          ? '<span class="badge badge-error">⚠️ Doble Reserva</span>' 
          : '<span style="color:#047857; font-weight:700;">✓ Correcto</span>'}
      </td>
    `;
    tbody.appendChild(tr);
  });

  alertError.style.display = hayConflicto ? 'block' : 'none';
}

function limpiarCitas() {
  if (confirm('¿Desea borrar las citas del sistema?')) {
    localStorage.removeItem('citas');
    cargarCitas();
  }
}

cargarCitas();
