/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudiesPage();
  cy.showColumn('Population');
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
});

describe('Page des études - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[data-cy="Title_Studies"]').contains('Study Directory');
  });

  it('Tableau', () => {
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(0).contains('T-DEE').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(1).contains('Developmental and epileptic encephalopathies').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(2).contains('Neurodevelopmental Conditions').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(3).contains('Pediatric and adult').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(4).contains('588').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(5).contains('196').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(6).contains('588').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(7).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(8).contains('-').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(9).contains('-').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(10).contains('3,136').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(11).contains('health or medical or biomedical research').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(11).contains('DUO:').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(11).contains('0000006').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(12).contains('genetic studies only').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(12).contains('DUO:').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(12).contains('0000016').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(13).contains('Case-parent trio stu').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(14).contains('Case only').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(15).contains('Investigator Assessment').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(16).contains('Toto').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(17).contains('Tata').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(18).contains('Toto Institution').should('exist');
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(19).contains('Children with a diagnosis of intractable seizures').should('exist');
  });

  it('Summary', () => {
    cy.get('tfoot [class*="summaryTitle"]').eq(0).contains('Participants').should('exist');
    cy.get('tfoot [class*="summarySum"]').eq(0).contains(/\d{1}/).should('exist');
    cy.get('tfoot [class*="summaryTitle"]').eq(1).contains('Families').should('exist');
    cy.get('tfoot [class*="summarySum"]').eq(1).contains(/\d{1}/).should('exist');
    cy.get('tfoot [class*="summaryTitle"]').eq(2).contains('Biospecimens').should('exist');
    cy.get('tfoot [class*="summarySum"]').eq(2).contains(/\d{1}/).should('exist');
  });
});
