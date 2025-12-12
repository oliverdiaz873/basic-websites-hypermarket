

// codigo js para el comportamiento del menu en dispositivos móviles 
  // Primer clic en un enlace de nivel 2: abre el submenú de nivel 3.
 // Segundo clic: sigue el enlace y navega al destino.

document.addEventListener('DOMContentLoaded', function() {
    function activarMenuMovil() {
        if(window.innerWidth <= 480) {
            // Seleccionamos todos los enlaces que tienen submenú
            const enlacesConSubmenu = document.querySelectorAll('nav.menu li > a');

            enlacesConSubmenu.forEach(function(enlace) {
                const subMenu = enlace.nextElementSibling;
                if(subMenu && subMenu.tagName === 'UL') {
                    // Evitamos añadir el mismo listener varias veces
                    if(!enlace.dataset.listenerAdded) {
                        enlace.dataset.listenerAdded = 'true';
                        enlace.addEventListener('click', function(e) {
                            // Si el submenú está oculto, mostramos y prevenimos el link
                            if(subMenu.style.display !== 'flex') {
                                e.preventDefault(); // evita ir al enlace
                                // Ocultamos otros submenús del mismo nivel
                                const hermanos = enlace.parentElement.parentElement.children;
                                Array.from(hermanos).forEach(function(hermano){
                                    if(hermano !== enlace.parentElement) {
                                        const ulH = hermano.querySelector('ul');
                                        if(ulH) ulH.style.display = 'none';
                                    }
                                });
                                subMenu.style.display = 'flex'; // mostramos el submenú
                            }
                            // Si ya estaba abierto, el clic seguirá al enlace
                        });
                    }
                }
            });

            // Cerrar submenús al hacer clic fuera
            document.addEventListener('click', function(e) {
                if(!e.target.closest('nav.menu')) {
                    document.querySelectorAll('nav.menu ul ul').forEach(function(ul){
                        ul.style.display = 'none';
                    });
                }
            });
        } else {
            // En escritorio, limpiamos estilos inline para que CSS funcione normalmente
            document.querySelectorAll('nav.menu ul ul').forEach(function(ul){
                ul.style.display = '';
            });
        }
    }

    // Activar al cargar
    activarMenuMovil();

    // Activar también al redimensionar
    window.addEventListener('resize', activarMenuMovil);
});

