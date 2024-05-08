Cypress.Commands.add('popupContent', (text) => {
  cy.get('.swal2-html-container')
    .should('be.visible')
    .should('have.text', text)
})