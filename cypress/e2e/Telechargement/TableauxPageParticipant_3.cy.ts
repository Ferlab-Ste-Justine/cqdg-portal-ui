/// <reference types="cypress"/>
import { getDateTime, oneMinute } from '../../pom/shared/Utils';

const { strDate } = getDateTime();

describe('Page d\'un participant - Exporter le tableau Phenotypes en TSV', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
    cy.login();
    cy.visitParticipantEntity('PT0000879');
    cy.resetColumns('phenotype');
    cy.get('div[id="content"] svg[data-icon="download"]').eq(3).clickAndWait({force: true});
    cy.waitUntilFile(oneMinute);
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName('cqdg-phenotypes-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    setupTest();
    cy.validateFileHeaders('ExportTableauPhenotypesPageParticipant.json');
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    cy.validateFileContent('ExportTableauPhenotypesPageParticipant.json');
  });
});
