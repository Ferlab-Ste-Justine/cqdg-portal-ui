/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.visit('/');
});

describe('Page Landing - Vérifier les informations affichées', () => {
  it('Section Upper banner', () => {
    cy.get('[class*="TopBanner_logo"]').should('exist');
    cy.get('[class*="TopBanner_title"]').contains(/(Portail de données|Data Portal)/).should('exist');
    cy.get('[class*="TopBanner_description"]').contains(/(Le Centre Québécois de Données Génomiques est une plateforme d'harmonisation et de diffusion des données génomiques générées par les études cliniques et de recherche du Québec.|The Quebec Genomic Data Center is a data harmonization and sharing platform for genomic datasets produced by Quebec's clinical and research studies.)/).should('exist');
    cy.get('[data-cy="Login"]').contains(/(Connexion|Login)/).should('exist');
    cy.get('[data-cy="Signup"]').contains(/(Créer compte|Sign up)/).should('exist');
  });

  it('Section Studies Side Panel Tile', () => {
    cy.get('[class*="Studies_container"] [class*="Summary"] [id="study"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="Summary"] [class*="TextIcon_layout"]').contains('4').should('exist');
    cy.get('[class*="Studies_container"] [class*="Summary"] [class*="TextIcon_layout"]').contains(/(Studies|Études)/).should('exist');
    cy.get('[class*="Studies_container"] [class*="Summary"]').contains(/(Explorez les données harmonisées d’études dans les populations pédiatriques et adultes.|Explore harmonized data from studies in both pediatric and adult populations.)/).should('exist');
  });

  it('Section Studies Right Panel Tile', () => {
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_dots"]').should('exist');

    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_title"] [src*="/static/media/cartagene."]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_subtitle"]').contains('CARTaGENE').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains(/(CARTaGENE est une plateforme publique de recherche du CHU Sainte-Justine créée pour accélérer la recherche en santé. CARTaGENE est constitué à la fois d'échantillons biologiques et de données de santé provenant de 43 000 résidents du Québec âgés de 40 à 69 ans.|CARTaGENE is a public research platform of the CHU Sainte-Justine created to accelerate health research. CARTaGENE consists of both biological samples and health data from 43,000 Quebec residents aged between 40 to 69 years.)/).should('exist');
    
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_title"]').contains('DEE').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_subtitle"]').contains(/(Investigation des causes génétiques des encéphalopathies épileptogènes|Investigating the genetic causes of epileptogenic encephalopathies)/).should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains(/(Étude de séquençage du génome entier \(WGS\) chez des enfants atteints d'encéphalopathies épileptogènes.|Whole Genome Sequencing \(WGS\) study in children with epileptogenic encephalopathies.)/).should('exist');
    
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_title"]').contains('BACQ').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_subtitle"]').contains(/(Biobanque des anomalies congénitales au Québec|Quebec congenital malformation biobank)/).should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains(/(Biobanque de cas affectés bien caractérisés ainsi que de leurs parents permettant de mener des études de génétique moléculaire pour identifier les gènes associés à ces malformations.|Biobank of well-characterized affected cases as well as their parents allowing molecular genetic studies to be carried out to identify the genes associated with these malformations.)/).should('exist');
    
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_title"]').contains('PRAGMatIQ').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_subtitle"]').contains(/(Pratique rapide de la génomique pédiatrique au Québec|Applying rapid pediatric genomics in Quebec)/).should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains(/(L'objectif du projet est d'offrir un séquençage clinique rapide du génome entier \(WGS\) à tous les nouveau-nés et nourrissons gravement malades qui pourraient bénéficier de ce test au Québec.|The objective of the project is to offer rapid clinical Whole Genome Sequencing \(WGS\) to all critically ill newborns and infants who could benefit from this test in Quebec.)/).should('exist');
    
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_title"]').contains('NeuroDev').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_subtitle"]').contains(/(Troubles du neuro-développement|Neurodevelopmental disorders)/).should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains(/(L'objectif principal de ce projet est de constituer une banque d'échantillons et de données provenant d'enfants et d'adultes atteints d'un retard global de développement, d'épilepsie et\/ou de malformations et de membres de leur famille pour alimenter divers projets de recherche qui visent à identifier les gènes impliqués dans ces pathologies.|The main objective of this project is to constitute a bank of samples and data from children and adults with global developmental delay, epilepsy and\/or malformations and members of their family to supply various research projects which aim to identify the genes involved in these conditions.)/).should('exist');

    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains(/(Le jeu de données présentement hébergé au CQDG|The dataset currently available in the CQDG)/).should('not.exist');
  });

  it('Section Released Data Stats', () => {
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-head"]').contains(/(Données CQDG|Release) v2.0/).should('exist');

    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(0).find('[id="study"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(0).contains('4').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(0).contains(/(Études|Studies)/).should('exist');
    
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(1).find('[id="participant"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(1).contains('602').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(1).contains('Participants').should('exist');
    
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(2).find('[id="biospecimen"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(2).contains('602').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(2).contains(/Biosp(é|e)cimens/).should('exist');
    
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(3).find('[id="file"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(3).contains(/\.\d{1,2}(T|G)B/).should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(3).contains(/(Fichiers|Files)/).should('exist');
    
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(4).find('[id="gene"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(4).contains('602').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(4).contains(/G(é|e)nomes/).should('exist');
    
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(5).find('[id="exomes"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(5).contains('0').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(5).contains('Exomes').should('exist');
  });

  it('Section Programs & Partners', () => {
    cy.get('[class*="Programs_title"]').contains(/(Programmes & Partenaires|Programs & Partners)/).should('exist');
    cy.get('[class*="Programs_container"] [src*="/cqdg-qa-assets-public/programs_logos/rare.svg"]').should('exist');
    cy.get('[class*="Programs_container"] [src*="/cqdg-qa-assets-public/programs_logos/MGSS/mgss-logo-2.svg"]').should('exist');
    cy.get('[class*="Programs_container"] [src*="/cqdg-qa-assets-public/programs_logos/PCHP/PCHP_Signature_Colour_En.svg"]').should('exist');
  });

  it('Section SD4H', () => {
    cy.get('[class*="SecureData_container"] [src*="data:image/png"]').should('exist');
    cy.get('[class*="SecureData_title"]').contains(/(CQDG dans l’infonuage|CQDG in the Cloud)/).should('exist');
    cy.get('[class*="SecureData_text"]').contains(/(Analysez les données du CQDG avec vos propres logiciels sur l’infrastructure infonuagique Secure Data for Health \(SD4H\). D’autres infonuages seront également intégrés au CQDG dans un avenir rapproché. Contactez-nous pour en savoir plus.|Analyse CQDG datasets with your own software using the Secure Data for Health \(SD4H\) cloud-based infrastructure. Other cloud providers will be integrated with CQDG in a near future. Contact us to learn more.)/).should('exist');
    cy.get('[class*="SecureData_container"] [href="mailto:support@cqdg.ca"]').contains(/(Contactez-nous|Contact us)/).should('exist');
  });

  it('Section Variant Tile', () => {
    cy.get('[class*="VariantCard_container"] [id="gene"]').should('exist');
    cy.get('[class*="VariantCard_container"] [class*="TextIcon_title"]').contains(/\d{3}K/).should('exist');
    cy.get('[class*="VariantCard_container"] [class*="TextIcon_subtitle"]').contains(/(Variants germinaux|Germline Variants)/).should('exist');
    cy.get('[class*="VariantCard_container"] [class*="VariantCard_description"]').contains(/(Notre explorateur de variants offre des fonctions de recherche avancées. En quelques clics, vous pouvez explorer des millions de variants germinaux annotés issus des génomes et exomes des participants du CQDG.|Our variant explorer offers advanced searching capabilities. With just a few clicks, you can explore millions of annotated germline variants from genomes and exomes of the CQDG participants.)/).should('exist');
    cy.get('[class*="VariantCard_container"] [type="button"]').contains(/(Explorer les données de variants|Explore variant data)/).should('exist');
  });

  it('Section Documentation Tiles', () => {
    cy.get('[class*="BannerItem_container"]').eq(0).find('[id="information"]').should('exist');
    cy.get('[class*="BannerItem_container"]').eq(0).find('[class*="TextIcon_title"]').contains(/(Centre de documentation|Documentation Center)/).should('exist');
    cy.get('[class*="BannerItem_container"]').eq(0).contains(/(Pour savoir comment soumettre vos données, faire une demande d’accès ou pour consulter des guides d’utilisation du portail, visitez le centre de documentation.|To learn how to submit your data, request access to data, or to read user guides for the portal, visit the Documentation Center.)/).should('exist');
    cy.get('[class*="BannerItem_container"]').eq(0).find('[href*="https://docs.cqdg.ca?ljs="]').contains(/(Centre de documentation|Documentation Center)/).should('exist');

    cy.get('[class*="BannerItem_container"]').eq(1).find('[id="cloud-database"]').should('exist');
    cy.get('[class*="BannerItem_container"]').eq(1).find('[class*="TextIcon_title"]').contains(/(Données à héberger \?|Need to Host Your Data\?)/).should('exist');
    cy.get('[class*="BannerItem_container"]').eq(1).contains(/(Le CQDG offre aux chercheurs une plateforme idéale pour entreposer et diffuser les données génomiques générées par les études cliniques et de recherche.|The CQDG offers an ideal platform for researchers to store and share genomic data produced by clinical and research studies.)/).should('exist');
    cy.get('[class*="BannerItem_container"]').eq(1).find('[href*="https://docs.cqdg.ca/docs/comment-soumettre-vos-donn%C3%A9es?ljs="]').contains(/(Soumettre vos données|Submit your data)/).should('exist');
  });

  it('Section Lower banner', () => {
    cy.get('[src*="/static/media/logos-genome_qc."]').should('exist');
    cy.get('[src*="/static/media/logos-chusj-color."]').should('exist');
    cy.get('[src*="/static/media/logos-FRQS-color."]').should('exist');
    cy.get('[src*="/static/media/logos-FCI-color."]').should('exist');
    cy.get('[src*="/static/media/logos-ferlab-color."]').should('exist');
  });
});
