/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Biospecimens) - Vérifier les informations affichées', () => {
  beforeEach(() => {
    cy.visitFileEntity('FI0188666'); // CQDG-301
    cy.get('[data-cy="SummaryHeader_Samples_Button"]').find('[href]').click({force: true}); // CQDG-301
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist'); // CQDG-301
    cy.resetColumns(); // CQDG-301
//    cy.visitDataExploration('biospecimens', '?sharedFilterId=6bd9c618-87bb-49a9-a4ea-d793601f944d');
  });

  it('Titre', () => {
    cy.get('[data-cy="Title_DataExploration"]').contains('Data Exploration');
  });

  it('Tableau', () => {
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(1).contains('SR0463655').should('exist');
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(2).contains('SP0565109').should('exist');
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(3).contains('PT1007374').should('exist');
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(4).contains('NEURODEV').should('exist');
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(5).contains('DNA').should('exist');
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(5).contains('NCIT:').should('exist');
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(5).contains('C449').should('exist');
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(6).contains('Blood').should('exist');
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(6).contains('NCIT:').should('exist');
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(6).contains('C12434').should('exist');
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(7).contains('-').should('exist');
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(8).contains(/^8$/).should('exist');
  });
});

describe('Page Data Exploration (Biospecimens) - Valider les liens disponibles', () => {
  beforeEach(() => {
    cy.visitFileEntity('FI0188666'); // CQDG-301
    cy.get('[data-cy="SummaryHeader_Samples_Button"]').find('[href]').click({force: true}); // CQDG-301
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist'); // CQDG-301
    cy.resetColumns(); // CQDG-301
//    cy.visitDataExploration('biospecimens', '?sharedFilterId=6bd9c618-87bb-49a9-a4ea-d793601f944d');
  });

  it('Lien Participant du tableau', () => {
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(3).find('[href]').click({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('PT1007374');
  });

  it('Lien Study du tableau', () => {
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(4).find('[href]').click({force: true});
    cy.get('[data-cy="Title_Studies"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('NEURODEV').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1$/).should('exist');
  });

  it('Lien NCIT de Sample Type du tableau', () => {
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(5).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/NCIT_C449');
  });

  it('Lien NCIT de Tissue du tableau', () => {
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(6).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/NCIT_C12434');
  });

  it('Lien Files du tableau', () => {
    cy.get('tr[data-row-key="oU64MYkBLkZLL8Dg55-1"]').find('[class*="ant-table-cell"]').eq(8).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Sample ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('SR0463655').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^8$/).should('exist');
  });
});

describe('Page Data Exploration (Biospecimens) - Valider les fonctionnalités du tableau', () => {
  beforeEach(() => {
    cy.visitDataExploration('biospecimens');
  });

  it('Valider les fonctionnalités du tableau - Tris', () => {
    cy.get('thead[class="ant-table-thead"]').contains('Study').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('NEURODEV').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Study').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('T-DEE').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Study').click({force: true});

    cy.get('thead[class="ant-table-thead"]').contains('Sample Type').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('C449').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Sample Type').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('C449').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Sample Type').click({force: true});

    cy.get('thead[class="ant-table-thead"]').contains('Tissue').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('C12434').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Tissue').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('C12434').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Tissue').click({force: true});
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('thead[class="ant-table-thead"]').contains('Sample Type').click({force: true});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('thead[class="ant-table-thead"]').contains('Study').click({force: true});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('NEURODEV').should('exist');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('body').find('span[class*="ant-select-selection-item"]').click({force: true});
    cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('20').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('body').find('button[type="button"]').contains('Next').click({force: true});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('body').find('button[type="button"]').contains('Next').click({force: true});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql3');
    cy.get('body').find('button[type="button"]').contains('Previous').click({force: true});
    cy.wait('@getPOSTgraphql3', {timeout: 20*1000});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('First').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('be.disabled');
  });
});
  