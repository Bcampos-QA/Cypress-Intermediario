// Adiciona um comando customizado chamado 'login' ao Cypress
Cypress.Commands.add('login', (

  // Parâmetros:
  // 'user' e 'password' são buscados das variáveis de ambiente
  // 'cacheSession' é uma flag que define se a sessão deve ser cacheada (valor padrão: true)
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},

) => {

  // Função responsável por executar o fluxo de login
  const login = () => {
    cy.visit('/users/sign_in') // Acessa a página de login

    // Digita o nome de usuário no campo de login
    cy.get("[data-qa-selector='login_field']").type(user)

    // Digita a senha no campo de senha (sem exibir no log)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })

    // Clica no botão de login
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  // Função de validação usada para verificar se o login foi bem-sucedido
  const validate = () => {
    cy.visit('/') // Vai para a página inicial

    // Verifica se a URL **não** redirecionou de volta para a tela de login
    // Isso garante que a sessão está ativa
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/users/sign_in')
  }

  // Define as opções para o uso do cache de sessão
  const options = {
    cacheAcrossSpecs: true, // Permite reutilizar a sessão entre diferentes arquivos de teste
    validate,               // Usa a função de validação para confirmar se a sessão ainda é válida
  }

  // Se o cache estiver ativado, utiliza `cy.session` para armazenar e reutilizar a sessão do usuário
  if (cacheSession) {
    cy.session(user, login, options)
  } else {
    // Caso contrário, executa o login diretamente sem cache
    login()
  }
})


// Adiciona um novo comando customizado chamado 'logout' no Cypress
Cypress.Commands.add('logout', () => {
  // Clica no avatar do usuário para abrir o menu de usuário
  cy.get('.qa-user-avatar').click()

  // Clica na opção 'Sign out' para fazer logout
  cy.contains('Sign out').click()
})
// Adiciona um comando customizado para criar um projeto via interface gráfica
Cypress.Commands.add('gui_createProject', project => {
  // Acessa a página de criação de projeto
  cy.visit('/projects/new')

  // Preenche o nome do projeto
  cy.get('#project_name').type(project.name)

  // Preenche a descrição do projeto
  cy.get('#project_description').type(project.description)

  // Marca a opção para inicializar com um README
  cy.get('.qa-initialize-with-readme-checkbox').check()

  // Clica no botão para criar o projeto
  cy.contains('Create project').click()
})
