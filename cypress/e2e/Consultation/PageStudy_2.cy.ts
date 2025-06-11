/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudyEntity('T-DEE', 1);
});

describe('Page d\'une étude - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitle"]').contains('Developmental and epileptic encephalopathies');
  });

  it('Panneau Summary', () => {
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains(/^588$/);
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains('Participants');
    cy.get('[data-cy="SummaryHeader_Families_Button"]').contains(/^196$/);
    cy.get('[data-cy="SummaryHeader_Families_Button"]').contains('Families');
    cy.get('[data-cy="SummaryHeader_Biospecimens_Button"]').contains(/^588$/);
    cy.get('[data-cy="SummaryHeader_Biospecimens_Button"]').contains('Biospecimens');
    cy.get('[data-cy="SummaryHeader_Files_Button"]').contains(/^3,136$/);
    cy.get('[data-cy="SummaryHeader_Files_Button"]').contains('Files');
    cy.get('[id="summary"] [class="ant-collapse-header"]').contains('Summary').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(0).contains('Study Code').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(0).contains('T-DEE').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(1).contains('Name').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).contains('Developmental and epileptic encephalopathies').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(2).contains('Program').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).contains('RARE.Qc – The Network to Advance Rare Disease Research in Quebec').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(3).contains('Description').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).contains('Case-parent trio study on developmental and epileptic encephalopaties (DEE)').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).contains('Description en francais, Case-parent trio study on developmental and epileptic encephalopaties (DEE)').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(4).contains('Overall Design').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(4).contains('Case only').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(4).contains('Case-control').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(4).find('[class*="StudyEntity_tag_"]').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(5).contains('Population').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(5).contains('Pediatric and adult').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(5).find('[class*="StudyEntity_tagCyan"]').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(6).contains('Inclusion and Exclusion Criteria').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(6).contains('Children with a diagnosis of intractable seizures').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(7).contains('Domain').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(7).contains('Neurodevelopmental Conditions').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(7).find('[class*="StudyEntity_tagGold"]').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(8).contains('Keywords').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(8).contains('Epilepsy').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(8).contains('Developmental Disorder').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(8).contains('Family Trios').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(9).contains('Data Category').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(9).contains('Genomics').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(9).contains('Imaging').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(10).contains('Data Collection Method').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(10).contains('Investigator Assessment').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(10).contains('Medical Records').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(11).contains('Principal Investigators').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(11).contains('Toto').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(12).contains('Contact Persons').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(12).contains('Tata').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(13).contains('Affiliated Institutions').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).contains('Toto Institution').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(14).contains('Website').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(14).contains('https://www.t_dee.com/').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(15).contains('Funding Sources').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(15).contains('fund_source1').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(16).contains('Citation Statement').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(16).contains('very good study').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data_access"] [class*="EntityDescriptions_title"]').contains('Data Access').should('exist');
    cy.get('[id="data_access"] [class="ant-collapse-header"]').contains('Data Access').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-label"]').eq(0).contains('Access Limitation').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(0).contains('Health or medical or biomedical research').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(0).contains('DUO:').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(0).contains('0000006').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-label"]').eq(1).contains('Access Requirement').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('Genetic studies only').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('DUO:').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('0000016').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('Ethics approval required').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('DUO:').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('0000021').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('User specific restriction').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('DUO:').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('0000026').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-label"]').eq(2).contains('Access Authority').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(2).contains('jacques.michaud.med@ssss.gouv.qc.ca').should('exist');
  });

  it('Panneau data1', () => {
    cy.visitStudyEntity('STUDY1', 1);
    cy.get('[id="dataset"]').eq(0).find('[class*="Datasets_title"]').contains('Specialized Datasets').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class="ant-collapse-header"]').contains('data1').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[class="ant-collapse-header"]').contains('View in Data Explorer').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(0).contains('Description').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(0).contains('Congenital malformations description').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(1).contains('Data Type').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).contains('SNV').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).contains('Annotated SNV').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).contains('Aligned Reads').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).contains('Germline Structural Variant').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).contains('Metrics').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).find('[class*="StudyEntity_tag_"]').eq(3).should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(2).contains('Strategy').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(2).contains('WGS').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(2).find('[class*="StudyEntity_tag_"]').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class*="EntityDataset_rowCountCard"]').eq(0).find('g[id="family"]').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class*="EntityDataset_rowCountCard"]').eq(0).contains(/^6$/).should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class*="EntityDataset_rowCountCard"]').eq(0).contains('Participants').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class*="EntityDataset_rowCountCard"]').eq(1).find('g[id="file"]').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class*="EntityDataset_rowCountCard"]').eq(1).contains(/^28$/).should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(0).find('[class*="EntityDataset_rowCountCard"]').eq(1).contains('Files').should('exist');
  });

  it('Panneau Files', () => {
    cy.get('[id="data_file"] [class*="EntityTable_title"]').contains('Data File').should('exist');
    cy.get('[id="data_file"] [class="ant-collapse-header"]').contains('Data Files').should('exist');
    cy.get('[id="data_file"] [class="ant-collapse-header"]').contains('(3,136)').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_subTitle"]').eq(0).contains('File counts by Data Type').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(0).find('thead th[class="ant-table-cell"]').eq(0).contains('Data Type').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(0).find('thead th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(0).find('thead th[class="ant-table-cell"]').eq(2).contains('(n=3136)').should('exist');
    cy.get('[id="data_file"] [data-row-key="Germline Structural Variant"] td[class="ant-table-cell"]').eq(1).contains(/^588$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="Germline Structural Variant"] td[class="ant-table-cell"]').eq(2).find('[style*="width: 18.75%"]').should('exist');
    cy.get('[id="data_file"] [data-row-key="Germline CNV"] td[class="ant-table-cell"]').eq(1).contains(/^588$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="Germline CNV"] td[class="ant-table-cell"]').eq(2).find('[style*="width: 18.75%"]').should('exist');
    cy.get('[id="data_file"] [data-row-key="SNV"] td[class="ant-table-cell"]').eq(1).contains(/^588$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="SNV"] td[class="ant-table-cell"]').eq(2).find('[style*="width: 18.75%"]').should('exist');
    cy.get('[id="data_file"] [data-row-key="Metrics"] td[class="ant-table-cell"]').eq(1).contains(/^588$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="Metrics"] td[class="ant-table-cell"]').eq(2).find('[style*="width: 18.75%"]').should('exist');
    cy.get('[id="data_file"] [data-row-key="Aligned Reads"] td[class="ant-table-cell"]').eq(1).contains(/^588$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="Aligned Reads"] td[class="ant-table-cell"]').eq(2).find('[style*="width: 18.75%"]').should('exist');
    cy.get('[id="data_file"] [data-row-key="Annotated SNV"] td[class="ant-table-cell"]').eq(1).contains(/^196$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="Annotated SNV"] td[class="ant-table-cell"]').eq(2).find('[style*="width: 6.25%"]').should('exist');

    cy.get('[id="data_file"] [class*="EntityTable_subTitle"]').eq(1).contains('File counts by Strategy').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(1).find('thead th[class="ant-table-cell"]').eq(0).contains('Strategy').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(1).find('thead th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(1).find('thead th[class="ant-table-cell"]').eq(2).contains('(n=3136)').should('exist');
    cy.get('[id="data_file"] [data-row-key="WGS"] td[class="ant-table-cell"]').eq(1).contains(/^3136$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="WGS"] td[class="ant-table-cell"]').eq(2).find('[style*="width: 100%"]').should('exist');
  });
});
