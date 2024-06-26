import data from '../fixtures/orphanages.json'

describe('map', () => {
  it('Should choose a orphanage on the map', () => {
    const orphanage = data.map
    
    cy.deleteMany({name: orphanage.name }, { collection: 'orphanages' })
    cy.postOrphanage(orphanage)
    cy.locateOrphanage(orphanage.name)
    cy.contains('h1', orphanage.name).should('be.visible')
    cy.mapsLink(orphanage.position)
  })
})
