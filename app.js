// ============================================================
// INICIO - VARIABLES GLOBALES Y UTILIDADES GENERALES
// ============================================================

let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
let proveedores = JSON.parse(localStorage.getItem('proveedores')) || [];
let trabajos = JSON.parse(localStorage.getItem('trabajos')) || [];
let presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let agenda = JSON.parse(localStorage.getItem('agenda')) || [];

let idClienteCounter = localStorage.getItem('idClienteCounter') || 430000000;
let idProveedorCounter = localStorage.getItem('idProveedorCounter') || 440000000;
let idPresupuestoCounter = localStorage.getItem('idPresupuestoCounter') || 1;
let idOrdenTrabajoCounter = localStorage.getItem('idOrdenTrabajoCounter') || 1;
let idAlbaranCounter = localStorage.getItem('idAlbaranCounter') || 1;

function guardarDatos() {
  localStorage.setItem('clientes', JSON.stringify(clientes));
  localStorage.setItem('proveedores', JSON.stringify(proveedores));
  localStorage.setItem('trabajos', JSON.stringify(trabajos));
  localStorage.setItem('presupuestos', JSON.stringify(presupuestos));
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  localStorage.setItem('agenda', JSON.stringify(agenda));
  localStorage.setItem('idClienteCounter', idClienteCounter);
  localStorage.setItem('idProveedorCounter', idProveedorCounter);
  localStorage.setItem('idPresupuestoCounter', idPresupuestoCounter);
  localStorage.setItem('idOrdenTrabajoCounter', idOrdenTrabajoCounter);
  localStorage.setItem('idAlbaranCounter', idAlbaranCounter);
}

function generarId(tipo) {
  switch (tipo) {
    case 'cliente': return idClienteCounter++;
    case 'proveedor': return idProveedorCounter++;
    case 'presupuesto': return idPresupuestoCounter++;
    case 'orden': return idOrdenTrabajoCounter++;
    case 'albaran': return idAlbaranCounter++;
    default: return null;
  }
}

// ============================================================
// FIN - VARIABLES GLOBALES Y UTILIDADES GENERALES
// ============================================================

// ============================================================
// INICIO BLOQUE 1 - VARIABLES GLOBALES Y UTILIDADES DE LOCALSTORAGE
// ============================================================

let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
let proveedores = JSON.parse(localStorage.getItem('proveedores')) || [];
let trabajos = JSON.parse(localStorage.getItem('trabajos')) || [];
let presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let agendaEventos = JSON.parse(localStorage.getItem('agendaEventos')) || [];

let contadorClientes = parseInt(localStorage.getItem('contadorClientes')) || 430000000;
let contadorProveedores = parseInt(localStorage.getItem('contadorProveedores')) || 440000000;
let contadorPresupuestos = parseInt(localStorage.getItem('contadorPresupuestos')) || 1;
let contadorTrabajos = parseInt(localStorage.getItem('contadorTrabajos')) || 1;
let contadorAlbaranes = parseInt(localStorage.getItem('contadorAlbaranes')) || 1;

function guardarDatos(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos));
}

function guardarContador(clave, valor) {
    localStorage.setItem(clave, valor);
}

function generarID(tipo) {
    switch (tipo) {
        case 'cliente':
            return contadorClientes++;
        case 'proveedor':
            return contadorProveedores++;
        case 'presupuesto':
            return contadorPresupuestos++;
        case 'trabajo':
            return contadorTrabajos++;
        case 'albaran':
            return contadorAlbaranes++;
        default:
            return Date.now();
    }
}

// ============================================================
// FIN BLOQUE 1 - VARIABLES GLOBALES Y UTILIDADES DE LOCALSTORAGE
// ============================================================

// ============================================================
// INICIO BLOQUE 2 - GESTIÓN DE CLIENTES
// ============================================================

function agregarCliente(nombre, telefono, email) {
    const id = generarID('cliente');
    const nuevoCliente = {
        id,
        nombre,
        telefono,
        email
    };
    clientes.push(nuevoCliente);
    guardarDatos('clientes', clientes);
    guardarContador('contadorClientes', contadorClientes);
    listarClientes();
}

function listarClientes() {
    const selectClientes = document.getElementById('clienteTrabajo');
    const selectPresupuestos = document.getElementById('clientePresupuesto');

    if (!selectClientes || !selectPresupuestos) return;

    selectClientes.innerHTML = '<option disabled selected>Seleccionar cliente</option>';
    selectPresupuestos.innerHTML = '<option disabled selected>Seleccionar cliente</option>';

    clientes.forEach(cliente => {
        const option1 = document.createElement('option');
        option1.value = cliente.id;
        option1.textContent = `${cliente.nombre} - ID ${cliente.id}`;
        selectClientes.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = cliente.id;
        option2.textContent = `${cliente.nombre} - ID ${cliente.id}`;
        selectPresupuestos.appendChild(option2);
    });
}

