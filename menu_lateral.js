document.addEventListener('DOMContentLoaded', function() {
    const submenuToggles = document.querySelectorAll('.sidebar .submenu-toggle');

    submenuToggles.forEach(toggle => {
        // Verifica se o submenu correspondente contém um link ativo, e se sim, abre o toggle.
        // Isso é feito após a lógica de marcar links ativos.

        toggle.addEventListener('click', function(event) {
            event.preventDefault(); 
            
            this.classList.toggle('open');
            const submenu = this.nextElementSibling;
            if (submenu) {
                if (submenu.style.display === 'block') {
                    submenu.style.display = 'none';
                } else {
                    submenu.style.display = 'block';
                }
            }
        });
    });

    const currentLocation = window.location.pathname;
    const allLinks = document.querySelectorAll('.sidebar .menu-principal a');
    
    let bestMatchLink = null;
    let longestMatchLength = 0;

    allLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (!linkHref || linkHref === '#') {
            return;
        }

        if (currentLocation.startsWith(linkHref)) {
            const isExactOrPrefix = currentLocation === linkHref || currentLocation.charAt(linkHref.length) === '/';
            
            if (isExactOrPrefix && linkHref.length > longestMatchLength) {
                longestMatchLength = linkHref.length;
                bestMatchLink = link;
            }
        }
    });
    
    if (bestMatchLink) {
        bestMatchLink.classList.add('active');
        
        const parentSubmenu = bestMatchLink.closest('.submenu');
        if (parentSubmenu) {
            parentSubmenu.style.display = 'block';
            const toggle = parentSubmenu.previousElementSibling; 
            if (toggle && toggle.classList.contains('submenu-toggle')) {
                toggle.classList.add('open');
                toggle.classList.add('active'); 
            }
        } else {
            const nextElement = bestMatchLink.nextElementSibling;
            if (bestMatchLink.classList.contains('submenu-toggle') && nextElement && nextElement.classList.contains('submenu')) {
                // Se o link ativo é o próprio toggle de um submenu (que não foi aberto por um filho ativo)
                // Isso pode não ser necessário se os toggles principais têm href="#"
                // Mas se eles tiverem hrefs válidos e forem o bestMatch, precisamos abrir.
                // A lógica no início do forEach para submenuToggles deve cobrir isso melhor.
            }
        }
    }

    // Segunda passada para garantir que toggles com filhos ativos sejam abertos e ativos
    // Isso é um pouco redundante com a parte do bestMatchLink, mas garante o estado visual do toggle pai.
    submenuToggles.forEach(toggle => {
        const submenu = toggle.nextElementSibling;
        if (submenu && submenu.querySelector('a.active')) {
            toggle.classList.add('open');
            toggle.classList.add('active'); // Adiciona 'active' também ao toggle pai
            if (submenu) submenu.style.display = 'block';
        }
    });
   
});

