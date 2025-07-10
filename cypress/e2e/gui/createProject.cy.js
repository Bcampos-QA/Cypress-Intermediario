import { faker } from '@faker-js/faker'//biblioteca para gerar dados aleatórios faker(instalado no package-json)

// Descreve o conjunto de testes para a funcionalidade de criação de projetos
describe('Create Project', () => {
  // Antes de cada teste, realiza o login do usuário
  beforeEach(() => {
    cy.login() // Comando customizado Cypress que realiza o login
  })

  // Caso de teste: criar um projeto com sucesso
  it('successfully', () => {
    // Cria um objeto `project` com nome e descrição gerados dinamicamente
    const project = {
      name: `project-${faker.datatype.uuid()}`, // Gera um nome único com UUID
      description: faker.random.words(5) // Gera uma descrição aleatória com 5 palavras
    }

    // Chama um comando customizado para criar um projeto pela interface gráfica
    cy.gui_createProject(project)

    // Verifica se a URL atual está correta após a criação do projeto
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)

    // Verifica se o nome do projeto aparece na página
    cy.contains(project.name).should('be.visible')

    // Verifica se a descrição do projeto aparece na página
    cy.contains(project.description).should('be.visible')
  })
})

