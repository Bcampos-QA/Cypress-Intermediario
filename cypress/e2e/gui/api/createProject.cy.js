import { faker } from '@faker-js/faker' // Importa a biblioteca faker para gerar dados aleatórios

describe('Create Project', () => { // Descreve um conjunto de testes para a funcionalidade 'Criar Projeto'
  beforeEach(() => cy.api_deleteProjects()) // Executa antes de cada teste: deleta todos os projetos via API (comando personalizado)

  it('successfully', () => { // Define um teste individual: 'cria projeto com sucesso'
    const project = { // Define um objeto 'project' com dados de teste
      name: `project-${faker.datatype.uuid()}`, // Nome do projeto gerado dinamicamente com um UUID
      description: faker.random.words(5) // Descrição do projeto gerada aleatoriamente
    }

    cy.api_createProject(project) // Cria um projeto via API usando o comando personalizado 'api_createProject'
      .then(response => { // Encadeia uma promessa para verificar a resposta da API
        expect(response.status).to.equal(201) // Verifica se o status da resposta é 201 (Created)
        expect(response.body.name).to.equal(project.name) // Verifica se o nome do projeto na resposta é igual ao nome enviado
        expect(response.body.description).to.equal(project.description) // Verifica se a descrição do projeto na resposta é igual à descrição enviada
      })
  })
})
