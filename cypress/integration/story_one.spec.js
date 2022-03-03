import { onVacationRentalsPage } from '../support/page_objects/vacationRentalsPage'

describe('Save properties so they can be reviewed at a later time', () => {
  it('Open the web application', () => {
    cy.visit('/')
  })
  it('Should check if the easy Favorite on/off button indicates that the property has been saved', () => {
    onVacationRentalsPage.likeAListing()
  })
  describe('The hub should have an indicator on the number of properties selected as saved', () => {
    it('Check the total count of listed properties', () => {
      onVacationRentalsPage.listingResult.should('contain', '35 Results')
    })
    it('Should check if the indicator show the total count of saved properties ', () => {
      onVacationRentalsPage.countOfSavedProperties()
    })
    it('Should check if the hub displays only the saved properties when the indicator is clicked', () => {
      onVacationRentalsPage.btnFavoriteProperties.click({ force: true })
      cy.get('section').scrollIntoView()
      onVacationRentalsPage.listingResult.should(
        'contain',
        onVacationRentalsPage.likedListings
      )
    })
    it('Unsave one properties from the filtered view', () => {
      onVacationRentalsPage.unlikeListing()
      onVacationRentalsPage.listingResult.should(
        'contain',
        onVacationRentalsPage.likedListings - 2
      )
      onVacationRentalsPage.btnFavoriteProperties.should(
        'have.text',
        `(${onVacationRentalsPage.likedListings - 2})`
      )
    })
  })
  describe('When a property is selected; there should be an indicator showing the property has been saved', () => {
    it('Select 069 Sawyer Two property from the list', () => {
      cy.contains('a', '069 Sawyer Two').click()
    })
    it('Check if the indicator is showing the property has been saved', () => {
      cy.get("[aria-label='Save as favorite 069 Sawyer Two']")
        .should('have.attr', 'aria-checked', 'true')
        .find('span')
        .should('have.text', 'Saved')
    })
    it('Check if the indicator can be toggled on from the property detail’s view', () => {
      cy.get(`[aria-label='Save as favorite 069 Sawyer Two']`)
        .click()
        .should('have.attr', 'aria-checked', 'true')
        .find('span')
        .should('have.text', 'Saved')
    })
    it('Check if the indicator can be toggled off from the property detail’s view', () => {
      cy.get(`[aria-label='Save as favorite 069 Sawyer Two']`)
        .click()
        .should('have.attr', 'aria-checked', 'false')
        .find('span')
        .should('have.text', 'Save')
    })
    it('Should check if the change (saved/un-saved) is reflected correctly on the total saved count on the main hub', () => {
      cy.go('back')
      onVacationRentalsPage.btnFavoriteProperties.should(
        'have.text',
        `(${onVacationRentalsPage.likedListings - 3})`
      )
    })
  })
})
