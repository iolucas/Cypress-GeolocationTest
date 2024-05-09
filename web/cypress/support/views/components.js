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

Cypress.Commands.add('mapsLink', (position) => {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${position.latitude},${position.longitude}`
  cy.contains('a', 'Ver rotas no Google Maps')
      .should('be.visible')
      .should('have.attr', 'href', mapsUrl)
})