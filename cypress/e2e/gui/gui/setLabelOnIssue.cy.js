import { faker } from '@faker-js/faker' // Importa a biblioteca 'faker' para gerar dados aleatórios e únicos.

const options = { env: { snapshotOnly: true } } // Define opções para a suíte de testes, aqui configurando 'snapshotOnly' para o ambiente.

describe('Set label on issue', options, () => { // Inicia a suíte de testes para a funcionalidade 'Set label on issue' com as opções definidas.
  const issue = { // Define um objeto 'issue' com dados mockados para o problema.
    title: `issue-${faker.datatype.uuid()}`, // Gera um título de problema único usando um UUID.
    description: faker.random.words(3), // Gera uma descrição de problema com 3 palavras aleatórias.
    project: { // Define um objeto 'project' aninhado para o projeto do problema.
      name: `project-${faker.datatype.uuid()}`, // Gera um nome de projeto único usando um UUID.
      description: faker.random.words(5) // Gera uma descrição de projeto com 5 palavras aleatórias.
    }
  }

  const label = { // Define um objeto 'label' com dados mockados para a etiqueta.
    name: `label-${faker.random.word()}`, // Gera um nome de label único com uma palavra aleatória.
    color: '#ffaabb' // Define uma cor hexadecimal para a label.
  }

  beforeEach(() => { // Hook que é executado antes de cada teste dentro desta suíte.
    cy.api_deleteProjects() // Executa um comando customizado para deletar projetos via API (limpa o estado).
    cy.login() // Executa um comando customizado para realizar o login do usuário.
    cy.api_createIssue(issue) // Executa um comando customizado para criar um problema via API usando os dados 'issue' definidos.
      .then(response => { // Uma vez que a criação do problema via API retorna uma resposta...
        cy.api_createLabel(response.body.project_id, label) // ...cria uma label via API, usando o ID do projeto da resposta e os dados da 'label'.
        cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`) // Visita a página do problema recém-criado usando variáveis de ambiente e dados do problema.
      })
  })

  it('successfully', () => { // Define um caso de teste chamado 'successfully' para verificar se a label é definida com sucesso.
    cy.gui_setLabelOnIssue(label) // Executa um comando customizado que interage com a interface do usuário para definir a label no problema.

    cy.get('.qa-labels-block').should('contain', label.name) // Verifica se o bloco de labels contém o nome da label recém-definida.
    cy.get('.qa-labels-block span') // Seleciona o elemento 'span' dentro do bloco de labels.
      .should('have.attr', 'style', `background-color: ${label.color}; color: #333333;`) // Verifica se o 'span' tem os atributos de estilo corretos para a cor de fundo e cor do texto da label.
  })
})