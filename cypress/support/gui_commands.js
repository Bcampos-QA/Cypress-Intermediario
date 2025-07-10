// Adiciona um comando customizado chamado 'login' ao Cypress
Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),         // Usuário obtido da variável de ambiente
  password = Cypress.env('user_password'), // Senha obtida da variável de ambiente
  { cacheSession = true } = {}             // Flag para habilitar cache da sessão (default: true)
) => {

  const login = () => {
    cy.visit('/users/sign_in')                                            // Acessa a página de login
    cy.get("[data-qa-selector='login_field']").type(user)                // Preenche o campo de login
    cy.get("[data-qa-selector='password_field']").type(password, { log: false }) // Preenche o campo de senha sem logar no console
    cy.get("[data-qa-selector='sign_in_button']").click()                // Clica no botão de login
  }

  const validate = () => {
    cy.visit('/')                                                         // Visita a página inicial
    cy.location('pathname', { timeout: 3000 })                            // Espera pela mudança de rota
      .should('not.eq', '/users/sign_in')                                 // Garante que não está mais na tela de login
  }

  const options = {
    cacheAcrossSpecs: true, // Permite reutilizar a sessão em diferentes arquivos de teste
    validate                // Função de validação da sessão
  }

  if (cacheSession) {
    cy.session(user, login, options) // Usa sessão cacheada
  } else {
    login()                           // Executa login direto se não usar cache
  }
})


// Adiciona um comando customizado chamado 'logout' ao Cypress
Cypress.Commands.add('logout', () => {
  cy.get('.qa-user-avatar').should('be.visible').click() // Clica no avatar para abrir o menu
  cy.contains('Sign out').should('be.visible').click()   // Clica em 'Sign out' para sair
})


// Adiciona um comando customizado para criar um projeto pela interface
Cypress.Commands.add('gui_createProject', project => {
  cy.visit('/projects/new')                         // Acessa a página de criação de projeto
  cy.get('#project_name').type(project.name)        // Preenche o nome do projeto
  cy.get('#project_description').type(project.description) // Preenche a descrição
  cy.get('.qa-initialize-with-readme-checkbox').check()    // Marca a opção de criar com README
  cy.contains('Create project').click()             // Clica para criar o projeto
  cy.url().should('include', '/projects/')          // (Opcional) Verifica redirecionamento
  cy.contains(project.name).should('be.visible')    // (Opcional) Confirma criação do projeto
})
