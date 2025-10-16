/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'une étude - Valider les panneaux masquables', () => {
  const setupTest = () => {
    cy.login();
    cy.visitStudyEntity('T-DEE', 1);
  };

  it('Panneau Summary', () => {
    setupTest();
    cy.get('[id="summary"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="summary"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="summary"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="summary"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="summary"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Data Access', () => {
    setupTest();
    cy.get('[id="data_access"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_access"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_access"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_access"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_access"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Files', () => {
    setupTest();
    cy.get('[id="data_file"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_file"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_file"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_file"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_file"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau data1', () => {
    setupTest();
    cy.visitStudyEntity('STUDY1', 1);
    cy.get('[id="dataset"]').eq(1).find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="dataset"]').eq(1).find('span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="dataset"]').eq(1).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="dataset"]').eq(1).find('span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="dataset"]').eq(1).find('div[class*="ant-collapse-content-active"]').should('exist');
  });
});
