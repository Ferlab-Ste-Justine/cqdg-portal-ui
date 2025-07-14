/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('datafiles');
  cy.get('[data-cy="SidebarMenuItem_Data File"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
});

describe('Page Data Exploration (Data Files) - Filtrer avec les facettes', () => {
  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Search by file ID - FI0009373', () => {
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search by IDs').should('exist');

    cy.get('[class*="SearchLabel_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true}); //data-cy="SearchLabel_InfoCircleOutlined"
    cy.get('div[class="ant-tooltip-inner"]').contains('Search by file ID').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'FI0009373', 'POST', '*/grapgql', 1);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('FI0009373').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_FI0009373"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('FI0009373').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_FI0009373"]').should('not.exist');
  });

  it('Dataset - Data1', () => {
    cy.validateFacetFilter('Dataset', 'Data1', 'data1', /^28$/);
    cy.validateFacetRank(0, 'Dataset');
  });

  it('Data Category - Genomics', () => {
    cy.validateFacetFilter('Data Category', 'Genomics', 'Genomics', /^3,210$/);
    cy.validateFacetRank(1, 'Data Category');
  });

  it('Data Type - Aligned Reads', () => {
    cy.validateFacetFilter('Data Type', 'Aligned Reads', 'Aligned Reads', /^602$/);
    cy.validateFacetRank(2, 'Data Type');
  });

  it('Strategy - Whole Genome Sequencing', () => {
    cy.validateFacetFilter('Strategy', 'WGS', 'WGS', /^3,207$/);
    cy.validateFacetRank(3, 'Strategy');
  });

  it('Platform - Illumina HiSeq 2500 PE125', () => {
    cy.validateFacetFilter('Platform', 'Illumina HiSeq 2500 PE125', 'Illumina HiSeq 2500 PE125', /^2,369$/);
    cy.validateFacetRank(4, 'Platform');
  });

  it('Library Selection - Reduced Representation', () => {
    cy.validateFacetFilter('Library Selection', 'Reduced Representation', 'Reduced Representation', /^3,207$/);
    cy.validateFacetRank(5, 'Library Selection');
  });

  it('Format - gVCF', () => {
    cy.validateFacetFilter('Format', 'GVCF', 'gVCF', /^597$/);
    cy.validateFacetRank(6, 'Format');
  });
});
