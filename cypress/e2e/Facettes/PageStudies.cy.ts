/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des études - Filtrer avec les facettes', () => {
  const setupTest = () => {
    cy.login();
    cy.visitStudiesPage();
  };

  it('Expand all/Collapse all', () => {
    setupTest();
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');
  });

  it('Program - RARE-QC', () => {
    setupTest();
    cy.validateFacetFilter('Program', 'RARE-QC', 'RARE-QC', /^5 Results$/, false);
    cy.validateFacetRank(0, 'Program');
  });

  it('Domain - Rare Diseases', () => {
    setupTest();
    cy.validateFacetFilter('Domain', 'Rare diseases', 'rare diseases', /\d{1} Result/, false);
    cy.validateFacetRank(1, 'Domain');
  });

  it('Population - Pediatric and adult', () => {
    setupTest();
    cy.validateFacetFilter('Population', 'Pediatric and adult', 'Pediatric and adult', /\d{1} Results/, false);
    cy.validateFacetRank(2, 'Population');
  });

  it('Access Limitation - Health or medical or biomedical research (DUO:0000006)', () => {
    setupTest();
    cy.validateFacetFilter('Access Limitation', 'Health or medical or biomedical research (DUO:0000006)', 'health or medical or biomedical research (DUO:0000006)', /\d{1} Results/, false);
    cy.validateFacetRank(3, 'Access Limitation');
  });

  it('Access Requirement - Genetic studies only (DUO:0000016)', () => {
    setupTest();
    cy.validateFacetFilter('Access Requirement', 'Genetic studies only (DUO:0000016)', 'genetic studies only (DUO:0000016)', /\d{1} Results/, false);
    cy.validateFacetRank(4, 'Access Requirement');
  });

  it('Data Category - Genomics', () => {
    setupTest();
    cy.validateFacetFilter('Data Category', 'Genomics', 'Genomics', /\d{1} Results/, false);
    cy.validateFacetRank(5, 'Data Category');
  });

  it('Overall Design - Case only', () => {
    setupTest();
    cy.validateFacetFilter('Overall Design', 'Case only', 'Case only', /\d{1} Results/, false);
    cy.validateFacetRank(6, 'Overall Design');
  });

  it('Data Collection Method - Medical Records', () => {
    setupTest();
    cy.validateFacetFilter('Data Collection Method', 'Medical Records', 'Medical Records', /\d{1} Results/, false);
    cy.validateFacetRank(7, 'Data Collection Method');
  });
});
