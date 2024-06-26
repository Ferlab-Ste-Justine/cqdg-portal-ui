/// <reference types="Cypress" />
import '../../support/commands';

describe('Navigation', () => {

  beforeEach(() => {
    cy.login();
  });

  it('Boutons de la header', () => {
    cy.visitDashboard();
    cy.get('[data-cy="Title_Dashboard"]').should('exist');

    cy.get('[data-cy="HeaderLink_Studies"]').click();
    cy.get('[data-cy="Title_Studies"]').should('exist');

    cy.get('[data-cy="HeaderLink_Data Explorer"]').click();
    cy.get('[data-cy="Title_DataExploration"]').should('exist');

    cy.get('[data-cy="HeaderLink_Variants"]').click();
    cy.get('[data-cy="Title_Variants"]').should('exist');

    cy.get('[data-cy="HeaderLink_Dashboard"]').click();
    cy.get('[data-cy="Title_Dashboard"]').should('exist');

    cy.get('[data-cy="HeaderLink_Community"]').click();
    cy.get('[data-cy="Title_Community"]').should('exist');

    cy.get('[data-cy="UserName"]').click({force: true});
    cy.get('[data-menu-id*="profile_settings"]').find('[href]').click({force: true});
    cy.get('[data-cy="Title_ProfileSettings"]').should('exist');

    cy.get('[data-cy="LangButton_FR"]').click();
    cy.get('body').contains('Prénom').should('exist');
  });

  it('Lien externe de la header - Dictionary', () => {
    cy.visitDashboard();
    cy.get('[data-cy="Resources"]').click({force: true});
    cy.get('[data-cy="HeaderLink_Dictionary"]')
      .should('have.attr', 'href', 'https://dict.qa.juno.cqdg.ferlab.bio');
  });

  it('Lien externe de la header - Documentation', () => {
    cy.visitDashboard();
    cy.get('[data-cy="Resources"]').click({force: true});
    cy.get('[data-cy="HeaderLink_Documentation"]')
      .should('have.attr', 'href', 'https://docs.cqdg.ca');
  });

  it('Lien externe de la header - Website', () => {
    cy.visitDashboard();
    cy.get('[data-cy="Resources"]').click({force: true});
    cy.get('[data-cy="HeaderLink_Website"]').invoke('removeAttr', 'target').click({force: true});
    cy.origin('https://cqdg.ca', () => {
      cy.get('body').contains(/^The Quebec Genomic Data Center|Centre quebécois de données génomiques$/).should('exist');
    });
  });

  it('Lien externe de la header - Contact', () => {
    cy.visitDashboard();
    cy.get('[data-cy="Resources"]').click({force: true});
    cy.get('[data-cy="HeaderLink_Contact"]')
      .should('have.attr', 'href', 'mailto:support@cqdg.ca');
  });

  it('Lien externe du Dashboard - Data Release', () => {
    cy.visitDashboard();
    cy.get('[data-cy="Resources"]').click({force: true});
    cy.get('[data-cy="ExternalLink_DataRelease"]')
      .should('have.attr', 'href', 'https://docs.cqdg.ca');
  });

  it('Redirections de la page Dashboard', () => {
    cy.visitDashboard();
    cy.get('[data-cy="GridCard_Studies"]').find('[href]').click({force: true});
    cy.get('[data-cy="Title_Studies"]').should('exist');

    cy.visitDashboard();
    cy.get('[data-cy="GridCard_Participants"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]', {timeout: 60*1000}).should('exist');

    cy.visitDashboard();
    cy.get('[data-cy="GridCard_Biospecimens"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]', {timeout: 60*1000}).should('exist');

    cy.visitDashboard();
    cy.get('[data-cy="GridCard_DataFiles"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]', {timeout: 60*1000}).should('exist');
  });

  it('Modals de la page Dashboard [CQDG-139]', () => {
    cy.visitDashboard();
    cy.get('[data-cy="SavedSets"] svg[data-icon="edit"]').eq(0).click({force: true});
    cy.contains('Edit set').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.visitDashboard();
    cy.get('[data-cy="SavedSets"] svg[data-icon="delete"]').eq(0).click({force: true});
    cy.contains('Permanently delete this set?').should('exist');
    cy.get('button[type="button"]').contains('Cancel').click({force: true});

    cy.visitDashboard();
    cy.get('[data-cy="SavedFilters"] svg[data-icon="edit"]').eq(0).click({force: true});
    cy.contains('Edit filter').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.visitDashboard();
    cy.get('[data-cy="SavedFilters"] svg[data-icon="delete"]').eq(0).click({force: true});
    cy.contains('Permanently delete this filter?').should('exist');
    cy.get('button[type="button"]').contains('Cancel').click({force: true});
  });

  it('Onglets de la page Data Exploration', () => {
    cy.visitDataExploration();
    cy.get('[aria-label="Participants by Study"]').should('exist');

    cy.get('[data-cy="Tab_Participants"]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]', {timeout: 60*1000}).should('exist');

    cy.get('[data-cy="Tab_Biospecimens"]').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]', {timeout: 60*1000}).should('exist');

    cy.get('[data-cy="Tab_DataFiles"]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]', {timeout: 60*1000}).should('exist');
  });

  it('Modals de la page Data Exploration', () => {
    cy.visitDataExploration();

    // Facettes
    cy.get('[data-cy="SidebarMenuItem_Participant"]').click({force: true});

    cy.get('button[class*="UploadIdsButton"]').click({force: true});
    cy.get('[class="ant-modal-header"]').contains('participant').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('div[class*="Filters_filter"]').contains('Phenotype (HPO)').click({force: true});
    cy.get('[data-cy="TreeFacet_Modal_hpoTree"]').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('div[class*="Filters_filter"]').contains('Diagnosis (MONDO)').click({force: true});
    cy.get('[data-cy="TreeFacet_Modal_mondoTree"]').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('[data-cy="SidebarMenuItem_Biospecimen"]').click({force: true});

    cy.get('button[class*="UploadIdsButton"]').click({force: true});
    cy.get('[class="ant-modal-header"]').contains('sample').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('[data-cy="SidebarMenuItem_Data File"]').click({force: true});

    cy.get('button[class*="UploadIdsButton"]').click({force: true});
    cy.get('[class="ant-modal-header"]').contains('file').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    // Query Builder
    cy.get('button[class*="Header_iconBtnAction"]').click({force: true});
    cy.contains('Save this filter').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    // Manage my filters
    cy.get('button[class*="QueryBuilderHeaderTools_queryBuilderHeaderDdb"]').click({force: true});
    cy.get('[data-menu-id*="manage-my-filters"]').click({force: true});
    cy.contains('Manage my filters').should('exist', {timeout: 20*1000});
    cy.contains('Close').should('exist', {timeout: 20*1000});
    cy.get('button[class="ant-modal-close"]').invoke('click');

    // Onglet Data Files
    cy.visitDataExploration('datafiles');
    cy.get('[class*="ant-table-row"]').eq(0).find('input[type="checkbox"]').check({force: true});

    cy.get('[data-cy="FileManifest_Button"]').click({force: true});
    cy.get('[data-cy="FileManifest_Modal"]').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('[data-cy="RequestAccess_Button"]').click({force: true});
    cy.get('[data-cy="RequestAccess_Modal"]').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('Modals de la page des variants', () => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Gene"]').click({force: true});

    cy.get('button[class*="UploadIdsButton"]').click({force: true});
    cy.get('[class="ant-modal-header"]').contains('gene').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('button[class*="Header_iconBtnAction"]').click({force: true});
    cy.contains('Save this filter').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('Modals de la page d\'une étude', () => {
    cy.visitStudyEntity('T-DEE', 1);

    cy.get('[data-cy="FileManifest_Button"]').click({force: true});
    cy.get('[data-cy="FileManifest_Modal"]').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('[data-cy="RequestAccess_Button"]').click({force: true});
    cy.get('[data-cy="RequestAccess_Modal"]').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('Modals de la page d\'un fichier', () => {
    cy.visitFileEntity('FI0000981');

    cy.get('[data-cy="FileManifest_Button"]').click({force: true});
    cy.get('[data-cy="FileManifest_Modal"]').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('Liens des page Profile', () => {
    cy.visitProfileViewPage();
    cy.get('[data-cy="EditProfileButton"]').click({force: true});
    cy.get('[data-cy="Title_ProfileSettings"]').should('exist');

    cy.get('[data-cy="ViewProfileButton"]').click({force: true});
    cy.get('[data-cy="CommunityButton"]').click({force: true});
    cy.get('[data-cy="Title_Community"]').should('exist');
  });
 
  it('Liens de la page Community', () => {
    cy.visitCommunityPage();
    cy.get('[data-cy="MemberCard"]').eq(0).click({force: true});
    cy.get('[data-cy="AvatarHeader"]').should('exist');
  });

});
