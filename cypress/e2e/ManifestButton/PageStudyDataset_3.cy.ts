/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../pom/shared/Utils';

const { strDate } = getDateTime();

describe('Page d\'une étude (Dataset) - Télécharger le manifest', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login();
    cy.visitStudyEntity('STUDY1', 1);
    cy.get('[class*="EntityDataset_container"] [data-cy="FileManifest_Button"]').eq(1).click({force: true});
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/file-manifest', 1, 1);
    cy.waitUntilFile(oneMinute);
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName('cqdg_data2_manifest_'+`${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    setupTest();
    cy.validateFileHeaders('DownloadManifestStudy.json');
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    cy.validateFileContent('DownloadManifestStudy.json');
  });
});
