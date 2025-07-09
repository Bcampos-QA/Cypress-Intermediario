// Descreve o conjunto de testes relacionados ao login
describe('Login', () => {

  // Caso de teste: login realizado com sucesso
  it('successfully', () => {
    // Recupera o nome de usuário e a senha das variáveis de ambiente
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')

    // Define a opção para NÃO usar cache de sessão (força o login completo)
    const options = { cacheSession: false }

    // Executa o comando customizado de login com os dados e opções definidos
    cy.login(user, password, options)

    // Verifica se o avatar do usuário está visível na interface,
    // confirmando que o login foi feito com sucesso
    cy.get('.qa-user-avatar').should('be.visible')
  })
})
