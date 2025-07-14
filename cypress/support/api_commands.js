const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}` // Define uma constante para o token de acesso da API, obtido de uma variável de ambiente

Cypress.Commands.add('api_createProject', project => { // Adiciona um comando personalizado chamado 'api_createProject' que aceita um objeto 'project'
  cy.request({ // Inicia uma requisição HTTP
    method: 'POST', // Método da requisição: POST (para criar um recurso)
    url: `/api/v4/projects/`, // URL da API para criar projetos
    body: { // Corpo da requisição (dados a serem enviados)
      name: project.name, // Nome do projeto
      description: project.description, // Descrição do projeto
      initialize_with_readme: true // Opção para inicializar o projeto com um README
    },
    headers: { Authorization: accessToken }, // Cabeçalhos da requisição, incluindo o token de autorização
  })
})

Cypress.Commands.add('api_getAllProjects', () => { // Adiciona um comando personalizado chamado 'api_getAllProjects'
  cy.request({ // Inicia uma requisição HTTP
    method: 'GET', // Método da requisição: GET (para obter recursos)
    url: '/api/v4/projects/', // URL da API para listar todos os projetos
    headers: { Authorization: accessToken }, // Cabeçalhos da requisição, incluindo o token de autorização
  })
})

Cypress.Commands.add('api_deleteProjects', () => { // Adiciona um comando personalizado chamado 'api_deleteProjects'
  cy.api_getAllProjects().then(res => // Chama o comando 'api_getAllProjects' e, quando a resposta for recebida...
    res.body.forEach(project => cy.request({ // ...itera sobre cada projeto na resposta e para cada um...
      method: 'DELETE', // Método da requisição: DELETE (para deletar um recurso)
      url: `/api/v4/projects/${project.id}`, // URL da API para deletar um projeto específico pelo ID
      headers: { Authorization: accessToken }, // Cabeçalhos da requisição, incluindo o token de autorização
    }))
  )
})