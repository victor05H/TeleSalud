const medicosPorEspecialidad = {
  "Cardiología": ["Dr. Carlos Mendoza", "Dr. X"],
  "Pediatría": ["Dra. Ana Torres", "Dra. Laura Ramos"],
  "Medicina General": ["Dr. Roberto Gómez", "Dra. Sofía Martínez"],
  "Medicina Interna": ["Dra. Maria Aguilar", "Dra. Marta Mendez"]
};

function actualizarMedicos() {
  const especialidadSelect = document.getElementById('especialidad');
  const doctorSelect = document.getElementById('doctor');
  const especialidad = especialidadSelect.value;

  doctorSelect.innerHTML = '';

  if (especialidad && medicosPorEspecialidad[especialidad]) {
    doctorSelect.disabled = false;
    
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = '-- Seleccionar Médico --';
    doctorSelect.appendChild(defaultOpt);

    medicosPorEspecialidad[especialidad].forEach(medico => {
      const opt = document.createElement('option');
      opt.value = `${medico} (${especialidad})`;
      opt.textContent = medico;
      doctorSelect.appendChild(opt);
    });
  } else {
    doctorSelect.disabled = true;
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = '-- Elija Especialidad primero --';
    doctorSelect.appendChild(defaultOpt);
  }
}

document.getElementById('citaForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const cita = {
    id: Date.now(),
    paciente: document.getElementById('paciente').value,
    documento: document.getElementById('documento').value,
    email: document.getElementById('email').value,
    especialidad: document.getElementById('especialidad').value,
    doctor: document.getElementById('doctor').value,
    fechaHora: document.getElementById('fechaHora').value,
    motivo: document.getElementById('motivo').value,
    fechaRegistro: new Date().toLocaleString()
  };

  let citas = JSON.parse(localStorage.getItem('citas')) || [];
  citas.push(cita);
  localStorage.setItem('citas', JSON.stringify(citas));

  const mensajeDiv = document.getElementById('mensaje');
  mensajeDiv.className = 'msg msg-success';
  mensajeDiv.innerText = '✓ Cita registrada exitosamente en el sistema.';

  document.getElementById('citaForm').reset();
  actualizarMedicos();

  setTimeout(() => {
    mensajeDiv.style.display = 'none';
  }, 3000);
});
