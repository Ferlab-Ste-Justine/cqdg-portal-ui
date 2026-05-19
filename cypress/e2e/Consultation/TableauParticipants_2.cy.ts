/// <reference types="cypress"/>
import '../../support/commands';

describe('Page Data Exploration (Participants) - Valider les liens disponibles', () => {
  const setupTest = () => {
    cy.login();
    cy.visitDataExploration('participants', '?sharedFilterId=27aa6ea1-1ace-4661-b716-db987b0f78fb');
    cy.showColumn('Diagnosis (ICD)');
    cy.showColumn('Program');
  };

  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    setupTest();
    cy.get('[class*="QueryBar_selected"] [class*="anticon-save"]').should('not.exist');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-copy"]').should('exist');
  });

  it('Lien Participant du tableau', () => {
    setupTest();
    cy.get('tr[data-row-key="PT0000817"] [class*="ant-table-cell"]').eq(1).find('[href]').clickAndWait({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('PT0000817');
  });

  it('Lien Study du tableau', () => {
    setupTest();
    cy.get('tr[data-row-key="PT0000817"] [class*="ant-table-cell"]').eq(2).find('[href]').clickAndWait({force: true});
    cy.get('[id="study-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('Developmental and epileptic encephalopathies');
  });

  it('Lien Mondo de Diagnosis (MONDO) du tableau', () => {
    setupTest();
    cy.get('tr[data-row-key="PT0000817"] [class*="ant-table-cell"]').eq(4).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/MONDO_0005027');
  });

  it('Lien HP de Phenotype (HPO) du tableau', () => {
    setupTest();
    cy.get('tr[data-row-key="PT0000817"] [class*="ant-table-cell"]').eq(5).find('[href]')
      .should(($element) => {
        const hrefValue = $element.attr('href');
        const strHrefValue : string = hrefValue !== undefined ? hrefValue : "";
        const regex = /http:\/\/purl\.obolibrary\.org\/obo\/HP_000/;
        assert.match(strHrefValue, regex);
      });
  });

  it('Lien Files du tableau', () => {
    setupTest();
    cy.get('tr[data-row-key="PT0000817"] [class*="ant-table-cell"]').eq(9).find('[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT0000817').should('exist');
    cy.validateTableResultsCount(/^6$/);
  });

  it('Lien Biospecimens du tableau', () => {
    setupTest();
    cy.get('tr[data-row-key="PT0000817"] [class*="ant-table-cell"]').eq(10).find('[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT0000817').should('exist');
    cy.validateTableResultsCount(/^1$/);
  });

  it('Lien ICD de Diagnosis (ICD) du tableau', () => {
    setupTest();
    cy.get('tr[data-row-key="PT0000817"] [class*="ant-table-cell"]').eq(11).find('[href]')
      .should('have.attr', 'href', 'http://purl.bioontology.org/ontology/ICD10CM/G40.31');
  });
});
