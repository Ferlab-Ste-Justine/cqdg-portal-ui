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
    cy.validateTableFirstRow(/^[A-M]/, 0);
    cy.sortTableAndWait('Code');
    cy.validateTableFirstRow(/^[N-Z]/, 0);
  });

  it('Tri Name', () => {
    setupTest();
    cy.sortTableAndWait('Name');
    cy.validateTableFirstRow(/^[A-M]/, 1);
    cy.sortTableAndWait('Name');
    cy.validateTableFirstRow(/^[N-Z]/, 1);
  });
    
  it('Tri Domain', () => {
    setupTest();
    cy.sortTableAndWait('Domain');
    cy.validateTableFirstRow(/^[A-M]/, 3);
    cy.sortTableAndWait('Domain');
    cy.validateTableFirstRow(/^[N-Z]/, 3);
  });
    
  it('Tri Population', () => {
    setupTest();
    cy.sortTableAndWait('Population');
    cy.validateTableFirstRow(/^[A-M]/, 4);
    cy.sortTableAndWait('Population');
    cy.validateTableFirstRow(/^[N-Z]/, 4);
  });

  it('Tri multiple', () => {
    setupTest();
    cy.sortTableAndWait('Population');
    cy.sortTableAndWait('Population');
    cy.sortTableAndWait('Domain');
    cy.validateTableFirstRow('Neurodevelopmental Conditions', 3);
  });
});
