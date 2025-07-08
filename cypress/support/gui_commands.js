// Adiciona um comando customizado ao Cypress chamado "login"
Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),      // Pega o nome de usuário das variáveis de ambiente
  password = Cypress.env('user_password') // Pega a senha das variáveis de ambiente
) => {
  const login = () => {
    cy.visit('/users/sign_in') // Acessa a página de login

    // Preenche o campo de usuário
    cy.get("[data-qa-selector='login_field']").type(user)

    // Preenche o campo de senha (sem mostrar no log)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })

    // Clica no botão de login
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  login() // Executa a função de login
})

  Cypress.Commands.add('logout', () => {
  cy.get('.qa-user-avatar').click()
  cy.contains('Sign out').click()
})
