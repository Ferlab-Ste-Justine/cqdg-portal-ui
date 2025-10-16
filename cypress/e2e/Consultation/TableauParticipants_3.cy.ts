/// <reference types="cypress"/>
import '../../support/commands';

describe('Page Data Exploration (Participants) - Valider les fonctionnalités du tableau', () => {
  const setupTest = () => {
    cy.login();
    cy.visitDataExploration('participants');
    cy.showColumn('Gender');
    cy.showColumn(/^Race$/);
    cy.showColumn('Race (Other)');
    cy.showColumn('Vital Status');
  };

  it('Valider les fonctionnalités du tableau - Tri Study', () => {
    setupTest();
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('STUDY1', 2, true);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('T-DEE', 2, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Sex', () => {
    setupTest();
    cy.sortTableAndIntercept('Sex', 1);
    cy.validateTableFirstRow('Another sex', 3, true);
    cy.sortTableAndIntercept('Sex', 1);
    cy.validateTableFirstRow('Male', 3, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Gender', () => {
    setupTest();
    cy.sortTableAndIntercept('Gender', 1);
    cy.validateTableFirstRow('Another Gender', 4, true);
    cy.sortTableAndIntercept('Gender', 1);
    cy.validateTableFirstRow('Woman', 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Family Position', () => {
    setupTest();
    cy.sortTableAndIntercept('Family Position', 1);
    cy.validateTableFirstRow('Brother', 7, true);
    cy.sortTableAndIntercept('Family Position', 1);
    cy.validateTableFirstRow('Proband', 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Family Type', () => {
    setupTest();
    cy.sortTableAndIntercept('Family Type', 1);
    cy.validateTableFirstRow('Case-parent trio', 8, true);
    cy.sortTableAndIntercept('Family Type', 1);
    cy.validateTableFirstRow('Other', 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Age', () => {
    setupTest();
    cy.sortTableAndIntercept('Age', 1);
    cy.validateTableFirstRow('Congenital', 9, true);
    cy.sortTableAndIntercept('Age', 1);
    cy.validateTableFirstRow('Senior', 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Race', () => {
    setupTest();
    cy.sortTableAndIntercept(/^Race$/, 1);
    cy.validateTableFirstRow('Another Racial Category', 12, true);
    cy.sortTableAndIntercept(/^Race$/, 1);
    cy.validateTableFirstRow('White', 12, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Race (Other)', () => {
    setupTest();
    cy.sortTableAndIntercept('Race (Other)', 1);
    cy.validateTableFirstRow('Some Other Race', 13, true);
    cy.sortTableAndIntercept('Race (Other)', 1);
    cy.validateTableFirstRow('Some Other Race', 13, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Vital Status', () => {
    setupTest();
    cy.sortTableAndIntercept('Vital Status', 1);
    cy.validateTableFirstRow('Alive', 14, true);
    cy.sortTableAndIntercept('Vital Status', 1);
    cy.validateTableFirstRow('Unknown', 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    setupTest();
    cy.sortTableAndIntercept('Family Type', 1);
    cy.sortTableAndIntercept('Family Type', 1);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('STUDY2', 2, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    setupTest();
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('20').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('Previous').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('First').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');
  });
});
