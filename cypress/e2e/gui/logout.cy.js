// Descreve o conjunto de testes relacionados ao logout
describe('Logout', () => {
  // Antes de cada teste, faz login e acessa a página inicial
  beforeEach(() => {
    cy.login() // Executa o comando de login
    cy.visit('/') // Visita a página inicial
  })

  // Testa se o logout é realizado com sucesso
  it('successfully', () => {
    cy.logout() // Executa o comando de logout

    // Verifica se a URL atual é a página de login
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
  })
})