document.getElementById('formCliente')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombreCliente').value.trim();
    const telefono = document.getElementById('telefonoCliente').value.trim();
    const email = document.getElementById('emailCliente').value.trim();

    if (nombre) {
        agregarCliente(nombre, telefono, email);
        this.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalCliente')).hide();
    }
});

// ============================================================
// FIN BLOQUE 2 - GESTIÓN DE CLIENTES
// ============================================================

// ============================================================
// INICIO BLOQUE 3 - GESTIÓN DE PROVEEDORES
// ============================================================

function agregarProveedor(nombre, contacto, telefono) {
    const id = generarID('proveedor');
    const nuevoProveedor = {
        id,
        nombre,
        contacto,
        telefono
    };
    proveedores.push(nuevoProveedor);
    guardarDatos('proveedores', proveedores);
    guardarContador('contadorProveedores', contadorProveedores);
    listarProveedores();
}

function listarProveedores() {
    const selectProveedores = document.getElementById('proveedorMaterial');
    if (!selectProveedores) return;

    selectProveedores.innerHTML = '<option disabled selected>Seleccionar proveedor</option>';
    proveedores.forEach(prov => {
        const option = document.createElement('option');
        option.value = prov.id;
        option.textContent = `${prov.nombre} - ID ${prov.id}`;
        selectProveedores.appendChild(option);
    });
}

document.getElementById('formProveedor')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombreProveedor').value.trim();
    const contacto = document.getElementById('contactoProveedor').value.trim();
    const telefono = document.getElementById('telefonoProveedor').value.trim();

    if (nombre) {
        agregarProveedor(nombre, contacto, telefono);
        this.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalProveedor')).hide();
    }
});

// ============================================================
// FIN BLOQUE 3 - GESTIÓN DE PROVEEDORES
// ============================================================

// ============================================================
// INICIO BLOQUE 4 - GESTIÓN DE PRESUPUESTOS
// ============================================================

function agregarPresupuesto(clienteID, descripcion, total) {
    const id = generarID('presupuesto');
    const nuevoPresupuesto = {
        id,
        clienteID,
        descripcion,
        total,
        fecha: new Date().toISOString().split('T')[0]
    };
    presupuestos.push(nuevoPresupuesto);
    guardarDatos('presupuestos', presupuestos);
    guardarContador('contadorPresupuestos', contadorPresupuestos);
    listarPresupuestos();
}

function listarPresupuestos() {
    const tablaPresupuestos = document.getElementById('tablaPresupuestos');
    if (!tablaPresupuestos) return;

    tablaPresupuestos.innerHTML = '';
    presupuestos.forEach(p => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${p.id}</td>
            <td>${p.clienteID}</td>
            <td>${p.descripcion}</td>
            <td>${p.total} €</td>
            <td>${p.fecha}</td>
        `;
        tablaPresupuestos.appendChild(fila);
    });
}

document.getElementById('formPresupuesto')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const clienteID = document.getElementById('clientePresupuesto').value;
    const descripcion = document.getElementById('descripcionPresupuesto').value.trim();
    const total = parseFloat(document.getElementById('totalPresupuesto').value);

    if (clienteID && descripcion && !isNaN(total)) {
        agregarPresupuesto(clienteID, descripcion, total);
        this.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalPresupuesto')).hide();
    }
});

// ============================================================
// FIN BLOQUE 4 - GESTIÓN DE PRESUPUESTOS
// ============================================================

// ============================================================
// INICIO BLOQUE 5 - GESTIÓN DE ÓRDENES DE TRABAJO
// ============================================================

function agregarTrabajo(clienteID, presupuestoID, descripcion, estado = 'pendiente') {
    const id = generarID('trabajo');
    const nuevoTrabajo = {
        id,
        clienteID,
        presupuestoID,
        descripcion,
        estado,
        materiales: [],
        horas: [],
        fechaCreacion: new Date().toISOString().split('T')[0]
    };
    trabajos.push(nuevoTrabajo);
    guardarDatos('trabajos', trabajos);
    guardarContador('contadorTrabajos', contadorTrabajos);
    listarTrabajos();
}

function listarTrabajos() {
    const tablaTrabajos = document.getElementById('tablaTrabajos');
    if (!tablaTrabajos) return;

    tablaTrabajos.innerHTML = '';
    trabajos.forEach(t => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${t.id}</td>
            <td>${t.clienteID}</td>
            <td>${t.presupuestoID || '—'}</td>
            <td>${t.descripcion}</td>
            <td>${t.estado}</td>
            <td>${t.fechaCreacion}</td>
        `;
        tablaTrabajos.appendChild(fila);
    });
}

