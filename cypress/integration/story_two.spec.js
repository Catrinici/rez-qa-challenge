import { onVacationRentalsPage } from '../support/page_objects/vacationRentalsPage'

describe('Filter properties based on the number of bedrooms and bathrooms', () => {
  describe('The Filters selection should allow the user to select the number of either bedrooms and/or bathrooms', () => {
    it('Should check if the Filter Results iframe is opening', () => {
      cy.visit('/')
      onVacationRentalsPage.btnFilter
    })
    it('Should check if the selection limits the value to an integer with a lower value of zero', () => {
      onVacationRentalsPage.lowerThanZero()
    })
    it('Should check if the increase and decrease buttons of the "Minimum Bedrooms filter work as expected"', () => {
      onVacationRentalsPage.minBedIncreaseFilter()
      onVacationRentalsPage.minBedDecreaseFilter()
    })
    it('Should check if the increase and decrease buttons of the "Minimum Bathrooms filter work as expected"', () => {
      onVacationRentalsPage.minBathIncreaseFilter()
      onVacationRentalsPage.minBathDecreaseFilter()
    })

    it('Should check if the View Results button close the Filter Results page and display properties on the hub', () => {
      onVacationRentalsPage.clickViewResults()
      cy.get('.bt-result-count').should('have.text', '17 Results')
    })
    it('Should check if the Clear Filters button resets both filters to their lower value', () => {
      onVacationRentalsPage.btnFilter
      onVacationRentalsPage.clickClearFilters()
    })
  })
})
