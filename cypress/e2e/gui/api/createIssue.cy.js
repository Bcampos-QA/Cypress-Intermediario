import { faker } from '@faker-js/faker' // Importa a biblioteca 'faker' para gerar dados de teste aleatórios e únicos.

describe('Create issue', () => { // Descreve um conjunto de testes para a funcionalidade de "Criar issue".
  beforeEach(() => cy.api_deleteProjects()) // Executa antes de cada teste neste bloco 'describe'. O comando 'cy.api_deleteProjects()' garante que todos os projetos existentes sejam limpos via API, proporcionando um ambiente de teste limpo.

  it('successfully', () => { // Define um caso de teste individual: "cria issue com sucesso".
    const issue = { // Declara um objeto 'issue' que contém os dados necessários para criar uma nova issue.
      title: `issue-${faker.datatype.uuid()}`, // Define o título da issue, gerando um UUID único para garantir que seja diferente a cada execução.
      description: faker.random.words(3), // Define uma descrição aleatória para a issue, usando três palavras.
      project: { // Define um objeto 'project' aninhado, que contém os detalhes do projeto ao qual a issue pertencerá.
        name: `project-${faker.datatype.uuid()}`, // Define o nome do projeto, também com um UUID único.
        description: faker.random.words(5) // Define uma descrição aleatória para o projeto, usando cinco palavras.
      }
    }

    cy.api_createIssue(issue) // Chama o comando personalizado 'cy.api_createIssue()' para criar a issue e o projeto associado via API, usando o objeto 'issue' definido acima.
      .then(response => { // Uma vez que a requisição 'api_createIssue' é concluída e a resposta é recebida, executa a função de callback. A 'response' contém os dados retornados pela API.
        expect(response.status).to.equal(201) // Afirma que o status da resposta HTTP deve ser 201 (Created), indicando que a issue foi criada com sucesso.
        expect(response.body.title).to.equal(issue.title) // Afirma que o título da issue no corpo da resposta da API é igual ao título que foi enviado.
        expect(response.body.description).to.equal(issue.description) // Afirma que a descrição da issue no corpo da resposta da API é igual à descrição que foi enviada.
      })
  })
})
