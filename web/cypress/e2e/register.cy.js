import data from '../fixtures/orphanages.json'

describe('Orphanage registration spec', () => {
  it('Should fill the form to register a new orphanage', () => {
    const orphanage = data.create
    cy.deleteMany({ name: orphanage.name }, { collection: "orphanages" })
    cy.visitCreatePage()
    cy.createOrphanage(orphanage)
    cy.popupContent('Orfanato cadastrado com sucesso.')
  })

  it('Should not register duplicated orphanages', () => {
    const orphanage = data.duplicated
    cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })
    // Register the first orphanage by API
    cy.postOrphanage(orphanage)
    // Register the second orphanage with the same name
    cy.visitCreatePage()
    cy.createOrphanage(orphanage)
    cy.popupContent(`Já existe um cadastro com o nome: ${orphanage.name}`)
  })

  it.only('Should not register if the form has blank fields', () => {
    let orphanage = data.required
    orphanage.name = ''
    cy.visitCreatePage()
    cy.createOrphanage(orphanage)
    cy.get('.alert-error')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório')
  })
})
