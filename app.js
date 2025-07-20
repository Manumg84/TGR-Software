
// ===========================================
// APP FINAL - JS UNIFICADO CORREGIDO
// Correcciones:
// - Se asegura que todo el código se ejecute tras DOMContentLoaded
// - Se evita la creación duplicada de tarjetas de ingresos
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
// ===========================================================
// APP FINAL - JS UNIFICADO
// Este archivo incluye todas las funcionalidades:
// - Gestión de clientes, trabajos, proveedores
// - Presupuestos
// - Dashboard dinámico con ingresos
// ===========================================================

// ============================
// BLOQUE PRINCIPAL DE LA APP
// ============================
// ============================================================
// INICIALIZACIÓN GENERAL - DOMContentLoaded
// ============================================================
document.addEventListener('DOMContentLoaded', function () {


// ------------------------------------------------------------
// VARIABLES GLOBALES Y LOCALSTORAGE
// ------------------------------------------------------------
let events = JSON.parse(localStorage.getItem('tallerAppEvents')) || [];

let recentActivities = JSON.parse(localStorage.getItem('tallerAppRecentActivities')) || [
    { id: '1001', client: 'Carlos García', service: 'Cambio de aceite', status: 'Completado', date: '2024-03-15', total: '85.00' },
    { id: '1002', client: 'Ana Martínez', service: 'Revisión de frenos', status: 'Pendiente', date: '2024-03-16', total: '120.00' },
    { id: '1003', client: 'Luis Fernández', service: 'Reparación motor', status: 'En progreso', date: '2024-03-17', total: '450.00' },
    { id: '1004', client: 'Marta Pérez', service: 'ITV', status: 'Completado', date: '2024-03-18', total: '60.00' }
];


// ------------------------------------------------------------
// FUNCIONES AUXILIARES (guardar actividades, eventos, etc.)
// ------------------------------------------------------------
function saveRecentActivities() {
    localStorage.setItem('tallerAppRecentActivities', JSON.stringify(recentActivities));
}

function saveEvents() {
    localStorage.setItem('tallerAppEvents', JSON.stringify(events));
}


// ------------------------------------------------------------
// FORMULARIOS - CLIENTES, PROVEEDORES, TRABAJOS
// ------------------------------------------------------------
document.getElementById('formCliente').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombreCliente').value;
    const telefono = document.getElementById('telefonoCliente').value;
    const email = document.getElementById('emailCliente').value;
    console.log('Cliente guardado:', { nombre, telefono, email });
    this.reset();
});

document.getElementById('formProveedor').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombreProveedor').value;
    const telefono = document.getElementById('telefonoProveedor').value;
    const email = document.getElementById('emailProveedor').value;
    console.log('Proveedor guardado:', { nombre, telefono, email });
    this.reset();
});

document.getElementById('formTrabajo').addEventListener('submit', function(e) {
    e.preventDefault();
    const descripcion = document.getElementById('descripcionTrabajo').value;
    const cliente = document.getElementById('clienteTrabajo').value;
    const fecha = document.getElementById('fechaTrabajo').value;
    console.log('Trabajo guardado:', { descripcion, cliente, fecha });
    this.reset();
});


// ------------------------------------------------------------
// FORMULARIO: AGENDA Y VACACIONES
// ------------------------------------------------------------
document.getElementById('formAgenda').addEventListener('submit', function(e) {
    e.preventDefault();
    const trabajador = document.getElementById('trabajadorAgenda').value;
    const tipo = document.getElementById('tipoEvento').value;
    const inicio = document.getElementById('fechaInicio').value;
    const fin = document.getElementById('fechaFin').value;
    const descripcion = document.getElementById('descripcionEvento').value;

    events.push({ trabajador, tipo, inicio, fin, descripcion });
    saveEvents();

    console.log('Evento guardado:', { trabajador, tipo, inicio, fin, descripcion });
    this.reset();
});


