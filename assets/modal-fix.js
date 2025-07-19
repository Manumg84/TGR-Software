// Simple Bootstrap Modal replacement for testing
if (typeof bootstrap === 'undefined') {
    window.bootstrap = {};
    
    class Modal {
        constructor(element) {
            this.element = typeof element === 'string' ? document.querySelector(element) : element;
            this.isShown = false;
        }
        
        show() {
            if (this.isShown) return;
            this.isShown = true;
            this.element.style.display = 'block';
            this.element.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Create backdrop
            this.backdrop = document.createElement('div');
            this.backdrop.className = 'modal-backdrop fade show';
            document.body.appendChild(this.backdrop);
            
            // Close on backdrop click
            this.backdrop.addEventListener('click', () => this.hide());
            
            // Close on X button
            const closeBtn = this.element.querySelector('.btn-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.hide());
            }
        }
        
        hide() {
            if (!this.isShown) return;
            this.isShown = false;
            this.element.style.display = 'none';
            this.element.classList.remove('show');
            document.body.style.overflow = '';
            
            if (this.backdrop) {
                this.backdrop.remove();
                this.backdrop = null;
            }
        }
        
        static getInstance(element) {
            return element._modalInstance || new Modal(element);
        }
    }
    
    class Tab {
        constructor(element) {
            this.element = element;
        }
        
        show() {
            // Simple tab implementation
            const target = this.element.getAttribute('data-bs-target');
            if (target) {
                // Hide all tab panes
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('show', 'active');
                });
                
                // Remove active from all tabs
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Show target pane
                const targetPane = document.querySelector(target);
                if (targetPane) {
                    targetPane.classList.add('show', 'active');
                }
                
                // Make this tab active
                this.element.classList.add('active');
            }
        }
        
        static getInstance(element) {
            return element._tabInstance || new Tab(element);
        }
    }
    
    bootstrap.Modal = Modal;
    bootstrap.Tab = Tab;
}