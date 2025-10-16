/// <reference types="cypress"/>
import '../../support/commands';

describe('Page Data Exploration (Participants) - Filtrer avec les facettes', () => {
  const setupTest = () => {
    cy.login();
    cy.visitDataExploration('participants');
    cy.get('[data-cy="SidebarMenuItem_Participant"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  };

  it('Expand all/Collapse all', () => {
    setupTest();
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').its('length').should('eq', 2);

    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Search by participant ID - PT0000010', () => {
    setupTest();
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search by IDs').should('exist');

    cy.get('[class*="SearchLabel_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true}); //data-cy="SearchLabel_InfoCircleOutlined"
    cy.get('div[class="ant-tooltip-inner"]').contains('Search by participant ID or external participant ID').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'pt0000010', 'POST', '*/grapgql', 1);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('PT0000010').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_PT0000010"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT0000010').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_PT0000010"]').should('not.exist');
  });

  it('Search by external participant ID - HSJ-1005-389', () => {
    setupTest();
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'hsj-1005-389', 'POST', '*/grapgql', 1);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('PT0000010').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_PT0000010"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT0000010').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_PT0000010"]').should('not.exist');
  });

  it('Study Code - STUDY1', () => {
    setupTest();
    cy.validateFacetFilter('Study Code', 'STUDY1', 'STUDY1', /^9$/);
    cy.validateFacetRank(0, 'Study Code');
  });

  it('Program - RARE-QC2', () => {
    setupTest();
    cy.validateFacetFilter('Program', 'RARE-QC2', 'RARE-QC2', /^588$/);
    cy.validateFacetRank(1, 'Program');
  });

  it('Phenotype (HPO)', () => {
    setupTest();
    cy.get('div[class*="CollapsePlaceHolderFacet_collapseLikeFacet"]').eq(0).contains('Phenotype (HPO)').should('exist');
    // TODO Filtrer
  });

  it('Diagnosis (MONDO)', () => {
    setupTest();
    cy.get('div[class*="CollapsePlaceHolderFacet_collapseLikeFacet"]').eq(1).contains('Diagnosis (MONDO)').should('exist');
    // TODO Filtrer
  });

  it('Diagnosis (ICD-10) - Generalized idiopathic epilepsy and epileptic syndromes, intractable (G40.31)', () => {
    setupTest();
    cy.validateFacetFilter('Diagnosis (ICD-10)', 'Generalized idiopathic epilepsy and epileptic syndromes, intractable (G40.31)', 'Generalized idiopathic epilepsy and epileptic syndromes, intractable (G40.31)', /^206$/);
    cy.validateFacetRank(2, 'Diagnosis (ICD-10)');
  });

  it('Family Position - Proband', () => {
    setupTest();
    cy.validateFacetFilter('Family Position', 'Proband', 'Proband', /^201$/);
    cy.validateFacetRank(3, 'Family Position');
  });

  it('Family Type - Case-parent trio', () => {
    setupTest();
    cy.validateFacetFilter('Family Type', 'Case-parent trio', 'Case-parent trio', /^594$/);
    cy.validateFacetRank(4, 'Family Type');
  });

  it('Sex - Female', () => {
    setupTest();
    cy.validateFacetFilter('Sex', 'Female', 'female', /^286$/);
    cy.validateFacetRank(5, 'Sex');
  });

  it('Gender - Woman', () => {
    setupTest();
    cy.validateFacetFilter('Gender', 'Woman', 'Woman', /^5$/);
    cy.validateFacetRank(6, 'Gender');
  });

  it('Age at Recruitment - Congenital', () => {
    setupTest();
    cy.validateFacetFilter('Age at Recruitment', 'Congenital', 'B-congenital', /^2$/);
    cy.validateFacetRank(7, 'Age at Recruitment');
  });

  it('Vital Status - Alive', () => {
    setupTest();
    cy.validateFacetFilter('Vital Status', 'Alive', 'Alive', /^2$/);
    cy.validateFacetRank(8, 'Vital Status');
  });

  it('Age at Diagnosis - Congenital', () => {
    setupTest();
    cy.validateFacetFilter('Age at Diagnosis', 'Congenital', 'B-congenital', /^3$/);
    cy.validateFacetRank(9, 'Age at Diagnosis');
  });

  it('Race - White', () => {
    setupTest();
    cy.validateFacetFilter('Race', 'White', 'White', /^5$/);
    cy.validateFacetRank(10, 'Race');
  });

  it('Phenotype (Source Text) - Intractable Seizures', () => {
    setupTest();
    cy.validateFacetFilter('Phenotype (Source Text)', 'Intractable Seizures', 'Intractable Seizures', /^203$/);
    cy.validateFacetRank(11, 'Phenotype (Source Text)');
  });

  it('Diagnosis (Source Text) - Intractable Epilepsy', () => {
    setupTest();
    cy.validateFacetFilter('Diagnosis (Source Text)', 'Intractable Epilepsy', 'Intractable Epilepsy', /\d{1}/);
    cy.validateFacetRank(12, 'Diagnosis (Source Text)');
  });
});
