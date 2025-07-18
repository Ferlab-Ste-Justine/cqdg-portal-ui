/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitStudyEntity('STUDY1', 1);
  cy.get('[class*="EntityTitle"] [data-cy="FileManifest_Button"]').click({force: true});
});

describe('Page d\'une étude - Bouton Manifest', () => {
  it('Vérifier les informations affichées - Modal', () => {
    cy.get('[class="ant-modal-title"]').contains('File manifest').should('exist');
    cy.get('[class="ant-modal-body"]').contains('Download a manifest of this study’s files which can be used with CQDG\'s bulk download tool. This manifest also includes additional information, including the participants and samples associated with these files.').should('exist');
    cy.get('[class="ant-modal-body"]').contains('Include data files of the same type for the participants\' related family members for this selection.').should('not.exist');
    cy.get('[class*="DownloadFileManifestModal_table"] thead th').eq(0).contains('Data Type').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] thead th').eq(1).contains('Participants').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] thead th').eq(2).contains('Files').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] thead th').eq(3).contains('Size').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Metrics"] td').eq(0).contains('Metrics').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Metrics"] td').eq(1).contains(/^9$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Metrics"] td').eq(2).contains(/^9$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Metrics"] td').eq(3).contains(/^0 B$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Germline Structural Variant"] td').eq(0).contains('Germline Structural Variant').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Germline Structural Variant"] td').eq(1).contains(/^9$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Germline Structural Variant"] td').eq(2).contains(/^9$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Germline Structural Variant"] td').eq(3).contains(/^0 B$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Annotated SNV"] td').eq(0).contains('Annotated SNV').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Annotated SNV"] td').eq(1).contains(/^3$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Annotated SNV"] td').eq(2).contains(/^6$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Annotated SNV"] td').eq(3).contains(/^477.79 MB$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Aligned Reads"] td').eq(0).contains('Aligned Reads').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Aligned Reads"] td').eq(1).contains(/^9$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Aligned Reads"] td').eq(2).contains(/^9$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Aligned Reads"] td').eq(3).contains(/^10.73 GB$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="SNV"] td').eq(0).contains('SNV').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="SNV"] td').eq(1).contains(/^9$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="SNV"] td').eq(2).contains(/^9$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Unaligned Reads"] td').eq(0).contains('Unaligned Reads').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Unaligned Reads"] td').eq(1).contains(/^1$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Unaligned Reads"] td').eq(2).contains(/^4$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Unaligned Reads"] td').eq(3).contains(/^0 B$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="SNV"] td').eq(3).contains(/^2.17 GB$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Supplement"] td').eq(0).contains('Supplement').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Supplement"] td').eq(1).contains(/^1$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Supplement"] td').eq(2).contains(/^1$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Supplement"] td').eq(3).contains(/^159.84 MB$/).should('exist');

    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').eq(0).find('[class*="anticon-copy"]').should('exist');
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').eq(0).contains('Copy manifest ID').should('exist');
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').eq(1).find('[class*="anticon-download"]').should('exist');
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').eq(1).contains('Download').should('exist');
  });

  it('Valider les fonctionnalités - Bouton Cancel', () => {
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').click({force: true});
    cy.get('[class*="DownloadFileManifestModal_modal"]').should('not.exist');
    cy.task('fileExists', `${Cypress.config('downloadsFolder')}`).then((exists) => {
      assert.isTrue(!exists);
    });
  });

  it('Valider les fonctionnalités - Bouton Copy manifest ID', () => {
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/sets', 1, 0);
    cy.get('[class="ant-message"]').contains('ID copied to clipboard').should('exist');
    cy.get('[class="ant-message"]').contains('error').should('not.exist');
  });

  it('Vérifier les informations affichées - Tooltip du bouton Copy manifest ID', () => {
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"] [class*="anticon-copy"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('div[class="ant-tooltip-inner"]').contains('Copy the manifest ID for use in ').should('exist');
    cy.get('div[class="ant-tooltip-inner"]').contains('ferload').should('exist');
    cy.get('div[class="ant-tooltip-inner"] [class="anticon"]').should('exist');
  });

  it('Valider les liens disponibles - Tooltip du bouton Copy manifest ID', () => {
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"] [class*="anticon-copy"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('div[class="ant-tooltip-inner"] [class*="DownloadFileManifestModal_externalLinkFerload"]').should('have.attr', 'href', 'https://docs.cqdg.ca/docs/comment-utiliser-le-client-ferload?ljs=en-CA');
  });

  it('Valider les fonctionnalités - Bouton Download', () => {
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/file-manifest', 1, 1);
    cy.get('[class*="DownloadFileManifestModal_modal"]').should('not.exist');
    cy.waitUntilFile(oneMinute);
    cy.validateFileName('*.tsv');
  });
});
