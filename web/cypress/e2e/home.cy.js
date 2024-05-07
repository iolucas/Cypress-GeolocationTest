describe('Home spec', () => {
    beforeEach('Hope web page should be online',() => {
        cy.visit('http://localhost:3000')
        cy.get('h1')
            .should('be.visible')
            .should('have.text', 'Semeando esperança, colhendo sorrisos')
    })
    it('Should fill the form to register a new orphanage', () => {
        cy.get('.enter-app').click()
    })
})
