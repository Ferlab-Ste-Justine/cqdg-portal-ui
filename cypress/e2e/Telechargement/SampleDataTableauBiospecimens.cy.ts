/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../pom/shared/Utils';

const { strDate } = getDateTime();

describe('Page Data Exploration (Biospecimens) - Télécharger le sample data', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login();
    cy.visitDataExploration('biospecimens', '?sharedFilterId=27aa6ea1-1ace-4661-b716-db987b0f78fb');
    cy.get('div[role="tabpanel"] [class*="ant-table-row"]').eq(0).find('[type="checkbox"]').check({force: true});
    cy.clickAndIntercept('[class*="Header_ProTableHeader"] button[class*="ant-btn-default"]', 'POST', '**/file-manifest', 1, 1);
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
