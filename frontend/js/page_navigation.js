// Implementação de navegação por páginas separadas

document.addEventListener('DOMContentLoaded', function() {
  // Configurar navegação por páginas
  setupPageNavigation();
});

// Configurar navegação por páginas separadas
function setupPageNavigation() {
  // Obter todos os links de navegação
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Obter todas as seções principais
  const sections = document.querySelectorAll('.section');
  
  // Criar páginas separadas para cada seção
  createSeparatePages(sections);
  
  // Adicionar event listeners aos links de navegação
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Obter o ID da seção alvo
      const targetId = this.getAttribute('href').substring(1);
      
      // Navegar para a página correspondente
      navigateToPage(targetId);
      
      // Atualizar classe ativa no menu
      updateActiveNavLink(this);
      
      // Fechar menu mobile se estiver aberto
      const navContainer = document.querySelector('.nav-container');
      const overlay = document.querySelector('.overlay');
      if (navContainer && navContainer.classList.contains('active')) {
        navContainer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Configurar navegação inicial com base na URL
  setupInitialNavigation();
}

// Criar páginas separadas para cada seção
function createSeparatePages(sections) {
  // Obter o container principal
  const mainContainer = document.querySelector('.main-container');
  
  if (!mainContainer) return;
  
  // Criar container para páginas
  const pagesContainer = document.createElement('div');
  pagesContainer.className = 'pages-container';
  
  // Mover a barra de pesquisa para fora das seções
  const searchContainer = document.querySelector('.search-container');
  if (searchContainer) {
    mainContainer.insertBefore(searchContainer, mainContainer.firstChild);
  }
  
  // Mover cada seção para o container de páginas
  sections.forEach(section => {
    // Criar uma página para cada seção
    const page = document.createElement('div');
    page.className = 'page';
    page.id = `page-${section.id}`;
    page.dataset.sectionId = section.id;
    
    // Inicialmente, esconder todas as páginas
    page.style.display = 'none';
    
    // Mover a seção para a página
    mainContainer.removeChild(section);
    page.appendChild(section);
    
    // Adicionar a página ao container de páginas
    pagesContainer.appendChild(page);
  });
  
  // Adicionar o container de páginas ao container principal
  mainContainer.appendChild(pagesContainer);
  
  // Adicionar estilos CSS para as páginas
  addPageStyles();
}

// Adicionar estilos CSS para as páginas
function addPageStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .pages-container {
      width: 100%;
    }
    
    .page {
      width: 100%;
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

// Navegar para uma página específica
function navigateToPage(sectionId) {
  // Esconder todas as páginas
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.style.display = 'none';
  });
  
  // Mostrar a página alvo
  const targetPage = document.getElementById(`page-${sectionId}`);
  if (targetPage) {
    targetPage.style.display = 'block';
    
    // Atualizar URL com hash
    window.location.hash = sectionId;
    
    // Rolar para o topo
    window.scrollTo(0, 0);
  } else {
    // Se a página não existir, mostrar a primeira página
    const firstPage = document.querySelector('.page');
    if (firstPage) {
      firstPage.style.display = 'block';
      
      // Atualizar URL com hash da primeira página
      const firstSectionId = firstPage.dataset.sectionId;
      window.location.hash = firstSectionId;
    }
  }
}

// Atualizar link ativo no menu
function updateActiveNavLink(activeLink) {
  // Remover classe ativa de todos os links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Adicionar classe ativa ao link clicado
  activeLink.classList.add('active');
}

// Configurar navegação inicial com base na URL
function setupInitialNavigation() {
  // Verificar se há um hash na URL
  const hash = window.location.hash;
  
  if (hash) {
    // Remover o # do início
    const sectionId = hash.substring(1);
    
    // Navegar para a página correspondente
    navigateToPage(sectionId);
    
    // Atualizar link ativo no menu
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
      updateActiveNavLink(activeLink);
    }
  } else {
    // Se não houver hash, mostrar a primeira página
    const firstPage = document.querySelector('.page');
    if (firstPage) {
      firstPage.style.display = 'block';
      
      // Atualizar URL com hash da primeira página
      const firstSectionId = firstPage.dataset.sectionId;
      window.location.hash = firstSectionId;
      
      // Atualizar link ativo no menu
      const activeLink = document.querySelector(`.nav-link[href="#${firstSectionId}"]`);
      if (activeLink) {
        updateActiveNavLink(activeLink);
      }
    }
  }
}

// Configurar evento para o logo (retornar à página inicial)
document.addEventListener('DOMContentLoaded', function() {
  const logoContainer = document.querySelector('.logo-container');
  
  if (logoContainer) {
    logoContainer.style.cursor = 'pointer';
    
    logoContainer.addEventListener('click', function() {
      // Navegar para a primeira página
      const firstPage = document.querySelector('.page');
      if (firstPage) {
        const firstSectionId = firstPage.dataset.sectionId;
        navigateToPage(firstSectionId);
        
        // Atualizar link ativo no menu
        const activeLink = document.querySelector(`.nav-link[href="#${firstSectionId}"]`);
        if (activeLink) {
          updateActiveNavLink(activeLink);
        }
      }
    });
  }
});

// Lidar com eventos de navegação do navegador (botões voltar/avançar)
window.addEventListener('popstate', function() {
  // Verificar se há um hash na URL
  const hash = window.location.hash;
  
  if (hash) {
    // Remover o # do início
    const sectionId = hash.substring(1);
    
    // Navegar para a página correspondente
    navigateToPage(sectionId);
    
    // Atualizar link ativo no menu
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
      updateActiveNavLink(activeLink);
    }
  }
});
