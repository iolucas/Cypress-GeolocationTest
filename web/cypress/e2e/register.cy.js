import data from '../fixtures/orphanages.json'
import { generator } from '../support/factory'

describe('Orphanage registration spec', () => {

  it('Should fill the form to register a new orphanage', () => {
    const orphanage = generator()
    cy.visitCreatePage(orphanage.position)
    cy.createOrphanage(orphanage)
    cy.popupContent('Orfanato cadastrado com sucesso.')
  })

  it('Should not register duplicated orphanages', () => {
    const orphanage = generator()
    // Register the first orphanage by API
    cy.postOrphanage(orphanage)
    // Register the second orphanage with the same name
    cy.visitCreatePage(orphanage.position)
    cy.createOrphanage(orphanage)
    cy.popupContent(`Já existe um cadastro com o nome: ${orphanage.name}`)
  })

  context('Mandatory fields', () => {
    it('Should not register if the form has the name field empty', () => {
      let orphanage = generator()
      delete orphanage.name
      cy.visitCreatePage(orphanage.position)
      cy.createOrphanage(orphanage)
      cy.alertContent('Nome', 'Campo obrigatório')
    })

    it('Should not register if the form has the description field empty', () => {
      let orphanage = generator()
      delete orphanage.description
      cy.visitCreatePage(orphanage.position)
      cy.createOrphanage(orphanage)
      cy.alertContent('Sobre', 'Campo obrigatório')
    })

    it('Should not register if the form has not attached an image', () => {
      let orphanage = generator()
      delete orphanage.image
      cy.visitCreatePage(orphanage.position)
      cy.createOrphanage(orphanage)
      cy.alertContent('Fotos', 'Envie pelo menos uma foto')
    })

    it('Should not register if the opening hours has not been filled', () => {
      let orphanage = generator()
      delete orphanage.opening_hours
      cy.visitCreatePage(orphanage.position)
      cy.createOrphanage(orphanage)
      cy.alertContent('Horário', 'Campo obrigatório')
    })

    it('Should not register if the form has empty fields', () => {
      let orphanage = generator()
      delete orphanage.name
      delete orphanage.description
      delete orphanage.image
      delete orphanage.opening_hours
      cy.visitCreatePage(orphanage.position)
      cy.createOrphanage(orphanage)
      cy.alertContent('Nome', 'Campo obrigatório')
      cy.alertContent('Sobre', 'Campo obrigatório')
      cy.alertContent('Fotos', 'Envie pelo menos uma foto')
      cy.alertContent('Horário', 'Campo obrigatório')
    })
  })
})