document.getElementById('formTrabajo')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const clienteID = document.getElementById('clienteTrabajo').value;
    const presupuestoID = document.getElementById('presupuestoTrabajo').value;
    const descripcion = document.getElementById('descripcionTrabajo').value.trim();

    if (clienteID && descripcion) {
        agregarTrabajo(clienteID, presupuestoID || null, descripcion);
        this.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalTrabajo')).hide();
    }
});

// ============================================================
// FIN BLOQUE 5 - GESTIÓN DE ÓRDENES DE TRABAJO
// ============================================================

// ============================================================
// INICIO BLOQUE 6 - AGENDA / VACACIONES CON CALENDARIO
// ============================================================

function agregarEventoAgenda(titulo, fecha, descripcion) {
    const evento = {
        id: Date.now(),
        titulo,
        fecha,
        descripcion
    };
    agendaEventos.push(evento);
    guardarDatos('agendaEventos', agendaEventos);
    renderizarAgenda();
}

function renderizarAgenda() {
    const contenedor = document.getElementById('listaEventos');
    if (!contenedor) return;

    contenedor.innerHTML = '';
    agendaEventos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    agendaEventos.forEach(evento => {
        const div = document.createElement('div');
        div.className = 'evento-agenda mb-2 p-2 border rounded bg-light';
        div.innerHTML = `
            <strong>${evento.fecha}</strong> - <span>${evento.titulo}</span><br>
            <small>${evento.descripcion}</small>
        `;
        contenedor.appendChild(div);
    });
}

document.getElementById('formAgenda')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const titulo = document.getElementById('tituloEvento').value.trim();
    const fecha = document.getElementById('fechaEvento').value;
    const descripcion = document.getElementById('descripcionEvento').value.trim();

    if (titulo && fecha) {
        agregarEventoAgenda(titulo, fecha, descripcion);
        this.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalAgenda')).hide();
    }
});

// ============================================================
// FIN BLOQUE 6 - AGENDA / VACACIONES CON CALENDARIO
// ============================================================

// ============================================================
// INICIO BLOQUE 7 - DASHBOARD DINÁMICO Y MÉTRICAS
// ============================================================

function actualizarDashboard() {
    const totalClientes = clientes.length;
    const totalProveedores = proveedores.length;
    const totalPresupuestos = presupuestos.length;
    const totalTrabajos = trabajos.length;

    document.getElementById('totalClientes')!.textContent = totalClientes.toString();
    document.getElementById('totalProveedores')!.textContent = totalProveedores.toString();
    document.getElementById('totalPresupuestos')!.textContent = totalPresupuestos.toString();
    document.getElementById('totalTrabajos')!.textContent = totalTrabajos.toString();

    const ctx = document.getElementById('graficoGeneral')?.getContext('2d');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Clientes', 'Proveedores', 'Presupuestos', 'Trabajos'],
                datasets: [{
                    label: 'Totales',
                    data: [totalClientes, totalProveedores, totalPresupuestos, totalTrabajos],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true }
                }
            }
        });
    }
}

// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', () => {
    listarClientes();
    listarProveedores();
    listarPresupuestos();
    listarTrabajos();
    renderizarAgenda();
    actualizarDashboard();
});

// ============================================================
// FIN BLOQUE 7 - DASHBOARD DINÁMICO Y MÉTRICAS
// ============================================================

// ============================================================
// INICIO BLOQUE 8 - FUNCIONES AUXILIARES Y EVENTOS GLOBALES
// ============================================================

// Mostrar alertas flotantes
function mostrarAlerta(mensaje, tipo = 'success') {
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show position-fixed top-0 end-0 m-3 z-3`;
    alerta.role = 'alert';
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(alerta);
    setTimeout(() => alerta.remove(), 5000);
}

// Formatear fechas (ISO a formato local)
function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Evento global para eliminar valores de selects duplicados
function eliminarDuplicadosSelect(id) {
    const select = document.getElementById(id);
    if (!select) return;
    const valores = new Set();
    [...select.options].forEach(option => {
        if (valores.has(option.value)) {
            option.remove();
        } else {
            valores.add(option.value);
        }
    });
}

// ============================================================
// FIN BLOQUE 8 - FUNCIONES AUXILIARES Y EVENTOS GLOBALES
// ============================================================
