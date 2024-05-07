describe('Home spec', () => {
  beforeEach('Hope web page should be online', () => {
    cy.visit('http://localhost:3000')
    cy.get('h1')
      .should('be.visible')
      .should('have.text', 'Semeando esperança, colhendo sorrisos')
  })
})
