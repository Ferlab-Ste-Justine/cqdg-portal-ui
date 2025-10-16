/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../pom/shared/Utils';

const { strDate } = getDateTime();

describe('Page Data Exploration (Data Files) - Télécharger le manifest (checkbox)', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login();
    cy.visitDataExploration('datafiles', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
    cy.get('[data-row-key="FI00112245"]').find('[type="checkbox"]').check({force: true});
    cy.get('[data-cy="FileManifest_Button"]').click({force: true});
    cy.get('[class="ant-modal-body"] input[type="checkbox"]').check({force: true});
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/file-manifest', 1, 1);
    cy.waitUntilFile(oneMinute);
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName('cqdg_familyManifest_'+`${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    setupTest();
    cy.validateFileHeaders('DownloadManifestFamily.json');
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    cy.validateFileContent('DownloadManifestFamily.json');
  });
});
