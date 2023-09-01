/// <reference types="Cypress" />
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
  cy.login();
});

describe('Page d\'un participant - Exporter le tableau Family en TSV', () => {
  beforeEach(() => {
    cy.visitParticipantEntity('PT1007374');
    cy.resetColumns('family');
    cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1, 1);
  });
  
  it('Valider le nom du fichier [CQDG-311]', () => {
    cy.validateFileName('cqdg-family-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier [CQDG-328]', () => {
    cy.validateFileHeaders('ExportTableauFamilyPageParticipant.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauFamilyPageParticipant.json');
  });
});

describe('Page d\'un participant - Exporter le tableau Diagnoses en TSV', () => {
  beforeEach(() => {
    cy.visitParticipantEntity('PT1007374');
    cy.resetColumns('diagnosis');
    cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1, 2);
  });
  
  it('Valider le nom du fichier [CQDG-311]', () => {
    cy.validateFileName('cqdg-diagnoses-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauDiagnosesPageParticipant.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauDiagnosesPageParticipant.json');
  });
});

describe('Page d\'un participant - Exporter le tableau Phenotypes en TSV', () => {
  beforeEach(() => {
    cy.visitParticipantEntity('PT1007374');
    cy.resetColumns('phenotype');
    cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1, 3);
  });
  
  it('Valider le nom du fichier [CQDG-311]', () => {
    cy.validateFileName('cqdg-phenotypes-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauPhenotypesPageParticipant.json');
  });

  it('Valider le contenu du fichier [CQDG-332]', () => {
    cy.validateFileContent('ExportTableauPhenotypesPageParticipant.json');
  });
});

describe('Page d\'un participant - Exporter le tableau Biospecimens en TSV', () => {
  beforeEach(() => {
    cy.visitParticipantEntity('PT1007374');
    cy.resetColumns('biospecimen');
    cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1, 5);
  });
  
  it('Valider le nom du fichier [CQDG-311]', () => {
    cy.validateFileName('cqdg-biospecimens-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauBiospecimensPageParticipant.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauBiospecimensPageParticipant.json');
  });
});