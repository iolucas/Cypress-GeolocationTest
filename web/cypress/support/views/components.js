Cypress.Commands.add('popupContent', (text) => {
  cy.get('.swal2-html-container')
    .should('be.visible')
    .should('have.text', text)
})

Cypress.Commands.add('alertContent', (label, text) => {
  cy.contains('label', label)
    .parent()
    .find('small')
    .should('have.text', text)
})