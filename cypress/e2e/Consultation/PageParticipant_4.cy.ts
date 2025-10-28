/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'un participant - Valider les panneaux masquables', () => {
  const setupTest = () => {
    cy.login();
    cy.visitParticipantEntity('PT0000879');
  };

  it('Panneau Summary', () => {
    setupTest();
    cy.get('[id="summary"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="summary"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="summary"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="summary"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="summary"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Profile', () => {
    setupTest();
    cy.get('[id="profile"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="profile"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="profile"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="profile"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="profile"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Family', () => {
    setupTest();
    cy.get('[id="family"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="family"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="family"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="family"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="family"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Data Access', () => {
    setupTest();
    cy.get('[id="data_access"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_access"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_access"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_access"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_access"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Diagnoses', () => {
    setupTest();
    cy.get('[id="diagnosis"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="diagnosis"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="diagnosis"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="diagnosis"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="diagnosis"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Phenotypes', () => {
    setupTest();
    cy.get('[id="phenotype"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="phenotype"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="phenotype"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="phenotype"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="phenotype"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Biospecimens', () => {
    setupTest();
    cy.get('[id="biospecimen"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="biospecimen"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="biospecimen"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="biospecimen"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="biospecimen"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Files', () => {
    setupTest();
    cy.get('[id="data_file"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_file"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_file"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_file"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_file"] div[class*="ant-collapse-content-active"]').should('exist');
  });
});
