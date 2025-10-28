/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../pom/shared/Utils';

const { strDate } = getDateTime();

describe('Page d\'un participant - Télécharger le clinical data (family)', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login();
    cy.visitParticipantEntity('PT0000879');
    cy.get('[class*="EntityTitle"] button[class*="ant-dropdown-trigger"]').click({force: true});
    cy.clickAndIntercept('[data-menu-id*="-familyClinicalData"]', 'POST', '**/file-manifest', 1);
    cy.waitUntilFile(oneMinute);
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName(`cqdg_familyClinicalData_${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}.xlsx`);
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    cy.validateXlsxFileContent('DownloadClinicalDataFamily.json');
  });
});
