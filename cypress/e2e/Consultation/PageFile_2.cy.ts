/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'un fichier - Vérifier les informations affichées', () => {
  const setupTest = () => {
    cy.login();
    cy.visitFileEntity('FH0003480');
  };

  it('Titre', () => {
    setupTest();
    cy.get('[class*="EntityTitle"]').contains('FH0003480');
  });

  it('Panneau Summary', () => {
    setupTest();
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains(/^1$/);
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains('Study');
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains(/^1$/);
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains(/^Participant$/);
    cy.get('[data-cy="SummaryHeader_Samples_Button"]').contains(/^1$/);
    cy.get('[data-cy="SummaryHeader_Samples_Button"]').contains(/^Sample$/);
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(0).contains('ID').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(0).contains('FH0003480').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(1).contains('Name').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).contains('FI0014581.S15906.hard-filtered.gvcf.gz').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(2).contains('Format').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).contains(/^gVCF$/).should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).find('[class*="FileEntity_tag"]').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(3).contains('Size').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).contains('6.51 GB').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').contains('URL').should('not.exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').contains('https://ferload.qa.cqdg.ferlab.bio/').should('not.exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').contains('Hash').should('not.exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').contains(/^-$/).should('not.exist');
  });

  it('Panneau Data Type', () => {
    setupTest();
    cy.get('[id="data_type"] [class="ant-descriptions-item-label"]').eq(0).contains('Category').should('exist');
    cy.get('[id="data_type"] [class="ant-descriptions-item-content"]').eq(0).contains('Genomics').should('exist');
    cy.get('[id="data_type"] [class="ant-descriptions-item-label"]').eq(1).contains('Type').should('exist');
    cy.get('[id="data_type"] [class="ant-descriptions-item-content"]').eq(1).contains('SNV').should('exist');
  });

  it('Panneau Participants-Samples', () => {
    setupTest();
    cy.resetColumns('biospecimens');
    cy.get('[id="biospecimens"] [class="ant-collapse-header"]').contains('(1)').should('exist');
    cy.get('[id="biospecimens"] [class="ant-collapse-header"]').contains('View in Data Explorer').should('exist');
    cy.get('[id="biospecimens"] [class="ant-collapse-header"] svg[class="anticon"]').should('exist');
    cy.get('[id="biospecimens"] thead th[class="ant-table-cell"]').eq(0).contains('Participant').should('exist');
    cy.get('[id="biospecimens"] thead th[class="ant-table-cell"]').eq(1).contains('Study').should('exist');
    cy.get('[id="biospecimens"] thead th[class="ant-table-cell"]').eq(2).contains('Sample').should('exist');
    cy.get('[id="biospecimens"] thead th[class="ant-table-cell"]').eq(3).contains('Sample Type').should('exist');
    cy.get('[id="biospecimens"] thead th[class="ant-table-cell"]').eq(4).contains('Biospecimen').should('exist');
    cy.get('[id="biospecimens"] thead th[class="ant-table-cell"]').eq(5).contains('Tissue').should('exist');
    cy.get('[id="biospecimens"] td[class="ant-table-cell"]').eq(0).contains('PT0000964').should('exist');
    cy.get('[id="biospecimens"] td[class="ant-table-cell"]').eq(1).contains('T-DEE').should('exist');
    cy.get('[id="biospecimens"] td[class="ant-table-cell"]').eq(2).contains('SR0000084').should('exist');
    cy.get('[id="biospecimens"] td[class="ant-table-cell"]').eq(3).contains('DNA').should('exist');
    cy.get('[id="biospecimens"] td[class="ant-table-cell"]').eq(3).contains('NCIT:').should('exist');
    cy.get('[id="biospecimens"] td[class="ant-table-cell"]').eq(3).contains('C449').should('exist');
    cy.get('[id="biospecimens"] td[class="ant-table-cell"]').eq(4).contains('SP0000932').should('exist');
    cy.get('[id="biospecimens"] td[class="ant-table-cell"]').eq(5).contains('Blood').should('exist');
    cy.get('[id="biospecimens"] td[class="ant-table-cell"]').eq(5).contains('NCIT:').should('exist');
    cy.get('[id="biospecimens"] td[class="ant-table-cell"]').eq(5).contains('C12434').should('exist');
  });

  it('Panneau Experimental Procedure', () => {
    setupTest();
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-label"]').eq(0).contains('Strategy').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-content"]').eq(0).contains('WGS').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-content"]').eq(0).find('[class*="FileEntity_tag"]').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-label"]').eq(1).contains('Source').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-content"]').eq(1).contains('Genomic').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-label"]').eq(2).contains('Platform').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-content"]').eq(2).contains('Illumina').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-label"]').eq(3).contains('Sequencing Type').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-content"]').eq(3).contains('Paired Reads').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-label"]').eq(4).contains('Library Selection').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-content"]').eq(4).contains('Random').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-label"]').eq(5).contains('Capture Kit').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-content"]').eq(5).contains('-').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-label"]').eq(6).contains('Targeted Loci').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-content"]').eq(6).contains('-').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-label"]').eq(7).contains('Read Length').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-content"]').eq(7).contains('300').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-label"]').eq(8).contains('Protocol').should('exist');
    cy.get('[id="experimental_procedure"] [class="ant-descriptions-item-content"]').eq(8).contains('Genomic DNA extracted from blood samples was subjected to an additional cleaning step with the ZR-96 DNA Clean & Concentrator-5 Kit (Zymo) and then used for generating sequencing libraries with the TruSeq DNA PCR-Free Library Preparation Kit according to the manufacturer’s procedure. The platform model used for sequencing was Illumina HiSeq 2500.').should('exist');
  });

  it('Panneau Analysis Properties', () => {
    setupTest();
    cy.get('[id="analysis"] [class="ant-descriptions-item-label"]').eq(0).contains('ID').should('exist');
    cy.get('[id="analysis"] [class="ant-descriptions-item-content"]').eq(0).contains('AN0001563').should('exist');
    cy.get('[id="analysis"] [class="ant-descriptions-item-label"]').eq(1).contains('Analysis Type').should('exist');
    cy.get('[id="analysis"] [class="ant-descriptions-item-content"]').eq(1).contains('Germline Variant Analysis with Family Joint Genotyping').should('exist');
    cy.get('[id="analysis"] [class="ant-descriptions-item-label"]').eq(2).contains('Pipeline').should('exist');
    cy.get('[id="analysis"] [class="ant-descriptions-item-content"]').eq(2).contains('Dragen v6.0.0, Ferlab-Post-processing-Pipeline v102.0').should('exist');
    cy.get('[id="analysis"] [class="ant-descriptions-item-label"]').eq(3).contains('Genome Build').should('exist');
    cy.get('[id="analysis"] [class="ant-descriptions-item-content"]').eq(3).contains('GRCh38').should('exist');
  });

  it('Panneau Files Generated by the Analysis', () => {
    setupTest();
    cy.get('[id="analysis_files"] [class="ant-collapse-header"]').contains('(5)').should('exist');
    cy.get('[id="analysis_files"] [class="ant-collapse-header"]').contains('View in Data Explorer').should('exist');
    cy.get('[id="analysis_files"] [class="ant-collapse-header"] svg[class="anticon"]').should('exist');
    cy.get('[id="analysis_files"] thead th[class="ant-table-cell"]').eq(0).contains('File').should('exist');
    cy.get('[id="analysis_files"] thead th[class="ant-table-cell"]').eq(1).contains('Name').should('exist');
    cy.get('[id="analysis_files"] thead th[class="ant-table-cell"]').eq(2).contains('Type').should('exist');
    cy.get('[id="analysis_files"] thead th[class="ant-table-cell"]').eq(3).contains('Format').should('exist');
    cy.get('[id="analysis_files"] thead th[class="ant-table-cell"]').eq(4).contains('Size').should('exist');
    cy.get('[id="analysis_files"] thead th[class="ant-table-cell"]').eq(5).contains('Sample').should('exist');
    cy.get('[id="analysis_files"] [data-cy="Link_File_FH0004562"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(1).contains('S15906.extra.tgz').should('exist');
    cy.get('[id="analysis_files"] [data-cy="Link_File_FH0004562"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(2).contains('Quality Control Metrics').should('exist');
    cy.get('[id="analysis_files"] [data-cy="Link_File_FH0004562"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(3).contains('TGZ').should('exist');
    cy.get('[id="analysis_files"] [data-cy="Link_File_FH0004562"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(3).find('[class*="FileEntity_tag"]').should('exist');
    cy.get('[id="analysis_files"] [data-cy="Link_File_FH0004562"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(4).contains('17.91 GB').should('exist');
    cy.get('[id="analysis_files"] [data-cy="Link_File_FH0004562"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(5).contains('SR0000084').should('exist');
  });
});
