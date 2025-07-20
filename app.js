
// Inicialización de datos realistas para pruebas
function inicializarDatosSimulados() {
    if (!localStorage.getItem('tallerAppClientes')) {
        localStorage.setItem('tallerAppClientes', JSON.stringify([{"nombre": "Luc\u00eda A", "telefono": "600649351", "email": "cliente0@correo.com"}, {"nombre": "Luc\u00eda B", "telefono": "600794334", "email": "cliente1@correo.com"}, {"nombre": "Ra\u00fal C", "telefono": "600163992", "email": "cliente2@correo.com"}, {"nombre": "Ra\u00fal D", "telefono": "600885142", "email": "cliente3@correo.com"}, {"nombre": "Laura E", "telefono": "600604006", "email": "cliente4@correo.com"}, {"nombre": "Miguel F", "telefono": "600260725", "email": "cliente5@correo.com"}, {"nombre": "Pablo G", "telefono": "600284034", "email": "cliente6@correo.com"}, {"nombre": "Jorge H", "telefono": "600471730", "email": "cliente7@correo.com"}, {"nombre": "Carlos I", "telefono": "600519843", "email": "cliente8@correo.com"}, {"nombre": "Jorge J", "telefono": "600676954", "email": "cliente9@correo.com"}, {"nombre": "Sara K", "telefono": "600998412", "email": "cliente10@correo.com"}, {"nombre": "Sara L", "telefono": "600874883", "email": "cliente11@correo.com"}, {"nombre": "Miguel M", "telefono": "600787644", "email": "cliente12@correo.com"}, {"nombre": "Carlos N", "telefono": "600511836", "email": "cliente13@correo.com"}, {"nombre": "Pablo O", "telefono": "600880016", "email": "cliente14@correo.com"}, {"nombre": "Eva P", "telefono": "600865420", "email": "cliente15@correo.com"}, {"nombre": "Jorge Q", "telefono": "600801666", "email": "cliente16@correo.com"}, {"nombre": "Eva R", "telefono": "600410056", "email": "cliente17@correo.com"}, {"nombre": "Pablo S", "telefono": "600997539", "email": "cliente18@correo.com"}, {"nombre": "Eva T", "telefono": "600516358", "email": "cliente19@correo.com"}, {"nombre": "Carlos U", "telefono": "600545692", "email": "cliente20@correo.com"}, {"nombre": "Marta V", "telefono": "600926100", "email": "cliente21@correo.com"}, {"nombre": "Miguel W", "telefono": "600571720", "email": "cliente22@correo.com"}, {"nombre": "Ra\u00fal X", "telefono": "600867426", "email": "cliente23@correo.com"}, {"nombre": "Luc\u00eda Y", "telefono": "600629285", "email": "cliente24@correo.com"}, {"nombre": "Miguel Z", "telefono": "600636336", "email": "cliente25@correo.com"}, {"nombre": "Luc\u00eda [", "telefono": "600484084", "email": "cliente26@correo.com"}, {"nombre": "Carlos \\", "telefono": "600161107", "email": "cliente27@correo.com"}, {"nombre": "Jorge ]", "telefono": "600477975", "email": "cliente28@correo.com"}, {"nombre": "Ra\u00fal ^", "telefono": "600570442", "email": "cliente29@correo.com"}, {"nombre": "Jorge _", "telefono": "600744886", "email": "cliente30@correo.com"}, {"nombre": "Marta `", "telefono": "600222037", "email": "cliente31@correo.com"}, {"nombre": "Miguel a", "telefono": "600709335", "email": "cliente32@correo.com"}, {"nombre": "Carlos b", "telefono": "600683460", "email": "cliente33@correo.com"}, {"nombre": "Sara c", "telefono": "600287103", "email": "cliente34@correo.com"}, {"nombre": "Laura d", "telefono": "600282622", "email": "cliente35@correo.com"}, {"nombre": "Laura e", "telefono": "600754078", "email": "cliente36@correo.com"}, {"nombre": "Miguel f", "telefono": "600382960", "email": "cliente37@correo.com"}, {"nombre": "Pablo g", "telefono": "600198143", "email": "cliente38@correo.com"}, {"nombre": "Luc\u00eda h", "telefono": "600359213", "email": "cliente39@correo.com"}]));
    }
    if (!localStorage.getItem('tallerAppTrabajos')) {
        localStorage.setItem('tallerAppTrabajos', JSON.stringify([{"descripcion": "Cambio de aceite", "cliente": "Jorge ]", "fecha": "2025-07-02", "completado": true}, {"descripcion": "Sustituci\u00f3n de embrague", "cliente": "Pablo g", "fecha": "2025-07-30", "completado": false}, {"descripcion": "Cambio de neum\u00e1ticos", "cliente": "Sara K", "fecha": "2025-07-07", "completado": true}, {"descripcion": "Cambio de neum\u00e1ticos", "cliente": "Luc\u00eda [", "fecha": "2025-08-15", "completado": false}, {"descripcion": "Cambio de aceite", "cliente": "Miguel a", "fecha": "2025-08-01", "completado": false}, {"descripcion": "Revisi\u00f3n de frenos", "cliente": "Jorge _", "fecha": "2025-08-07", "completado": true}, {"descripcion": "Sustituci\u00f3n de embrague", "cliente": "Jorge ]", "fecha": "2025-06-22", "completado": false}, {"descripcion": "Cambio de aceite", "cliente": "Jorge J", "fecha": "2025-07-28", "completado": false}, {"descripcion": "Sustituci\u00f3n de embrague", "cliente": "Marta V", "fecha": "2025-08-04", "completado": true}, {"descripcion": "Cambio de aceite", "cliente": "Laura E", "fecha": "2025-07-04", "completado": true}, {"descripcion": "Cambio de neum\u00e1ticos", "cliente": "Miguel Z", "fecha": "2025-08-08", "completado": false}, {"descripcion": "Revisi\u00f3n de frenos", "cliente": "Marta V", "fecha": "2025-06-21", "completado": false}, {"descripcion": "ITV", "cliente": "Miguel Z", "fecha": "2025-07-07", "completado": true}, {"descripcion": "Cambio de neum\u00e1ticos", "cliente": "Sara c", "fecha": "2025-07-27", "completado": false}, {"descripcion": "ITV", "cliente": "Pablo G", "fecha": "2025-07-12", "completado": true}, {"descripcion": "ITV", "cliente": "Miguel W", "fecha": "2025-07-03", "completado": false}, {"descripcion": "Cambio de neum\u00e1ticos", "cliente": "Marta `", "fecha": "2025-06-22", "completado": false}, {"descripcion": "Sustituci\u00f3n de embrague", "cliente": "Carlos \\", "fecha": "2025-07-12", "completado": true}, {"descripcion": "Sustituci\u00f3n de embrague", "cliente": "Luc\u00eda Y", "fecha": "2025-08-01", "completado": false}, {"descripcion": "ITV", "cliente": "Jorge ]", "fecha": "2025-08-02", "completado": true}, {"descripcion": "Cambio de neum\u00e1ticos", "cliente": "Luc\u00eda [", "fecha": "2025-07-11", "completado": true}, {"descripcion": "Sustituci\u00f3n de embrague", "cliente": "Ra\u00fal X", "fecha": "2025-08-07", "completado": false}, {"descripcion": "ITV", "cliente": "Eva T", "fecha": "2025-07-25", "completado": true}, {"descripcion": "ITV", "cliente": "Marta V", "fecha": "2025-08-09", "completado": false}, {"descripcion": "Revisi\u00f3n de frenos", "cliente": "Marta V", "fecha": "2025-08-13", "completado": false}, {"descripcion": "Revisi\u00f3n de frenos", "cliente": "Sara c", "fecha": "2025-07-05", "completado": true}, {"descripcion": "ITV", "cliente": "Jorge Q", "fecha": "2025-07-07", "completado": false}, {"descripcion": "ITV", "cliente": "Pablo S", "fecha": "2025-07-12", "completado": true}, {"descripcion": "Sustituci\u00f3n de embrague", "cliente": "Miguel M", "fecha": "2025-08-08", "completado": true}, {"descripcion": "Sustituci\u00f3n de embrague", "cliente": "Sara c", "fecha": "2025-08-11", "completado": true}, {"descripcion": "Cambio de aceite", "cliente": "Eva T", "fecha": "2025-08-11", "completado": true}, {"descripcion": "Cambio de aceite", "cliente": "Pablo G", "fecha": "2025-07-27", "completado": true}, {"descripcion": "Sustituci\u00f3n de embrague", "cliente": "Luc\u00eda [", "fecha": "2025-07-06", "completado": false}, {"descripcion": "ITV", "cliente": "Carlos I", "fecha": "2025-07-23", "completado": false}, {"descripcion": "Revisi\u00f3n de frenos", "cliente": "Jorge _", "fecha": "2025-07-17", "completado": true}, {"descripcion": "Cambio de aceite", "cliente": "Jorge ]", "fecha": "2025-06-28", "completado": true}, {"descripcion": "ITV", "cliente": "Ra\u00fal ^", "fecha": "2025-07-16", "completado": false}, {"descripcion": "ITV", "cliente": "Ra\u00fal X", "fecha": "2025-07-01", "completado": true}, {"descripcion": "ITV", "cliente": "Carlos b", "fecha": "2025-07-21", "completado": false}, {"descripcion": "Cambio de aceite", "cliente": "Miguel a", "fecha": "2025-08-17", "completado": false}]));
    }
    if (!localStorage.getItem('tallerAppPresupuestos')) {
        localStorage.setItem('tallerAppPresupuestos', JSON.stringify([{"cliente": "Luc\u00eda Y", "fecha": "2025-05-27", "detalle": "Sustituci\u00f3n de embrague - Incluye repuestos", "total": 1150.79}, {"cliente": "Pablo g", "fecha": "2025-05-29", "detalle": "Cambio de neum\u00e1ticos - Veh\u00edculo comercial", "total": 1468.32}, {"cliente": "Carlos N", "fecha": "2025-06-19", "detalle": "Revisi\u00f3n de frenos - Urgente", "total": 110.51}, {"cliente": "Pablo O", "fecha": "2025-06-28", "detalle": "ITV - Urgente", "total": 1418.7}, {"cliente": "Marta `", "fecha": "2025-07-09", "detalle": "Cambio de neum\u00e1ticos - Urgente", "total": 405.29}, {"cliente": "Ra\u00fal ^", "fecha": "2025-05-27", "detalle": "Cambio de neum\u00e1ticos - Urgente", "total": 727.56}, {"cliente": "Luc\u00eda B", "fecha": "2025-07-11", "detalle": "ITV - Descuento aplicado", "total": 1203.27}, {"cliente": "Ra\u00fal C", "fecha": "2025-06-07", "detalle": "ITV - Descuento aplicado", "total": 77.75}, {"cliente": "Luc\u00eda [", "fecha": "2025-06-19", "detalle": "Cambio de aceite - Incluye repuestos", "total": 1217.67}, {"cliente": "Carlos \\", "fecha": "2025-06-23", "detalle": "Sustituci\u00f3n de embrague - Veh\u00edculo comercial", "total": 612.56}, {"cliente": "Laura E", "fecha": "2025-07-08", "detalle": "Cambio de neum\u00e1ticos - Urgente", "total": 792.64}, {"cliente": "Pablo g", "fecha": "2025-07-03", "detalle": "Cambio de aceite - Urgente", "total": 547.87}, {"cliente": "Ra\u00fal C", "fecha": "2025-06-23", "detalle": "Cambio de neum\u00e1ticos - Urgente", "total": 1149.5}, {"cliente": "Luc\u00eda [", "fecha": "2025-06-16", "detalle": "Sustituci\u00f3n de embrague - Incluye repuestos", "total": 1029.18}, {"cliente": "Ra\u00fal ^", "fecha": "2025-07-03", "detalle": "Cambio de aceite - Urgente", "total": 98.2}, {"cliente": "Ra\u00fal X", "fecha": "2025-05-29", "detalle": "Sustituci\u00f3n de embrague - Veh\u00edculo comercial", "total": 114.66}, {"cliente": "Pablo G", "fecha": "2025-06-25", "detalle": "Cambio de aceite - Descuento aplicado", "total": 237.62}, {"cliente": "Miguel a", "fecha": "2025-06-19", "detalle": "ITV - Descuento aplicado", "total": 757.04}, {"cliente": "Marta `", "fecha": "2025-07-11", "detalle": "ITV - Veh\u00edculo comercial", "total": 1454.85}, {"cliente": "Luc\u00eda [", "fecha": "2025-07-07", "detalle": "ITV - Veh\u00edculo comercial", "total": 1257.58}, {"cliente": "Carlos I", "fecha": "2025-06-21", "detalle": "Revisi\u00f3n de frenos - Descuento aplicado", "total": 1385.34}, {"cliente": "Ra\u00fal ^", "fecha": "2025-05-31", "detalle": "Cambio de neum\u00e1ticos - Descuento aplicado", "total": 286.19}, {"cliente": "Laura d", "fecha": "2025-06-18", "detalle": "Cambio de aceite - Incluye repuestos", "total": 267.16}, {"cliente": "Jorge Q", "fecha": "2025-05-29", "detalle": "ITV - Urgente", "total": 292.33}, {"cliente": "Eva R", "fecha": "2025-07-18", "detalle": "Cambio de aceite - Incluye repuestos", "total": 1348.4}, {"cliente": "Laura d", "fecha": "2025-05-31", "detalle": "Cambio de neum\u00e1ticos - Incluye repuestos", "total": 1298.9}, {"cliente": "Luc\u00eda h", "fecha": "2025-06-17", "detalle": "Revisi\u00f3n de frenos - Incluye repuestos", "total": 500.98}, {"cliente": "Carlos I", "fecha": "2025-07-20", "detalle": "Cambio de aceite - Descuento aplicado", "total": 1191.38}, {"cliente": "Luc\u00eda Y", "fecha": "2025-07-15", "detalle": "Cambio de neum\u00e1ticos - Veh\u00edculo comercial", "total": 1445.77}, {"cliente": "Carlos b", "fecha": "2025-05-26", "detalle": "Cambio de aceite - Veh\u00edculo comercial", "total": 398.83}, {"cliente": "Miguel F", "fecha": "2025-07-11", "detalle": "Sustituci\u00f3n de embrague - Urgente", "total": 605.91}, {"cliente": "Jorge ]", "fecha": "2025-06-10", "detalle": "Sustituci\u00f3n de embrague - Incluye repuestos", "total": 917.79}, {"cliente": "Laura E", "fecha": "2025-06-07", "detalle": "Cambio de aceite - Veh\u00edculo comercial", "total": 1021.91}, {"cliente": "Jorge Q", "fecha": "2025-06-08", "detalle": "ITV - Urgente", "total": 1077.92}, {"cliente": "Laura d", "fecha": "2025-07-10", "detalle": "Sustituci\u00f3n de embrague - Descuento aplicado", "total": 187.51}, {"cliente": "Luc\u00eda B", "fecha": "2025-06-16", "detalle": "Cambio de aceite - Urgente", "total": 435.66}, {"cliente": "Sara c", "fecha": "2025-05-24", "detalle": "ITV - Descuento aplicado", "total": 574.9}, {"cliente": "Carlos I", "fecha": "2025-05-25", "detalle": "Sustituci\u00f3n de embrague - Descuento aplicado", "total": 1223.78}, {"cliente": "Sara c", "fecha": "2025-07-09", "detalle": "Sustituci\u00f3n de embrague - Urgente", "total": 1437.02}, {"cliente": "Miguel M", "fecha": "2025-06-18", "detalle": "Revisi\u00f3n de frenos - Descuento aplicado", "total": 459.88}]));
    }
    if (!localStorage.getItem('tallerAppUsuarios')) {
        localStorage.setItem('tallerAppUsuarios', JSON.stringify([{"usuario": "usuario0", "rol": "empleado", "clave": "1234"}, {"usuario": "usuario1", "rol": "admin", "clave": "1234"}, {"usuario": "usuario2", "rol": "admin", "clave": "1234"}, {"usuario": "usuario3", "rol": "admin", "clave": "1234"}, {"usuario": "usuario4", "rol": "admin", "clave": "1234"}, {"usuario": "usuario5", "rol": "admin", "clave": "1234"}, {"usuario": "usuario6", "rol": "admin", "clave": "1234"}, {"usuario": "usuario7", "rol": "empleado", "clave": "1234"}, {"usuario": "usuario8", "rol": "admin", "clave": "1234"}, {"usuario": "usuario9", "rol": "admin", "clave": "1234"}]));
    }
    if (!localStorage.getItem('tallerAppEvents')) {
        localStorage.setItem('tallerAppEvents', JSON.stringify([{"trabajador": "Trabajador 1", "tipo": "vacaciones", "inicio": "2025-08-25", "fin": "2025-10-04", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 2", "tipo": "vacaciones", "inicio": "2025-09-16", "fin": "2025-09-30", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 3", "tipo": "vacaciones", "inicio": "2025-09-02", "fin": "2025-10-16", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 4", "tipo": "vacaciones", "inicio": "2025-09-11", "fin": "2025-10-03", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 5", "tipo": "agenda", "inicio": "2025-09-08", "fin": "2025-10-17", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 1", "tipo": "agenda", "inicio": "2025-07-26", "fin": "2025-09-25", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 2", "tipo": "vacaciones", "inicio": "2025-08-27", "fin": "2025-09-27", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 3", "tipo": "vacaciones", "inicio": "2025-09-10", "fin": "2025-10-10", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 4", "tipo": "agenda", "inicio": "2025-08-18", "fin": "2025-10-08", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 5", "tipo": "vacaciones", "inicio": "2025-09-05", "fin": "2025-09-25", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 1", "tipo": "agenda", "inicio": "2025-08-24", "fin": "2025-10-03", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 2", "tipo": "vacaciones", "inicio": "2025-09-13", "fin": "2025-10-04", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 3", "tipo": "vacaciones", "inicio": "2025-08-19", "fin": "2025-09-28", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 4", "tipo": "agenda", "inicio": "2025-07-28", "fin": "2025-10-02", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 5", "tipo": "agenda", "inicio": "2025-07-28", "fin": "2025-10-02", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 1", "tipo": "agenda", "inicio": "2025-08-30", "fin": "2025-10-17", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 2", "tipo": "agenda", "inicio": "2025-09-18", "fin": "2025-10-03", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 3", "tipo": "agenda", "inicio": "2025-09-04", "fin": "2025-10-18", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 4", "tipo": "vacaciones", "inicio": "2025-09-06", "fin": "2025-10-03", "descripcion": "Evento programado"}, {"trabajador": "Trabajador 5", "tipo": "agenda", "inicio": "2025-09-11", "fin": "2025-10-02", "descripcion": "Evento programado"}]));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarDatosSimulados();
});



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
