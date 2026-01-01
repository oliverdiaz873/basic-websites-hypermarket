
   // codigo js para el comportamiento del menu en dispositivos móviles 
  // Primer clic en un enlace de nivel 2: abre el submenú de nivel 3.
 // Segundo clic: sigue el enlace y navega al destino.

document.addEventListener('DOMContentLoaded', function() {     // addEventListener es un método del objeto EventTarget que se usa para asignar un evento a un elemento HTML.
                                                              // en el primer parámetro se especifica el tipo de evento, en este caso 'click' que se activa cuando se hace clic en el botón.
                                                             // en el segundo parámetro se pasa la función que se ejecuta cuando se activa el evento.
    
    
    function activarMenuMovil() {
        // Si el ancho del navegador es menor o igual a 480 px. 
        if(window.innerWidth <= 480) {         // window.innerWidth es una propiedad del objeto window que devuelve el ancho del área visible del navegador (viewport),
                                              // expresado en píxeles; es decir, indica cuántos píxeles de ancho tiene la ventana del navegador en ese momento.
                        
            // Seleccionamos todos los enlaces que tienen submenú
            const enlacesConSubmenu = document.querySelectorAll('nav.menu li > a');   // querySelector() es un método del objeto document que permite obtener el primer elemento HTML que coincida con el selector CSS especificado y almacenarlo en una variable.

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

