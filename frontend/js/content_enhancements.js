// Funções para adicionar imagens ilustrativas e botões "Ler mais"

document.addEventListener('DOMContentLoaded', function() {
  // Adicionar imagens ilustrativas às notícias
  addNewsImages();
  
  // Adicionar botões "Ler mais" aos relatórios e decisões
  addReadMoreButtons();
});

// Adicionar imagens ilustrativas às notícias
function addNewsImages() {
  // Obter todas as notícias
  const newsCards = document.querySelectorAll('.news-card');
  
  // Imagens ilustrativas para as notícias (URLs de imagens de exemplo)
  const newsImages = [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', // Mercado financeiro
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', // Gráficos
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', // Dinheiro
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', // Bolsa de valores
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'  // Análise de dados
  ];
  
  // Adicionar imagens às notícias
  newsCards.forEach((card, index) => {
    // Verificar se já existe uma imagem
    let imageElement = card.querySelector('.news-image');
    
    if (!imageElement) {
      // Criar elemento de imagem
      imageElement = document.createElement('img');
      imageElement.className = 'news-image';
      
      // Selecionar imagem da lista (de forma cíclica)
      const imageUrl = newsImages[index % newsImages.length];
      imageElement.src = imageUrl;
      imageElement.alt = 'Imagem ilustrativa da notícia';
      
      // Inserir imagem no início do card
      card.insertBefore(imageElement, card.firstChild);
    }
    
    // Verificar se já existe um botão "Ler mais"
    let readMoreBtn = card.querySelector('.read-more-btn');
    
    if (!readMoreBtn) {
      // Criar botão "Ler mais"
      readMoreBtn = document.createElement('a');
      readMoreBtn.className = 'read-more-btn';
      readMoreBtn.href = '#';
      readMoreBtn.textContent = 'Ler mais';
      
      // Adicionar evento de clique
      readMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Obter título da notícia
        const newsTitle = card.querySelector('.news-title').textContent;
        
        // Simular abertura de notícia completa
        alert(`Notícia completa: ${newsTitle}`);
      });
      
      // Encontrar o elemento de conteúdo da notícia
      const newsContent = card.querySelector('.news-content');
      
      if (newsContent) {
        // Adicionar botão ao final do conteúdo
        newsContent.appendChild(readMoreBtn);
      }
    }
  });
}

// Adicionar botões "Ler mais" aos relatórios e decisões
function addReadMoreButtons() {
  // Obter todos os relatórios
  const reportCards = document.querySelectorAll('.report-card');
  
  // Adicionar botões "Ler mais" aos relatórios
  reportCards.forEach(card => {
    // Verificar se já existe um botão "Ler mais"
    let readMoreBtn = card.querySelector('.read-more-btn');
    
    if (!readMoreBtn) {
      // Obter conteúdo do relatório
      const reportContent = card.querySelector('.report-content');
      
      if (reportContent) {
        // Armazenar conteúdo completo
        const fullContent = reportContent.innerHTML;
        
        // Limitar conteúdo visível (primeiros 150 caracteres)
        const shortContent = fullContent.substring(0, 150) + '...';
        
        // Atualizar conteúdo para versão curta
        reportContent.innerHTML = shortContent;
        reportContent.dataset.fullContent = fullContent;
        reportContent.dataset.isExpanded = 'false';
        
        // Criar botão "Ler mais"
        readMoreBtn = document.createElement('button');
        readMoreBtn.className = 'read-more-btn';
        readMoreBtn.textContent = 'Ler mais';
        
        // Adicionar evento de clique
        readMoreBtn.addEventListener('click', function() {
          const isExpanded = reportContent.dataset.isExpanded === 'true';
          
          if (isExpanded) {
            // Colapsar conteúdo
            reportContent.innerHTML = shortContent;
            reportContent.dataset.isExpanded = 'false';
            readMoreBtn.textContent = 'Ler mais';
          } else {
            // Expandir conteúdo
            reportContent.innerHTML = reportContent.dataset.fullContent;
            reportContent.dataset.isExpanded = 'true';
            readMoreBtn.textContent = 'Ler menos';
          }
        });
        
        // Adicionar botão após o conteúdo
        reportContent.parentNode.insertBefore(readMoreBtn, reportContent.nextSibling);
      }
    }
  });
  
  // Obter seção de decisões
  const decisionSection = document.querySelector('#decisoes');
  
  if (decisionSection) {
    // Obter todos os parágrafos na seção de decisões
    const decisionParagraphs = decisionSection.querySelectorAll('p');
    
    decisionParagraphs.forEach(paragraph => {
      // Verificar se o parágrafo é longo (mais de 150 caracteres)
      if (paragraph.textContent.length > 150 && !paragraph.nextElementSibling?.classList.contains('read-more-btn')) {
        // Armazenar conteúdo completo
        const fullContent = paragraph.innerHTML;
        
        // Limitar conteúdo visível (primeiros 150 caracteres)
        const shortContent = fullContent.substring(0, 150) + '...';
        
        // Atualizar conteúdo para versão curta
        paragraph.innerHTML = shortContent;
        paragraph.dataset.fullContent = fullContent;
        paragraph.dataset.isExpanded = 'false';
        
        // Criar botão "Ler mais"
        const readMoreBtn = document.createElement('button');
        readMoreBtn.className = 'read-more-btn';
        readMoreBtn.textContent = 'Ler mais';
        
        // Adicionar evento de clique
        readMoreBtn.addEventListener('click', function() {
          const isExpanded = paragraph.dataset.isExpanded === 'true';
          
          if (isExpanded) {
            // Colapsar conteúdo
            paragraph.innerHTML = shortContent;
            paragraph.dataset.isExpanded = 'false';
            readMoreBtn.textContent = 'Ler mais';
          } else {
            // Expandir conteúdo
            paragraph.innerHTML = paragraph.dataset.fullContent;
            paragraph.dataset.isExpanded = 'true';
            readMoreBtn.textContent = 'Ler menos';
          }
        });
        
        // Adicionar botão após o parágrafo
        paragraph.parentNode.insertBefore(readMoreBtn, paragraph.nextSibling);
      }
    });
  }
}
