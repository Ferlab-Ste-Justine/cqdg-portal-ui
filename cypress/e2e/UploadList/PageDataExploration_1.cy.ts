/// <reference types="cypress"/>
import '../../support/commands';

describe('Page Data Exploration (Participants) - Téléverser une liste d\'identifiants', () => {
  const setupTest = () => {
    cy.login();
    cy.visitDataExploration('participants');
    cy.get('[data-cy="SidebarMenuItem_Participant"]').clickAndWait({force: true});
    cy.get('button[class*="UploadIdsButton"]').clickAndWait({force: true});
    cy.get('[class="ant-modal-header"]').contains('participant').should('exist');
    cy.get('[class*="UploadModal"] textarea').type('pt0000010,hsj-1005-389 unknown');
  };

  it('Vérifier les informations affichées - Popover', () => {
    setupTest();
    cy.get('[class*="UploadModal"] [class*="anticon-info-circle"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});

    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').should('not.have.class', 'ant-popover-hidden');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Identifiers and File Formats').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Identifiers').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Participant ID, External Participant ID').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Separated by').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('comma, space, new line').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Upload file formats').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('.txt, .csv, .tsv').should('exist');
  });

  it('Valider les fonctionnalités de la modal - Bouton Supprimer', () => {
    setupTest();
    cy.get('[class*="UploadModal"] textarea').contains('pt0000010').should('exist');
    cy.get('[class*="UploadModal"] button[class*="ant-btn-text"]').clickAndWait({force: true});

    cy.get('[class*="UploadModal"] textarea').contains('pt0000010').should('not.exist');
    cy.get('[class*="UploadModal"] button[class*="ant-btn-text"]').should('not.exist');
  });
  
  it('Valider les fonctionnalités de la modal - Bouton Annuler', () => {
    setupTest();
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').clickAndWait({force: true});

    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
  });

  it('Valider les fonctionnalités de la modal - Section Résumé masquable', () => {
    setupTest();
    cy.get('[class*="UploadModal"] [class="ant-collapse-header-text"]').contains('Summary Table (2 matched, 1 unmatched)').should('exist');

    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[class*="UploadModal"] div[class*="ant-collapse-content-active"]').should('exist');

    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[class*="UploadModal"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
  });

  it('Vérifier les informations affichées - Section Résumé (onglet Reconnus)', () => {
    setupTest();
    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});

    cy.get('[class*="UploadModal_tablesMessages"]').contains('3 submitted identifiers mapped to 1 unique system identifiers').should('exist');
    cy.get('[data-node-key="matched"]').contains('Matched (2)').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Submitted Participant identifiers').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Mapped To').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Participant ID').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Study Code').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="PT0000010:0"] td').eq(0).contains('pt0000010').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="PT0000010:0"] td').eq(1).contains('PT0000010').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="PT0000010:0"] td').eq(2).contains('T-DEE').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="PT0000010:1"] td').eq(0).contains('hsj-1005-389').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="PT0000010:1"] td').eq(1).contains('PT0000010').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="PT0000010:1"] td').eq(2).contains('T-DEE').should('exist');
  });

  it('Vérifier les informations affichées - Section Résumé (onglet Inconnus)', () => {
    setupTest();
    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[data-node-key="unmatched"]').clickAndWait({force: true});

    cy.get('[data-node-key="unmatched"]').contains('Unmatched (1)').should('exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Submitted Participant identifiers').should('exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Mapped To').should('not.exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Participant ID').should('not.exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Study Code').should('not.exist');
    cy.get('[id*="panel-unmatched"] [data-row-key="0"] td').eq(0).contains('unknown').should('exist');
    cy.get('[id*="panel-unmatched"] [data-row-key="0"] td').eq(1).should('not.exist');
  });
  
  it('Valider les fonctionnalités de la modal - Bouton Téléverser', () => {
    setupTest();
    cy.wait(2000);
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/graphql', 3);

    cy.validatePillSelectedQuery('Participant ID', ['Uploaded List']);
    cy.validateTotalSelectedQuery('1');
    cy.validateTableResultsCount('1');
    cy.get('[class*="ant-select-show-search"] [class="ant-tag"]').should('not.exist');

    cy.get('[class*="QueryValues_queryValuesContainer"]').contains('Uploaded List').clickAndWait({force:true});
    cy.get('[class*="filtersDropdown"]').should('not.exist');
  });
});
