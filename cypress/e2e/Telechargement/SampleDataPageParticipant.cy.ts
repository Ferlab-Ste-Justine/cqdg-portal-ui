/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../pom/shared/Utils';

const { strDate } = getDateTime();

describe('Page d\'un participant - Télécharger le sample data', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login();
    cy.visitParticipantEntity('PT0000010');
    cy.clickAndIntercept('[id="biospecimen"] button[class*="ant-btn-default"]', 'POST', '**/file-manifest', 1);
    cy.waitUntilFile(oneMinute);
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName(`cqdg_biospecimenData_${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}.xlsx`);
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    cy.validateXlsxFileContent('DownloadSampleData.json');
  });
});
