Cypress.Commands.add('visitCreatePage', () => {
  cy.goTo('http://localhost:3000/orphanages/create')
  cy.get('legend').should('be.visible').should('have.text', 'Cadastro')
})

Cypress.Commands.add('createOrphanage', (orphanage) => {
  cy.setMapPosition(orphanage.position)
  
  // Creating aliases for the fields
  cy.get('input[name=name]').as('fieldName')
  cy.get('#description').as('fieldDesc')
  cy.get('input[type=file]').as('fieldImage')
  cy.get('#opening_hours').as('fieldOpenHours')

  // '?' is the 'if' operator in Javascript and ':' is the 'else' operator
  orphanage.name ? 
    cy.get('@fieldName').type(orphanage.name) : 
    cy.log('Name field is empty')

  orphanage.description ? 
    cy.get('@fieldDesc').type(orphanage.description) : 
    cy.log('Description field is empty')

  orphanage.image ? 
    cy.get('@fieldImage').selectFile(`../web/cypress/fixtures/images/${orphanage.image}`,{ force: true }) : 
    cy.log('Image field is empty')

  orphanage.opening_hours ?
    cy.get('@fieldOpenHours').type(orphanage.opening_hours) :
    cy.log('Opening hours field is empty')

  cy.contains('button', orphanage.open_on_weekends).click()
  cy.get('.save-button').click()
})
