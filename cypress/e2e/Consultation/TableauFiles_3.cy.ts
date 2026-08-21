/// <reference types="cypress"/>
import '../../support/commands';

describe('Page Data Exploration (Data Files) - Valider les fonctionnalités du tableau', () => {
  const setupTest = () => {
    cy.login();
    cy.visitDataExploration('datafiles');
    cy.showColumn('Dataset');
    cy.showColumn('Profiling Resolution');
    cy.showColumn('Participants');
    cy.showColumn('Biospecimens');
    cy.showColumn('File Name');
  };

  it('Valider les fonctionnalités du tableau - Tri Study', () => {
    setupTest();
    cy.sortTableAndWait('Study');
    cy.validateTableFirstRow(/^[A-M]/, 4, true);
    cy.sortTableAndWait('Study');
    cy.validateTableFirstRow(/^[N-Z]/, 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Dataset', () => {
    setupTest();
    cy.sortTableAndWait('Dataset');
    cy.validateTableFirstRow('Families', 5, true);
    cy.sortTableAndWait('Dataset');
    cy.validateTableFirstRow('Data2', 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Data Category', () => {
    setupTest();
    cy.sortTableAndWait('Data Category');
    cy.validateTableFirstRow(/^[A-M]/, 6, true);
    cy.sortTableAndWait('Data Category');
    cy.validateTableFirstRow(/^[N-Z]/, 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Analysis Type', () => {
    setupTest();
    cy.sortTableAndWait('Analysis Type');
    cy.validateTableFirstRow(/^[A-M]/, 7, true);
    cy.sortTableAndWait('Analysis Type');
    cy.validateTableFirstRow(/^[N-Z]/, 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Data Type', () => {
    setupTest();
    cy.sortTableAndWait('Data Type');
    cy.validateTableFirstRow(/^[A-M]/, 8, true);
    cy.sortTableAndWait('Data Type');
    cy.validateTableFirstRow(/^[N-Z]/, 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Strategy', () => {
    setupTest();
    cy.sortTableAndWait('Strategy');
    cy.validateTableFirstRow(/^[A-M]/, 9, true);
    cy.sortTableAndWait('Strategy');
    cy.validateTableFirstRow(/^[N-Z]/, 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Profiling Resolution', () => {
    setupTest();
    cy.sortTableAndWait('Profiling Resolution');
    cy.validateTableFirstRow(/^[A-M]/, 10, true);
    cy.sortTableAndWait('Profiling Resolution');
    cy.validateTableFirstRow(/^[N-Z]/, 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Format', () => {
    setupTest();
    cy.sortTableAndWait('Format');
    cy.validateTableFirstRow(/(BAM|BED|CRAM)/, 11, true);
    cy.sortTableAndWait('Format');
    cy.validateTableFirstRow('gVCF', 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Size', () => {
    setupTest();
    cy.sortTableAndWait('Size');
    cy.validateTableFirstRow(/ B$/, 12, true);
    cy.sortTableAndWait('Size');
    cy.validateTableFirstRow(' GB', 12, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Platform', () => {
    setupTest();
    cy.showColumn('Platform');
    cy.sortTableAndWait('Platform');
    cy.validateTableFirstRow(/^[A-M]/, 16, true);
    cy.sortTableAndWait('Platform');
    cy.validateTableFirstRow(/^[N-Z]/, 16, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Instrument Model', () => {
    setupTest();
    cy.showColumn('Instrument Model');
    cy.sortTableAndWait('Instrument Model');
    cy.validateTableFirstRow(/^[A-M]/, 16, true);
    cy.sortTableAndWait('Instrument Model');
    cy.validateTableFirstRow(/^[N-Z]/, 16, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Pore Type', () => {
    setupTest();
    cy.showColumn('Pore Type');
    cy.sortTableAndWait('Pore Type');
    cy.validateTableFirstRow('R1', 16, true);
    cy.sortTableAndWait('Pore Type');
    cy.validateTableFirstRow('R8', 16, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Imputed', () => {
    setupTest();
    cy.showColumn('Imputed');
    cy.sortTableAndWait('Imputed');
    cy.validateTableFirstRow('No', 16, true);
    cy.sortTableAndWait('Imputed');
    cy.validateTableFirstRow('Yes', 16, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    setupTest();
    cy.sortTableAndWait('Format');
    cy.sortTableAndWait('Study');
    cy.sortTableAndWait('Study');
    cy.validateTableFirstRow(/^[N-Z]/, 4, true);
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
