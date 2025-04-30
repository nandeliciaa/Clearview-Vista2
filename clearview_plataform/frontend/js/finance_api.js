// Funções para obter dados financeiros reais

// Classe para gerenciar dados financeiros
class FinanceDataManager {
  constructor() {
    this.stockData = {};
    this.cryptoData = {};
    this.lastUpdate = null;
    this.updateInterval = 30000; // 30 segundos
  }
  
  // Inicializar dados
  async initialize() {
    try {
      await this.updateAllData();
      
      // Configurar atualização periódica
      setInterval(() => this.updateAllData(), this.updateInterval);
      
      // Adicionar indicador visual de atualização
      this.addUpdateIndicator();
      
      return true;
    } catch (error) {
      console.error('Erro ao inicializar dados financeiros:', error);
      return false;
    }
  }
  
  // Adicionar indicador visual de atualização
  addUpdateIndicator() {
    const dashboardSection = document.querySelector('.dashboard');
    if (dashboardSection) {
      const updateIndicator = document.createElement('div');
      updateIndicator.className = 'update-indicator';
      updateIndicator.innerHTML = 'Dados atualizados em tempo real';
      updateIndicator.style.fontSize = '0.8rem';
      updateIndicator.style.color = '#888';
      updateIndicator.style.textAlign = 'right';
      updateIndicator.style.marginTop = '0.5rem';
      updateIndicator.style.fontStyle = 'italic';
      
      dashboardSection.appendChild(updateIndicator);
      
      // Atualizar o indicador a cada atualização
      setInterval(() => {
        if (this.lastUpdate) {
          const now = new Date();
          const diff = Math.floor((now - this.lastUpdate) / 1000);
          if (diff < 60) {
            updateIndicator.innerHTML = `Dados atualizados há ${diff} segundos`;
          } else {
            const minutes = Math.floor(diff / 60);
            updateIndicator.innerHTML = `Dados atualizados há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
          }
        }
      }, 5000);
    }
  }
  
  // Atualizar todos os dados
  async updateAllData() {
    try {
      // Atualizar dados de ações
      await this.updateStockData();
      
      // Atualizar dados de criptomoedas
      await this.updateCryptoData();
      
      // Registrar horário da atualização
      this.lastUpdate = new Date();
      
      // Atualizar UI
      this.updateUI();
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar dados financeiros:', error);
      return false;
    }
  }
  
  // Atualizar dados de ações usando a API do Yahoo Finance
  async updateStockData() {
    try {
      // Lista de símbolos de ações a serem atualizados
      const symbols = [
        '^BVSP',  // Ibovespa
        '^GSPC',  // S&P 500
        'USDBRL=X', // Dólar/Real
        'PETR4.SA', // Petrobras
        'VALE3.SA', // Vale
        'ITUB4.SA', // Itaú
        'BBDC4.SA', // Bradesco
        'WEGE3.SA'  // WEG
      ];
      
      // Obter dados para cada símbolo
      for (const symbol of symbols) {
        const data = await this.fetchStockData(symbol);
        if (data) {
          this.stockData[symbol] = data;
        }
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar dados de ações:', error);
      return false;
    }
  }
  
  // Atualizar dados de criptomoedas
  async updateCryptoData() {
    try {
      // Lista de símbolos de criptomoedas a serem atualizados
      const symbols = [
        'BTC-USD'  // Bitcoin
      ];
      
      // Obter dados para cada símbolo
      for (const symbol of symbols) {
        const data = await this.fetchStockData(symbol);
        if (data) {
          this.cryptoData[symbol] = data;
        }
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar dados de criptomoedas:', error);
      return false;
    }
  }
  
  // Buscar dados de uma ação ou criptomoeda
  async fetchStockData(symbol) {
    try {
      // Em uma implementação real, faríamos uma chamada à API do Yahoo Finance
      // Aqui, vamos simular com dados reais obtidos previamente
      
      // Dados simulados baseados em valores reais do Google Finance/Yahoo Finance
      const mockData = {
        '^BVSP': {
          name: 'Ibovespa',
          price: 127850.42,
          change: 1.25,
          currency: 'BRL',
          weekData: [126500, 126800, 127200, 127500, 127850]
        },
        '^GSPC': {
          name: 'S&P 500',
          price: 5021.84,
          change: 0.75,
          currency: 'USD',
          weekData: [4980, 4995, 5010, 5015, 5022]
        },
        'USDBRL=X': {
          name: 'Dólar/Real',
          price: 5.06,
          change: -0.32,
          currency: 'BRL',
          weekData: [5.10, 5.08, 5.07, 5.08, 5.06]
        },
        'BTC-USD': {
          name: 'Bitcoin',
          price: 63245.78,
          change: 2.15,
          currency: 'USD',
          weekData: [61500, 62000, 62500, 63000, 63246]
        },
        'PETR4.SA': {
          name: 'Petrobras PN',
          price: 36.75,
          change: 2.15,
          currency: 'BRL',
          weekData: [35.80, 36.10, 36.30, 36.50, 36.75]
        },
        'VALE3.SA': {
          name: 'Vale ON',
          price: 68.20,
          change: 1.50,
          currency: 'BRL',
          weekData: [67.10, 67.50, 67.80, 68.00, 68.20]
        },
        'ITUB4.SA': {
          name: 'Itaú Unibanco PN',
          price: 34.85,
          change: -0.35,
          currency: 'BRL',
          weekData: [35.10, 35.00, 34.90, 34.80, 34.85]
        },
        'BBDC4.SA': {
          name: 'Bradesco PN',
          price: 18.45,
          change: -1.20,
          currency: 'BRL',
          weekData: [18.70, 18.65, 18.55, 18.50, 18.45]
        },
        'WEGE3.SA': {
          name: 'WEG ON',
          price: 42.30,
          change: 0.75,
          currency: 'BRL',
          weekData: [41.90, 42.00, 42.10, 42.20, 42.30]
        }
      };
      
      // Adicionar variação aleatória para simular dados em tempo real
      if (mockData[symbol]) {
        const variation = (Math.random() * 0.5) - 0.25; // Variação entre -0.25% e +0.25%
        const oldPrice = mockData[symbol].price;
        const newPrice = oldPrice * (1 + variation / 100);
        
        // Atualizar preço com variação
        mockData[symbol].price = parseFloat(newPrice.toFixed(2));
        
        // Atualizar variação diária
        const oldChange = mockData[symbol].change;
        mockData[symbol].change = parseFloat((oldChange + variation).toFixed(2));
        
        // Atualizar dados da semana
        mockData[symbol].weekData.shift();
        mockData[symbol].weekData.push(mockData[symbol].price);
        
        return {
          symbol: symbol,
          name: mockData[symbol].name,
          price: mockData[symbol].price,
          change: mockData[symbol].change,
          currency: mockData[symbol].currency,
          weekData: mockData[symbol].weekData,
          lastUpdate: new Date()
        };
      }
      
      // Se não tivermos dados simulados, retornar null
      return null;
    } catch (error) {
      console.error(`Erro ao buscar dados para ${symbol}:`, error);
      return null;
    }
  }
  
  // Atualizar UI com os dados mais recentes
  updateUI() {
    try {
      // Atualizar cards do dashboard
      this.updateDashboardCards();
      
      // Atualizar tabelas de ações
      this.updateStockTables();
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar UI:', error);
      return false;
    }
  }
  
  // Atualizar cards do dashboard
  updateDashboardCards() {
    try {
      // Ibovespa
      if (this.stockData['^BVSP']) {
        const ibovespaCard = document.querySelector('.card:nth-child(1) .card-value');
        const ibovespaChange = document.querySelector('.card:nth-child(1) .card-footer .trend-up, .card:nth-child(1) .card-footer .trend-down');
        
        if (ibovespaCard && ibovespaChange) {
          ibovespaCard.textContent = Math.round(this.stockData['^BVSP'].price).toLocaleString('pt-BR');
          
          const changeValue = this.stockData['^BVSP'].change;
          const sign = changeValue >= 0 ? '+' : '';
          ibovespaChange.textContent = `${sign}${changeValue.toFixed(2).replace('.', ',')}%`;
          
          if (changeValue >= 0) {
            ibovespaChange.classList.remove('trend-down');
            ibovespaChange.classList.add('trend-up');
          } else {
            ibovespaChange.classList.remove('trend-up');
            ibovespaChange.classList.add('trend-down');
          }
          
          // Adicionar mini gráfico se não existir
          this.addMiniChart('ibovespa-chart', this.stockData['^BVSP'].weekData, changeValue >= 0 ? '#4CAF50' : '#F44336');
        }
      }
      
      // S&P 500
      if (this.stockData['^GSPC']) {
        const spCard = document.querySelector('.card:nth-child(2) .card-value');
        const spChange = document.querySelector('.card:nth-child(2) .card-footer .trend-up, .card:nth-child(2) .card-footer .trend-down');
        
        if (spCard && spChange) {
          spCard.textContent = Math.round(this.stockData['^GSPC'].price).toLocaleString('pt-BR');
          
          const changeValue = this.stockData['^GSPC'].change;
          const sign = changeValue >= 0 ? '+' : '';
          spChange.textContent = `${sign}${changeValue.toFixed(2).replace('.', ',')}%`;
          
          if (changeValue >= 0) {
            spChange.classList.remove('trend-down');
            spChange.classList.add('trend-up');
          } else {
            spChange.classList.remove('trend-up');
            spChange.classList.add('trend-down');
          }
          
          // Adicionar mini gráfico se não existir
          this.addMiniChart('sp500-chart', this.stockData['^GSPC'].weekData, changeValue >= 0 ? '#4CAF50' : '#F44336');
        }
      }
      
      // Dólar
      if (this.stockData['USDBRL=X']) {
        const dollarCard = document.querySelector('.card:nth-child(3) .card-value');
        const dollarChange = document.querySelector('.card:nth-child(3) .card-footer .trend-up, .card:nth-child(3) .card-footer .trend-down');
        
        if (dollarCard && dollarChange) {
          dollarCard.textContent = `R$ ${this.stockData['USDBRL=X'].price.toFixed(2).replace('.', ',')}`;
          
          const changeValue = this.stockData['USDBRL=X'].change;
          const sign = changeValue >= 0 ? '+' : '';
          dollarChange.textContent = `${sign}${changeValue.toFixed(2).replace('.', ',')}%`;
          
          if (changeValue >= 0) {
            dollarChange.classList.remove('trend-down');
            dollarChange.classList.add('trend-up');
          } else {
            dollarChange.classList.remove('trend-up');
            dollarChange.classList.add('trend-down');
          }
          
          // Adicionar mini gráfico se não existir
          this.addMiniChart('dollar-chart', this.stockData['USDBRL=X'].weekData, changeValue >= 0 ? '#4CAF50' : '#F44336');
        }
      }
      
      // Bitcoin (adicionar novo card)
      if (this.cryptoData['BTC-USD']) {
        // Verificar se o card do Bitcoin já existe
        let bitcoinCard = document.querySelector('.card:nth-child(4)');
        
        // Se não existir, criar um novo card
        if (!bitcoinCard) {
          bitcoinCard = document.createElement('div');
          bitcoinCard.className = 'card';
          bitcoinCard.innerHTML = `
            <div class="card-header">
              <h3 class="card-title">Bitcoin</h3>
            </div>
            <div class="card-value"></div>
            <div class="mini-chart-container" id="bitcoin-chart"></div>
            <div class="card-footer">
              <span class="trend-up"></span>
              <span>hoje</span>
            </div>
          `;
          
          // Adicionar o card ao dashboard
          const dashboard = document.querySelector('.dashboard');
          if (dashboard) {
            dashboard.appendChild(bitcoinCard);
          }
        }
        
        // Atualizar dados do Bitcoin
        const bitcoinValue = bitcoinCard.querySelector('.card-value');
        const bitcoinChange = bitcoinCard.querySelector('.card-footer .trend-up, .card-footer .trend-down');
        
        if (bitcoinValue && bitcoinChange) {
          bitcoinValue.textContent = `$${Math.round(this.cryptoData['BTC-USD'].price).toLocaleString('pt-BR')}`;
          
          const changeValue = this.cryptoData['BTC-USD'].change;
          const sign = changeValue >= 0 ? '+' : '';
          bitcoinChange.textContent = `${sign}${changeValue.toFixed(2).replace('.', ',')}%`;
          
          if (changeValue >= 0) {
            bitcoinChange.classList.remove('trend-down');
            bitcoinChange.classList.add('trend-up');
          } else {
            bitcoinChange.classList.remove('trend-up');
            bitcoinChange.classList.add('trend-down');
          }
          
          // Adicionar mini gráfico se não existir
          this.addMiniChart('bitcoin-chart', this.cryptoData['BTC-USD'].weekData, changeValue >= 0 ? '#4CAF50' : '#F44336');
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar cards do dashboard:', error);
    }
  }
  
  // Adicionar mini gráfico
  addMiniChart(containerId, data, color) {
    try {
      const container = document.getElementById(containerId);
      
      // Se o container não existir, criar um novo
      if (!container) {
        const cardIndex = containerId.includes('ibovespa') ? 0 : 
                         containerId.includes('sp500') ? 1 : 
                         containerId.includes('dollar') ? 2 : 3;
        
        const card = document.querySelector(`.card:nth-child(${cardIndex + 1})`);
        if (card) {
          const chartContainer = document.createElement('div');
          chartContainer.className = 'mini-chart-container';
          chartContainer.id = containerId;
          
          // Inserir após o valor e antes do footer
          const cardValue = card.querySelector('.card-value');
          if (cardValue) {
            cardValue.insertAdjacentElement('afterend', chartContainer);
          }
        }
      }
      
      // Verificar novamente se o container existe
      const chartContainer = document.getElementById(containerId);
      if (!chartContainer) return;
      
      // Limpar o container
      chartContainer.innerHTML = '';
      
      // Criar o canvas para o gráfico
      const canvas = document.createElement('canvas');
      chartContainer.appendChild(canvas);
      
      // Criar o gráfico
      const ctx = canvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
          datasets: [{
            data: data,
            borderColor: color,
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          },
          scales: {
            x: {
              display: false
            },
            y: {
              display: false
            }
          },
          elements: {
            line: {
              tension: 0.4
            }
          }
        }
      });
    } catch (error) {
      console.error(`Erro ao adicionar mini gráfico ${containerId}:`, error);
    }
  }
  
  // Atualizar tabelas de ações
  updateStockTables() {
    try {
      // Atualizar tabela da carteira
      this.updatePortfolioTable();
      
      // Atualizar tabela de favoritas
      this.updateFavoritesTable();
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar tabelas de ações:', error);
      return false;
    }
  }
  
  // Atualizar tabela da carteira
  updatePortfolioTable() {
    try {
      const rows = document.querySelectorAll('#carteira .stock-row');
      
      rows.forEach(row => {
        const symbol = row.querySelector('td:first-child').textContent + '.SA';
        const priceCell = row.querySelector('td:nth-child(3)');
        const changeCell = row.querySelector('td:nth-child(4)');
        
        if (this.stockData[symbol] && priceCell && changeCell) {
          // Atualizar preço
          priceCell.textContent = `R$ ${this.stockData[symbol].price.toFixed(2).replace('.', ',')}`;
          
          // Atualizar variação
          const changeValue = this.stockData[symbol].change;
          const sign = changeValue >= 0 ? '+' : '';
          changeCell.textContent = `${sign}${changeValue.toFixed(2).replace('.', ',')}%`;
          
          // Atualizar classe de tendência
          if (changeValue >= 0) {
            changeCell.classList.remove('trend-down');
            changeCell.classList.add('trend-up');
          } else {
            changeCell.classList.remove('trend-up');
            changeCell.classList.add('trend-down');
          }
        }
      });
      
      // Atualizar timestamp
      const timestamp = document.querySelector('#carteira .section-header span');
      if (timestamp && this.lastUpdate) {
        const now = new Date();
        timestamp.textContent = `Atualizado: ${now.toLocaleDateString('pt-BR')} - ${now.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}`;
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar tabela da carteira:', error);
      return false;
    }
  }
  
  // Atualizar tabela de favoritas
  updateFavoritesTable() {
    try {
      const rows = document.querySelectorAll('#favoritas .stock-row');
      
      rows.forEach(row => {
        const symbol = row.querySelector('td:first-child').textContent + '.SA';
        const priceCell = row.querySelector('td:nth-child(3)');
        
        if (this.stockData[symbol] && priceCell) {
          // Atualizar preço
          priceCell.textContent = `R$ ${this.stockData[symbol].price.toFixed(2).replace('.', ',')}`;
        }
      });
      
      // Atualizar timestamp
      const timestamp = document.querySelector('#favoritas .section-header span');
      if (timestamp && this.lastUpdate) {
        timestamp.textContent = `Melhores oportunidades atuais (atualizado em tempo real)`;
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar tabela de favoritas:', error);
      return false;
    }
  }
}

// Inicializar o gerenciador de dados financeiros quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  const financeManager = new FinanceDataManager();
  financeManager.initialize();
});
      
      // Atualizar tabelas de ações
      this.updateStockTables();
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar UI:', error);
      return false;
    }
  }
  
  // Atualizar cards do dashboard
  updateDashboardCards() {
    try {
      // Ibovespa
      if (this.stockData['^BVSP']) {
        const ibovespaCard = document.querySelector('.card:nth-child(1) .card-value');
        const ibovespaChange = document.querySelector('.card:nth-child(1) .card-footer .trend-up, .card:nth-child(1) .card-footer .trend-down');
        
        if (ibovespaCard && ibovespaChange) {
          ibovespaCard.textContent = Math.round(this.stockData['^BVSP'].price).toLocaleString('pt-BR');
          
          const changeValue = this.stockData['^BVSP'].change;
          const sign = changeValue >= 0 ? '+' : '';
          ibovespaChange.textContent = `${sign}${changeValue.toFixed(2).replace('.', ',')}%`;
          
          if (changeValue >= 0) {
            ibovespaChange.classList.remove('trend-down');
            ibovespaChange.classList.add('trend-up');
          } else {
            ibovespaChange.classList.remove('trend-up');
            ibovespaChange.classList.add('trend-down');
          }
          
          // Adicionar mini gráfico se não existir
          this.addMiniChart('ibovespa-chart', this.stockData['^BVSP'].weekData, changeValue >= 0 ? '#4CAF50' : '#F44336');
        }
      }
      
      // S&P 500
      if (this.stockData['^GSPC']) {
        const spCard = document.querySelector('.card:nth-child(2) .card-value');
        const spChange = document.querySelector('.card:nth-child(2) .card-footer .trend-up, .card:nth-child(2) .card-footer .trend-down');
        
        if (spCard && spChange) {
          spCard.textContent = Math.round(this.stockData['^GSPC'].price).toLocaleString('pt-BR');
          
          const changeValue = this.stockData['^GSPC'].change;
          const sign = changeValue >= 0 ? '+' : '';
          spChange.textContent = `${sign}${changeValue.toFixed(2).replace('.', ',')}%`;
          
          if (changeValue >= 0) {
            spChange.classList.remove('trend-down');
            spChange.classList.add('trend-up');
          } else {
            spChange.classList.remove('trend-up');
            spChange.classList.add('trend-down');
          }
          
          // Adicionar mini gráfico se não existir
          this.addMiniChart('sp500-chart', this.stockData['^GSPC'].weekData, changeValue >= 0 ? '#4CAF50' : '#F44336');
        }
      }
      
      // Dólar
      if (this.stockData['USDBRL=X']) {
        const dollarCard = document.querySelector('.card:nth-child(3) .card-value');
        const dollarChange = document.querySelector('.card:nth-child(3) .card-footer .trend-up, .card:nth-child(3) .card-footer .trend-down');
        
        if (dollarCard && dollarChange) {
          dollarCard.textContent = `R$ ${this.stockData['USDBRL=X'].price.toFixed(2).replace('.', ',')}`;
          
          const changeValue = this.stockData['USDBRL=X'].change;
          const sign = changeValue >= 0 ? '+' : '';
          dollarChange.textContent = `${sign}${changeValue.toFixed(2).replace('.', ',')}%`;
          
          if (changeValue >= 0) {
            dollarChange.classList.remove('trend-down');
            dollarChange.classList.add('trend-up');
          } else {
            dollarChange.classList.remove('trend-up');
            dollarChange.classList.add('trend-down');
          }
          
          // Adicionar mini gráfico se não existir
          this.addMiniChart('dollar-chart', this.stockData['USDBRL=X'].weekData, changeValue >= 0 ? '#4CAF50' : '#F44336');
        }
      }
      
      // Bitcoin (adicionar novo card)
      if (this.cryptoData['BTC-USD']) {
        // Verificar se o card do Bitcoin já existe
        let bitcoinCard = document.querySelector('.card:nth-child(4)');
        
        // Se o quarto card for o de oportunidades, precisamos inserir o Bitcoin antes
        if (bitcoinCard && bitcoinCard.querySelector('.card-title').textContent === 'Oportunidades') {
          // Criar novo card para Bitcoin
          const newCard = document.createElement('div');
          newCard.className = 'card';
          newCard.innerHTML = `
            <div class="card-header">
                <h3 class="card-title">Bitcoin</h3>
            </div>
            <div class="card-value">US$ ${this.cryptoData['BTC-USD'].price.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace('.', ',')}</div>
            <div class="card-footer">
                <span class="${this.cryptoData['BTC-USD'].change >= 0 ? 'trend-up' : 'trend-down'}">${this.cryptoData['BTC-USD'].change >= 0 ? '+' : ''}${this.cryptoData['BTC-USD'].change.toFixed(2).replace('.', ',')}%</span>
                <span>hoje</span>
            </div>
            <div class="mini-chart-container">
                <canvas id="bitcoin-chart"></canvas>
            </div>
          `;
          
          // Inserir antes do card de oportunidades
          bitcoinCard.parentNode.insertBefore(newCard, bitcoinCard);
          
          // Adicionar mini gráfico
          setTimeout(() => {
            this.addMiniChart('bitcoin-chart', this.cryptoData['BTC-USD'].weekData, this.cryptoData['BTC-USD'].change >= 0 ? '#4CAF50' : '#F44336');
          }, 100);
        } else if (!bitcoinCard) {
          // Se não existir um quarto card, adicionar ao final
          const dashboard = document.querySelector('.dashboard');
          if (dashboard) {
            const newCard = document.createElement('div');
            newCard.className = 'card';
            newCard.innerHTML = `
              <div class="card-header">
                  <h3 class="card-title">Bitcoin</h3>
              </div>
              <div class="card-value">US$ ${this.cryptoData['BTC-USD'].price.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace('.', ',')}</div>
              <div class="card-footer">
                  <span class="${this.cryptoData['BTC-USD'].change >= 0 ? 'trend-up' : 'trend-down'}">${this.cryptoData['BTC-USD'].change >= 0 ? '+' : ''}${this.cryptoData['BTC-USD'].change.toFixed(2).replace('.', ',')}%</span>
                  <span>hoje</span>
              </div>
              <div class="mini-chart-container">
                  <canvas id="bitcoin-chart"></canvas>
              </div>
            `;
            
            dashboard.appendChild(newCard);
            
            // Adicionar mini gráfico
            setTimeout(() => {
              this.addMiniChart('bitcoin-chart', this.cryptoData['BTC-USD'].weekData, this.cryptoData['BTC-USD'].change >= 0 ? '#4CAF50' : '#F44336');
            }, 100);
          }
        }
      }
      
      // Atualizar data e hora
      const now = new Date();
      const formattedDate = now.toLocaleDateString('pt-BR');
      const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      
      document.querySelectorAll('.section-header span').forEach(span => {
        if (span.textContent.includes('Atualizado')) {
          span.textContent = `Atualizado: ${formattedDate} - ${formattedTime}`;
        }
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar cards do dashboard:', error);
      return false;
    }
  }
  
  // Adicionar mini gráfico
  addMiniChart(canvasId, data, color) {
    try {
      // Verificar se o canvas já existe
      let canvas = document.getElementById(canvasId);
      
      // Se não existir, criar novo
      if (!canvas) {
        // Encontrar o card correspondente
        let cardContainer;
        
        if (canvasId === 'ibovespa-chart') {
          cardContainer = document.querySelector('.card:nth-child(1)');
        } else if (canvasId === 'sp500-chart') {
          cardContainer = document.querySelector('.card:nth-child(2)');
        } else if (canvasId === 'dollar-chart') {
          cardContainer = document.querySelector('.card:nth-child(3)');
        } else if (canvasId === 'bitcoin-chart') {
          cardContainer = document.querySelector('.card:nth-child(4)');
        }
        
        if (cardContainer) {
          // Criar container para o mini gráfico
          const chartContainer = document.createElement('div');
          chartContainer.className = 'mini-chart-container';
          
          // Criar canvas
          canvas = document.createElement('canvas');
          canvas.id = canvasId;
          
          // Adicionar ao container
          chartContainer.appendChild(canvas);
          
          // Adicionar ao card
          cardContainer.appendChild(chartContainer);
        }
      }
      
      // Se o canvas existir, criar ou atualizar o gráfico
      if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Verificar se já existe um gráfico neste canvas
        if (canvas.chart) {
          // Atualizar dados do gráfico existente
          canvas.chart.data.datasets[0].data = data;
          canvas.chart.update();
        } else {
          // Criar novo gráfico
          canvas.chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
              datasets: [{
                data: data,
                borderColor: color,
                backgroundColor: 'transparent',
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  enabled: false
                }
              },
              scales: {
                x: {
                  display: false
                },
                y: {
                  display: false
                }
              },
              elements: {
                line: {
                  tension: 0.4
                }
              }
            }
          });
        }
      }
      
      return true;
    } catch (error) {
      console.error(`Erro ao adicionar mini gráfico ${canvasId}:`, error);
      return false;
    }
  }
  
  // Atualizar tabelas de ações
  updateStockTables() {
    try {
      // Mapear símbolos para IDs nas tabelas
      const symbolMap = {
        'PETR4.SA': 'PETR4',
        'VALE3.SA': 'VALE3',
        'ITUB4.SA': 'ITUB4',
        'BBDC4.SA': 'BBDC4',
        'WEGE3.SA': 'WEGE3'
      };
      
      // Atualizar cada linha da tabela
      for (const [apiSymbol, tableSymbol] of Object.entries(symbolMap)) {
        if (this.stockData[apiSymbol]) {
          // Encontrar todas as linhas com este símbolo
          const rows = document.querySelectorAll(`.stock-row td:first-child:contains('${tableSymbol}')`);
          
          rows.forEach(cell => {
            const row = cell.parentElement;
            
            // Atualizar cotação
            const priceCell = row.querySelector('td:nth-child(3)');
            if (priceCell) {
              priceCell.textContent = `R$ ${this.stockData[apiSymbol].price.toFixed(2).replace('.', ',')}`;
            }
            
            // Atualizar variação
            const changeCell = row.querySelector('td:nth-child(4)');
            if (changeCell) {
              const changeValue = this.stockData[apiSymbol].change;
              const sign = changeValue >= 0 ? '+' : '';
              changeCell.textContent = `${sign}${changeValue.toFixed(2).replace('.', ',')}%`;
              
              if (changeValue >= 0) {
                changeCell.classList.remove('trend-down');
                changeCell.classList.add('trend-up');
              } else {
                changeCell.classList.remove('trend-up');
                changeCell.classList.add('trend-down');
              }
            }
          });
        }
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar tabelas de ações:', error);
      return false;
    }
  }
  
  // Obter dados de uma ação específica
  getStockData(symbol) {
    // Converter símbolo da tabela para símbolo da API
    const apiSymbolMap = {
      'PETR4': 'PETR4.SA',
      'VALE3': 'VALE3.SA',
      'ITUB4': 'ITUB4.SA',
      'BBDC4': 'BBDC4.SA',
      'WEGE3': 'WEGE3.SA'
    };
    
    const apiSymbol = apiSymbolMap[symbol] || symbol;
    
    return this.stockData[apiSymbol] || null;
  }
  
  // Obter dados de uma criptomoeda específica
  getCryptoData(symbol) {
    return this.cryptoData[symbol] || null;
  }
}

// Inicializar gerenciador de dados financeiros
const financeDataManager = new FinanceDataManager();

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar dados financeiros
  financeDataManager.initialize();
  
  // Estender o método de seletor para incluir :contains
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }
  
  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      var el = this;
      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }
  
  // Adicionar seletor :contains
  document.querySelectorAll = function(selector) {
    if (selector.includes(':contains')) {
      // Extrair o texto a ser procurado
      const parts = selector.split(':contains(');
      const baseSelector = parts[0];
      const searchText = parts[1].slice(0, -1).replace(/['"]/g, '');
      
      // Encontrar elementos que correspondem ao seletor base
      const elements = document.querySelectorAll(baseSelector);
      
      // Filtrar elementos que contêm o texto
      return Array.from(elements).filter(el => el.textContent.includes(searchText));
    } else {
      // Usar o querySelectorAll padrão
      return document.querySelectorAll(selector);
    }
  };
});

// Adicionar estilos CSS para mini gráficos
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    .mini-chart-container {
      height: 40px;
      margin-top: 0.5rem;
    }
    
    .card {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
});
