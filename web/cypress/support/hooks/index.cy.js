describe('Setup', () => {
  before(() => {
    cy.dropCollection('orphanages')
  })
  it('Successfully dropped', () => {
    cy.log('Collection orphanages was successfully dropped!')
  })   
})
