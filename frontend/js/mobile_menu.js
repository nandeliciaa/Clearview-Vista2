// Melhorar o menu mobile e implementar a barra lateral

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar menu mobile melhorado
  initMobileMenu();
});

// Inicializar menu mobile melhorado
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navContainer = document.querySelector('.nav-container');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const body = document.body;
  
  // Verificar se os elementos existem
  if (mobileMenuToggle && navContainer) {
    // Criar overlay para o menu mobile se não existir
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'overlay';
      body.appendChild(overlay);
    }
    
    // Adicionar event listener para o botão de menu
    mobileMenuToggle.addEventListener('click', function() {
      navContainer.classList.add('active');
      overlay.classList.add('active');
      body.style.overflow = 'hidden';
    });
    
    // Adicionar event listener para o botão de fechar
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', function() {
        navContainer.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
      });
    }
    
    // Adicionar event listener para o overlay
    overlay.addEventListener('click', function() {
      navContainer.classList.remove('active');
      overlay.classList.remove('active');
      body.style.overflow = '';
    });
    
    // Adicionar event listener para os links do menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Fechar o menu ao clicar em um link
        navContainer.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
      });
    });
    
    // Adicionar event listener para os botões de login e registro
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (loginBtn) {
      loginBtn.addEventListener('click', function() {
        // Fechar o menu ao clicar no botão de login
        navContainer.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
      });
    }
    
    if (registerBtn) {
      registerBtn.addEventListener('click', function() {
        // Fechar o menu ao clicar no botão de registro
        navContainer.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
      });
    }
  }
}
