/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'une étude - Valider les liens disponibles', () => {
  const setupTest = () => {
    cy.login();
    cy.visitStudyEntity('T-DEE', 1);
  };

  it('Lien du Program du panneau Summary', () => {
    setupTest();
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).find('[href]').eq(0).clickAndWait({force: true});
    cy.get('[class*="ProgramEntity"]').contains('RARE.Qc – The Network to Advance Rare Disease Research in Quebec');
  });
  
  it('Lien du Website du panneau Summary', () => {
    setupTest();
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(14).find('[href]')
      .should('have.attr', 'href', 'https://www.t_dee.com/');
  });

  it('Lien Duo de l\'Access Limitations du panneau Data Access', () => {
    setupTest();
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000006');
  });

  it('Lien Duo de l\'Access Requirements du panneau Data Access', () => {
    setupTest();
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000016');
  });

  it('Lien de l\'Access Authority du panneau Data Access', () => {
    setupTest();
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(2).find('[href]')
      .should('have.attr', 'href', 'mailto:jacques.michaud.med@ssss.gouv.qc.ca');
  });

  it('Lien DataExploration du panneau data1', () => {
    setupTest();
    cy.visitStudyEntity('STUDY1', 1);
    cy.get('[data-cy="Dataset_RedirectLink"]').eq(0).clickAndWait({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Dataset').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Data1').should('exist');
  });

  it('Lien Files de Germline CNV du panneau Files', () => {
    setupTest();
    cy.get('[id="data_file"] [data-row-key="Germline CNV"] td[class="ant-table-cell"]').eq(1).find('[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Data Type').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('T-DEE').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Germline CNV').should('exist');
  });

  it('Lien Files de WGS du panneau Files', () => {
    setupTest();
    cy.get('[id="data_file"] [data-row-key="WGS"] td[class="ant-table-cell"]').eq(1).find('[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Strategy').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('T-DEE').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('WGS').should('exist');
  });
});
