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

  context('Mandatory fields', () => {
    it('Should not register if the form has the name field empty', () => {
      let orphanage = data.required
      delete orphanage.name
      cy.visitCreatePage()
      cy.createOrphanage(orphanage)
      cy.alertContent('Nome', 'Campo obrigatório')
    })

    it('Should not register if the form has the description field empty', () => {
      let orphanage = data.required
      delete orphanage.description
      cy.visitCreatePage()
      cy.createOrphanage(orphanage)
      cy.alertContent('Sobre', 'Campo obrigatório')
    })

    it('Should not register if the form has not attached an image', () => {
      let orphanage = data.required
      delete orphanage.image
      cy.visitCreatePage()
      cy.createOrphanage(orphanage)
      cy.alertContent('Fotos', 'Envie pelo menos uma foto')
    })

    it('Should not register if the opening hours has not been filled', () => {
      let orphanage = data.required
      delete orphanage.opening_hours
      cy.visitCreatePage()
      cy.createOrphanage(orphanage)
      cy.alertContent('Horário', 'Campo obrigatório')
    })

    it('Should not register if the form has empty fields', () => {
      let orphanage = data.required
      delete orphanage.name
      delete orphanage.description
      delete orphanage.image
      delete orphanage.opening_hours
      cy.visitCreatePage()
      cy.createOrphanage(orphanage)
      cy.alertContent('Nome', 'Campo obrigatório')
      cy.alertContent('Sobre', 'Campo obrigatório')
      cy.alertContent('Fotos', 'Envie pelo menos uma foto')
      cy.alertContent('Horário', 'Campo obrigatório')
    })
  })
})


