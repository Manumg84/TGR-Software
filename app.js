document.addEventListener('DOMContentLoaded', function() {
    const mainContentTabs = document.getElementById('mainContentTabs');
    const mainContentTabContent = document.getElementById('mainContentTabContent');

    let events = JSON.parse(localStorage.getItem('tallerAppEvents')) || [];

    // Data for Dashboard Recent Activity
    let recentActivities = JSON.parse(localStorage.getItem('tallerAppRecentActivities')) || [
        { id: '1001', client: 'Carlos García', service: 'Cambio de aceite', status: 'Completado', date: '2024-03-15', total: '85.00' },
        { id: '1002', client: 'Ana Martínez', service: 'Revisión de frenos', status: 'Pendiente', date: '2024-03-16', total: '120.00' },
        { id: '1003', client: 'Luis Fernández', service: 'Reparación motor', status: 'En progreso', date: '2024-03-17', total: '450.00' },
        { id: '1004', client: 'Marta Pérez', service: 'ITV', status: 'Completado', date: '2024-03-18', total: '60.00' }
    ];

    function saveRecentActivities() {
        localStorage.setItem('tallerAppRecentActivities', JSON.stringify(recentActivities));
    }
    // Call initially to ensure default data is saved to localStorage
    if (!localStorage.getItem('tallerAppRecentActivities')) {
        saveRecentActivities();
    }

    const rawSectionContents = {
        clientes: `
            <div class="dashboard-card p-4">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                    <h5 class="mb-2 mb-md-0 text-dark-emphasis">Listado de Clientes</h5>
                    <div class="d-flex flex-column flex-md-row align-items-center w-100 w-md-auto">
                        <div class="input-group me-md-2 mb-2 mb-md-0 w-100 w-md-auto">
                            <input type="text" class="form-control" id="clientSearchInput" placeholder="Buscar cliente...">
                            <select class="form-select" id="clientFilterSelect" style="max-width: 200px;">
                                <option value="nameOrCompany">Nombre/Empresa</option>
                                <option value="cifNif">CIF/NIF</option>
                                <option value="phone1">Teléfono 1</option>
                                <option value="email">Email</option>
                                <option value="address">Dirección</option>
                                <option value="city">Localidad</option>
                                <option value="province">Provincia</option>
                                <option value="postalCode">Código Postal</option>
                                <option value="phone2">Teléfono 2</option>
                                <option value="observations">Observaciones</option>
                            </select>
                        </div>
                        <div class="button-frame">
                            <button class="btn btn-primary btn-create-client" id="createClientBtn"><i class="fas fa-plus me-2"></i> Crear Cliente</button>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover mb-0" id="clientsTable">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre/Empresa</th>
                                <th scope="col">CIF/NIF</th>
                                <th scope="col">Teléfono 1</th>
                                <th scope="col">Teléfono 2</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody id="clientsTableBody">
                            <!-- Clients will be dynamically loaded here by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        `,
        proveedores: `
            <div class="dashboard-card p-4">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                    <h5 class="mb-2 mb-md-0 text-dark-emphasis">Listado de Proveedores</h5>
                    <div class="d-flex flex-column flex-md-row align-items-center w-100 w-md-auto">
                        <div class="input-group me-md-2 mb-2 mb-md-0 w-100 w-md-auto">
                            <input type="text" class="form-control" id="proveedorSearchInput" placeholder="Buscar proveedor...">
                            <select class="form-select" id="proveedorFilterSelect" style="max-width: 200px;">
                                <option value="nameOrCompany">Nombre/Empresa</option>
                                <option value="cifNif">CIF/NIF</option>
                                <option value="phone1">Teléfono 1</option>
                                <option value="phone2">Teléfono 2</option>
                                <option value="email">Email</option>
                                <option value="city">Localidad</option>
                            </select>
                        </div>
                        <div class="button-frame">
                            <button class="btn btn-primary btn-create-proveedor" id="createProveedorBtn"><i class="fas fa-plus me-2"></i> Crear Proveedor</button>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover mb-0" id="proveedoresTable">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre/Empresa</th>
                                <th scope="col">CIF/NIF</th>
                                <th scope="col">Teléfono 1</th>
                                <th scope="col">Teléfono 2</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody id="proveedoresTableBody">
                            <!-- Suppliers will be dynamically loaded here by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        `,
        categorias: `
            <div class="dashboard-card p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0 text-dark-emphasis">Listado de Categorías</h5>
                    <button class="btn btn-primary" id="createCategoryBtn"><i class="fas fa-plus me-2"></i> Crear Categoría</button>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover mb-0" id="categoriesTable">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Código</th>
                                <th scope="col">Observaciones</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="categoriesTableBody">
                            <!-- Categories will be dynamically loaded here -->
                        </tbody>
                    </table>
                </div>
            </div>
        `,
        operarios: `
            <div class="dashboard-card p-4" id="operariosDashboardCard">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                    <h5 class="mb-2 mb-md-0 text-dark-emphasis">Listado de Operarios</h5>
                    <div class="d-flex flex-column flex-md-row align-items-center w-100 w-md-auto">
                        <div class="input-group me-md-2 mb-2 mb-md-0 w-100 w-md-auto">
                            <input type="text" class="form-control" id="operarioSearchInput" placeholder="Buscar operario...">
                            <select class="form-select" id="operarioFilterSelect" style="max-width: 200px;">
                                <option value="fullName">Nombre Completo</option>
                                <option value="dniNie">DNI/NIE</option>
                                <option value="position">Cargo</option>
                                <option value="phone">Teléfono</option>
                                <option value="email">Email</option>
                            </select>
                        </div>
                        <div class="button-frame">
                            <button class="btn btn-primary btn-create-operario" id="createOperarioBtn"><i class="fas fa-plus me-2"></i> Crear Operario</button>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover mb-0" id="operariosTable">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre Completo</th>
                                <th scope="col">Cargo</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Email</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="operariosTableBody">
                            <!-- Operators will be dynamically loaded here by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        `,
        presupuestos: `
            <div class="dashboard-card p-4">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                    <h5 class="mb-2 mb-md-0 text-dark-emphasis">Listado de Presupuestos</h5>
                    <div class="d-flex flex-column flex-md-row align-items-center w-100 w-md-auto">
                        <div class="input-group me-md-2 mb-2 mb-md-0 w-100 w-md-auto">
                            <input type="text" class="form-control" id="presupuestoSearchInput" placeholder="Buscar...">
                            <select class="form-select" id="presupuestoFilterSelect" style="max-width: 150px;">
                                <option value="numero">N° Presupuesto</option>
                                <option value="cliente">Cliente</option>
                                <option value="concepto">Concepto</option>
                            </select>
                        </div>
                        <div class="button-frame">
                            <button class="btn btn-primary btn-create-client" id="createPresupuestoBtn"><i class="fas fa-plus me-2"></i> Crear Presupuesto</button>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover mb-0" id="presupuestosTable">
                        <thead>
                            <tr>
                                <th scope="col">N° Presupuesto</th>
                                <th scope="col">Cliente</th>
                                <th scope="col">Concepto</th>
                                <th scope="col">N° Solicitud</th>
                                <th scope="col">Importe</th>
                            </tr>
                        </thead>
                        <tbody id="presupuestosTableBody">
                            <!-- Presupuestos will be dynamically loaded here by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        `,
        ordenes_trabajo: `
            <div class="dashboard-card p-4">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                    <h5 class="mb-2 mb-md-0 text-dark-emphasis">Listado de Órdenes de Trabajo</h5>
                    <div class="d-flex flex-column flex-md-row align-items-center w-100 w-md-auto">
                        <div class="input-group me-md-2 mb-2 mb-md-0 w-100 w-md-auto">
                            <input type="text" class="form-control" id="ordenTrabajoSearchInput" placeholder="Buscar...">
                            <select class="form-select" id="ordenTrabajoFilterSelect" style="max-width: 1400px;">
                                <option value="numero">N° Orden</option>
                                <option value="cliente">Cliente</option>
                                <option value="concepto">Concepto</option>
                                <option value="estado">Estado</option>
                            </select>
                        </div>
                        <div class="button-frame">
                            <button class="btn btn-primary btn-create-client" id="createOrdenTrabajoBtn"><i class="fas fa-plus me-2"></i> Crear Orden</button>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover mb-0" id="ordenesTrabajoTable">
                        <thead>
                            <tr>
                                <th scope="col">N° Orden</th>
                                <th scope="col">Cliente</th>
                                <th scope="col">Concepto</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Importe</th>
                            </tr>
                        </thead>
                        <tbody id="ordenesTrabajoTableBody">
                            <!-- Órdenes de Trabajo will be dynamically loaded here by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        `,
        historial: `
            <p class="text-muted">Consulta el historial de todas las órdenes de trabajo finalizadas.</p>
            <div class="dashboard-card p-4">
                <h5>Historial</h5>
                <ul class="list-group">
                    <li class="list-group-item">OT-2023-150 - Cambio de neumáticos - Completado</li>
                    <li class="list-group-item">OT-2023-149 - Reparación motor - Completado</li>
                </ul>
            </div>
        `,
        usuarios: `
            <div class="dashboard-card p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0 text-dark-emphasis">Listado de Usuarios</h5>
                    <button class="btn btn-primary" id="createUserBtn"><i class="fas fa-plus me-2"></i> Crear Usuario</button>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover mb-0" id="usersTable">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Nivel</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="usersTableBody">
                            <!-- Users will be dynamically loaded here by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        `,
        estados_trabajos: `
            <div class="dashboard-card p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0 text-dark-emphasis">Gestión de Estados de Trabajo</h5>
                    <button class="btn btn-primary" id="createWorkStatusBtn"><i class="fas fa-plus me-2"></i> Añadir Estado</button>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover mb-0" id="workStatusesTable">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre del Estado</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="workStatusesTableBody">
                            <!-- Work statuses will be dynamically loaded here by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        `
    };

    const sectionContents = {
        dashboard: `
            <div class="row">
                <div class="col-12">
                    <div class="dashboard-card">
                        <div class="card-header bg-white border-0 pb-0 pt-3">
                            <h5 class="mb-0 text-dark-emphasis">Actividad Reciente</h5>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Cliente</th>
                                            <th scope="col">Servicio</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody id="recentActivityTableBody">
                                        <!-- Activities will be dynamically loaded here by JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        gestion: `
            <!-- Nested Tabs Navigation -->
            <ul class="nav nav-tabs mb-3" id="gestionSubTabs" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="clientes-subtab" data-bs-toggle="tab" data-bs-target="#clientes-subpane" type="button" role="tab" aria-controls="clientes-subpane" aria-selected="true">
                        <span class="tab-label"><i class="fas fa-users me-2"></i> Clientes</span>
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="proveedores-subtab" data-bs-toggle="tab" data-bs-target="#proveedores-subpane" type="button" role="tab" aria-controls="proveedores-subpane" aria-selected="false">
                        <span class="tab-label"><i class="fas fa-truck me-2"></i> Proveedores</span>
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="categorias-subtab" data-bs-toggle="tab" data-bs-target="#categorias-subpane" type="button" role="tab" aria-controls="categorias-subpane" aria-selected="false">
                        <span class="tab-label"><i class="fas fa-tags me-2"></i> Categorías</span>
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="operarios-subtab" data-bs-toggle="tab" data-bs-target="#operarios-subpane" type="button" role="tab" aria-controls="operarios-subpane" aria-selected="false">
                        <span class="tab-label"><i class="fas fa-user-cog me-2"></i> Operarios</span>
                    </button>
                </li>
            </ul>

            <!-- Nested Tab Content -->
            <div class="tab-content" id="gestionSubTabContent">
                <div class="tab-pane fade show active" id="clientes-subpane" role="tabpanel" aria-labelledby="clientes-subtab">
                    ${rawSectionContents.clientes}
                </div>
                <div class="tab-pane fade" id="proveedores-subpane" role="tabpanel" aria-labelledby="proveedores-subtab">
                    ${rawSectionContents.proveedores}
                </div>
                <div class="tab-pane fade" id="categorias-subpane" role="tabpanel" aria-labelledby="categorias-subtab">
                    ${rawSectionContents.categorias}
                </div>
                <div class="tab-pane fade" id="operarios-subpane" role="tabpanel" aria-labelledby="operarios-subtab">
                    ${rawSectionContents.operarios}
                </div>
            </div>
        `,
        ordenes_parent: `
            <!-- Nested Tabs Navigation -->
            <ul class="nav nav-tabs mb-3" id="ordenesSubTabs" role="tablist">
                 <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="ordenes-trabajo-subtab" data-bs-toggle="tab" data-bs-target="#ordenes-trabajo-subpane" type="button" role="tab" aria-controls="ordenes-trabajo-subpane" aria-selected="true">
                        <span class="tab-label"><i class="fas fa-file-alt me-2"></i> Órdenes de trabajo</span>
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="presupuestos-subtab" data-bs-toggle="tab" data-bs-target="#presupuestos-subpane" type="button" role="tab" aria-controls="presupuestos-subpane" aria-selected="false">
                        <span class="tab-label"><i class="fas fa-file-invoice-dollar me-2"></i> Presupuestos</span>
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="historial-subtab" data-bs-toggle="tab" data-bs-target="#historial-subpane" type="button" role="tab" aria-controls="historial-subpane" aria-selected="false">
                        <span class="tab-label"><i class="fas fa-history me-2"></i> Historial</span>
                    </button>
                </li>
            </ul>

            <!-- Nested Tab Content -->
            <div class="tab-content" id="ordenesSubTabContent">
                <div class="tab-pane fade show active" id="ordenes-trabajo-subpane" role="tabpanel" aria-labelledby="ordenes-trabajo-subtab">
                    ${rawSectionContents.ordenes_trabajo}
                </div>
                <div class="tab-pane fade" id="presupuestos-subpane" role="tabpanel" aria-labelledby="presupuestos-subtab">
                    ${rawSectionContents.presupuestos}
                </div>
                <div class="tab-pane fade" id="historial-subpane" role="tabpanel" aria-labelledby="historial-subtab">
                    ${rawSectionContents.historial}
                </div>
            </div>
        `,
        settings: `
            <!-- Nested Tabs Navigation for Settings -->
            <ul class="nav nav-tabs mb-3" id="settingsSubTabs" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="usuarios-subtab" data-bs-toggle="tab" data-bs-target="#usuarios-subpane" type="button" role="tab" aria-controls="usuarios-subpane" aria-selected="true">
                        <span class="tab-label"><i class="fas fa-users-cog me-2"></i> Usuarios</span>
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="estados-trabajos-subtab" data-bs-toggle="tab" data-bs-target="#estados-trabajos-subpane" type="button" role="tab" aria-controls="estados-trabajos-subpane" aria-selected="false">
                        <span class="tab-label"><i class="fas fa-clipboard-check me-2"></i> Estados de Trabajos</span>
                    </button>
                </li>
            </ul>

            <!-- Nested Tab Content for Settings -->
            <div class="tab-content" id="settingsSubTabContent">
                <div class="tab-pane fade show active" id="usuarios-subpane" role="tabpanel" aria-labelledby="usuarios-subtab">
                    ${rawSectionContents.usuarios}
                </div>
                <div class="tab-pane fade" id="estados-trabajos-subpane" role="tabpanel" aria-labelledby="estados-trabajos-subtab">
                    ${rawSectionContents.estados_trabajos}
                </div>
            </div>
        `
    };

    function closeTab(tabIdToClose) {
        const tabToRemove = document.getElementById(`${tabIdToClose}-tab`).closest('.nav-item');
        const paneToRemove = document.getElementById(`${tabIdToClose}-pane`);

        const wasActive = tabToRemove.querySelector('.nav-link').classList.contains('active');

        tabToRemove.remove();
        paneToRemove.remove();

        if (wasActive) {
            const lastRemainingTab = mainContentTabs.querySelector('.nav-item:last-child .nav-link');
            if (lastRemainingTab) {
                bootstrap.Tab.getInstance(lastRemainingTab).show();
                const newActiveTabId = lastRemainingTab.id.replace('-tab', '');
                activateSidebarLinkBasedOnTab(newActiveTabId);
            } else {
                activateSidebarLinkBasedOnTab('dashboard'); 
            }
        }
    }

    function activateSidebarLinkBasedOnTab(tabTargetId, subTargetId = null) {
        document.querySelectorAll('#sidebar > ul > li > .nav-link').forEach(link => {
            link.classList.remove('active');
        });

        let primarySidebarLink = null;
        if (tabTargetId === 'dashboard') {
            primarySidebarLink = document.querySelector('#sidebar a[data-target="dashboard"]');
        } else if (tabTargetId === 'settings' || ['usuarios', 'estados_trabajos'].includes(tabTargetId)) { 
            primarySidebarLink = document.querySelector('#sidebar a[data-target="settings"]');
        } else if (tabTargetId === 'gestion' || ['clientes', 'proveedores', 'categorias', 'operarios'].includes(tabTargetId)) { 
            primarySidebarLink = document.querySelector('#sidebar a[data-target="gestion"]');
        } else if (tabTargetId === 'ordenes_parent' || ['presupuestos', 'ordenes_trabajo', 'historial'].includes(tabTargetId)) { 
            primarySidebarLink = document.querySelector('#sidebar a[data-target="ordenes_parent"]');
        } else if (subTargetId) {
             if (['clientes', 'proveedores', 'categorias', 'operarios'].includes(subTargetId)) {
                primarySidebarLink = document.querySelector('#sidebar a[data-target="gestion"]');
            } else if (['presupuestos', 'ordenes_trabajo', 'historial'].includes(subTargetId)) {
                primarySidebarLink = document.querySelector('#sidebar a[data-target="ordenes_parent"]');
            } else if (['usuarios', 'estados_trabajos'].includes(subTargetId)) {
                primarySidebarLink = document.querySelector('#sidebar a[data-target="settings"]');
            }
        }

        if (primarySidebarLink) {
            primarySidebarLink.classList.add('active');
        }
    }

    function openOrSwitchTab(targetId, targetName, targetIcon, subTargetId = null) {
        activateSidebarLinkBasedOnTab(targetId, subTargetId);

        const existingTabButton = document.getElementById(`${targetId}-tab`);
        if (existingTabButton) {
            const tabInstance = bootstrap.Tab.getInstance(existingTabButton) || new bootstrap.Tab(existingTabButton);
            tabInstance.show();

            if (subTargetId) {
                const subTabButton = document.getElementById(`${subTargetId}-subtab`);
                if(subTabButton) {
                    const subTabInstance = bootstrap.Tab.getInstance(subTabButton) || new bootstrap.Tab(subTabButton);
                    subTabInstance.show();
                }
            } else {
                if (targetId === 'dashboard') {
                    renderDashboardActivities(); // Call for dashboard
                }
                if (targetId === 'settings' && document.getElementById('usuarios-subtab').classList.contains('active')) {
                    renderUsersTable();
                }
                if (targetId === 'settings' && document.getElementById('estados-trabajos-subtab').classList.contains('active')) {
                    handleWorkStatusesSubTabShown();
                }
                if (targetId === 'gestion' && document.getElementById('clientes-subtab').classList.contains('active')) {
                    handleClientsSubTabShown();
                }
                if (targetId === 'ordenes_parent' && document.getElementById('ordenes-trabajo-subtab').classList.contains('active')) {
                    handleOrdenesTrabajoSubTabShown();
                }
            }
            return;
        }

        const newTabItem = document.createElement('li');
        newTabItem.classList.add('nav-item');
        newTabItem.setAttribute('role', 'presentation');
        newTabItem.innerHTML = `
            <button class="nav-link" id="${targetId}-tab" data-bs-toggle="tab" data-bs-target="#${targetId}-pane" type="button" role="tab" aria-controls="${targetId}-pane" aria-selected="false">
                <span class="tab-label">
                    <i class="${targetIcon} me-2"></i> ${targetName}
                </span>
            </button>
        `;
        mainContentTabs.appendChild(newTabItem);

        const newTabPane = document.createElement('div');
        newTabPane.classList.add('tab-pane', 'fade');
        newTabPane.setAttribute('id', `${targetId}-pane`);
        newTabPane.setAttribute('role', 'tabpanel');
        newTabPane.setAttribute('aria-labelledby', `${targetId}-tab`);

        newTabPane.innerHTML = `
            ${targetId !== 'dashboard' ? `<button class="close-tab-btn" aria-label="Cerrar pestaña" data-target-id="${targetId}"><i class="fas fa-times"></i></button>` : ''}
            ${sectionContents[targetId] || ''}
        `;
        mainContentTabContent.appendChild(newTabPane);

        if (targetId !== 'dashboard') {
            const closeBtn = newTabPane.querySelector('.close-tab-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', function(e) {
                    e.stopPropagation(); 
                    closeTab(this.dataset.targetId);
                });
            }

            const tabButton = document.getElementById(`${targetId}-tab`);
            const tabLabel = tabButton.querySelector('.tab-label');
            if (tabLabel) {
                tabLabel.addEventListener('dblclick', function(e) {
                    e.stopPropagation(); 
                    closeTab(targetId);
                });
            }
        }

        if (targetId === 'settings') { 
            const usuariosSubTabButton = newTabPane.querySelector('#usuarios-subtab'); 
            if (usuariosSubTabButton) {
                usuariosSubTabButton.addEventListener('shown.bs.tab', renderUsersTable);
            }
            const workStatusesSubTabButton = newTabPane.querySelector('#estados-trabajos-subtab');
            if (workStatusesSubTabButton) {
                workStatusesSubTabButton.addEventListener('shown.bs.tab', handleWorkStatusesSubTabShown);
            }
        }
        if (targetId === 'gestion') { 
            const clientesSubTabButton = newTabPane.querySelector('#clientes-subtab'); 
            const proveedoresSubTabButton = newTabPane.querySelector('#proveedores-subtab');
            const operariosSubTabButton = newTabPane.querySelector('#operarios-subtab');
            const categoriasSubTabButton = newTabPane.querySelector('#categorias-subtab');

            if (clientesSubTabButton) {
                clientesSubTabButton.addEventListener('shown.bs.tab', handleClientsSubTabShown);
            }
            if (proveedoresSubTabButton) {
                proveedoresSubTabButton.addEventListener('shown.bs.tab', handleProveedoresSubTabShown);
            }
            if (operariosSubTabButton) {
                operariosSubTabButton.addEventListener('shown.bs.tab', handleOperariosSubTabShown);
            }
            if (categoriasSubTabButton) {
                categoriasSubTabButton.addEventListener('shown.bs.tab', handleCategoriesSubTabShown);
            }
        }
        if (targetId === 'ordenes_parent') {
            const ordenesTrabajoSubTabButton = newTabPane.querySelector('#ordenes-trabajo-subtab');
            const presupuestosSubTabButton = newTabPane.querySelector('#presupuestos-subtab');

            if (ordenesTrabajoSubTabButton) {
                ordenesTrabajoSubTabButton.addEventListener('shown.bs.tab', handleOrdenesTrabajoSubTabShown);
            }
            if (presupuestosSubTabButton) {
                presupuestosSubTabButton.addEventListener('shown.bs.tab', handlePresupuestosSubTabShown);
            }
        }

        const newTab = new bootstrap.Tab(document.getElementById(`${targetId}-tab`));
        newTab.show();

        if (subTargetId) {
            const subTabToActivate = document.getElementById(`${subTargetId}-subtab`);
            if (subTabToActivate) {
                const subTab = new bootstrap.Tab(subTabToActivate);
                subTab.show();
            }
        } else {
            if (targetId === 'dashboard') {
                renderDashboardActivities(); // Call for dashboard when newly opened
            }
            if (targetId === 'settings' && newTabPane.querySelector('#usuarios-subtab').classList.contains('active')) {
                renderUsersTable();
            }
            if (targetId === 'settings' && newTabPane.querySelector('#estados-trabajos-subtab').classList.contains('active')) {
                handleWorkStatusesSubTabShown();
            }
            if (targetId === 'gestion' && newTabPane.querySelector('#clientes-subtab').classList.contains('active')) {
                handleClientsSubTabShown();
            }
            if (targetId === 'ordenes_parent' && newTabPane.querySelector('#ordenes-trabajo-subtab').classList.contains('active')) {
                handleOrdenesTrabajoSubTabShown();
            }
        }
    }

    function handleClientsSubTabShown() {
        const clientSearchInput = document.getElementById('clientSearchInput');
        const clientFilterSelect = document.getElementById('clientFilterSelect');

        if (clientSearchInput) {
            clientSearchInput.removeEventListener('input', clientSearchHandler);
            clientSearchInput.addEventListener('input', clientSearchHandler);
        }
        if (clientFilterSelect) {
            clientFilterSelect.removeEventListener('change', clientFilterHandler);
            clientFilterSelect.addEventListener('change', clientFilterHandler);
        }

        renderClientsTable(clientSearchInput ? clientSearchInput.value : '',
                           clientFilterSelect ? clientFilterSelect.value : 'nameOrCompany'); 
    }

    function handleProveedoresSubTabShown() {
        const proveedorSearchInput = document.getElementById('proveedorSearchInput');
        const proveedorFilterSelect = document.getElementById('proveedorFilterSelect');

        if (proveedorSearchInput) {
            proveedorSearchInput.removeEventListener('input', proveedorSearchHandler);
            proveedorSearchInput.addEventListener('input', proveedorSearchHandler);
        }
        if (proveedorFilterSelect) {
            proveedorFilterSelect.removeEventListener('change', proveedorFilterHandler);
            proveedorFilterSelect.addEventListener('change', proveedorFilterHandler);
        }

        renderProveedoresTable(proveedorSearchInput ? proveedorSearchInput.value : '',
                               proveedorFilterSelect ? proveedorFilterSelect.value : 'nameOrCompany');
    }

    function handleOperariosSubTabShown() {
        const operarioSearchInput = document.getElementById('operarioSearchInput');
        const operarioFilterSelect = document.getElementById('operarioFilterSelect');

        if (operarioSearchInput) {
            operarioSearchInput.removeEventListener('input', operarioSearchHandler);
            operarioSearchInput.addEventListener('input', operarioSearchHandler);
        }
        if (operarioFilterSelect) {
            operarioFilterSelect.removeEventListener('change', operarioFilterHandler);
            operarioFilterSelect.addEventListener('change', operarioFilterHandler);
        }

        renderOperariosTable(operarioSearchInput ? operarioSearchInput.value : '',
                             operarioFilterSelect ? operarioFilterSelect.value : 'fullName');
    }

    function handleCategoriesSubTabShown() {
        renderCategoriesTable();
    }

    function handleWorkStatusesSubTabShown() {
        renderWorkStatusesTable();
    }

    function handleOrdenesTrabajoSubTabShown() {
        const searchInput = document.getElementById('ordenTrabajoSearchInput');
        const filterSelect = document.getElementById('ordenTrabajoFilterSelect');
        
        if (searchInput) {
            searchInput.removeEventListener('input', ordenTrabajoSearchHandler);
            searchInput.addEventListener('input', ordenTrabajoSearchHandler);
        }
        if (filterSelect) {
            filterSelect.removeEventListener('change', ordenTrabajoFilterHandler);
            filterSelect.addEventListener('change', ordenTrabajoFilterHandler);
        }

        renderOrdenesTrabajoTable(searchInput ? searchInput.value : '', filterSelect ? filterSelect.value : 'numero');
    }
    
    function handlePresupuestosSubTabShown() {
        const searchInput = document.getElementById('presupuestoSearchInput');
        const filterSelect = document.getElementById('presupuestoFilterSelect');

        if (searchInput) {
            searchInput.removeEventListener('input', presupuestoSearchHandler);
            searchInput.addEventListener('input', presupuestoSearchHandler);
        }
        if (filterSelect) {
            filterSelect.removeEventListener('change', presupuestoFilterHandler);
            filterSelect.addEventListener('change', presupuestoFilterHandler);
        }
        
        renderPresupuestosTable(searchInput ? searchInput.value : '', filterSelect ? filterSelect.value : 'numero');
    }

    function clientSearchHandler() {
        const clientSearchInput = document.getElementById('clientSearchInput');
        const clientFilterSelect = document.getElementById('clientFilterSelect');
        renderClientsTable(clientSearchInput.value, clientFilterSelect.value);
    }

    function clientFilterHandler() {
        const clientSearchInput = document.getElementById('clientSearchInput');
        const clientFilterSelect = document.getElementById('clientFilterSelect');
        renderClientsTable(clientSearchInput.value, clientFilterSelect.value);
    }

    function proveedorSearchHandler() {
        const proveedorSearchInput = document.getElementById('proveedorSearchInput');
        const proveedorFilterSelect = document.getElementById('proveedorFilterSelect');
        renderProveedoresTable(proveedorSearchInput.value, proveedorFilterSelect.value);
    }

    function proveedorFilterHandler() {
        const proveedorSearchInput = document.getElementById('proveedorSearchInput');
        const proveedorFilterSelect = document.getElementById('proveedorFilterSelect');
        renderProveedoresTable(proveedorSearchInput.value, proveedorFilterSelect.value);
    }

    function operarioSearchHandler() {
        const operarioSearchInput = document.getElementById('operarioSearchInput');
        const operarioFilterSelect = document.getElementById('operarioFilterSelect');
        renderOperariosTable(operarioSearchInput.value, operarioFilterSelect.value);
    }

    function operarioFilterHandler() {
        const operarioSearchInput = document.getElementById('operarioSearchInput');
        const operarioFilterSelect = document.getElementById('operarioFilterSelect');
        renderOperariosTable(operarioSearchInput.value, operarioFilterSelect.value);
    }

    function ordenTrabajoSearchHandler() {
        const searchInput = document.getElementById('ordenTrabajoSearchInput');
        const filterSelect = document.getElementById('ordenTrabajoFilterSelect');
        renderOrdenesTrabajoTable(searchInput.value, filterSelect.value);
    }
    function ordenTrabajoFilterHandler() {
        const searchInput = document.getElementById('ordenTrabajoSearchInput');
        const filterSelect = document.getElementById('ordenTrabajoFilterSelect');
        renderOrdenesTrabajoTable(searchInput.value, filterSelect.value);
    }
    
    function presupuestoSearchHandler() {
        const searchInput = document.getElementById('presupuestoSearchInput');
        const filterSelect = document.getElementById('presupuestoFilterSelect');
        renderPresupuestosTable(searchInput.value, filterSelect.value);
    }
    function presupuestoFilterHandler() {
        const searchInput = document.getElementById('presupuestoSearchInput');
        const filterSelect = document.getElementById('presupuestoFilterSelect');
        renderPresupuestosTable(searchInput.value, filterSelect.value);
    }

    document.querySelectorAll('#sidebar > ul > li > .nav-link:not([data-bs-toggle="modal"])').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            const targetId = this.dataset.target;
            const targetName = this.dataset.name;
            const targetIcon = this.dataset.icon;

            openOrSwitchTab(targetId, targetName, targetIcon);
        });
    });

    document.querySelectorAll('#gestionModal .nav-link-in-modal').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.dataset.target;
            const targetName = this.dataset.name;
            const targetIcon = this.dataset.icon;

            openOrSwitchTab('gestion', 'Gestión', 'fas fa-tasks', targetId);
        });
    });

    document.querySelectorAll('#ordenesModal .nav-link-in-modal').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.dataset.target;
            const targetName = this.dataset.name;
            const targetIcon = this.dataset.icon;

            openOrSwitchTab('ordenes_parent', 'Órdenes de trabajos', 'fas fa-clipboard-list', targetId);
        });
    });

    let arrows = document.querySelectorAll("#sidebar .arrow");
    arrows.forEach(arrow => {
        arrow.addEventListener("click", (e) => {
            let arrowParent = e.target.closest("li");
            arrowParent.classList.toggle("showMenu");
        });
    });

    let iocnLinks = document.querySelectorAll("#sidebar .iocn-link");
    iocnLinks.forEach(link => {
        if (link.querySelector('.arrow')) {
            link.addEventListener("click", (e) => {
                if (e.target === link || link.contains(e.target) && !e.target.closest('.sub-menu')) {
                    let linkParent = e.target.closest("li");
                    linkParent.classList.toggle("showMenu");
                }
            });
        }
    });

    const calendarWidget = document.querySelector('#sidebar .calendar-widget');
    const currentDaySpan = document.getElementById('currentDay');
    const currentMonthSpan = document.getElementById('currentMonth');
    const currentYearSpan = document.getElementById('currentYear');
    const agendaModal = new bootstrap.Modal(document.getElementById('agendaModal'));
    const eventForm = document.getElementById('eventForm');
    const eventDateInput = document.getElementById('eventDate');
    const eventTimeInput = document.getElementById('eventTime');
    const eventDescriptionInput = document.getElementById('eventDescription');
    const agendaEventsList = document.getElementById('agendaEventsList'); 
    const modalEventsList = document.getElementById('modalEventsList'); 


    function updateCalendarWidget() {
        const today = new Date();
        const optionsDay = { day: 'numeric' };
        const optionsMonth = { month: 'long' };
        const optionsYear = { year: 'numeric' };

        currentDaySpan.textContent = today.toLocaleDateString('es-ES', optionsDay);
        let monthName = today.toLocaleDateString('es-ES', optionsMonth);
        currentMonthSpan.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1); 
        currentYearSpan.textContent = today.toLocaleDateString('es-ES', optionsYear);
    }

    function renderEvents() {
        // Sort by date (most recent first)
        events.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time || '00:00'}`);
            const dateB = new Date(`${b.date}T${b.time || '00:00'}`);
            return dateB - dateA; // Changed to descending order
        });

        agendaEventsList.innerHTML = '';
        modalEventsList.innerHTML = '';

        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        if (events.length === 0) {
            agendaEventsList.innerHTML = '<li class="list-group-item text-muted">No hay eventos próximos.</li>';
            modalEventsList.innerHTML = '<li class="list-group-item text-muted">No hay eventos programados.</li>';
        }

        events.forEach(event => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0); 

            const isToday = eventDate.getTime() === today.getTime();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const isTomorrow = eventDate.getTime() === tomorrow.getTime();

            const displayDate = isToday ? 'Hoy' : (isTomorrow ? 'Mañana' : new Date(event.date).toLocaleDateString('es-ES'));
            const displayTime = event.time ? ` - <small>${event.time}</small>` : '';

            if (eventDate >= today || isToday) { 
                const agendaItem = document.createElement('li');
                agendaItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                agendaItem.innerHTML = `
                    <span><i class="fas fa-calendar-alt me-2 text-primary"></i> ${event.description} ${displayTime}</span>
                    <span class="badge ${isToday ? 'bg-info-subtle text-info' : (isTomorrow ? 'bg-secondary-subtle text-secondary' : 'bg-primary-subtle text-primary')} rounded-pill">${displayDate}</span>
                `;
                agendaEventsList.appendChild(agendaItem);
            }

            const modalItem = document.createElement('li');
            modalItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            modalItem.innerHTML = `
                <span><i class="fas fa-calendar-alt me-2 text-primary"></i> ${event.description} ${displayTime}</span>
                <span class="badge ${isToday ? 'bg-info-subtle text-info' : (isTomorrow ? 'bg-secondary-subtle text-secondary' : 'bg-primary-subtle text-primary')} rounded-pill">${displayDate}</span>
                <button class="btn btn-sm btn-outline-danger delete-event-btn" data-id="${event.id}"><i class="fas fa-trash"></i></button>
            `;
            modalEventsList.appendChild(modalItem);
        });

        document.querySelectorAll('.delete-event-btn').forEach(button => {
            button.addEventListener('click', function() {
                const eventId = this.dataset.id;
                events = events.filter(event => event.id !== eventId);
                localStorage.setItem('tallerAppEvents', JSON.stringify(events));
                renderEvents(); 
            });
        });
    }

    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newEvent = {
            id: Date.now().toString(), 
            date: eventDateInput.value,
            time: eventTimeInput.value,
            description: eventDescriptionInput.value
        };
        events.push(newEvent);
        localStorage.setItem('tallerAppEvents', JSON.stringify(events));
        renderEvents();
        eventForm.reset(); 
    });

    if (calendarWidget) {
        calendarWidget.addEventListener('click', function() {
            agendaModal.show(); 
        });
    }

    updateCalendarWidget();
    renderEvents();

    const gestionModal = new bootstrap.Modal(document.getElementById('gestionModal'));
    const ordenesModal = new bootstrap.Modal(document.getElementById('ordenesModal'));

    let users = JSON.parse(localStorage.getItem('tallerAppUsers')) || [];
    let nextUserId = parseInt(localStorage.getItem('nextUserId')) || 1;

    let userLevels = JSON.parse(localStorage.getItem('tallerAppUserLevels')) || [];
    let nextUserLevelId = parseInt(localStorage.getItem('nextUserLevelId')) || 1;

    let clients = JSON.parse(localStorage.getItem('tallerAppClients')) || [];
    let nextClientId = parseInt(localStorage.getItem('nextClientId')) || 1;

    let proveedores = JSON.parse(localStorage.getItem('tallerAppProveedores')) || [];
    let nextProveedorId = parseInt(localStorage.getItem('nextProveedorId')) || 1;

    let operarios = JSON.parse(localStorage.getItem('tallerAppOperarios')) || [];
    let nextOperarioId = parseInt(localStorage.getItem('nextOperarioId')) || 1;

    let categories = JSON.parse(localStorage.getItem('tallerAppCategories')) || [];
    let nextCategoryId = parseInt(localStorage.getItem('nextCategoryId')) || 1;
    let subcategories = JSON.parse(localStorage.getItem('tallerAppSubcategories')) || [];
    let nextSubcategoryId = parseInt(localStorage.getItem('nextSubcategoryId')) || 1;

    let presupuestos = JSON.parse(localStorage.getItem('tallerAppPresupuestos')) || [];
    let nextPresupuestoId = parseInt(localStorage.getItem('nextPresupuestoId')) || 1;
    
    let ordenesTrabajo = JSON.parse(localStorage.getItem('tallerAppOrdenesTrabajo')) || [];
    let nextOrdenTrabajoId = parseInt(localStorage.getItem('nextOrdenTrabajoId')) || 1;

    let workStatuses = JSON.parse(localStorage.getItem('tallerAppWorkStatuses')) || [];
    let nextWorkStatusId = parseInt(localStorage.getItem('nextWorkStatusId')) || 1;

    let chatMessages = JSON.parse(localStorage.getItem('tallerAppChatMessages')) || {};

    if (userLevels.length === 0) {
        userLevels = [
            { id: '1', name: 'Administrador', rules: 'Acceso total, gestión de usuarios, finanzas.' },
            { id: '2', name: 'Operario', rules: 'Gestión de órdenes de trabajo, agenda.' },
            { id: '3', name: 'Contable', rules: 'Gestión de finanzas, presupuestos.' }
        ];
        nextUserLevelId = 4;
        saveUserLevels();
    }

    if (users.length === 0) {
        users = [
            { id: '1', name: 'admin', level: 'Administrador', password: 'password123' },
            { id: '2', name: 'operario1', level: 'Operario', password: 'op_pass' },
            { id: '3', name: 'contable', level: 'Contable', password: 'con_pass' }
        ];
        nextUserId = 4;
        saveUsers();
    }

    if (clients.length === 0) {
        clients = [
            {"id":"1","nameOrCompany":"Innovatech Solutions","cifNif":"B12345678","address":"Calle Falsa 123","city":"Madrid","province":"Madrid","postalCode":"28001","phone1":"912345678","phone2":"","email":"contacto@innovatech.es","observations":""},
            {"id":"2","nameOrCompany":"Arte y Diseño Gráfico SL","cifNif":"B87654321","address":"Avenida de la Creatividad 45","city":"Barcelona","province":"Barcelona","postalCode":"08002","phone1":"934567890","phone2":"","email":"info@arteydiseño.com","observations":"Cliente habitual para material de oficina."},
            {"id":"3","nameOrCompany":"Juan Pérez García","cifNif":"12345678A","address":"Plaza Mayor 1","city":"Sevilla","province":"Sevilla","postalCode":"41001","phone1":"955678901","phone2":"","email":"juan.perez@email.com","observations":"Fontanero"},
            {"id":"4","nameOrCompany":"María López Martínez","cifNif":"87654321B","address":"Paseo del Prado 10","city":"Madrid","province":"Madrid","postalCode":"28014","phone1":"918765432","phone2":"612345678","email":"maria.lopez@email.com","observations":""},
            {"id":"5","nameOrCompany":"Global Imports SA","cifNif":"A08987654","address":"Carrer de Sants 250","city":"Barcelona","province":"Barcelona","postalCode":"08028","phone1":"933321122","phone2":"","email":"pedidos@globalimports.es","observations":"Importador de componentes electrónicos."},
            {"id":"6","nameOrCompany":"Construcciones Roca Fuerte","cifNif":"B41234567","address":"Polígono Industrial La Red 7","city":"Alcalá de Guadaíra","province":"Sevilla","postalCode":"41500","phone1":"955010203","phone2":"","email":"admin@rocafuerte.com","observations":""},
            {"id":"7","nameOrCompany":"Lucía Fernández","cifNif":"23456789C","address":"Gran Vía 22","city":"Bilbao","province":"Vizcaya","postalCode":"48009","phone1":"944123456","phone2":"","email":"lucia.fernandez@email.com","observations":""},
            {"id":"8","nameOrCompany":"Productos de Castilla y León S.A.","cifNif":"A47876543","address":"Polígono San Cristóbal, Calle Oro 5","city":"Valladolid","province":"Valladolid","postalCode":"47012","phone1":"983012345","phone2":"","email":"info@productoscyl.com","observations":""},
            {"id":"9","nameOrCompany":"David García","cifNif":"34567890D","address":"Calle Larios 5","city":"Málaga","province":"Málaga","postalCode":"29015","phone1":"952123456","phone2":"","email":"david.garcia@email.com","observations":""},
            {"id":"10","nameOrCompany":"Laura Sánchez","cifNif":"45678901E","address":"Avenida de la Constitución 18","city":"Valencia","province":"Valencia","postalCode":"46001","phone1":"963123456","phone2":"","email":"laura.sanchez@email.com","observations":""},
            {"id":"11","nameOrCompany":"Exportaciones del Sur S.A.","cifNif":"A29876543","address":"Muelle Uno, Local 15","city":"Málaga","province":"Málaga","postalCode":"29016","phone1":"952001122","phone2":"","email":"info@exportsur.es","observations":""},
            {"id":"12","nameOrCompany":"Catering Delicias","cifNif":"B46123987","address":"Calle Colón 50","city":"Valencia","province":"Valencia","postalCode":"46004","phone1":"963543210","phone2":"","email":"pedidos@cateringdelicias.com","observations":""},
            {"id":"13","nameOrCompany":"Sofía Romero","cifNif":"56789012F","address":"Plaza de la Catedral 3","city":"Murcia","province":"Murcia","postalCode":"30001","phone1":"968123456","phone2":"","email":"sofia.romero@email.com","observations":""},
            {"id":"14","nameOrCompany":"Mantenimientos Integrales del Sureste","cifNif":"B30987654","address":"Avenida Juan Carlos I 30","city":"Murcia","province":"Murcia","postalCode":"30009","phone1":"968987654","phone2":"","email":"contacto@misureste.com","observations":""},
            {"id":"15","nameOrCompany":"Pedro Gutiérrez","cifNif":"67890123G","address":"Paseo de la Independencia 25","city":"Zaragoza","province":"Zaragoza","postalCode":"50001","phone1":"976123456","phone2":"","email":"pedro.gutierrez@email.com","observations":""},
            {"id":"16","nameOrCompany":"Logística Aragonesa S.L.","cifNif":"B50123456","address":"Plataforma Logística de Zaragoza (PLAZA)","city":"Zaragoza","province":"Zaragoza","postalCode":"50197","phone1":"976654321","phone2":"","email":"trafico@logisticaaragonesa.es","observations":""},
            {"id":"17","nameOrCompany":"Elena Jiménez","cifNif":"78901234H","address":"Calle Santiago 19","city":"Valladolid","province":"Valladolid","postalCode":"47001","phone1":"983123456","phone2":"","email":"elena.jimenez@email.com","observations":""},
            {"id":"18","nameOrCompany":"Productos de Castilla y León S.A.","cifNif":"A47876543","address":"Polígono San Cristóbal, Calle Oro 5","city":"Valladolid","province":"Valladolid","postalCode":"47012","phone1":"983012345","phone2":"","email":"info@productoscyl.com","observations":""},
            {"id":"19","nameOrCompany":"Daniel Navarro","cifNif":"90123456J","address":"Praza do Obradoiro s/n","city":"Santiago de Compostela","province":"A Coruña","postalCode":"15705","phone1":"981123456","phone2":"","email":"daniel.navarro@email.com","observations":""},
            {"id":"20","nameOrCompany":"Conservas Gallegas Rías Altas","cifNif":"B15654321","address":"Polígono de Sabón, Parcela 10","city":"Arteixo","province":"A Coruña","postalCode":"15142","phone1":"981601234","phone2":"","email":"pedidos@conservasriasaltas.com","observations":""},
            {"id":"21","nameOrCompany":"Isabel Torres","cifNif":"01234567K","address":"Calle San Fernando 40","city":"Santander","province":"Cantabria","postalCode":"39010","phone1":"942123456","phone2":"","email":"isabel.torres@email.com","observations":""},
            {"id":"22","nameOrCompany":"Transportes del Norte S.L.","cifNif":"B39123456","address":"Puerto de Santander, Raos","city":"Santander","province":"Cantabria","postalCode":"39011","phone1":"942345678","phone2":"","email":"oficina@transnorte.es","observations":""},
            {"id":"23","nameOrCompany":"Javier Ruiz","cifNif":"11223344L","address":"Avenida de la Libertad 2","city":"Donostia-San Sebastián","province":"Guipúzcoa","postalCode":"20004","phone1":"943123456","phone2":"","email":"javier.ruiz@email.com","observations":""},
            {"id":"24","nameOrCompany":"Quesos del País Vasco","cifNif":"B20987654","address":"Barrio Osinaga 15","city":"Hernani","province":"Guipúzcoa","postalCode":"20130","phone1":"943556677","phone2":"","email":"info@quesosvascos.com","observations":""},
            {"id":"25","nameOrCompany":"Carmen Moreno","cifNif":"22334455M","address":"Calle Mayor 33","city":"Pamplona","province":"Navarra","postalCode":"31001","phone1":"948123456","phone2":"","email":"carmen.moreno@email.com","observations":""},
            {"id":"26","nameOrCompany":"Mecanizados de Precisión Navarra S.L.","cifNif":"B31654987","address":"Polígono Industrial de Landaben, Calle A","city":"Pamplona","province":"Navarra","postalCode":"31012","phone1":"948765432","phone2":"","email":"info@mecanizadosnavarra.com","observations":"Cliente con requerimientos técnicos muy específicos."}
        ];
        nextClientId = 27;
        saveClients();
    }

    if (proveedores.length === 0) {
        proveedores = [
            {"id":"1","nameOrCompany":"Recambios Global Parts","cifNif":"B98765432","address":"Polígono Industrial El Pino, Nave 5","city":"Sevilla","province":"Sevilla","postalCode":"41016","phone1":"954987654","phone2":"","email":"pedidos@globalparts.com","observations":"Proveedor principal de recambios de automoción."},
            {"id":"2","nameOrCompany":"Pinturas Arcoiris S.L.","cifNif":"B28765432","address":"Calle del Color 22","city":"Madrid","province":"Madrid","postalCode":"28022","phone1":"911234567","phone2":"","email":"comercial@arcoiris.es","observations":"Especialistas en pinturas para taller."},
            {"id":"3","nameOrCompany":"Herramientas y Equipos Taller PRO","cifNif":"A08123456","address":"Carrer de la Indústria 100","city":"L'Hospitalet de Llobregat","province":"Barcelona","postalCode":"08907","phone1":"932109876","phone2":"","email":"ventas@tallerpro.es","observations":"Suministro de maquinaria y herramientas."},
            {"id":"4","nameOrCompany":"Neumáticos Rodando Seguro","cifNif":"B46987123","address":"Parque Empresarial Táctica","city":"Paterna","province":"Valencia","postalCode":"46980","phone1":"961112233","phone2":"","email":"info@rodandoseguro.com","observations":""},
            {"id":"5","nameOrCompany":"Aceites y Lubricantes del Norte S.A.","cifNif":"A48654789","address":"Polígono Ugaldeguren I, Parcela 8","city":"Zamudio","province":"Vizcaya","postalCode":"48170","phone1":"944543210","phone2":"","email":"pedidos@lubrinorte.es","observations":"Entrega rápida en 24h."}
        ];
        nextProveedorId = 6;
        saveProveedores();
    }
    
    if (operarios.length === 0) {
        operarios = [
            {"id":"1","fullName":"Miguel Ángel Rodríguez","dniNie":"12345678X","position":"Jefe de Taller","hireDate":"2010-05-15","phone":"611223344","email":"miguel.rodriguez@taller.com","observations":"Experto en diagnosis electrónica."},
            {"id":"2","fullName":"Beatriz Gómez Alonso","dniNie":"87654321Y","position":"Mecánico Oficial 1ª","hireDate":"2015-02-20","phone":"622334455","email":"beatriz.gomez@taller.com","observations":"Especialista en motores diésel."},
            {"id":"3","fullName":"Javier Fernández Sanz","dniNie":"11223344Z","position":"Pintor Oficial 1ª","hireDate":"2018-09-01","phone":"633445566","email":"javier.fernandez@taller.com","observations":"Gran atención al detalle en acabados."},
            {"id":"4","fullName":"Sara Martín López","dniNie":"44556677A","position":"Administrativa / Recepcionista","hireDate":"2020-01-10","phone":"644556677","email":"sara.martin@taller.com","observations":"Gestión de citas y facturación."},
            {"id":"5","fullName":"Carlos Ruiz Pérez","dniNie":"55667788B","position":"Mecánico Ayudante","hireDate":"2022-07-01","phone":"655667788","email":"carlos.ruiz@taller.com","observations":"En formación, muy proactivo."}
        ];
        nextOperarioId = 6;
        saveOperarios();
    }

    if (categories.length === 0) {
        categories = [
            { id: '1', name: 'Mecánica General', code: 'MEC', observations: 'Reparaciones generales de motor, transmisión, etc.' },
            { id: '2', name: 'Chapa y Pintura', code: 'CYP', observations: 'Reparaciones de carrocería y acabados de pintura.' },
            { id: '3', name: 'Electricidad', code: 'ELEC', observations: 'Sistemas eléctricos, luces, diagnóstico electrónico.' }
        ];
        nextCategoryId = 4;

        subcategories = [
            { id: '1', categoryId: '1', name: 'Cambio de aceite y filtro', code: 'MEC-01', importe: '25.00' },
            { id: '2', categoryId: '1', name: 'Revisión de frenos', code: 'MEC-02', importe: '40.00' },
            { id: '3', categoryId: '1', name: 'Cambio de correa de distribución', code: 'MEC-03', importe: '60.00'},
            { id: '4', categoryId: '2', name: 'Pintar pieza pequeña (espejo)', code: 'CYP-01', importe: '50.00' },
            { id: '5', categoryId: '2', name: 'Reparar arañazo', code: 'CYP-02', importe: '45.00' },
            { id: '6', categoryId: '3', name: 'Diagnóstico con máquina', code: 'ELEC-01', importe: '35.00' },
            { id: '7', categoryId: '1', name: 'Tipo 1', code: 'CAT-TIPO-1', importe: '30.00', isTipo: true },
            { id: '8', categoryId: '1', name: 'Tipo 2', code: 'CAT-TIPO-2', importe: '35.00', isTipo: true },
            { id: '9', categoryId: '2', name: 'Tipo 1', code: 'CAT-TIPO-1', importe: '45.00', isTipo: true },
            { id: '10', categoryId: '2', name: 'Tipo 2', code: 'CAT-TIPO-2', importe: '50.00', isTipo: true },
            { id: '11', categoryId: '3', name: 'Tipo 1', code: 'CAT-TIPO-1', importe: '40.00', isTipo: true },
            { id: '12', categoryId: '3', name: 'Tipo 2', code: 'CAT-TIPO-2', importe: '48.00', isTipo: true }
        ];
        nextSubcategoryId = 13;
        
        saveCategories();
        saveSubcategories();
    }

    if (presupuestos.length === 0) {
        presupuestos = [
            { id: '1', numero: 'P-2024-001', clienteId: '1', concepto: 'Revisión completa y cambio de filtros', numSolicitud: 'S-105', texto: 'Presupuesto para la revisión anual del vehículo...', importe: '250.50' },
            { id: '2', numero: 'P-2024-002', clienteId: '3', concepto: 'Reparación de chapa en aleta delantera', numSolicitud: 'S-106', texto: 'Incluye materiales y mano de obra.', importe: '475.00' }
        ];
        nextPresupuestoId = 3;
        savePresupuestos();
    }
    
    if (ordenesTrabajo.length === 0) {
        ordenesTrabajo = [
            { id: '1', numero: 'OT-2024-001', clienteId: '2', concepto: 'Cambio de neumáticos', estado: 'Completado', observaciones: 'Se montaron 4 neumáticos Michelin Pilot Sport 4.', importe: '620.00', workHours: [], materials: [] },
            { id: '2', numero: 'OT-2024-002', clienteId: '4', concepto: 'Diagnóstico de fallo motor', estado: 'En Progreso', observaciones: 'Luz de motor encendida en el cuadro. Se está diagnosticando.', importe: '55.00', workHours: [], materials: [] },
            { id: '3', numero: 'OT-2024-003', clienteId: '5', concepto: 'Mantenimiento pre-ITV', estado: 'Pendiente', observaciones: 'Revisar puntos clave para la ITV.', importe: '120.00', workHours: [], materials: [] }
        ];
        nextOrdenTrabajoId = 4;
        saveOrdenesTrabajo();
    }

    if (workStatuses.length === 0) {
        workStatuses = [
            { id: '1', name: 'Pendiente', description: 'Trabajo aún no iniciado.' },
            { id: '2', name: 'En Progreso', description: 'Trabajo en curso.' },
            { id: '3', name: 'Completado', description: 'Trabajo finalizado, pendiente de facturar.' },
            { id: '4', name: 'Facturado', description: 'Trabajo completado y facturado.' },
            { id: '5', name: 'Cancelado', description: 'Trabajo anulado.' }
        ];
        nextWorkStatusId = 6;
        saveWorkStatuses();
    }

    const userModal = new bootstrap.Modal(document.getElementById('userModal'));
    const userForm = document.getElementById('userForm');
    const userIdInput = document.getElementById('userId');
    const userModeInput = document.getElementById('userMode');
    const userNameInput = document.getElementById('userName');
    const userLevelSelect = document.getElementById('userLevel');
    const userPasswordInput = document.getElementById('userPassword');
    const userModalLabel = document.getElementById('userModalLabel');
    const userModalSubmitBtn = document.getElementById('userModalSubmitBtn');

    const workStatusModal = new bootstrap.Modal(document.getElementById('workStatusModal'));
    const workStatusForm = document.getElementById('workStatusForm');
    const workStatusIdInput = document.getElementById('workStatusId');
    const workStatusModeInput = document.getElementById('workStatusMode');
    const workStatusNameInput = document.getElementById('workStatusName');
    const workStatusDescriptionInput = document.getElementById('workStatusDescription');
    const workStatusModalLabel = document.getElementById('workStatusModalLabel');
    const workStatusModalSubmitBtn = document.getElementById('workStatusModalSubmitBtn');
    const workStatusModalDeleteBtn = document.getElementById('workStatusModalDeleteBtn');

    const clientModal = new bootstrap.Modal(document.getElementById('clientModal'));
    const clientForm = document.getElementById('clientForm');
    const clientIdInput = document.getElementById('clientId');
    const clientModeInput = document.getElementById('clientMode');
    const clientModalLabel = document.getElementById('clientModalLabel');
    const clientModalSubmitBtn = document.getElementById('clientModalSubmitBtn');
    const clientModalDeleteBtn = document.getElementById('clientModalDeleteBtn');
    const clientModalEditBtn = document.getElementById('clientModalEditBtn'); 
    const clientNameOrCompanyInput = document.getElementById('clientNameOrCompany');
    const clientCifNifInput = document.getElementById('clientCifNif');
    const clientAddressInput = document.getElementById('clientAddress');
    const clientCityInput = document.getElementById('clientCity');
    const clientProvinceInput = document.getElementById('clientProvince');
    const clientPostalCodeInput = document.getElementById('clientPostalCode');
    const clientPhone1Input = document.getElementById('clientPhone1');
    const clientPhone2Input = document.getElementById('clientPhone2');
    const clientEmailInput = document.getElementById('clientEmail');
    const clientObservationsInput = document.getElementById('clientObservations');

    const proveedorModal = new bootstrap.Modal(document.getElementById('proveedorModal'));
    const proveedorForm = document.getElementById('proveedorForm');
    const proveedorIdInput = document.getElementById('proveedorId');
    const proveedorModeInput = document.getElementById('proveedorMode');
    const proveedorModalLabel = document.getElementById('proveedorModalLabel');
    const proveedorModalSubmitBtn = document.getElementById('proveedorModalSubmitBtn');
    const proveedorModalDeleteBtn = document.getElementById('proveedorModalDeleteBtn');
    const proveedorNameOrCompanyInput = document.getElementById('proveedorNameOrCompany');
    const proveedorCifNifInput = document.getElementById('proveedorCifNif');
    const proveedorAddressInput = document.getElementById('proveedorAddress');
    const proveedorCityInput = document.getElementById('proveedorCity');
    const proveedorProvinceInput = document.getElementById('proveedorProvince');
    const proveedorPostalCodeInput = document.getElementById('proveedorPostalCode');
    const proveedorPhone1Input = document.getElementById('proveedorPhone1');
    const proveedorPhone2Input = document.getElementById('proveedorPhone2');
    const proveedorEmailInput = document.getElementById('proveedorEmail');
    const proveedorObservationsInput = document.getElementById('proveedorObservations');

    const operarioModal = new bootstrap.Modal(document.getElementById('operarioModal'));
    const operarioForm = document.getElementById('operarioForm');
    const operarioIdInput = document.getElementById('operarioId');
    const operarioModeInput = document.getElementById('operarioMode');
    const operarioModalLabel = document.getElementById('operarioModalLabel');
    const operarioModalSubmitBtn = document.getElementById('operarioModalSubmitBtn');
    const operarioModalDeleteBtn = document.getElementById('operarioModalDeleteBtn');
    const operarioFullNameInput = document.getElementById('operarioFullName');
    const operarioDniNieInput = document.getElementById('operarioDniNie');
    const operarioPositionInput = document.getElementById('operarioPosition');
    const operarioHireDateInput = document.getElementById('operarioHireDate');
    const operarioPhoneInput = document.getElementById('operarioPhone');
    const operarioEmailInput = document.getElementById('operarioEmail');
    const operarioObservationsInput = document.getElementById('operarioObservations');

    const categoryModal = new bootstrap.Modal(document.getElementById('categoryModal'));
    const categoryForm = document.getElementById('categoryForm');
    const categoryIdInput = document.getElementById('categoryId');
    const categoryModeInput = document.getElementById('categoryMode');
    const categoryNameInput = document.getElementById('categoryName');
    const categoryCodeInput = document.getElementById('categoryCode');
    const categoryObservationsInput = document.getElementById('categoryObservations');
    const categoryModalLabel = document.getElementById('categoryModalLabel');
    const categoryModalSubmitBtn = document.getElementById('categoryModalSubmitBtn');
    const categoryModalDeleteBtn = document.getElementById('categoryModalDeleteBtn');
    const tiposCatBtn = document.getElementById('tiposCatBtn');

    const tiposCatModal = new bootstrap.Modal(document.getElementById('tiposCatModal'));
    const tiposCatForm = document.getElementById('tiposCatForm');
    const tiposCatParentIdInput = document.getElementById('tiposCatParentId');

    const presupuestoModal = new bootstrap.Modal(document.getElementById('presupuestoModal'));
    const presupuestoForm = document.getElementById('presupuestoForm');
    const presupuestoIdInput = document.getElementById('presupuestoId');
    const presupuestoModeInput = document.getElementById('presupuestoMode');
    const presupuestoModalLabel = document.getElementById('presupuestoModalLabel');
    const presupuestoNumeroInput = document.getElementById('presupuestoNumero');
    const presupuestoClienteSearchInput = document.getElementById('presupuestoClienteSearch');
    const presupuestoClienteIdHidden = document.getElementById('presupuestoClienteId');
    const presupuestoClienteSuggestionsDiv = document.getElementById('presupuestoClienteSuggestions');
    const presupuestoConceptoInput = document.getElementById('presupuestoConcepto');
    const presupuestoNumSolicitudInput = document.getElementById('presupuestoNumSolicitud');
    const presupuestoTextoInput = document.getElementById('presupuestoTexto');
    const presupuestoImporteInput = document.getElementById('presupuestoImporte');
    const presupuestoModalSubmitBtn = document.getElementById('presupuestoModalSubmitBtn');
    const presupuestoModalDeleteBtn = document.getElementById('presupuestoModalDeleteBtn');

    const ordenTrabajoModalEl = document.getElementById('ordenTrabajoModal');
    const ordenTrabajoModal = new bootstrap.Modal(ordenTrabajoModalEl);
    const ordenTrabajoForm = document.getElementById('ordenTrabajoForm');
    const ordenTrabajoIdInput = document.getElementById('ordenTrabajoId');
    const ordenTrabajoModeInput = document.getElementById('ordenTrabajoMode');
    const ordenTrabajoModalLabel = document.getElementById('ordenTrabajoModalLabel');
    const ordenTrabajoNumeroInput = document.getElementById('ordenTrabajoNumero');
    const ordenTrabajoClienteSearchInput = document.getElementById('ordenTrabajoClienteSearch');
    const ordenTrabajoClienteIdHidden = document.getElementById('ordenTrabajoClienteId');
    const ordenTrabajoClienteSuggestionsDiv = document.getElementById('ordenTrabajoClienteSuggestions');
    const ordenTrabajoConceptoInput = document.getElementById('ordenTrabajoConcepto');
    const ordenTrabajoEstadoSelect = document.getElementById('ordenTrabajoEstado');
    const ordenTrabajoObservacionesInput = document.getElementById('ordenTrabajoObservaciones');
    const ordenTrabajoImporteInput = document.getElementById('ordenTrabajoImporte');
    const ordenTrabajoModalSubmitBtn = document.getElementById('ordenTrabajoModalSubmitBtn');
    const ordenTrabajoModalDeleteBtn = document.getElementById('ordenTrabajoModalDeleteBtn');
    const workHoursTableBody = document.getElementById('workHoursTableBody');
    const materialsTableBody = document.getElementById('materialsTableBody');
    const addWorkHourRowBtn = document.getElementById('addWorkHourRowBtn');
    const addMaterialRowBtn = document.getElementById('addMaterialRowBtn');

    const subcategoryModal = new bootstrap.Modal(document.getElementById('subcategoryModal'));
    const subcategoryForm = document.getElementById('subcategoryForm');
    const subcategoryIdInput = document.getElementById('subcategoryId');
    const parentCategoryIdInput = document.getElementById('parentCategoryId');
    const subcategoryModeInput = document.getElementById('subcategoryMode');
    const subcategoryFormTitle = document.getElementById('subcategoryFormTitle');
    const subcategoryNameInput = document.getElementById('subcategoryName');
    const subcategoryCodeInput = document.getElementById('subcategoryCode');
    const subcategoryImporteInput = document.getElementById('subcategoryImporte');
    const subcategoryFormSubmitBtn = document.getElementById('subcategoryFormSubmitBtn');
    const cancelSubcategoryFormBtn = document.getElementById('cancelSubcategoryFormBtn');
    const subcategoriesTableBody = document.getElementById('subcategoriesTableBody');

    function saveUsers() {
        localStorage.setItem('tallerAppUsers', JSON.stringify(users));
        localStorage.setItem('nextUserId', nextUserId.toString());
    }

    function saveUserLevels() {
        localStorage.setItem('tallerAppUserLevels', JSON.stringify(userLevels));
        localStorage.setItem('nextUserLevelId', nextUserLevelId.toString());
    }

    function saveClients() {
        localStorage.setItem('tallerAppClients', JSON.stringify(clients));
        localStorage.setItem('nextClientId', nextClientId.toString());
    }
    
    function saveProveedores() {
        localStorage.setItem('tallerAppProveedores', JSON.stringify(proveedores));
        localStorage.setItem('nextProveedorId', nextProveedorId.toString());
    }
    
    function saveOperarios() {
        localStorage.setItem('tallerAppOperarios', JSON.stringify(operarios));
        localStorage.setItem('nextOperarioId', nextOperarioId.toString());
    }

    function saveCategories() {
        localStorage.setItem('tallerAppCategories', JSON.stringify(categories));
        localStorage.setItem('nextCategoryId', nextCategoryId.toString());
    }
    
    function saveSubcategories() {
        localStorage.setItem('tallerAppSubcategories', JSON.stringify(subcategories));
        localStorage.setItem('nextSubcategoryId', nextSubcategoryId.toString());
    }

    function savePresupuestos() {
        localStorage.setItem('tallerAppPresupuestos', JSON.stringify(presupuestos));
        localStorage.setItem('nextPresupuestoId', nextPresupuestoId.toString());
    }

    function saveOrdenesTrabajo() {
        localStorage.setItem('tallerAppOrdenesTrabajo', JSON.stringify(ordenesTrabajo));
        localStorage.setItem('nextOrdenTrabajoId', nextOrdenTrabajoId.toString());
    }

    function saveWorkStatuses() {
        localStorage.setItem('tallerAppWorkStatuses', JSON.stringify(workStatuses));
        localStorage.setItem('nextWorkStatusId', nextWorkStatusId.toString());
    }

    function saveChatMessages() {
        localStorage.setItem('tallerAppChatMessages', JSON.stringify(chatMessages));
    }

    function populateUserLevelSelectOptions() {
        userLevelSelect.innerHTML = '<option value="">Selecciona un nivel</option>';
        userLevels.forEach(level => {
            const option = document.createElement('option');
            option.value = level.name; 
            option.textContent = level.name;
            userLevelSelect.appendChild(option);
        });
    }

    function populateOrdenTrabajoEstadoSelect() {
        if (!ordenTrabajoEstadoSelect) return;
        ordenTrabajoEstadoSelect.innerHTML = ''; 
        workStatuses.forEach(status => {
            const option = document.createElement('option');
            option.value = status.name;
            option.textContent = status.name;
            ordenTrabajoEstadoSelect.appendChild(option);
        });
    }

    function setupClientAutocomplete(searchInput, hiddenInput, suggestionsDiv) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            suggestionsDiv.innerHTML = '';
            hiddenInput.value = ''; 

            if (searchTerm.length === 0) {
                suggestionsDiv.style.display = 'none';
                return;
            }

            const filteredClients = clients.filter(client => 
                client.nameOrCompany.toLowerCase().includes(searchTerm) ||
                client.cifNif.toLowerCase().includes(searchTerm)
            );

            if (filteredClients.length > 0) {
                filteredClients.forEach(client => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('autocomplete-suggestion-item');
                    suggestionItem.textContent = `${client.nameOrCompany} (${client.cifNif})`;
                    suggestionItem.dataset.clientId = client.id;
                    suggestionItem.addEventListener('click', function() {
                        searchInput.value = this.textContent;
                        hiddenInput.value = this.dataset.clientId;
                        suggestionsDiv.style.display = 'none';
                    });
                    suggestionsDiv.appendChild(suggestionItem);
                });
                suggestionsDiv.style.display = 'block';
            } else {
                suggestionsDiv.style.display = 'none';
            }
        });

        searchInput.addEventListener('focus', function() {
            if (this.value.length === 0) {
                suggestionsDiv.innerHTML = '';
                clients.forEach(client => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('autocomplete-suggestion-item');
                    suggestionItem.textContent = `${client.nameOrCompany} (${client.cifNif})`;
                    suggestionItem.dataset.clientId = client.id;
                    suggestionItem.addEventListener('click', function() {
                        searchInput.value = this.textContent;
                        hiddenInput.value = this.dataset.clientId;
                        suggestionsDiv.style.display = 'none';
                    });
                    suggestionsDiv.appendChild(suggestionItem);
                });
                suggestionsDiv.style.display = 'block';
            }
        });

        searchInput.addEventListener('blur', function(e) {
            setTimeout(() => {
                if (!suggestionsDiv.contains(document.activeElement)) {
                    suggestionsDiv.style.display = 'none';
                }
            }, 100);
        });
    }

    setupClientAutocomplete(presupuestoClienteSearchInput, presupuestoClienteIdHidden, presupuestoClienteSuggestionsDiv);
    setupClientAutocomplete(ordenTrabajoClienteSearchInput, ordenTrabajoClienteIdHidden, ordenTrabajoClienteSuggestionsDiv);

    function renderUsersTable() {
        const usersTableBody = document.getElementById('usersTableBody');
        if (!usersTableBody) return; 

        usersTableBody.innerHTML = ''; 

        if (users.length === 0) {
            usersTableBody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No hay usuarios registrados.</td></tr>';
        }

        users.forEach(user => {
            const row = usersTableBody.insertRow();
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.level}</td>
                <td>
                    <button class="btn btn-sm btn-info me-1 view-user-btn" data-id="${user.id}"><i class="fas fa-eye"></i> Ver</button>
                    <button class="btn btn-sm btn-warning me-1 edit-user-btn" data-id="${user.id}"><i class="fas fa-edit"></i> Editar</button>
                    <button class="btn btn-sm btn-danger delete-user-btn" data-id="${user.id}"><i class="fas fa-trash"></i> Borrar</button>
                </td>
            `;
        });

        usersTableBody.querySelectorAll('.view-user-btn').forEach(button => {
            button.addEventListener('click', function() {
                openUserModal('view', this.dataset.id);
            });
        });
        usersTableBody.querySelectorAll('.edit-user-btn').forEach(button => {
            button.addEventListener('click', function() {
                openUserModal('edit', this.dataset.id);
            });
        });
        usersTableBody.querySelectorAll('.delete-user-btn').forEach(button => {
            button.addEventListener('click', function() {
                if (confirm('¿Estás seguro de que quieres borrar este usuario? Esta acción no se puede deshacer.')) {
                    deleteUser(this.dataset.id);
                }
            });
        });

        const createUserBtn = document.getElementById('createUserBtn');
        if (createUserBtn) {
            createUserBtn.removeEventListener('click', handleCreateUserClick);
            createUserBtn.addEventListener('click', handleCreateUserClick);
        }
    }

    // New function to render Dashboard Recent Activity
    function renderDashboardActivities() {
        const recentActivityTableBody = document.getElementById('recentActivityTableBody');
        if (!recentActivityTableBody) return;

        // Sort by date (most recent first)
        recentActivities.sort((a, b) => new Date(b.date) - new Date(a.date));

        recentActivityTableBody.innerHTML = '';

        if (recentActivities.length === 0) {
            recentActivityTableBody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No hay actividad reciente.</td></tr>';
        } else {
            recentActivities.forEach(activity => {
                const row = recentActivityTableBody.insertRow();
                let statusBadgeClass;
                switch (activity.status) {
                    case 'Completado':
                        statusBadgeClass = 'bg-success-subtle text-success';
                        break;
                    case 'Pendiente':
                        statusBadgeClass = 'bg-warning-subtle text-warning';
                        break;
                    case 'En progreso':
                        statusBadgeClass = 'bg-info-subtle text-info';
                        break;
                    default:
                        statusBadgeClass = 'bg-secondary-subtle text-secondary';
                }

                row.innerHTML = `
                    <td>${activity.id}</td>
                    <td>${activity.client}</td>
                    <td>${activity.service}</td>
                    <td><span class="badge ${statusBadgeClass}">${activity.status}</span></td>
                    <td>${new Date(activity.date).toLocaleDateString('es-ES')}</td>
                    <td>€${parseFloat(activity.total).toFixed(2)}</td>
                `;
            });
        }
    }


    function handleCreateUserClick() {
        openUserModal('create');
    }

    function openUserModal(mode, userId = null) {
        userForm.reset();
        userModeInput.value = mode;
        userIdInput.value = ''; 

        userNameInput.readOnly = false;
        userLevelSelect.disabled = false;
        userPasswordInput.readOnly = false;
        userPasswordInput.type = 'password'; 
        userPasswordInput.placeholder = '********';

        populateUserLevelSelectOptions();

        if (mode === 'create') {
            userModalLabel.innerHTML = '<i class="fas fa-user-plus me-2 text-primary"></i> Crear Nuevo Usuario';
            userModalSubmitBtn.innerHTML = '<i class="fas fa-plus me-2"></i> Añadir Usuario';
            userModalSubmitBtn.classList.remove('btn-warning', 'btn-info');
            userModalSubmitBtn.classList.add('btn-primary');
            userPasswordInput.required = true; 
        } else {
            const user = users.find(u => u.id === userId);
            if (!user) {
                console.error('User not found:', userId);
                return;
            }
            userIdInput.value = user.id;
            userNameInput.value = user.name;
            userLevelSelect.value = user.level;
            userPasswordInput.value = ''; 

            if (mode === 'view') {
                userModalLabel.innerHTML = '<i class="fas fa-eye me-2 text-primary"></i> Ver Usuario';
                userModalSubmitBtn.innerHTML = '<i class="fas fa-times me-2"></i> Cerrar'; 
                userModalSubmitBtn.classList.remove('btn-primary', 'btn-warning');
                userModalSubmitBtn.classList.add('btn-info');
                userNameInput.readOnly = true;
                userLevelSelect.disabled = true;
                userPasswordInput.readOnly = true;
                userPasswordInput.required = false; 
            } else if (mode === 'edit') {
                userModalLabel.innerHTML = '<i class="fas fa-edit me-2 text-primary"></i> Editar Usuario';
                userModalSubmitBtn.innerHTML = '<i class="fas fa-save me-2"></i> Guardar Cambios';
                userModalSubmitBtn.classList.remove('btn-primary', 'btn-info');
                userModalSubmitBtn.classList.add('btn-warning');
                userPasswordInput.required = false; 
            }
        }
        userModal.show();
    }

    function openWorkStatusModal(mode, statusId = null) {
        workStatusForm.reset();
        workStatusModeInput.value = mode;
        workStatusIdInput.value = '';
        workStatusModalDeleteBtn.style.display = 'none';

        workStatusNameInput.readOnly = false;
        workStatusDescriptionInput.readOnly = false;

        if (mode === 'create') {
            workStatusModalLabel.innerHTML = '<i class="fas fa-clipboard-check me-2 text-primary"></i> Crear Nuevo Estado de Trabajo';
            workStatusModalSubmitBtn.innerHTML = '<i class="fas fa-plus me-2"></i> Añadir Estado';
            workStatusModalSubmitBtn.classList.remove('btn-warning', 'btn-info');
            workStatusModalSubmitBtn.classList.add('btn-primary');
        } else {
            const status = workStatuses.find(s => s.id === statusId);
            if (!status) {
                console.error('Work status not found:', statusId);
                return;
            }
            workStatusIdInput.value = status.id;
            workStatusNameInput.value = status.name;
            workStatusDescriptionInput.value = status.description;

            if (mode === 'view') {
                workStatusModalLabel.innerHTML = '<i class="fas fa-eye me-2 text-primary"></i> Ver Estado de Trabajo';
                workStatusModalSubmitBtn.innerHTML = '<i class="fas fa-times me-2"></i> Cerrar'; 
                workStatusModalSubmitBtn.classList.remove('btn-primary', 'btn-warning');
                workStatusModalSubmitBtn.classList.add('btn-info');
                workStatusNameInput.readOnly = true;
                workStatusDescriptionInput.readOnly = true;
            } else if (mode === 'edit') {
                workStatusModalLabel.innerHTML = '<i class="fas fa-edit me-2 text-primary"></i> Editar Estado de Trabajo';
                workStatusModalSubmitBtn.innerHTML = '<i class="fas fa-save me-2"></i> Guardar Cambios';
                workStatusModalSubmitBtn.classList.remove('btn-primary', 'btn-info');
                workStatusModalSubmitBtn.classList.add('btn-warning');
            }
        }
        if (mode === 'edit' || mode === 'view') {
            workStatusModalDeleteBtn.style.display = 'inline-block';
            workStatusModalDeleteBtn.onclick = () => {
                deleteWorkStatus(statusId);
                workStatusModal.hide();
            };
        }
        workStatusModal.show();
    }

    function renderWorkStatusesTable() {
        const workStatusesTableBody = document.getElementById('workStatusesTableBody');
        if (!workStatusesTableBody) return;

        workStatusesTableBody.innerHTML = '';

        if (workStatuses.length === 0) {
            workStatusesTableBody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No hay estados de trabajo registrados.</td></tr>';
        }

        workStatuses.forEach(status => {
            const row = workStatusesTableBody.insertRow();
            row.innerHTML = `
                <td>${status.id}</td>
                <td>${status.name}</td>
                <td>${status.description}</td>
                <td>
                    <button class="btn btn-sm btn-info me-1 view-work-status-btn" data-id="${status.id}"><i class="fas fa-eye"></i> Ver</button>
                    <button class="btn btn-sm btn-warning me-1 edit-work-status-btn" data-id="${status.id}"><i class="fas fa-edit"></i> Editar</button>
                    <button class="btn btn-sm btn-danger delete-work-status-btn" data-id="${status.id}"><i class="fas fa-trash"></i> Borrar</button>
                </td>
            `;
        });

        workStatusesTableBody.querySelectorAll('.view-work-status-btn').forEach(button => {
            button.addEventListener('click', function() {
                openWorkStatusModal('view', this.dataset.id);
            });
        });
        workStatusesTableBody.querySelectorAll('.edit-work-status-btn').forEach(button => {
            button.addEventListener('click', function() {
                openWorkStatusModal('edit', this.dataset.id);
            });
        });
        workStatusesTableBody.querySelectorAll('.delete-work-status-btn').forEach(button => {
            button.addEventListener('click', function() {
                if (confirm('¿Estás seguro de que quieres borrar este estado de trabajo? Esta acción no se puede deshacer.')) {
                    deleteWorkStatus(this.dataset.id);
                }
            });
        });

        const createWorkStatusBtn = document.getElementById('createWorkStatusBtn');
        if (createWorkStatusBtn) {
            createWorkStatusBtn.removeEventListener('click', handleCreateWorkStatusClick);
            createWorkStatusBtn.addEventListener('click', handleCreateWorkStatusClick);
        }
    }

    function handleCreateWorkStatusClick() {
        openWorkStatusModal('create');
    }

    function openClientModal(mode, clientId = null) {
        clientForm.reset(); 
        clientModeInput.value = mode; 
        clientIdInput.value = ''; 
        clientModalDeleteBtn.style.display = 'none'; 
        clientModalEditBtn.style.display = 'none'; 

        const inputs = [
            clientNameOrCompanyInput, clientCifNifInput, clientAddressInput,
            clientCityInput, clientProvinceInput, clientPostalCodeInput,
            clientPhone1Input, clientPhone2Input, clientEmailInput, clientObservationsInput
        ];
        inputs.forEach(input => {
            input.readOnly = false;
        });

        if (mode === 'create') {
            clientModalLabel.innerHTML = '<i class="fas fa-user-plus me-2 text-primary"></i> Crear Nuevo Cliente';
            clientModalSubmitBtn.innerHTML = '<i class="fas fa-plus me-2"></i> Añadir Cliente';
            clientModalSubmitBtn.classList.remove('btn-warning', 'btn-info');
            clientModalSubmitBtn.classList.add('btn-primary');
        } else {
            const client = clients.find(c => c.id === clientId);
            if (!client) {
                console.error('Client not found:', clientId);
                return;
            }
            clientIdInput.value = client.id;
            clientNameOrCompanyInput.value = client.nameOrCompany;
            clientCifNifInput.value = client.cifNif;
            clientAddressInput.value = client.address;
            clientCityInput.value = client.city;
            clientProvinceInput.value = client.province;
            clientPostalCodeInput.value = client.postalCode;
            clientPhone1Input.value = client.phone1;
            clientPhone2Input.value = client.phone2;
            clientEmailInput.value = client.email;
            clientObservationsInput.value = client.observations;

            if (mode === 'view') {
                clientModalLabel.innerHTML = '<i class="fas fa-eye me-2 text-primary"></i> Ver Cliente';
                clientModalSubmitBtn.innerHTML = '<i class="fas fa-times me-2"></i> Cerrar'; 
                clientModalSubmitBtn.classList.remove('btn-primary', 'btn-warning');
                clientModalSubmitBtn.classList.add('btn-info');
                
                inputs.forEach(input => {
                    input.readOnly = true;
                });

                clientModalDeleteBtn.style.display = 'inline-block';
                clientModalEditBtn.style.display = 'inline-block'; 
                
                clientModalEditBtn.onclick = () => {
                    clientModeInput.value = 'edit';
                    clientModalLabel.innerHTML = '<i class="fas fa-edit me-2 text-primary"></i> Editar Cliente';
                    clientModalSubmitBtn.innerHTML = '<i class="fas fa-save me-2"></i> Guardar Cambios';
                    clientModalSubmitBtn.classList.remove('btn-info');
                    clientModalSubmitBtn.classList.add('btn-warning');
                    clientModalEditBtn.style.display = 'none'; 
                    
                    inputs.forEach(input => {
                        input.readOnly = false;
                    });

                    clientModalDeleteBtn.style.display = 'inline-block';
                    clientModalDeleteBtn.onclick = () => {
                        deleteClient(clientId);
                        clientModal.hide();
                    };
                };
            } else if (mode === 'edit') {
                clientModalLabel.innerHTML = '<i class="fas fa-edit me-2 text-primary"></i> Editar Cliente';
                clientModalSubmitBtn.innerHTML = '<i class="fas fa-save me-2"></i> Guardar Cambios';
                clientModalSubmitBtn.classList.remove('btn-primary', 'btn-info');
                clientModalSubmitBtn.classList.add('btn-warning');
                clientModalDeleteBtn.style.display = 'inline-block';
                clientModalDeleteBtn.onclick = () => {
                    deleteClient(clientId);
                    clientModal.hide();
                };
            }
        }
        clientModal.show();
    }

    function openProveedorModal(mode, proveedorId = null) {
        proveedorForm.reset();
        proveedorModeInput.value = mode;
        proveedorIdInput.value = '';
        proveedorModalDeleteBtn.style.display = 'none';

        if (mode === 'create') {
            proveedorModalLabel.innerHTML = '<i class="fas fa-truck me-2 text-primary"></i> Crear Nuevo Proveedor';
            proveedorModalSubmitBtn.innerHTML = '<i class="fas fa-plus me-2"></i> Añadir Proveedor';
            proveedorModalSubmitBtn.classList.remove('btn-warning', 'btn-info');
            proveedorModalSubmitBtn.classList.add('btn-primary');
        } else {
            const proveedor = proveedores.find(p => p.id === proveedorId);
            if (!proveedor) return;

            proveedorIdInput.value = proveedor.id;
            proveedorNameOrCompanyInput.value = proveedor.nameOrCompany;
            proveedorCifNifInput.value = proveedor.cifNif;
            proveedorAddressInput.value = proveedor.address;
            proveedorCityInput.value = proveedor.city;
            proveedorProvinceInput.value = proveedor.province;
            proveedorPostalCodeInput.value = proveedor.postalCode;
            proveedorPhone1Input.value = proveedor.phone1;
            proveedorPhone2Input.value = proveedor.phone2;
            proveedorEmailInput.value = proveedor.email;
            proveedorObservationsInput.value = proveedor.observations;

            if (mode === 'view') {
                proveedorModalLabel.innerHTML = '<i class="fas fa-eye me-2 text-primary"></i> Ver Proveedor';
                proveedorModalSubmitBtn.innerHTML = '<i class="fas fa-times me-2"></i> Cerrar'; 
                proveedorModalSubmitBtn.classList.remove('btn-primary', 'btn-warning');
                proveedorModalSubmitBtn.classList.add('btn-info');
                proveedorNameOrCompanyInput.readOnly = true;
                proveedorCifNifInput.readOnly = true;
                proveedorAddressInput.readOnly = true;
                proveedorCityInput.readOnly = true;
                proveedorProvinceInput.readOnly = true;
                proveedorPostalCodeInput.readOnly = true;
                proveedorPhone1Input.readOnly = true;
                proveedorPhone2Input.readOnly = true;
                proveedorEmailInput.readOnly = true;
                proveedorObservationsInput.readOnly = true;
            } else if (mode === 'edit') {
                proveedorModalLabel.innerHTML = '<i class="fas fa-edit me-2 text-primary"></i> Editar Proveedor';
                proveedorModalSubmitBtn.innerHTML = '<i class="fas fa-save me-2"></i> Guardar Cambios';
                proveedorModalSubmitBtn.classList.remove('btn-primary', 'btn-info');
                proveedorModalSubmitBtn.classList.add('btn-warning');
            }
        }

        if (mode === 'edit') {
            proveedorModalDeleteBtn.style.display = 'inline-block';
            proveedorModalDeleteBtn.onclick = () => {
                deleteProveedor(proveedorId);
                proveedorModal.hide();
            };
        }
        proveedorModal.show();
    }

    function openOperarioModal(mode, operarioId = null) {
        operarioForm.reset();
        operarioModeInput.value = mode;
        operarioIdInput.value = '';
        operarioModalDeleteBtn.style.display = 'none';

        operarioFullNameInput.readOnly = false;
        operarioDniNieInput.readOnly = false;
        operarioPositionInput.readOnly = false;
        operarioHireDateInput.readOnly = false;
        operarioPhoneInput.readOnly = false;
        operarioEmailInput.readOnly = false;
        operarioObservationsInput.readOnly = false;

        if (mode === 'create') {
            operarioModalLabel.innerHTML = '<i class="fas fa-user-cog me-2 text-primary"></i> Crear Nuevo Operario';
            operarioModalSubmitBtn.innerHTML = '<i class="fas fa-plus me-2"></i> Añadir Operario';
            operarioModalSubmitBtn.classList.remove('btn-warning', 'btn-info');
            operarioModalSubmitBtn.classList.add('btn-primary');
        } else {
            const operario = operarios.find(o => o.id === operarioId);
            if (!operario) return;

            operarioIdInput.value = operario.id;
            operarioFullNameInput.value = operario.fullName;
            operarioDniNieInput.value = operario.dniNie;
            operarioPositionInput.value = operario.position;
            operarioHireDateInput.value = operario.hireDate;
            operarioPhoneInput.value = operario.phone;
            operarioEmailInput.value = operario.email;
            operarioObservationsInput.value = operario.observations;

            if (mode === 'view') {
                operarioModalLabel.innerHTML = '<i class="fas fa-eye me-2 text-primary"></i> Ver Operario';
                operarioModalSubmitBtn.innerHTML = '<i class="fas fa-times me-2"></i> Cerrar'; 
                operarioModalSubmitBtn.classList.remove('btn-primary', 'btn-warning');
                operarioModalSubmitBtn.classList.add('btn-info');
                operarioFullNameInput.readOnly = true;
                operarioDniNieInput.readOnly = true;
                operarioPositionInput.readOnly = true;
                operarioHireDateInput.readOnly = true;
                operarioPhoneInput.readOnly = true;
                operarioEmailInput.readOnly = true;
                operarioObservationsInput.readOnly = true;
            } else if (mode === 'edit') {
                operarioModalLabel.innerHTML = '<i class="fas fa-edit me-2 text-primary"></i> Editar Operario';
                operarioModalSubmitBtn.innerHTML = '<i class="fas fa-save me-2"></i> Guardar Cambios';
                operarioModalSubmitBtn.classList.remove('btn-primary', 'btn-info');
                operarioModalSubmitBtn.classList.add('btn-warning');
            }
        }

        if (mode === 'edit') {
            operarioModalDeleteBtn.style.display = 'inline-block';
            operarioModalDeleteBtn.onclick = () => {
                deleteOperario(operarioId);
                operarioModal.hide();
            };
        }
        operarioModal.show();
    }

    function openCategoryModal(mode, categoryId = null) {
        categoryForm.reset();
        categoryModeInput.value = mode;
        categoryIdInput.value = '';
        categoryModalDeleteBtn.style.display = 'none';
        tiposCatBtn.style.display = 'none'; 

        categoryNameInput.readOnly = false;
        categoryCodeInput.readOnly = false;
        categoryObservationsInput.readOnly = false;

        if (mode === 'create') {
            categoryModalLabel.innerHTML = '<i class="fas fa-tags me-2 text-primary"></i> Crear Nueva Categoría';
            categoryModalSubmitBtn.innerHTML = '<i class="fas fa-plus me-2"></i> Añadir Categoría';
            categoryModalSubmitBtn.className = 'btn btn-primary ms-2';
        } else {
            const category = categories.find(c => c.id === categoryId);
            if (!category) {
                console.error('Category not found:', categoryId);
                return;
            }

            categoryIdInput.value = category.id;
            categoryNameInput.value = category.name;
            categoryCodeInput.value = category.code;
            categoryObservationsInput.value = category.observations;

            if (mode === 'view') {
                categoryModalLabel.innerHTML = '<i class="fas fa-eye me-2 text-primary"></i> Ver Categoría';
                categoryModalSubmitBtn.innerHTML = '<i class="fas fa-times me-2"></i> Cerrar'; 
                categoryModalSubmitBtn.classList.remove('btn-primary', 'btn-warning');
                categoryModalSubmitBtn.classList.add('btn-info');
                categoryNameInput.readOnly = true;
                categoryCodeInput.readOnly = true;
                categoryObservationsInput.readOnly = true;
            } else if (mode === 'edit') {
                categoryModalLabel.innerHTML = '<i class="fas fa-edit me-2 text-primary"></i> Editar Categoría';
                categoryModalSubmitBtn.innerHTML = '<i class="fas fa-save me-2"></i> Guardar Cambios';
                categoryModalSubmitBtn.classList.remove('btn-primary', 'btn-info');
                categoryModalSubmitBtn.classList.add('btn-warning');
            }
        }
        if (mode === 'edit') {
            categoryModalDeleteBtn.style.display = 'inline-block';
            categoryModalDeleteBtn.onclick = () => {
                deleteCategory(categoryId);
                categoryModal.hide();
            };
            tiposCatBtn.style.display = 'inline-block';
            tiposCatBtn.dataset.categoryId = categoryId;
        }
        categoryModal.show();
    }

    function renderCategoriesTable() {
        const categoriesTableBody = document.getElementById('categoriesTableBody');
        if (!categoriesTableBody) return;

        categoriesTableBody.innerHTML = '';

        if (categories.length === 0) {
            categoriesTableBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No hay categorías registradas.</td></tr>';
        }

        categories.forEach(category => {
            const row = categoriesTableBody.insertRow();
            row.innerHTML = `
                <td>${category.id}</td>
                <td><a href="#" class="text-decoration-none category-name-link" data-id="${category.id}">${category.name}</a></td>
                <td>${category.code}</td>
                <td>${category.observations}</td>
                <td>
                    <button class="btn btn-sm btn-info me-1 view-category-btn" data-id="${category.id}"><i class="fas fa-eye"></i> Ver</button>
                    <button class="btn btn-sm btn-warning me-1 edit-category-btn" data-id="${category.id}"><i class="fas fa-edit"></i> Editar</button>
                    <button class="btn btn-sm btn-danger delete-category-btn" data-id="${category.id}"><i class="fas fa-trash"></i> Borrar</button>
                </td>
            `;
        });

        document.getElementById('categoriesTableBody').querySelectorAll('.view-category-btn').forEach(button => {
            button.addEventListener('click', function() {
                openCategoryModal('view', this.dataset.id);
            });
        });
        document.getElementById('categoriesTableBody').querySelectorAll('.edit-category-btn').forEach(button => {
            button.addEventListener('click', function() {
                openCategoryModal('edit', this.dataset.id);
            });
        });
        document.getElementById('categoriesTableBody').querySelectorAll('.delete-category-btn').forEach(button => {
            button.addEventListener('click', function() {
                deleteCategory(this.dataset.id);
            });
        });

        const createCategoryBtn = document.getElementById('createCategoryBtn');
        if (createCategoryBtn) {
            createCategoryBtn.removeEventListener('click', handleCreateCategoryClick);
            createCategoryBtn.addEventListener('click', handleCreateCategoryClick);
        }

        document.getElementById('categoriesTableBody').querySelectorAll('.category-name-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                openCategoryModal('edit', this.dataset.id);
            });
        });
    }

    function handleCreateCategoryClick() {
        openCategoryModal('create');
    }

    function renderPresupuestosTable(searchTerm = '', filterBy = 'numero') {
        const tableBody = document.getElementById('presupuestosTableBody');
        if (!tableBody) return;

        let filtered = presupuestos;

        if (searchTerm) {
            filtered = presupuestos.filter(presupuesto => {
                let valueToSearch = '';
                if (filterBy === 'cliente') {
                    const client = clients.find(c => c.id === presupuesto.clienteId);
                    valueToSearch = client ? client.nameOrCompany : '';
                } else {
                    valueToSearch = presupuesto[filterBy] || '';
                }
                return valueToSearch.toString().toLowerCase().includes(searchTerm.toLowerCase());
            });
        }
        
        tableBody.innerHTML = '';
        if (filtered.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No se encontraron presupuestos.</td></tr>';
        }

        filtered.forEach(presupuesto => {
            const client = clients.find(c => c.id === presupuesto.clienteId);
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td><a href="#" class="text-decoration-none presupuesto-numero-link" data-id="${presupuesto.id}">${presupuesto.numero}</a></td>
                <td>${client ? client.nameOrCompany : 'N/A'}</td>
                <td>${presupuesto.concepto}</td>
                <td>${presupuesto.numSolicitud}</td>
                <td>${parseFloat(presupuesto.importe).toFixed(2)} €</td>
            `;
        });
    }
    
    function renderOrdenesTrabajoTable(searchTerm = '', filterBy = 'numero') {
        const tableBody = document.getElementById('ordenesTrabajoTableBody');
        if (!tableBody) return;

        let filtered = ordenesTrabajo;
        
        if (searchTerm) {
            filtered = ordenesTrabajo.filter(orden => {
                let valueToSearch = '';
                if (filterBy === 'cliente') {
                    const client = clients.find(c => c.id === orden.clienteId);
                    valueToSearch = client ? client.nameOrCompany : '';
                } else {
                    valueToSearch = orden[filterBy] || '';
                }
                return valueToSearch.toString().toLowerCase().includes(searchTerm.toLowerCase());
            });
        }

        tableBody.innerHTML = '';
        if (filtered.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No se encontraron órdenes de trabajo.</td></tr>';
            return;
        }

        filtered.forEach(orden => {
            const client = clients.find(c => c.id === orden.clienteId);
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td><a href="#" class="text-decoration-none orden-trabajo-numero-link" data-id="${orden.id}">${orden.numero}</a></td>
                <td>${client ? client.nameOrCompany : 'N/A'}</td>
                <td>${orden.concepto}</td>
                <td><span class="badge bg-info-subtle text-info">${orden.estado}</span></td>
                <td>${parseFloat(orden.importe).toFixed(2)} €</td>
            `;
        });
    }

    function renderClientsTable(searchTerm = '', filterBy = 'nameOrCompany') {
        const clientsTableBody = document.getElementById('clientsTableBody');
        if (!clientsTableBody) return;

        clientsTableBody.innerHTML = ''; 

        let filteredClients = clients.filter(client => {
            const valueToSearch = client[filterBy] || '';
            return valueToSearch.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });

        if (filteredClients.length === 0) {
            clientsTableBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No se encontraron clientes.</td></tr>';
        } else {
            filteredClients.forEach(client => {
                const row = clientsTableBody.insertRow();
                row.innerHTML = `
                    <td>${client.id}</td>
                    <td><a href="#" class="text-decoration-none client-name-link" data-id="${client.id}">${client.nameOrCompany}</a></td>
                    <td>${client.cifNif}</td>
                    <td>${client.phone1}</td>
                    <td>${client.phone2}</td>
                    <td>${client.email}</td>
                `;
            });
        }
    }

    function renderProveedoresTable(searchTerm = '', filterBy = 'nameOrCompany') {
        const proveedoresTableBody = document.getElementById('proveedoresTableBody');
        if (!proveedoresTableBody) return;

        proveedoresTableBody.innerHTML = '';
        let filteredProveedores = proveedores.filter(proveedor => {
            const value = proveedor[filterBy] || '';
            return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });

        if (filteredProveedores.length === 0) {
            proveedoresTableBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No se encontraron proveedores.</td></tr>';
            return;
        }

        filteredProveedores.forEach(proveedor => {
            const row = proveedoresTableBody.insertRow();
            row.innerHTML = `
                <td>${proveedor.id}</td>
                <td><a href="#" class="text-decoration-none proveedor-name-link" data-id="${proveedor.id}">${proveedor.nameOrCompany}</a></td>
                <td>${proveedor.cifNif}</td>
                <td>${proveedor.phone1}</td>
                <td>${proveedor.phone2}</td>
                <td>${proveedor.email}</td>
            `;
        });
    }

    function renderOperariosTable(searchTerm = '', filterBy = 'fullName') {
        const operariosTableBody = document.getElementById('operariosTableBody');
        if (!operariosTableBody) return;

        operariosTableBody.innerHTML = '';
        let filteredOperarios = operarios.filter(operario => {
            const value = operario[filterBy] || '';
            return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });

        // Sort by hireDate in descending order (most recent first)
        filteredOperarios.sort((a, b) => {
            const dateA = new Date(a.hireDate);
            const dateB = new Date(b.hireDate);
            return dateB - dateA;
        });

        if (filteredOperarios.length === 0) {
            operariosTableBody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No se encontraron operarios.</td></tr>';
            return;
        }

        filteredOperarios.forEach(operario => {
            const row = operariosTableBody.insertRow();
            row.innerHTML = `
                <td>${operario.id}</td>
                <td><a href="#" class="text-decoration-none operario-name-link" data-id="${operario.id}">${operario.fullName}</a></td>
                <td>${operario.position}</td>
                <td>${operario.phone}</td>
                <td>${operario.email}</td>
                <td>
                    <button class="btn btn-sm btn-info me-1 view-operario-btn" data-id="${operario.id}"><i class="fas fa-eye"></i> Ver</button>
                    <button class="btn btn-sm btn-warning me-1 edit-operario-btn" data-id="${operario.id}"><i class="fas fa-edit"></i> Editar</button>
                    <button class="btn btn-sm btn-danger delete-operario-btn" data-id="${operario.id}"><i class="fas fa-trash"></i> Borrar</button>
                </td>
            `;
        });
    }

    const initialTab = document.querySelector('#mainContentTabs .nav-link.active');
    if (initialTab && initialTab.id === 'dashboard-tab') {
        activateSidebarLinkBasedOnTab('dashboard');
        renderDashboardActivities(); // Call on initial load if dashboard is active
    }

    function deleteUser(id) {
        if (confirm('¿Estás seguro de que quieres borrar este usuario? Esta acción no se puede deshacer.')) {
            users = users.filter(user => user.id !== id);
            saveUsers();
            renderUsersTable();
        }
    }

    function deleteWorkStatus(id) {
        if (ordenesTrabajo.some(orden => orden.estado === workStatuses.find(s => s.id === id)?.name)) {
            alert('No se puede borrar este estado de trabajo porque está siendo utilizado en una o más órdenes de trabajo. Por favor, cambia el estado de esas órdenes primero.');
            return;
        }

        if (confirm('¿Estás seguro de que quieres borrar este estado de trabajo? Esta acción no se puede deshacer.')) {
            workStatuses = workStatuses.filter(status => status.id !== id);
            saveWorkStatuses();
            renderWorkStatusesTable();
            populateOrdenTrabajoEstadoSelect(); 
        }
    }

    function deleteClient(id) {
        if (confirm('¿Estás seguro de que quieres borrar este cliente? Esta acción no se puede deshacer.')) {
            clients = clients.filter(client => client.id !== id);
            saveClients();
            const currentClientSearchInput = document.getElementById('clientSearchInput');
            const currentClientFilterSelect = document.getElementById('clientFilterSelect');
            renderClientsTable(currentClientSearchInput ? currentClientSearchInput.value : '',
                               currentClientFilterSelect ? currentClientFilterSelect.value : 'nameOrCompany');
        }
    }

    function deleteProveedor(id) {
        if (confirm('¿Estás seguro de que quieres borrar este proveedor? Esta acción no se puede deshacer.')) {
            proveedores = proveedores.filter(p => p.id !== id);
            saveProveedores();
            const searchInput = document.getElementById('proveedorSearchInput');
            const filterSelect = document.getElementById('proveedorFilterSelect');
            renderProveedoresTable(searchInput ? searchInput.value : '', filterSelect ? filterSelect.value : 'nameOrCompany');
        }
    }

    function deleteOperario(id) {
        if (confirm('¿Estás seguro de que quieres borrar este operario? Esta acción no se puede deshacer.')) {
            operarios = operarios.filter(o => o.id !== id);
            saveOperarios();
            const searchInput = document.getElementById('operarioSearchInput');
            const filterSelect = document.getElementById('operarioFilterSelect');
            renderOperariosTable(searchInput ? searchInput.value : '', filterSelect ? filterSelect.value : 'fullName');
        }
    }

    function deletePresupuesto(id) {
        if (confirm('¿Estás seguro de que quieres borrar este presupuesto?')) {
            presupuestos = presupuestos.filter(p => p.id !== id);
            savePresupuestos();
            const searchInput = document.getElementById('presupuestoSearchInput');
            const filterSelect = document.getElementById('presupuestoFilterSelect');
            renderPresupuestosTable(searchInput ? searchInput.value : '', filterSelect ? filterSelect.value : 'numero');
        }
    }

    function deleteOrdenTrabajo(id) {
        if (confirm('¿Estás seguro de que quieres borrar esta orden de trabajo?')) {
            ordenesTrabajo = ordenesTrabajo.filter(o => o.id !== id);
            saveOrdenesTrabajo();
            const searchInput = document.getElementById('ordenTrabajoSearchInput');
            const filterSelect = document.getElementById('ordenTrabajoFilterSelect');
            renderOrdenesTrabajoTable(searchInput ? searchInput.value : '', filterSelect ? filterSelect.value : 'numero');
        }
    }

    function deleteCategory(id) {
        if (subcategories.some(sc => sc.categoryId === id && !sc.isTipo)) { 
            alert('No se puede borrar esta categoría porque tiene subcategorías asociadas. Por favor, borre primero las subcategorías o los Tipos de CAT.');
            return;
        }

        if (confirm('¿Estás seguro de que quieres borrar esta categoría? Esto también eliminará todos los "Tipos de CAT" asociados.')) {
            categories = categories.filter(c => c.id !== id);
            subcategories = subcategories.filter(sc => sc.categoryId !== id); 
            saveCategories();
            saveSubcategories(); 
            renderCategoriesTable();
        }
    }

    function openPresupuestoModal(mode, presupuestoId = null) {
        presupuestoForm.reset();
        presupuestoModeInput.value = mode;
        presupuestoIdInput.value = '';
        presupuestoModalDeleteBtn.style.display = 'none';

        presupuestoClienteSearchInput.value = '';
        presupuestoClienteIdHidden.value = '';
        presupuestoClienteSuggestionsDiv.innerHTML = '';
        presupuestoClienteSearchInput.readOnly = false; 
        presupuestoClienteSearchInput.required = true;

        if (mode === 'create') {
            presupuestoModalLabel.innerHTML = '<i class="fas fa-file-invoice-dollar me-2 text-primary"></i> Crear Nuevo Presupuesto';
            presupuestoModalSubmitBtn.innerHTML = '<i class="fas fa-plus me-2"></i> Añadir Presupuesto';
            presupuestoModalSubmitBtn.className = 'btn btn-primary';
            presupuestoNumeroInput.value = `P-${new Date().getFullYear()}-${String(nextPresupuestoId).padStart(3, '0')}`;
        } else {
            const presupuesto = presupuestos.find(p => p.id === presupuestoId);
            if (!presupuesto) return;
            
            presupuestoIdInput.value = presupuesto.id;
            presupuestoNumeroInput.value = presupuesto.numero;
            
            const client = clients.find(c => c.id === presupuesto.clienteId);
            if (client) {
                presupuestoClienteSearchInput.value = `${client.nameOrCompany} (${client.cifNif})`;
                presupuestoClienteIdHidden.value = client.id;
            } else {
                presupuestoClienteSearchInput.value = '';
                presupuestoClienteIdHidden.value = '';
            }

            presupuestoConceptoInput.value = presupuesto.concepto;
            presupuestoNumSolicitudInput.value = presupuesto.numSolicitud;
            presupuestoTextoInput.value = presupuesto.texto;
            presupuestoImporteInput.value = presupuesto.importe;

            if (mode === 'edit') {
                presupuestoModalLabel.innerHTML = '<i class="fas fa-edit me-2 text-primary"></i> Editar Presupuesto';
                presupuestoModalSubmitBtn.innerHTML = '<i class="fas fa-save me-2"></i> Guardar Cambios';
                presupuestoModalSubmitBtn.className = 'btn btn-warning';
                presupuestoModalDeleteBtn.style.display = 'inline-block';
                presupuestoModalDeleteBtn.onclick = () => {
                    deletePresupuesto(presupuestoId);
                    presupuestoModal.hide();
                };
            }
        }
        presupuestoModal.show();
    }

    function openOrdenTrabajoModal(mode, ordenId = null) {
        ordenTrabajoForm.reset();
        ordenTrabajoModeInput.value = mode;
        ordenTrabajoIdInput.value = '';
        ordenTrabajoModalDeleteBtn.style.display = 'none';

        ordenTrabajoClienteSearchInput.value = '';
        ordenTrabajoClienteIdHidden.value = '';
        ordenTrabajoClienteSuggestionsDiv.innerHTML = '';
        ordenTrabajoClienteSearchInput.readOnly = false; 
        ordenTrabajoClienteSearchInput.required = true;

        // Populate status options
        populateOrdenTrabajoEstadoSelect();

        // Clear existing rows before adding new ones
        workHoursTableBody.innerHTML = '';
        materialsTableBody.innerHTML = '';

        if (mode === 'create') {
            ordenTrabajoModalLabel.innerHTML = '<i class="fas fa-file-alt me-2 text-primary"></i> Crear Orden de Trabajo';
            ordenTrabajoModalSubmitBtn.innerHTML = '<i class="fas fa-plus me-2"></i> Crear Orden';
            ordenTrabajoModalSubmitBtn.className = 'btn btn-primary';
            ordenTrabajoNumeroInput.value = `OT-${new Date().getFullYear()}-${String(nextOrdenTrabajoId).padStart(3, '0')}`;
            addWorkHourRow(); 
            addMaterialRow(); 
        } else {
            const orden = ordenesTrabajo.find(o => o.id === ordenId);
            if (!orden) {
                console.error('Order not found in data array:', ordenId); 
                return;
            }
            ordenTrabajoIdInput.value = orden.id;
            ordenTrabajoNumeroInput.value = orden.numero;
            
            const client = clients.find(c => c.id === orden.clienteId);
            if (client) {
                ordenTrabajoClienteSearchInput.value = `${client.nameOrCompany} (${client.cifNif})`;
                ordenTrabajoClienteIdHidden.value = client.id;
            } else {
                ordenTrabajoClienteSearchInput.value = '';
                ordenTrabajoClienteIdHidden.value = '';
            }

            ordenTrabajoConceptoInput.value = orden.concepto;
            ordenTrabajoEstadoSelect.value = orden.estado;
            ordenTrabajoObservacionesInput.value = orden.observaciones;
            ordenTrabajoImporteInput.value = orden.importe;

            // Sort workHours by date before rendering
            if (orden.workHours && orden.workHours.length > 0) {
                orden.workHours.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Most recent first
                orden.workHours.forEach(wh => addWorkHourRow(wh));
            } else {
                 addWorkHourRow(); 
            }
            // Sort materials by date before rendering
            if (orden.materials && orden.materials.length > 0) {
                orden.materials.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Most recent first
                orden.materials.forEach(mat => addMaterialRow(mat));
            } else {
                addMaterialRow(); 
            }

            if (mode === 'edit') {
                ordenTrabajoModalLabel.innerHTML = '<i class="fas fa-edit me-2 text-primary"></i> Editar Orden de Trabajo';
                ordenTrabajoModalSubmitBtn.innerHTML = '<i class="fas fa-save me-2"></i> Guardar Cambios';
                ordenTrabajoModalSubmitBtn.className = 'btn btn-warning';
                ordenTrabajoModalDeleteBtn.style.display = 'inline-block';
                ordenTrabajoModalDeleteBtn.onclick = () => {
                    deleteOrdenTrabajo(ordenId);
                    ordenTrabajoModal.hide();
                };
            }
        }
        updateTotalOrdenTrabajoImporte();
        ordenTrabajoModal.show();
    }

    function userFormHandler() {
        const mode = userModeInput.value;

        if (mode === 'view') {
            userModal.hide();
            return;
        }
        
        const id = userIdInput.value;
        const userData = {
            name: userNameInput.value,
            level: userLevelSelect.value,
            password: userPasswordInput.value,
        };

        if (mode === 'create') {
            const newUser = { id: nextUserId.toString(), name: userData.name, level: userData.level, password: userData.password };
            users.push(newUser);
            nextUserId++;
        } else if (mode === 'edit') {
            const index = users.findIndex(u => u.id === id);
            if (index > -1) {
                users[index].name = userData.name;
                users[index].level = userData.level;
                if (userData.password) {
                    users[index].password = userData.password;
                }
            }
        }

        saveUsers();
        renderUsersTable();
        userModal.hide();
    }

    function workStatusFormSubmissionHandler(e) {
        e.preventDefault();
        const mode = workStatusModeInput.value;
        const id = workStatusIdInput.value;

        const statusData = {
            name: workStatusNameInput.value,
            description: workStatusDescriptionInput.value,
        };

        if (mode === 'create') {
            const newStatus = { id: nextWorkStatusId.toString(), ...statusData };
            workStatuses.push(newStatus);
            nextWorkStatusId++;
        } else if (mode === 'edit') {
            const index = workStatuses.findIndex(s => s.id === id);
            if (index > -1) {
                workStatuses[index] = { id, ...statusData };
            }
        }

        saveWorkStatuses();
        renderWorkStatusesTable();
        populateOrdenTrabajoEstadoSelect(); 
        workStatusModal.hide();
    }

    function clientFormSubmissionHandler(e) {
        e.preventDefault();
        const mode = clientModeInput.value;
        const id = clientIdInput.value;

        const clientData = {
            nameOrCompany: clientNameOrCompanyInput.value,
            cifNif: clientCifNifInput.value,
            address: clientAddressInput.value,
            city: clientCityInput.value,
            province: clientProvinceInput.value,
            postalCode: clientPostalCodeInput.value,
            phone1: clientPhone1Input.value,
            phone2: clientPhone2Input.value,
            email: clientEmailInput.value,
            observations: clientObservationsInput.value
        };

        if (mode === 'create') {
            const newClient = { id: nextClientId.toString(), ...clientData };
            clients.push(newClient);
            nextClientId++;
        } else if (mode === 'edit') {
            const index = clients.findIndex(c => c.id === id);
            if (index > -1) {
                clients[index] = { id, ...clientData };
            }
        }
        saveClients();
        const currentClientSearchInput = document.getElementById('clientSearchInput');
        const currentClientFilterSelect = document.getElementById('clientFilterSelect');
        renderClientsTable(currentClientSearchInput ? currentClientSearchInput.value : '',
                           currentClientFilterSelect ? currentClientFilterSelect.value : 'nameOrCompany');
        clientModal.hide();
    }

    function proveedorFormSubmissionHandler(e) {
        e.preventDefault();
        const mode = proveedorModeInput.value;
        const id = proveedorIdInput.value;

        const proveedorData = {
            nameOrCompany: proveedorNameOrCompanyInput.value,
            cifNif: proveedorCifNifInput.value,
            address: proveedorAddressInput.value,
            city: proveedorCityInput.value,
            province: proveedorProvinceInput.value,
            postalCode: proveedorPostalCodeInput.value,
            phone1: proveedorPhone1Input.value,
            phone2: proveedorPhone2Input.value,
            email: proveedorEmailInput.value,
            observations: proveedorObservationsInput.value
        };

        if (mode === 'create') {
            const newProveedor = { id: nextProveedorId.toString(), ...proveedorData };
            proveedores.push(newProveedor);
            nextProveedorId++;
        } else if (mode === 'edit') {
            const index = proveedores.findIndex(p => p.id === id);
            if (index > -1) {
                proveedores[index] = { id, ...proveedorData };
            }
        }
        saveProveedores();
        const searchInput = document.getElementById('proveedorSearchInput');
        const filterSelect = document.getElementById('proveedorFilterSelect');
        renderProveedoresTable(searchInput ? searchInput.value : '', filterSelect ? filterSelect.value : 'nameOrCompany');
        proveedorModal.hide();
    }

    function operarioFormSubmissionHandler(e) {
        e.preventDefault();
        const mode = operarioModeInput.value;
        const id = operarioIdInput.value;

        const operarioData = {
            fullName: operarioFullNameInput.value,
            dniNie: operarioDniNieInput.value,
            position: operarioPositionInput.value,
            hireDate: operarioHireDateInput.value,
            phone: operarioPhoneInput.value,
            email: operarioEmailInput.value,
            observations: operarioObservationsInput.value
        };

        if (mode === 'create') {
            const newOperario = { id: nextOperarioId.toString(), ...operarioData };
            operarios.push(newOperario);
            nextOperarioId++;
        } else if (mode === 'edit') {
            const index = operarios.findIndex(o => o.id === id);
            if (index > -1) {
                operarios[index] = { id, ...operarioData };
            }
        }
        saveOperarios();
        const searchInput = document.getElementById('operarioSearchInput');
        const filterSelect = document.getElementById('operarioFilterSelect');
        renderOperariosTable(searchInput ? searchInput.value : '', filterSelect ? filterSelect.value : 'fullName');
        operarioModal.hide();
    }

    function categoryFormSubmissionHandler(e) {
        e.preventDefault();
        const mode = categoryModeInput.value;
        const id = categoryIdInput.value;

        const categoryData = {
            name: categoryNameInput.value,
            code: categoryCodeInput.value,
            observations: categoryObservationsInput.value
        };

        if (mode === 'create') {
            const newCategory = { id: nextCategoryId.toString(), ...categoryData };
            categories.push(newCategory);
            nextCategoryId++;
        } else if (mode === 'edit') {
            const index = categories.findIndex(c => c.id === id);
            if (index > -1) {
                categories[index] = { id, ...categoryData };
            }
        }
        saveCategories();
        renderCategoriesTable();
        categoryModal.hide();
    }

    userForm.addEventListener('submit', userFormHandler);
    workStatusForm.addEventListener('submit', workStatusFormSubmissionHandler);
    clientForm.addEventListener('submit', clientFormSubmissionHandler);
    proveedorForm.addEventListener('submit', proveedorFormSubmissionHandler);
    operarioForm.addEventListener('submit', operarioFormSubmissionHandler);
    categoryForm.addEventListener('submit', categoryFormSubmissionHandler);

    document.addEventListener('click', function(e) {
        if (e.target.closest('#createClientBtn')) {
            openClientModal('create');
        } else if (e.target.closest('.client-name-link')) {
            e.preventDefault();
            const clientId = e.target.closest('.client-name-link').dataset.id;
            openClientModal('edit', clientId); 
        } else if (e.target.closest('.delete-client-btn')) {
            const clientId = e.target.closest('.delete-client-btn').dataset.id;
            deleteClient(clientId);
        } else if (e.target.closest('.history-client-btn')) {
            const clientId = e.target.closest('.history-client-btn').dataset.id;
            alert(`Mostrar historial para el cliente ID: ${clientId} (Funcionalidad por desarrollar)`);
        }
        if (e.target.closest('#createProveedorBtn')) {
            openProveedorModal('create');
        } else if (e.target.closest('.proveedor-name-link')) {
            e.preventDefault();
            const proveedorId = e.target.closest('.proveedor-name-link').dataset.id;
            openProveedorModal('edit', proveedorId);
        } else if (e.target.closest('.delete-proveedor-btn')) {
            const proveedorId = e.target.closest('.delete-proveedor-btn').dataset.id;
            deleteProveedor(proveedorId);
        } else if (e.target.closest('.history-proveedor-btn')) {
            const proveedorId = e.target.closest('.history-proveedor-btn').dataset.id;
            alert(`Mostrar historial para el proveedor ID: ${proveedorId} (Funcionalidad por desarrollar)`);
        }
        if (e.target.closest('#createOperarioBtn')) { 
            openOperarioModal('create');
        } else if (e.target.closest('.operario-name-link')) { 
            e.preventDefault();
            const operarioId = e.target.closest('.operario-name-link').dataset.id;
            openOperarioModal('edit', operarioId);
        } else if (e.target.closest('.view-operario-btn')) { 
            const operarioId = e.target.closest('.view-operario-btn').dataset.id;
            openOperarioModal('view', operarioId);
        } else if (e.target.closest('.edit-operario-btn')) { 
            const operarioId = e.target.closest('.edit-operario-btn').dataset.id;
            openOperarioModal('edit', operarioId);
        } else if (e.target.closest('.delete-operario-btn')) { 
            const operarioId = e.target.closest('.delete-operario-btn').dataset.id;
            if (confirm('¿Estás seguro de que quieres borrar este operario? Esta acción no se puede deshacer.')) {
                deleteOperario(operarioId);
            }
        }
        if (e.target.closest('#createPresupuestoBtn')) {
            openPresupuestoModal('create');
        } else if (e.target.closest('.presupuesto-numero-link')) {
            e.preventDefault();
            const presupuestoId = e.target.closest('.presupuesto-numero-link').dataset.id;
            openPresupuestoModal('edit', presupuestoId);
        }
        if (e.target.closest('#createOrdenTrabajoBtn')) {
            openOrdenTrabajoModal('create');
        } else if (e.target.closest('.orden-trabajo-numero-link')) {
            e.preventDefault();
            const ordenId = e.target.closest('.orden-trabajo-numero-link').dataset.id;
            openOrdenTrabajoModal('edit', ordenId);
        }
        if (e.target.closest('#openChatBtn')) {
            renderChatUsersList();
            messageModal.show();
        }
    });

    function addWorkHourRow(data = {}) {
        const row = workHoursTableBody.insertRow();
        row.innerHTML = `
            <td><select class="form-select form-select-sm work-operario"></select></td>
            <td><select class="form-select form-select-sm work-categoria"></select></td>
            <td><select class="form-select form-select-sm work-tipo"></select></td>
            <td><input type="date" class="form-control form-control-sm work-fecha" value="${data.fecha || ''}"></td>
            <td><input type="text" class="form-control form-control-sm work-concepto" value="${data.concepto || ''}"></td>
            <td><input type="number" step="0.01" min="0" class="form-control form-control-sm work-horas" value="${data.horas || '0.00'}"></td>
            <td><input type="number" class="form-control form-control-sm work-importe" value="${data.importe || '0.00'}" readonly></td>
            <td><button type="button" class="btn btn-sm edit-btn" style="width: 25px; height: 25px; display: inline-flex; align-items: center; justify-content: center;"><i class="bi bi-trash"></i></button></td>
        `;
        
        const operarioSelect = row.querySelector('.work-operario');
        const categoriaSelect = row.querySelector('.work-categoria');
        const tipoSelect = row.querySelector('.work-tipo');

        operarioSelect.innerHTML = '<option value="">Seleccionar operario...</option>';
        operarios.forEach(operario => {
            const option = document.createElement('option');
            option.value = operario.id;
            option.textContent = operario.fullName;
            operarioSelect.appendChild(option);
        });
        
        categoriaSelect.innerHTML = '<option value="">Seleccionar categoría...</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categoriaSelect.appendChild(option);
        });
        
        if (data.operarioId) operarioSelect.value = data.operarioId;
        if (data.categoriaId) {
            categoriaSelect.value = data.categoriaId;
            tipoSelect.innerHTML = '<option value="">Seleccionar tipo...</option>';
            const relevantSubcategories = subcategories.filter(sc => sc.categoryId === data.categoriaId && sc.isTipo);
            relevantSubcategories.forEach(sub => {
                const option = document.createElement('option');
                option.value = sub.importe; 
                option.textContent = sub.name + ` (${parseFloat(sub.importe).toFixed(2)} €/hr)`;
                tipoSelect.appendChild(option);
            });
            if (data.subcategoriaImporte) tipoSelect.value = data.subcategoriaImporte;
        }
    }

    function addMaterialRow(data = {}) {
        const row = materialsTableBody.insertRow();
        row.innerHTML = `
            <td><select class="form-select form-select-sm material-proveedor"></select></td>
            <td><input type="text" class="form-control form-control-sm material-albaran" value="${data.albaran || ''}"></td>
            <td><input type="date" class="form-control form-control-sm material-fecha" value="${data.fecha || ''}"></td>
            <td><input type="text" class="form-control form-control-sm material-concepto" value="${data.concepto || ''}"></td>
            <td><input type="number" min="0" class="form-control form-control-sm material-cantidad" value="${data.cantidad || '1'}"></td>
            <td><input type="number" step="0.01" min="0" class="form-control form-control-sm material-importe-unidad" value="${data.importeUnidad || '0.00'}"></td>
            <td><input type="number" min="0" max="100" class="form-control form-control-sm material-descuento" value="${data.descuento || '0'}"></td>
            <td><input type="number" class="form-control form-control-sm material-importe-descuento" value="${data.importeDescuento || '0.00'}" readonly></td>
            <td><input type="number" class="form-control form-control-sm material-importe-total" value="${data.importeTotal || '0.00'}" readonly></td>
            <td><button type="button" class="btn btn-sm edit-btn" style="width: 25px; height: 25px; display: inline-flex; align-items: center; justify-content: center;"><i class="bi bi-trash"></i></button></td>
        `;
        
        const proveedorSelect = row.querySelector('.material-proveedor');
        proveedorSelect.innerHTML = '<option value="">Seleccionar proveedor...</option>';
        proveedores.forEach(proveedor => {
            const option = document.createElement('option');
            option.value = proveedor.id;
            option.textContent = proveedor.nameOrCompany;
            proveedorSelect.appendChild(option);
        });
        if (data.proveedorId) proveedorSelect.value = data.proveedorId;
    }

    function calculateWorkHourRow(row) {
        const tipoRate = parseFloat(row.querySelector('.work-tipo').value) || 0;
        const horas = parseFloat(row.querySelector('.work-horas').value) || 0;
        const importeInput = row.querySelector('.work-importe');
        importeInput.value = (tipoRate * horas).toFixed(2);
        updateTotalOrdenTrabajoImporte();
    }
    
    function calculateMaterialRow(row) {
        const cantidad = parseFloat(row.querySelector('.material-cantidad').value) || 0;
        const importeUnidad = parseFloat(row.querySelector('.material-importe-unidad').value) || 0;
        const descuentoPct = parseFloat(row.querySelector('.material-descuento').value) || 0;
        const importeDescuentoInput = row.querySelector('.material-importe-descuento');
        const importeTotalInput = row.querySelector('.material-importe-total');

        const rawTotal = cantidad * importeUnidad;
        const importeDescuentoValue = (rawTotal * (descuentoPct / 100));
        const importeTotalValue = rawTotal - importeDescuentoValue;

        importeDescuentoInput.value = importeDescuentoValue.toFixed(2);
        importeTotalInput.value = importeTotalValue.toFixed(2);
        updateTotalOrdenTrabajoImporte();
    }

    function updateTotalOrdenTrabajoImporte() {
        let total = 0;
        if (workHoursTableBody) {
            workHoursTableBody.querySelectorAll('tr').forEach(row => {
                total += parseFloat(row.querySelector('.work-importe').value) || 0;
            });
        }
        if (materialsTableBody) {
            materialsTableBody.querySelectorAll('tr').forEach(row => {
                total += parseFloat(row.querySelector('.material-importe-total').value) || 0;
            });
            ordenTrabajoImporteInput.value = total.toFixed(2); 
        }
        ordenTrabajoImporteInput.value = total.toFixed(2);
    }

    if (addWorkHourRowBtn) {
        addWorkHourRowBtn.addEventListener('click', () => addWorkHourRow());
    }
    if (addMaterialRowBtn) {
        addMaterialRowBtn.addEventListener('click', () => addMaterialRow());
    }

    ordenTrabajoModalEl.addEventListener('click', function(e) {
        if (e.target.closest('.edit-btn')) { 
            e.target.closest('tr').remove();
            updateTotalOrdenTrabajoImporte();
        }
    });

    ordenTrabajoModalEl.addEventListener('change', function(e) {
        if (e.target.matches('.work-categoria')) {
            const tipoSelect = e.target.closest('tr').querySelector('.work-tipo');
            tipoSelect.innerHTML = '<option value="">Seleccionar tipo...</option>';
            const relevantSubcategories = subcategories.filter(sc => sc.categoryId === e.target.value && sc.isTipo);
            relevantSubcategories.forEach(sub => {
                const option = document.createElement('option');
                option.value = sub.importe; 
                option.textContent = sub.name + ` (${parseFloat(sub.importe).toFixed(2)} €/hr)`;
                tipoSelect.appendChild(option);
            });
            calculateWorkHourRow(e.target.closest('tr'));
        }
        if (e.target.matches('.work-tipo, .work-horas')) {
            calculateWorkHourRow(e.target.closest('tr'));
        }
        if (e.target.matches('.material-cantidad, .material-importe-unidad, .material-descuento')) {
            calculateMaterialRow(e.target.closest('tr'));
        }
    });

    ordenTrabajoModalEl.addEventListener('input', function(e) { 
        if (e.target.matches('.work-horas')) {
            calculateWorkHourRow(e.target.closest('tr'));
        }
        if (e.target.matches('.material-cantidad, .material-importe-unidad, .material-descuento')) {
            calculateMaterialRow(e.target.closest('tr'));
        }
    });

    ordenTrabajoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const mode = ordenTrabajoModeInput.value;
        const id = ordenTrabajoIdInput.value;

        if (!ordenTrabajoClienteIdHidden.value) {
            alert('Por favor, selecciona un cliente válido.');
            ordenTrabajoClienteSearchInput.focus();
            return;
        }

        const workHoursData = [];
        if (workHoursTableBody) {
            workHoursTableBody.querySelectorAll('tr').forEach(row => {
                const operario = row.querySelector('.work-operario').value;
                const categoria = row.querySelector('.work-categoria').value;
                const tipo = row.querySelector('.work-tipo').value;
                if (operario || categoria || tipo || row.querySelector('.work-fecha').value || row.querySelector('.work-concepto').value) { 
                    workHoursData.push({
                        operarioId: operario,
                        categoriaId: categoria,
                        subcategoriaImporte: tipo,
                        fecha: row.querySelector('.work-fecha').value,
                        concepto: row.querySelector('.work-concepto').value,
                        horas: row.querySelector('.work-horas').value,
                        importe: row.querySelector('.work-importe').value
                    });
                }
            });
        }
        
        const materialsData = [];
        if (materialsTableBody) {
            materialsTableBody.querySelectorAll('tr').forEach(row => {
                const proveedor = row.querySelector('.material-proveedor').value;
                const albaran = row.querySelector('.material-albaran').value;
                if (proveedor || albaran || row.querySelector('.material-fecha').value || row.querySelector('.material-concepto').value) { 
                    materialsData.push({
                        proveedorId: proveedor,
                        albaran: albaran,
                        fecha: row.querySelector('.material-fecha').value,
                        concepto: row.querySelector('.material-concepto').value,
                        cantidad: row.querySelector('.material-cantidad').value,
                        importeUnidad: row.querySelector('.material-importe-unidad').value,
                        descuento: row.querySelector('.material-descuento').value,
                        importeDescuento: row.querySelector('.material-importe-descuento').value,
                        importeTotal: row.querySelector('.material-importe-total').value
                    });
                }
            });
        }

        const data = {
            numero: ordenTrabajoNumeroInput.value,
            clienteId: ordenTrabajoClienteIdHidden.value, 
            concepto: ordenTrabajoConceptoInput.value,
            estado: ordenTrabajoEstadoSelect.value,
            observaciones: ordenTrabajoObservacionesInput.value,
            importe: ordenTrabajoImporteInput.value,
            workHours: workHoursData,
            materials: materialsData
        };

        if (mode === 'create') {
            const newItem = { id: nextOrdenTrabajoId.toString(), ...data };
            ordenesTrabajo.push(newItem);
            nextOrdenTrabajoId++;
        } else if (mode === 'edit') {
            const index = ordenesTrabajo.findIndex(o => o.id === id);
            if (index > -1) {
                ordenesTrabajo[index] = { id, ...data };
            }
        }

        saveOrdenesTrabajo();
        const searchInput = document.getElementById('ordenTrabajoSearchInput');
        const filterSelect = document.getElementById('ordenTrabajoFilterSelect');
        renderOrdenesTrabajoTable(searchInput ? searchInput.value : '', filterSelect ? filterSelect.value : 'numero');
        ordenTrabajoModal.hide();
    });

    presupuestoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const mode = presupuestoModeInput.value;
        const id = presupuestoIdInput.value;

        if (!presupuestoClienteIdHidden.value) {
            alert('Por favor, selecciona un cliente válido.');
            presupuestoClienteSearchInput.focus();
            return;
        }

        const data = {
            numero: presupuestoNumeroInput.value,
            clienteId: presupuestoClienteIdHidden.value, 
            concepto: presupuestoConceptoInput.value,
            numSolicitud: presupuestoNumSolicitudInput.value,
            texto: presupuestoTextoInput.value,
            importe: presupuestoImporteInput.value
        };

        if (mode === 'create') {
            const newItem = { id: nextPresupuestoId.toString(), ...data };
            presupuestos.push(newItem);
            nextPresupuestoId++;
        } else if (mode === 'edit') {
            const index = presupuestos.findIndex(p => p.id === id);
            if (index > -1) {
                presupuestos[index] = { id, ...data };
            }
        }

        savePresupuestos();
        const searchInput = document.getElementById('presupuestoSearchInput');
        const filterSelect = document.getElementById('presupuestoFilterSelect');
        renderPresupuestosTable(searchInput ? searchInput.value : '', filterSelect ? filterSelect.value : 'numero');
        presupuestoModal.hide();
    });

    const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
    const openChatBtn = document.getElementById('openChatBtn');
    const chatUsersList = document.getElementById('chatUsersList');
    const chatPartnerName = document.getElementById('chatPartnerName');
    const chatMessagesContainer = document.getElementById('chatMessagesContainer');
    const chatMessageInput = document.getElementById('chatMessageInput');
    const sendChatMessageBtn = document.getElementById('sendChatMessageBtn');
    const noChatSelectedMessage = document.getElementById('noChatSelectedMessage');
    const chatInputArea = document.getElementById('chatInputArea');

    let currentChatPartnerId = null;

    function renderChatUsersList() {
        chatUsersList.innerHTML = '';
        users.forEach(user => {
            const userItem = document.createElement('li');
            userItem.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'align-items-center');
            userItem.style.cursor = 'pointer';
            userItem.dataset.userId = user.id;
            userItem.innerHTML = `
                <img src="https://via.placeholder.com/30" alt="Avatar" class="rounded-circle me-2">
                <span>${user.name}</span>
                <span class="ms-auto badge bg-success rounded-pill">Online</span>
            `;
            userItem.addEventListener('click', () => selectChatPartner(user.id, user.name));
            chatUsersList.appendChild(userItem);
        });

        chatUsersList.querySelectorAll('li').forEach(item => {
            if (item.dataset.userId === currentChatPartnerId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function selectChatPartner(userId, userName) {
        currentChatPartnerId = userId;
        chatPartnerName.textContent = `Chat con ${userName}`;
        noChatSelectedMessage.style.display = 'none';
        chatInputArea.style.display = 'block';

        chatUsersList.querySelectorAll('li').forEach(item => {
            if (item.dataset.userId === userId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        renderChatMessages();
        chatMessageInput.focus();
    }

    function renderChatMessages() {
        chatMessagesContainer.innerHTML = '';
        const messages = chatMessages[currentChatPartnerId] || [];

        if (messages.length === 0) {
            chatMessagesContainer.innerHTML = `
                <div class="text-center text-muted mt-5">
                    <i class="fas fa-comment-dots fs-1 mb-3"></i>
                    <p>¡Dile hola a ${chatPartnerName.textContent.replace('Chat con ', '')}!</p>
                </div>
            `;
            return;
        }

        messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message-bubble', msg.isSentBySelf ? 'sent' : 'received');
            messageDiv.textContent = msg.text;

            const time = new Date(msg.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            const date = new Date(msg.timestamp).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });

            const metaSpan = document.createElement('small');
            metaSpan.classList.add('message-meta', 'd-block');
            metaSpan.textContent = msg.isSentBySelf ? `Tú, ${date} ${time}` : `${chatPartnerName.textContent.replace('Chat con ', '')}, ${date} ${time}`;

            chatMessagesContainer.appendChild(messageDiv);
            chatMessagesContainer.appendChild(metaSpan);
        });

        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight; 
    }

    function sendChatMessage() {
        const messageText = chatMessageInput.value.trim();
        if (messageText === '' || !currentChatPartnerId) {
            return;
        }

        const newMessage = {
            text: messageText,
            timestamp: new Date().toISOString(),
            isSentBySelf: true 
        };

        if (!chatMessages[currentChatPartnerId]) {
            chatMessages[currentChatPartnerId] = [];
        }
        chatMessages[currentChatPartnerId].push(newMessage);
        saveChatMessages();
        chatMessageInput.value = '';
        renderChatMessages();
    }

    openChatBtn.addEventListener('click', () => {
        renderChatUsersList();
        currentChatPartnerId = null; 
        chatPartnerName.textContent = 'Selecciona un usuario para chatear';
        noChatSelectedMessage.style.display = 'block';
        chatInputArea.style.display = 'none';
        chatMessagesContainer.innerHTML = '';
        messageModal.show();
    });

    sendChatMessageBtn.addEventListener('click', sendChatMessage);
    chatMessageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
});
