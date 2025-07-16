const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}` // Define uma constante para o token de acesso da API, obtido de uma variável de ambiente

// Adiciona um comando personalizado chamado 'api_createProject' que aceita um objeto 'project'
Cypress.Commands.add('api_createProject', project => { 
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
// Adiciona um comando personalizado chamado 'api_getAllProjects'
Cypress.Commands.add('api_getAllProjects', () => { 
  cy.request({ // Inicia uma requisição HTTP
    method: 'GET', // Método da requisição: GET (para obter recursos)
    url: '/api/v4/projects/', // URL da API para listar todos os projetos
    headers: { Authorization: accessToken }, // Cabeçalhos da requisição, incluindo o token de autorização
  })
})
// Adiciona um comando personalizado chamado 'api_deleteProjects'
Cypress.Commands.add('api_deleteProjects', () => { 
  cy.api_getAllProjects().then(res => // Chama o comando 'api_getAllProjects' e, quando a resposta for recebida...
    res.body.forEach(project => cy.request({ // ...itera sobre cada projeto na resposta e para cada um...
      method: 'DELETE', // Método da requisição: DELETE (para deletar um recurso)
      url: `/api/v4/projects/${project.id}`, // URL da API para deletar um projeto específico pelo ID
      headers: { Authorization: accessToken }, // Cabeçalhos da requisição, incluindo o token de autorização
    }))
  )
})
// Adiciona um comando personalizado chamado 'api_createIssue' que aceita um objeto 'issue' como argumento.
Cypress.Commands.add('api_createIssue', issue => { 
  cy.api_createProject(issue.project) // Primeiro, chama o comando personalizado 'api_createProject' para criar um projeto, usando as informações do projeto contidas no objeto 'issue'.
    .then(response => { // Quando a criação do projeto for concluída e a resposta da API for recebida, executa a função dentro do 'then'. A 'response' contém os detalhes do projeto recém-criado.
      cy.request({ // Inicia uma nova requisição HTTP para criar a issue.
        method: 'POST', // O método da requisição é POST, usado para criar novos recursos.
        url: `/api/v4/projects/${response.body.id}/issues`, // A URL para criar a issue. O ID do projeto (response.body.id) é extraído da resposta da criação do projeto anterior para associar a issue ao projeto correto.
        body: { // O corpo da requisição contém os dados da issue a ser criada.
          title: issue.title, // O título da issue, obtido do objeto 'issue' passado como argumento.
          description: issue.description // A descrição da issue, também obtida do objeto 'issue'.
        },
        headers: { Authorization: accessToken }, // Os cabeçalhos da requisição, incluindo o token de acesso (accessToken) para autenticação na API.
      })
    })
})
// Define um comando customizado no Cypress chamado 'api_createLabel' que aceita um ID de projeto e um objeto de label.
Cypress.Commands.add('api_createLabel', (projectId, label) => { 
  cy.request({ // Inicia uma requisição HTTP direta, sem interagir com a UI.
    method: 'POST', // Define o método HTTP como POST, usado para criar novos recursos.
    url: `/api/v4/projects/${projectId}/labels`, // Constrói a URL do endpoint da API para criar labels em um projeto específico.
    body: { // Define o corpo da requisição, que contém os dados da nova label.
      name: label.name, // Usa o nome da label fornecido no objeto 'label'.
      color: label.color // Usa a cor da label fornecida no objeto 'label'.
    },
    headers: { Authorization: accessToken }, // Adiciona um cabeçalho de Autorização com um token de acesso para autenticar a requisição.
  })
})