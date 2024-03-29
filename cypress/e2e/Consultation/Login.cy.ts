/// <reference types="Cypress" />
import '../../support/commands';

describe('Page Login', () => {
  it('Vérifier les informations affichées', () => {
    cy.visit('/');

    cy.contains(/(Données disponibles|Available Data)/).should('exist');
    cy.get('[data-cy="DataRelease_Study"]').contains(/\d{1}/).should('exist');
    cy.get('[data-cy="DataRelease_Study"]').contains(/(Étude|Studies)/).should('exist');
    cy.get('[data-cy="DataRelease_Participant"]').contains(/\d{1}/).should('exist');
    cy.get('[data-cy="DataRelease_Participant"]').contains('Participants').should('exist');
    cy.get('[data-cy="DataRelease_Biospecimen"]').contains(/\d{1}/).should('exist');
    cy.get('[data-cy="DataRelease_Biospecimen"]').contains(/Biosp(é|e)cimens/).should('exist');
    cy.get('[data-cy="DataRelease_File"]').contains(/\.\d{1,2}(T|G)B/).should('exist');
    cy.get('[data-cy="DataRelease_File"]').contains(/(Fichiers|Data Files)/).should('exist');

    cy.contains(/(Portail de données|Data Portal)/).should('exist');
    cy.contains(/(Le Centre québécois de données génomiques est une plateforme d'harmonisation et de diffusion des données génomiques générées par les études cliniques et de recherche du Québec.|The Quebec Genomic Data Center is a data harmonization and sharing platform for genomic datasets produced by Quebec's clinical and research studies.)/).should('exist');
    cy.get('[data-cy="Login"]').contains(/(Connexion|Login)/).should('exist');
    cy.get('[data-cy="Signup"]').contains(/(Créer un compte|Sign up)/).should('exist');

    cy.get('img[src*="/static/media/genome_qc."]').should('exist');
    cy.get('img[src*="/static/media/FRQS."]').should('exist');
    cy.get('img[src*="/static/media/FCI."]').should('exist');
  });
});
