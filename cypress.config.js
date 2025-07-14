const { defineConfig } = require('cypress') // Importa a função defineConfig do módulo Cypress

module.exports = defineConfig({ // Exporta a configuração do Cypress
  e2e: { // Configurações específicas para testes end-to-end
    baseUrl: 'http://localhost', // Define a URL base para todos os testes (ex: cy.visit('/') irá para 'http://localhost/')
    env: { // Variáveis de ambiente personalizadas acessíveis nos testes via Cypress.env()
      hideCredentials: true, // Exemplo de variável de ambiente: para esconder credenciais
      requestMode: true, // Exemplo de variável de ambiente: para ativar um modo de requisição
    },
  },
  fixturesFolder: false, // Desabilita o uso da pasta de fixtures (onde dados de teste estáticos são armazenados)
  video: false, // Desabilita a gravação de vídeo dos testes
})
