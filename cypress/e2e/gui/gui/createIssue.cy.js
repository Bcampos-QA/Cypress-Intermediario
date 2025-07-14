import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } } // Define um objeto 'options' que contém configurações específicas para o ambiente, neste caso, para indicar que apenas snapshots devem ser gerados.

describe('Create Issue', options,() => { // Descreve um conjunto de testes para a funcionalidade 'Criar Issue'
  const issue = { // Define um objeto 'issue' com dados de teste
    title: `issue-${faker.datatype.uuid()}`, // Título da issue gerado dinamicamente com um UUID
    description: faker.random.words(3), // Descrição da issue gerada aleatoriamente
    project: { // Objeto 'project' aninhado com dados do projeto
      name: `project-${faker.datatype.uuid()}`, // Nome do projeto gerado dinamicamente com um UUID
      description: faker.random.words(5) // Descrição do projeto gerada aleatoriamente
    }
  }

 beforeEach(() => { // Executa antes de cada teste dentro do bloco 'describe' em que está inserido
  cy.api_deleteProjects() // Deleta todos os projetos existentes via API antes de cada teste, garantindo um estado limpo
  cy.login() // Realiza o login do usuário (assumindo que 'cy.login()' é um comando personalizado que lida com o processo de login)
  cy.api_createProject(issue.project)
 // Cria um novo projeto através da API, usando os dados do objeto 'issue.project'
})


  it('successfully', () => { // Define um teste individual: 'cria issue com sucesso'
    cy.gui_createIssue(issue) // Cria uma issue usando o comando personalizado 'gui_createIssue'

    cy.get('.issue-details') // Encontra o elemento com a classe 'issue-details'
      .should('contain', issue.title) // Verifica se o elemento contém o título da issue
      .and('contain', issue.description) // E verifica se o elemento também contém a descrição da issue
  })
})

