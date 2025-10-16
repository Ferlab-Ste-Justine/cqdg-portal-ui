/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des études - Valider les fonctionnalités du tableau', () => {
  const setupTest = () => {
    cy.login();
    cy.visitStudiesPage();
    cy.showColumn('Population');
    cy.showColumn('Biospecimens');
    cy.showColumn('Access Limitation');
    cy.showColumn('Access Requirement');
    cy.showColumn('Overall Design');
    cy.showColumn('Data Collection Method');
    cy.showColumn('Principal Investigators');
    cy.showColumn('Contact Persons');
    cy.showColumn('Affiliated Institutions');
    cy.showColumn('Inclusion and Exclusion Criteria');
    cy.showColumn('Description');
  };

  it('Tri Code', () => {
    setupTest();
    cy.sortTableAndWait('Code');
    cy.validateTableFirstRow('STUDY1', 0);
    cy.sortTableAndWait('Code');
    cy.validateTableFirstRow('T-DEE', 0);
  });

  it('Tri Name', () => {
    setupTest();
    cy.sortTableAndWait('Name');
    cy.validateTableFirstRow('Congenital malformations', 1);
    cy.sortTableAndWait('Name');
    cy.validateTableFirstRow('Developmental and epileptic encephalopathies', 1);
  });
    
  it('Tri Domain', () => {
    setupTest();
    cy.sortTableAndWait('Domain');
    cy.validateTableFirstRow('Neurodevelopmental Conditions', 3);
    cy.sortTableAndWait('Domain');
    cy.validateTableFirstRow('Rare Diseases', 3);
  });
    
  it('Tri Population', () => {
    setupTest();
    cy.sortTableAndWait('Population');
    cy.validateTableFirstRow('Pediatric and adult', 4);
    cy.sortTableAndWait('Population');
    cy.validateTableFirstRow('Pediatric and adult', 4);
  });

  it('Tri multiple', () => {
    setupTest();
    cy.sortTableAndWait('Population');
    cy.sortTableAndWait('Domain');
    cy.validateTableFirstRow('Neurodevelopmental Conditions', 3);
  });
});