// ------------------------------------------------------------
// PREPARACIÓN DE CALENDARIO VACACIONES (placeholder)
// ------------------------------------------------------------
function renderCalendario() {
    const contenedor = document.getElementById('calendarioVacaciones');
    contenedor.innerHTML = '';

    events.forEach(evento => {
        const div = document.createElement('div');
        div.classList.add('p-2', 'mb-2', 'border', 'rounded', 'bg-white');
        div.innerHTML = `<strong>${evento.trabajador}</strong>: ${evento.tipo} del ${evento.inicio} al ${evento.fin}<br><small>${evento.descripcion}</small>`;
        contenedor.appendChild(div);
    });
}

renderCalendario();




// ------------------------------------------------------------
// FORMULARIO: GESTIÓN DE USUARIOS
// ------------------------------------------------------------
document.getElementById('formUsuario').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombreUsuario').value;
    const rol = document.getElementById('rolUsuario').value;
    const clave = document.getElementById('claveUsuario').value;

    let usuarios = JSON.parse(localStorage.getItem('tallerAppUsuarios')) || [];

    usuarios.push({ nombre, rol, clave });
    localStorage.setItem('tallerAppUsuarios', JSON.stringify(usuarios));

    console.log('Usuario guardado:', { nombre, rol });
    this.reset();
});

