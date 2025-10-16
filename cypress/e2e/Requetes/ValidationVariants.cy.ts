/// <reference types="cypress"/>
import { SharedFilters } from '../../pom/shared/Filters';
import '../../support/commands';

describe('Page Data Exploration - Requêtes', () => {
  const setupTest = () => {
    cy.login();
    cy.visitVariantsPage(SharedFilters.variant.predefinedQueries);
  };

  it('Validation Facette numérique ou No Data', () => {
    setupTest();
    cy.validateTotalSelectedQuery('173K');
    cy.validateTableResultsCount('173K');
  });

  it('Validation Facette numérique OU Facette standard', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('466K');
    cy.validateTableResultsCount('466K');
  });

  it('Validation Facette numérique ou No Data ET Facette standard', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(2).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('132K');
    cy.validateTableResultsCount('132K');
  });

  it('Validation Facette standard (Any of)', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(3).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('488K');
    cy.validateTableResultsCount('488K');
  });

  it('Validation Facette standard (All of)', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(4).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('0');
    cy.validateTableResultsCount('No Result');
  });

  it('Validation Facette standard (None of)', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(5).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('66.1K');
    cy.validateTableResultsCount('66.1K');
  });

  it('Validation Facette standard (None of) ET Facette numérique', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(6).clickAndWait();
    cy.wait('@getPOSTgraphql');

    cy.validateTotalSelectedQuery('40.4K');
    cy.validateTableResultsCount('40.4K');
  });
});
