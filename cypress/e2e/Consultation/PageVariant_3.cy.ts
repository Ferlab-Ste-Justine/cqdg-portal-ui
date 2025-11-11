/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'un variant - Valider les panneaux masquables', () => {
  const setupTest = () => {
    cy.login();
    cy.visitVariantEntityPage('1-156176849-G-A', 1);
  };

  it('Panneau Transcripts', () => {
    setupTest();
    cy.get('[id="consequence"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="consequence"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="consequence"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="consequence"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="consequence"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau CQDG Studies', () => {
    setupTest();
    cy.get('[id="frequency"] [class*="Collapse_fuiCollapse"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="frequency"] [class*="Collapse_fuiCollapse"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="frequency"] [class*="Collapse_fuiCollapse"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="frequency"] [class*="Collapse_fuiCollapse"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="frequency"] [class*="Collapse_fuiCollapse"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Public Cohorts', () => {
    setupTest();
    cy.get('[class*="EntityTable_container"]').eq(2).find('[class*="Collapse_fuiCollapse"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[class*="EntityTable_container"]').eq(2).find('[class*="Collapse_fuiCollapse"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[class*="EntityTable_container"]').eq(2).find('[class*="Collapse_fuiCollapse"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[class*="EntityTable_container"]').eq(2).find('[class*="Collapse_fuiCollapse"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[class*="EntityTable_container"]').eq(2).find('[class*="Collapse_fuiCollapse"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Gene - Phenotype Association', () => {
    setupTest();
    cy.get('[id="condition"] [class*="Collapse_fuiCollapse"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="condition"] [class*="Collapse_fuiCollapse"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="condition"] [class*="Collapse_fuiCollapse"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="condition"] [class*="Collapse_fuiCollapse"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="condition"] [class*="Collapse_fuiCollapse"] div[class*="ant-collapse-content-active"]').should('exist');
  });
});
