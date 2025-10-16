/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des études - Vérifier les informations affichées', () => {
  const setupTest = () => {
    cy.login();
    cy.visitStudiesPage();
    cy.showColumn('Population');
    cy.showColumn('Files');
    cy.showColumn('Biospecimens');
    cy.showColumn('Access Limitation');
    cy.showColumn('Access Requirement');
    cy.showColumn('Overall Design');
    cy.showColumn('Data Collection Method');
    cy.showColumn('Principal Investigators');
    cy.showColumn('Contact Persons');
    cy.showColumn('Affiliated Institutions');
    cy.showColumn('Inclusion and Exclusion Criteria');
    cy.showColumn('Description');
  };

  it('Titre', () => {
    setupTest();
    cy.get('[data-cy="Title_Studies"]').contains('Study Directory');
  });

  it('Tableau', () => {
    setupTest();
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(0).contains('T-DEE').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(1).contains('Developmental and epileptic encephalopathies').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(2).contains('RARE-QC2').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(2).contains('RARE-QC3').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(3).contains('Neurodevelopmental Conditions').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(4).contains('Pediatric and adult').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(5).contains('588').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(6).contains('196').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(7).contains('3,136').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(8).contains('588').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(9).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(10).contains('-').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(11).contains('-').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(12).contains('health or medical or biomedical research').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(12).contains('DUO:').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(12).contains('0000006').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(13).contains('genetic studies only').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(13).contains('DUO:').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(13).contains('0000016').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(14).contains('Case-parent trio stu').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(15).contains('Case only').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(16).contains('Investigator Assessment').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(17).contains('Toto').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(18).contains('Tata').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(19).contains('Toto Institution').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(20).contains('Children with a diagnosis of intractable seizures').should('exist');
  });

  it('Summary', () => {
    setupTest();
    cy.get('tfoot [class*="summaryTotal"]').contains('Total').should('exist');
    cy.get('tfoot [class*="summaryTitle"]').eq(0).contains('Participants').should('exist');
    cy.get('tfoot [class*="summarySum"]').eq(0).contains(/\d{1}/).should('exist');
    cy.get('tfoot [class*="summaryTitle"]').eq(1).contains('Families').should('exist');
    cy.get('tfoot [class*="summarySum"]').eq(1).contains(/\d{1}/).should('exist');
    cy.get('tfoot [class*="summaryTitle"]').eq(2).contains('Files').should('exist');
    cy.get('tfoot [class*="summarySum"]').eq(2).contains(/\d{1}/).should('exist');
    cy.get('tfoot [class*="summaryTitle"]').eq(3).contains('Biospecimens').should('exist');
    cy.get('tfoot [class*="summarySum"]').eq(3).contains(/\d{1}/).should('exist');
  });
});
