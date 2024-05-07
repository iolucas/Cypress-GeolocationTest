import data from '../fixtures/orphanages.json'
import createPage from '../support/pages/createPage'
import mapPage from '../support/pages/mapPage'

describe('Orphanage registration spec', () => {
  it('Should fill the form to register a new orphanage', () => {
    const orphanage = data.create
    cy.deleteMany({ name: orphanage.name }, { collection: "orphanages" })
    createPage.visitPage()
    cy.setMapPosition(orphanage.position)
    createPage.form(orphanage)
    createPage.submit()
    mapPage.popup.haveText('Orfanato cadastrado com sucesso.')
  })

  it('Should not register duplicated orphanages', () => {
    const orphanage = data.duplicated
    cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })
    // Register the first orphanage by API
    cy.postOrphanage(orphanage)
    // Register the second orphanage with the same name
    createPage.visitPage()
    cy.setMapPosition(orphanage.position)
    createPage.form(orphanage)
    createPage.submit()
    mapPage.popup.haveText(`Já existe um cadastro com o nome: ${orphanage.name}`)
  })
})
