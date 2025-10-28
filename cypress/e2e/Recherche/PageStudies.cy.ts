/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des études - Rechercher des études', () => {
  const setupTest = () => {
    cy.login();
    cy.visitStudiesPage();
  };

  it('Par study code', () => {
    setupTest();
    cy.typeAndIntercept('[class*="PageContent_search"]', 'study1', 'POST', '**/graphql', 6);
    cy.validateTableResultsCount(/1 Result/);
    cy.validateTableFirstRow('STUDY1', 0);

    cy.get('button[class*="Header_clearFilterLink"]').should('contain', 'Clear filters').clickAndWait({force: true});
    cy.validateTableResultsCount(/\d{1} Results/);
  });

  it('Par study name', () => {
    setupTest();
    cy.typeAndIntercept('[class*="PageContent_search"]', 'congenital', 'POST', '**/graphql', 10);
    cy.validateTableResultsCount(/1 Result/);
    cy.validateTableFirstRow('STUDY1', 0);

    cy.get('button[class*="Header_clearFilterLink"]').should('contain', 'Clear filters').clickAndWait({force: true});
    cy.validateTableResultsCount(/\d{1} Results/);
  });

  it('Par programme', () => {
    setupTest();
    cy.typeAndIntercept('[class*="PageContent_search"]', 'desiir', 'POST', '**/graphql', 8);
    cy.validateTableResultsCount(/1 Result/);

    cy.get('button[class*="Header_clearFilterLink"]').should('contain', 'Clear filters').clickAndWait({force: true});
    cy.validateTableResultsCount(/\d{1} Results/);
  });

  it('Par domaine', () => {
    setupTest();
    cy.typeAndIntercept('[class*="PageContent_search"]', 'diseases', 'POST', '**/graphql', 8);
    cy.validateTableResultsCount(/2 Results/);
    cy.validateTableFirstRow('STUDY', 0);

    cy.get('button[class*="Header_clearFilterLink"]').should('contain', 'Clear filters').clickAndWait({force: true});
    cy.validateTableResultsCount(/\d{1} Results/);
  });

  it('Par chercheur principal', () => {
    setupTest();
    cy.typeAndIntercept('[class*="PageContent_search"]', 'batman2', 'POST', '**/graphql', 6);
    cy.validateTableResultsCount(/1 Result/);
    cy.validateTableFirstRow('STUDY2', 0);

    cy.get('button[class*="Header_clearFilterLink"]').should('contain', 'Clear filters').clickAndWait({force: true});
    cy.validateTableResultsCount(/\d{1} Results/);
  });

  it('Par mot-clé', () => {
    setupTest();
    cy.typeAndIntercept('[class*="PageContent_search"]', 'FAMILY', 'POST', '**/graphql', 6);
    cy.validateTableResultsCount(/\d{1} Results/);
    cy.validateTableFirstRow('STUDY2', 0);

    cy.get('button[class*="Header_clearFilterLink"]').should('contain', 'Clear filters').clickAndWait({force: true});
    cy.validateTableResultsCount(/\d{1} Results/);
  });
});