// ------------------------------------------------------------
// LISTADO DE USUARIOS EN MODAL
// ------------------------------------------------------------
function cargarUsuariosRegistrados() {
    const lista = document.getElementById('listaUsuarios');
    if (!lista) return;
    lista.innerHTML = '';

    const usuarios = JSON.parse(localStorage.getItem('tallerAppUsuarios')) || [];

    usuarios.forEach((usuario, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span><strong>${usuario.nombre}</strong> (${usuario.rol})</span>
            <button class="btn btn-sm btn-outline-danger" onclick="eliminarUsuario(${index})">
                <i class="bi bi-trash"></i>
            </button>
        `;
        lista.appendChild(li);
    });
}

function eliminarUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem('tallerAppUsuarios')) || [];
    usuarios.splice(index, 1);
    localStorage.setItem('tallerAppUsuarios', JSON.stringify(usuarios));
    cargarUsuariosRegistrados();
}

document.getElementById('modalUsuarios').addEventListener('show.bs.modal', cargarUsuariosRegistrados);

// ------------------------------------------------------------
// CARGA AUTOMÁTICA DE TRABAJADORES EN SELECT DE AGENDA
// ------------------------------------------------------------
function cargarTrabajadoresAgenda() {
    const selectTrabajador = document.getElementById('trabajadorAgenda');
    if (!selectTrabajador) return;
    selectTrabajador.innerHTML = '<option selected disabled>Seleccionar</option>';

    const usuarios = JSON.parse(localStorage.getItem('tallerAppUsuarios')) || [];

    usuarios
        .filter(usuario => usuario.rol === 'empleado')
        .forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario.nombre;
            option.textContent = usuario.nombre;
            selectTrabajador.appendChild(option);
        });
}

const modalAgenda = document.getElementById('modalAgenda');
modalAgenda.addEventListener('show.bs.modal', cargarTrabajadoresAgenda);

// ------------------------------------------------------------
// FIN DE DOMContentLoaded
// ------------------------------------------------------------
});


// ===================================================================
// GESTIÓN DE PRESUPUESTOS: Guardar, listar y eliminar
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    const formPresupuesto = document.getElementById('formPresupuesto');
    if (formPresupuesto) {
        formPresupuesto.addEventListener('submit', function (e) {
            e.preventDefault();
            const cliente = document.getElementById('clientePresupuesto').value;
            const fecha = document.getElementById('fechaPresupuesto').value;
            const detalle = document.getElementById('detallePresupuesto').value;
            const total = parseFloat(document.getElementById('totalPresupuesto').value);

            const nuevoPresupuesto = { cliente, fecha, detalle, total };
            const presupuestos = JSON.parse(localStorage.getItem('tallerAppPresupuestos')) || [];
            presupuestos.push(nuevoPresupuesto);
            localStorage.setItem('tallerAppPresupuestos', JSON.stringify(presupuestos));

            console.log("Presupuesto guardado:", nuevoPresupuesto);
            this.reset();
            mostrarPresupuestos();
        });
    }

    mostrarPresupuestos(); // Cargar al iniciar
});

// ------------------------------------------------------------
// Función para mostrar los presupuestos en la tabla
// ------------------------------------------------------------
function mostrarPresupuestos() {
    const tabla = document.getElementById('tablaPresupuestosBody');
    if (!tabla) return;

    const presupuestos = JSON.parse(localStorage.getItem('tallerAppPresupuestos')) || [];
    tabla.innerHTML = '';

    presupuestos.forEach((p, i) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${p.cliente}</td>
            <td>${p.fecha}</td>
            <td>${p.detalle}</td>
            <td>${p.total.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarPresupuesto(${i})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

// ------------------------------------------------------------
// Eliminar presupuesto por índice
// ------------------------------------------------------------
function eliminarPresupuesto(index) {
    const presupuestos = JSON.parse(localStorage.getItem('tallerAppPresupuestos')) || [];
    presupuestos.splice(index, 1);
    localStorage.setItem('tallerAppPresupuestos', JSON.stringify(presupuestos));
    mostrarPresupuestos();
}

// ============================
// BLOQUE: DASHBOARD BÁSICO
// ============================
// ===================================================================
// DASHBOARD DINÁMICO: actualiza tarjetas con datos reales
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    actualizarDashboard();
});

// Función que lee datos reales del localStorage y los muestra
function actualizarDashboard() {
    // Total de clientes
    const clientes = JSON.parse(localStorage.getItem('tallerAppClientes')) || [];
    const totalClientes = clientes.length;

    // Total de órdenes activas
    const trabajos = JSON.parse(localStorage.getItem('tallerAppTrabajos')) || [];
    const ordenesActivas = trabajos.filter(t => !t.completado).length;

    // Total presupuestos
    const presupuestos = JSON.parse(localStorage.getItem('tallerAppPresupuestos')) || [];
    const totalPresupuestos = presupuestos.length;

    // Actualizar tarjetas si existen
    const tarjetas = document.querySelectorAll('#top-navbar .card');
    if (tarjetas.length >= 2) {
        tarjetas[0].querySelector('.card-text').textContent = totalClientes;
        tarjetas[1].querySelector('.card-text').textContent = ordenesActivas;
    }

    // Añadir una tercera tarjeta si se desea más adelante:
    // mostrarPresupuestosTotales(totalPresupuestos);
}

// ============================
// BLOQUE: DASHBOARD CON INGRESOS
// ============================
// ===================================================================
// DASHBOARD DINÁMICO CON INGRESOS: actualiza tarjetas con datos reales
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    actualizarDashboard();
});

function actualizarDashboard() {
    // Clientes
    const clientes = JSON.parse(localStorage.getItem('tallerAppClientes')) || [];
    const totalClientes = clientes.length;

    // Órdenes activas
    const trabajos = JSON.parse(localStorage.getItem('tallerAppTrabajos')) || [];
    const ordenesActivas = trabajos.filter(t => !t.completado).length;

    // Presupuestos
    const presupuestos = JSON.parse(localStorage.getItem('tallerAppPresupuestos')) || [];
    const totalPresupuestos = presupuestos.length;
    const sumaTotal = presupuestos.reduce((acc, p) => acc + (parseFloat(p.total) || 0), 0);

    // Actualizar tarjetas
    const tarjetas = document.querySelectorAll('#top-navbar .card');

    if (tarjetas.length >= 2) {
        tarjetas[0].querySelector('.card-text').textContent = totalClientes;
        tarjetas[1].querySelector('.card-text').textContent = ordenesActivas;
    }

    // Crear tercera tarjeta si no existe
    if (tarjetas.length < 3) {
        const nueva = document.createElement('div');
        nueva.className = "card shadow-sm border-start border-warning border-4";
        nueva.style.width = "15rem";
        nueva.innerHTML = `
            <div class="card-body">
                <h6 class="card-title text-warning">Ingresos estimados</h6>
                <p class="card-text fs-4 fw-bold">${sumaTotal.toFixed(2)} €</p>
            </div>`;
        document.querySelector('#top-navbar .d-flex').appendChild(nueva);
    } else {
        tarjetas[2].querySelector('.card-text').textContent = sumaTotal.toFixed(2) + ' €';
    }
}

});
