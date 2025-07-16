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

// Adiciona um comando personalizado chamado 'gui_createProject' que aceita um objeto 'project'
Cypress.Commands.add('gui_createProject', project => { 
  cy.visit('/projects/new') // Visita a página de criação de novo projeto

  cy.get('#project_name').type(project.name) // Encontra o campo de nome do projeto e digita o nome fornecido
  cy.get('#project_description').type(project.description) // Encontra o campo de descrição do projeto e digita a descrição fornecida
  cy.get('.qa-initialize-with-readme-checkbox').check() // Marca a caixa de seleção para inicializar com README
  cy.contains('Create project').click() // Clica no botão 'Create project'
})
// Adiciona um comando personalizado chamado 'gui_createIssue' que aceita um objeto 'issue'
Cypress.Commands.add('gui_createIssue', issue => { 
  cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`) // Visita a página de criação de nova issue, usando variáveis de ambiente e do objeto 'issue'

  cy.get('.qa-issuable-form-title').type(issue.title) // Encontra o campo de título da issue e digita o título fornecido
  cy.get('.qa-issuable-form-description').type(issue.description) // Encontra o campo de descrição da issue e digita a descrição fornecida
  cy.contains('Submit issue').click() // Clica no botão 'Submit issue'
})
// Define um comando customizado no Cypress chamado 'gui_setLabelOnIssue' que aceita um objeto 'label'.
Cypress.Commands.add('gui_setLabelOnIssue', label => { 
  cy.get('.qa-edit-link-labels').click() // Encontra um elemento com a classe 'qa-edit-link-labels' (provavelmente o botão para editar labels) e clica nele.
  cy.contains(label.name).click() // Encontra um elemento que contém o texto do nome da label (passado no objeto 'label') e clica nele para selecioná-lo.
  cy.get('body').click() // Clica no corpo da página. Isso é frequentemente feito para fechar modais, pop-ups ou dropdowns que se abrem após uma interação anterior.
})