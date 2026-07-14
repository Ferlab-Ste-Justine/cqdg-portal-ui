/// <reference types="cypress"/>
import '../../support/commands';

describe('Page Data Exploration (Data Files) - Filtrer avec les facettes', () => {
  const setupTest = () => {
    cy.login();
    cy.visitDataExploration('datafiles');
    cy.get('[data-cy="SidebarMenuItem_Data File"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  };

  it('Expand all/Collapse all', () => {
    setupTest();
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Search by file ID - FH0004562', () => {
    setupTest();
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search by IDs').should('exist');

    cy.get('[class*="SearchLabel_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true}); //data-cy="SearchLabel_InfoCircleOutlined"
    cy.get('div[class="ant-tooltip-inner"]').contains('Search by file ID').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'FH0004562', 'POST', '*/grapgql', 1);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('FH0004562').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_FH0004562"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('FH0004562').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_FH0004562"]').should('not.exist');
  });

  it('Dataset - Data1', () => {
    setupTest();
    cy.validateFacetFilter('Dataset', 'Data1', 'data1', /^2\d{1}$/);
    cy.validateFacetRank(0, 'Dataset');
  });

  it('Data Category - Genomics', () => {
    setupTest();
    cy.validateFacetFilter('Data Category', 'Genomics', 'Genomics', /^3,\d{3}$/);
    cy.validateFacetRank(1, 'Data Category');
  });

  it('Analysis Type - Germline Variant Analysis with Family Joint Genotyping', () => {
    setupTest();
    cy.validateFacetFilter('Analysis Type', 'Germline Variant Analysis with Family Joint Genotyping', 'Germline Variant Analysis with Family Joint Genotyping', /^(2|3),\d{3}$/);
    cy.validateFacetRank(2, 'Analysis Type');
  });

  it('Data Type - Aligned Reads', () => {
    setupTest();
    cy.validateFacetFilter('Data Type', 'Aligned Reads', 'Aligned Reads', /^(5|6)\d{2}$/);
    cy.validateFacetRank(3, 'Data Type');
  });

  it('Strategy - Whole Genome Sequencing', () => {
    setupTest();
    cy.validateFacetFilter('Strategy', 'WGS', 'WGS', /^3,\d{3}$/);
    cy.validateFacetRank(4, 'Strategy');
  });

  it('Platform - Illumina', () => {
    setupTest();
    cy.validateFacetFilter('Platform', 'Illumina', 'Illumina', /^(2|3),\d{3}$/);
    cy.validateFacetRank(5, 'Platform');
  });

  it('Library Selection - Reduced Representation', () => {
    setupTest();
    cy.validateFacetFilter('Library Selection', 'Reduced Representation', 'Reduced Representation', /^\d{2}$/);
    cy.validateFacetRank(6, 'Library Selection');
  });

  it('Format - gVCF', () => {
    setupTest();
    cy.validateFacetFilter('Format', 'GVCF', 'gVCF', /^(5|6)\d{2}$/);
    cy.validateFacetRank(7, 'Format');
  });
});
