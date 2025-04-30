// Melhorias para a versão mobile do site da Clearview Capital

document.addEventListener('DOMContentLoaded', function() {
  // Melhorar comportamento do menu mobile
  initMobileMenu();
  
  // Ajustar espaçamento dos botões no header
  adjustHeaderButtons();
  
  // Corrigir comportamento responsivo
  fixResponsiveIssues();
});

// Inicializar menu mobile melhorado
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navContainer = document.querySelector('.nav-container');
  const body = document.body;
  
  // Verificar se os elementos existem
  if (mobileMenuToggle && navContainer) {
    // Criar overlay para o menu mobile
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    body.appendChild(overlay);
    
    // Adicionar event listener para o botão de menu
    mobileMenuToggle.addEventListener('click', function() {
      navContainer.classList.toggle('active');
      overlay.classList.toggle('active');
      body.style.overflow = navContainer.classList.contains('active') ? 'hidden' : '';
    });
    
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
  }
}

// Ajustar espaçamento dos botões no header
function adjustHeaderButtons() {
  const userActions = document.querySelector('.user-actions');
  
  if (userActions) {
    // Garantir que há espaçamento entre os botões
    userActions.style.gap = '10px';
    
    // Ajustar tamanho dos botões em telas menores
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleScreenChange(e) {
      if (e.matches) {
        // Tela pequena
        userActions.querySelectorAll('.btn').forEach(btn => {
          btn.style.padding = '0.4rem 0.8rem';
          btn.style.fontSize = '0.9rem';
        });
      } else {
        // Tela normal
        userActions.querySelectorAll('.btn').forEach(btn => {
          btn.style.padding = '0.5rem 1rem';
          btn.style.fontSize = '1rem';
        });
      }
    }
    
    // Executar inicialmente
    handleScreenChange(mediaQuery);
    
    // Adicionar listener para mudanças de tamanho
    mediaQuery.addEventListener('change', handleScreenChange);
  }
}

// Corrigir problemas de responsividade
function fixResponsiveIssues() {
  // Ajustar altura do header em dispositivos móveis
  const header = document.querySelector('.header');
  if (header) {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleScreenChange(e) {
      if (e.matches) {
        // Tela pequena
        header.style.padding = '0.75rem 1rem';
      } else {
        // Tela normal
        header.style.padding = '1rem 2rem';
      }
    }
    
    // Executar inicialmente
    handleScreenChange(mediaQuery);
    
    // Adicionar listener para mudanças de tamanho
    mediaQuery.addEventListener('change', handleScreenChange);
  }
  
  // Melhorar comportamento da barra de pesquisa em dispositivos móveis
  const searchContainer = document.querySelector('.search-container');
  if (searchContainer) {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleScreenChange(e) {
      if (e.matches) {
        // Tela pequena
        searchContainer.style.margin = '1rem auto';
      } else {
        // Tela normal
        searchContainer.style.margin = '2rem auto';
      }
    }
    
    // Executar inicialmente
    handleScreenChange(mediaQuery);
    
    // Adicionar listener para mudanças de tamanho
    mediaQuery.addEventListener('change', handleScreenChange);
  }
  
  // Ajustar tamanho dos cards em dispositivos móveis
  const cards = document.querySelectorAll('.card');
  if (cards.length > 0) {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleScreenChange(e) {
      if (e.matches) {
        // Tela pequena
        cards.forEach(card => {
          card.style.padding = '1rem';
        });
      } else {
        // Tela normal
        cards.forEach(card => {
          card.style.padding = '1.5rem';
        });
      }
    }
    
    // Executar inicialmente
    handleScreenChange(mediaQuery);
    
    // Adicionar listener para mudanças de tamanho
    mediaQuery.addEventListener('change', handleScreenChange);
  }
  
  // Melhorar visualização de tabelas em dispositivos móveis
  const tables = document.querySelectorAll('.stock-table');
  if (tables.length > 0) {
    tables.forEach(table => {
      const tableContainer = document.createElement('div');
      tableContainer.className = 'table-responsive';
      tableContainer.style.overflowX = 'auto';
      tableContainer.style.width = '100%';
      
      // Substituir a tabela pelo container com a tabela dentro
      table.parentNode.insertBefore(tableContainer, table);
      tableContainer.appendChild(table);
    });
  }
}

// Função para verificar se o dispositivo é mobile
function isMobileDevice() {
  return (window.innerWidth <= 768) || 
         (navigator.userAgent.match(/Android/i)) || 
         (navigator.userAgent.match(/webOS/i)) || 
         (navigator.userAgent.match(/iPhone/i)) || 
         (navigator.userAgent.match(/iPad/i)) || 
         (navigator.userAgent.match(/iPod/i)) || 
         (navigator.userAgent.match(/BlackBerry/i)) || 
         (navigator.userAgent.match(/Windows Phone/i));
}

// Ajustar layout com base no dispositivo
window.addEventListener('load', function() {
  if (isMobileDevice()) {
    // Aplicar ajustes específicos para mobile
    document.body.classList.add('mobile-device');
    
    // Ajustar tamanho da fonte para melhor legibilidade em dispositivos móveis
    document.body.style.fontSize = '16px';
    
    // Garantir que o zoom esteja correto
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
    }
  }
});

// Ajustar layout quando a orientação do dispositivo mudar
window.addEventListener('orientationchange', function() {
  // Pequeno delay para garantir que as dimensões foram atualizadas
  setTimeout(function() {
    fixResponsiveIssues();
    adjustHeaderButtons();
  }, 300);
});
