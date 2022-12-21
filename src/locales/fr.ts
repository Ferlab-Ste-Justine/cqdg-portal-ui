/* eslint-disable max-len */
import translations from './fr.json';

const fr = {
  ...translations,
  global: {
    yes: 'Oui',
    no: 'Non',
    search: {
      genes: {
        emptyText: 'Aucun gène trouvé',
        placeholder: 'e.g. BRAF, ENSG00000157764',
        title: 'Recherche par gène',
        tooltip: 'Entrer un Symbole de gène, Alias de gène ou un Ensembl ID',
      },
      variants: {
        emptyText: 'Aucun variant trouvé',
        placeholder: 'e.g. 10-100063679-T-C, rs341',
        title: 'Recherche par variant',
        tooltip:
          'Entrer un Locus de Variant, Symbol de gène, Alias de gène, Gène AA Change, dbSNP ID, Clinvar ID, Ensembl ID, refseq ID',
      },
    },
    filters: {
      actions: {
        all: 'Tout',
        none: 'Aucun',
        clear: 'Effacer',
        less: 'Moins',
        more: 'Plus',
        apply: 'Appliquer',
      },
      operators: {
        between: 'Entre',
        lessthan: 'Moins que',
        lessthanorequal: 'Moins que ou égale',
        greaterthan: 'Plus grand que',
        greaterthanorequal: 'Plus grand que ou égale',
      },
      range: {
        is: 'Est',
      },
      messages: {
        empty: 'Aucune valeur trouvée',
      },
      checkbox: {
        placeholder: 'Chercher...',
      },
    },
    forms: {
      errors: {
        minCharacters: 'caractères minimum',
        requiredField: 'Ce champs est requis',
        enterValidEmail: 'Entrer un email valide',
      },
    },
    errors: {
      403: "Désolé, vous n'êtes pas autorisé à accéder à cette page.",
      404: "Désolé, cette page n'existe pas.",
      500: 'Désolé, quelque chose en va pas.',
      backHome: 'Retour accueil',
    },
    notification: {
      genericError: 'Une erreur est apparue',
    },
    proTable: {
      results: 'Résultats',
      noResults: 'Aucun résultat',
      of: 'de',
      selected: 'élément selectionné',
      selectedPlural: 'éléments selectionnés',
      selectAllResults: 'Selectionner tous les résultats',
      clear: 'Effacer',
      tableExport: 'Exporter en TSV',
      reset: 'Réinitialiser',
      columns: 'Colonnes',
    },
    seeLess: 'Voir moins',
    seeMore: 'Voir plus',
  },
  api: {
    savedFilter: {
      error: {
        title: 'Erreur',
        messageUpdate: 'Impossible de modifier le filtre',
        messageDelete: 'Impossible de supprimer le filtre',
      },
    },
    savedSet: {
      error: {
        title: 'Erreur',
        messageUpdate: "Impossible de modifier l'ensemble",
        messageDelete: "Impossible de supprimer l'ensemble",
        messageCreate: "Impossible de créer l'ensemble",
      },
      success: {
        titleCreate: 'Votre ensemble a été enregistré.',
        messageCreate: 'Vous pouvez ajouter vos ensembles a une requête ou au tableau de bord.',
        titleUpdate: 'Succès',
        messageUpdate: 'Votre ensemble a été modifié.',
        titleDelete: 'Succès',
        messageDelete: 'Votre ensemble a été supprimé.',
      },
    },
    report: {
      error: {
        title: 'Erreur',
        message:
          "Nous n'avons pas pu générer le rapport pour le moment. Veuillez réessayer plus tard ou ",
        support: 'contactez le support',
      },
      inProgress: {
        title: 'Traitement',
        fetchReport: 'Récupération du rapport, veuillez patienter',
      },
      onSuccess: {
        title: 'Succès',
        fetchReport: 'Rapport téléchargé avec succès',
      },
    },
    noData: 'Aucune donnée',
  },
  components: {
    search: {
      selectSavedSet: 'Sélectionner un ensemble',
      searchByParticipantId: 'Recherche par ID de participant',
      savedParticipantSets: 'Ensemble de participants',
      noParticipantFound: 'Aucun participant trouvé',
      noParticipantSetFound: 'Aucun ensemble de participants trouvé',
      participantPlaceholder: 'ex : PT0483333',
      searchBySampleId: 'Recherche par ID d’échantillon',
      savedSampleSets: 'Ensemble d’échantillons',
      noSampleFound: 'Aucun sample trouvé',
      noSampleSetFound: 'Aucun ensemble d’échantillons trouvé',
      samplePlaceholder: 'ex : SR0230956',
      searchByFileId: 'Recherche par ID de fichier',
      savedFileSets: 'Ensemble de fichiers',
      noFileFound: 'Aucun fichier trouvé',
      noFileSetFound: 'Aucun ensemble de fichier trouvé',
      filePlaceholder: 'ex : FI0080837',
    },
    uploadIds: {
      participant: 'participant',
      participantID: 'ID de participant',
      participantPlaceholder: 'ex : PT0483333',
      sampleTitle: "Téléverser une liste d'échantillons",
      sample: 'échantillon',
      sampleID: "ID d'échantillon",
      samplePlaceholder: 'ex : SR0230956',
      file: 'fichier',
      fileID: 'ID de fichier',
      filePlaceholder: 'ex : FI0080837',
      title: 'Téléverser une liste de {entity}s',
      submittedColTitle: 'Identifiants {entity} soumis',
      uploadBtnText: 'Téléverser une liste de {entity}s',
      mappedTo: 'Orienté vers',
      collapseTitle:
        'Tableau récapitulatif ({matchCount} correspondant, {unMatchCount} non correspondant)',
      inputLabel: "Copier-coller une liste d'identifiants ou télécharger un fichier",
      match: '({count}) correspondances',
      unmatch: '({count}) sans correspondance',
      tableMessage:
        '{submittedCount} identifiants soumis mappés sur {mappedCount} identifiants système uniques',
      matchTable: {
        idcol: 'ID {entity}',
        participant: {
          matchcol: 'ID du participant',
          mappedcol: "Code de l'étude",
        },
        file: {
          matchcol: 'ID du fichier',
          mappedcol: "Code de l'étude",
        },
        biospecimen: {
          matchcol: "ID de l'échantillon",
          mappedcol: "Code de l'étude",
        },
      },
      pillTitle: 'Liste téléchargée',
      upload: {
        fileBtn: 'Télécharger un fichier',
        btn: 'Télécharger',
      },
      clearBtn: 'Effacer',
      cancelBtn: 'Annuler',
      emptyTable: 'Aucune donnée',
      popover: {
        title: 'Identifiants et formats de fichiers',
        identifiers: 'Identifiants',
        separatedBy: {
          title: 'Séparé par',
          values: 'virgule, espace, nouvelle ligne',
        },
        uploadFileFormats: 'Télécharger des formats de fichiers',
      },
    },
    filterList: {
      collapseAll: 'Réduire tout',
      expandAll: 'Développer tout',
    },
    table: {
      itemCount: {
        singlePage: '{count, plural, =0 {No result} autre {<strong>#</strong> résultat}}',
        multiplePages:
          'Résultat <strong>{from}</strong> - <strong>{to}</strong> de <strong>{total}</strong>',
      },
    },
    suggester: {
      error: {
        title: 'Erreur',
        description: "Une erreur s'est produite lors de la récupération des suggestions",
      },
      noResultsFound: 'Aucun résultat trouvé',
    },
    querybuilder: {
      defaultTitle: 'Filtre sans titre',
      header: {
        modal: {
          edit: {
            title: 'Enregistrer ce filtre',
            okText: 'Enregistrer',
            cancelText: 'Annuler',
            input: {
              label: 'Nom du filtre',
              placeholder: 'Filtre sans titre',
              maximumLength: 'caractères maximum',
            },
          },
          saveThisFilter: 'Enregistrer ce filtre',
          confirmUnsaved: {
            title: 'Modifications non enregistrées',
            openSavedFilter: {
              okText: 'Continuer',
              cancelText: 'Annuler',
              content:
                "Vous êtes sur le point d'ouvrir un filtre enregistré; toutes les modifications seront perdues.",
            },
            createNewFilter: {
              okText: 'Créer',
              cancelText: 'Annuler',
              content:
                'Vous êtes sur le point de créer un nouveau filtre; toutes les modifications seront perdues.',
            },
          },
        },
        popupConfirm: {
          delete: {
            title: 'Supprimer définitivement ce filtre ?',
            okText: 'Supprimer le filtre',
            cancelText: 'Annuler',
            content:
              'Vous êtes sur le point de supprimer définitivement ce filtre et toutes ses requêtes.',
          },
        },
        tooltips: {
          newQueryBuilder: 'Nouveau filtre',
          save: 'Enregistrer le filtre',
          saveChanges: 'Enregistrer les changements',
          delete: 'Supprimer',
          duplicateQueryBuilder: 'Dupliquer le filtre',
          share: "Partager (Copier l'URL)",
          setAsDefaultFilter: 'Définir comme filtre par défaut',
          unsetDefaultFilter: 'Filtre par défaut non défini',
          undoChanges: 'Filtre par défaut non défini',
          noSavedFilters: "Vous n'avez aucun filtre enregistré",
        },
        myFiltersDropdown: {
          title: 'Mes filtres',
          manageMyFilter: 'Gérer mes filtres',
        },
        duplicateFilterTitleSuffix: 'COPIER',
      },
      query: {
        combine: {
          and: 'et',
          or: 'ou',
        },
        noQuery: 'Utilisez les outils de recherche et les facettes à gauche pour créer une requête',
      },
      actions: {
        new: 'Nouveau',
        changeOperatorTo: "Changer d'opérateur pour",
        addQuery: 'Nouvelle requête',
        combine: 'Combiner',
        labels: 'Étiquettes',
        delete: {
          title: 'Supprimer cette requête?',
          titleSelected: 'Supprimer cette requête?',
          cancel: 'Annuler',
          confirm: 'Supprimer',
        },
        clear: {
          title: 'Supprimer toutes les requêtes?',
          cancel: 'Annuler',
          confirm: 'Supprimer',
          buttonTitle: 'Tout effacer',
          description:
            'Vous êtes sur le point de supprimer toutes vos requêtes. Ils seront perdus à jamais.',
        },
      },
    },
    savedSets: {
      modal: {
        edit: {
          title: "Modifier l'ensemble",
          okText: 'Enregistrer',
          cancelText: 'Annuler',
          input: {
            label: "Nom de l'ensemble",
            placeholder: 'Entrer le nom de votre ensemble',
            maximumLength: 'Caractères maximum',
          },
        },
        add: {
          title: 'Ajouter a un ensemble {type}',
          okText: 'Ajouter a un ensemble',
          cancelText: 'Annuler',
          enterName: 'Entrer le nom de votre nouvel ensemble',
          name: "Nom de l'ensemble",
        },
        remove: {
          title: "Retirer d'un ensemble {type}",
          okText: "Retirer d'un ensemble",
          cancelText: 'Annuler',
        },
      },
      popupConfirm: {
        delete: {
          title: 'Supprimer définitivement cet ensemble ?',
          okText: 'Supprimer cet ensemble',
          cancelText: 'Annuler',
          content: 'Vous êtes sur le point de supprimer définitivement cet ensemble.',
        },
      },
    },
    dataRelease: {
      title: 'Données disponibles',
      dataReleaseLink: 'Publication des données v1.0',
      dataExploration: 'Exploration des données',
      studies: 'Études',
      participants: 'Participants',
      biospecimens: 'Biospécimens',
      datafiles: 'Fichiers de données',
    },
  },
  layout: {
    main: {
      menu: {
        dashboard: 'Tableau de bord',
        studies: 'Études',
        explore: 'Exploration des données',
        variants: 'Variants',
        participants: 'Participants',
        biospecimen: 'Biospécimen',
        datafiles: 'Fichiers de données',
        website: 'Site web',
        documentation: 'Documentation',
        community: 'Communauté',
      },
    },
    user: {
      menu: {
        myprofile: 'Mon profil',
        settings: 'Paramètres',
        logout: 'Se déconnecter',
        signedWith: 'Connecté en tant que',
      },
    },
  },
  screen: {
    loginPage: {
      title: 'Portail de données',
      resume:
        "Le Centre québécois de données génomiques est une plateforme d'harmonisation et de diffusion des données génomiques générées par les études cliniques et de recherche du Québec.",
      login: 'Connexion',
      signup: 'Créer un compte',
    },
    dashboard: {
      hello: 'Bonjour',
      cards: {
        error: {
          title: 'Erreur de connexion',
          subtitle:
            'Nous ne sommes actuellement pas en mesure de nous connecter à ce service. Veuillez actualiser la page et réessayer. Si le problème persiste, veuillez',
          contactSupport: 'contactez le support',
          pleaseRefresh: 'Veuillez actualiser et réessayer ou ',
        },
        savedFilters: {
          title: 'Filtres enregistrés',
          popoverTitle: 'Gestion des filtres enregistrés',
          popoverContent:
            "Un filtre enregistré est une requête virtuelle créée en appliquant un ou plusieurs filtres à une requête de recherche. Ils peuvent être enregistrés et revisités pour une utilisation ultérieure sans avoir à resélectionner manuellement les filtres dans la barre latérale. Vous pouvez créer des filtres enregistrés à l'aide de l'outil de gestion des requêtes au-dessus du tableau des résultats dans la ",
          popoverContentLink: 'page Exploration des données',
          noSaved: "Vous n'avez aucun filtre enregistré",
          lastSaved: 'Dernier enregistrement : il y a {date}',
          dataExploration: 'Exploration des données',
          variants: 'Variants',
          failedFetch: 'Échec de la récupération des filtres enregistrés',
        },
        savedSets: {
          title: 'Ensembles enregistrés',
          popoverTitle: 'Gestion des ensembles enregistrés',
          popoverContent:
            "Un ensemble enregistré est un ensemble d'un ou plusieurs ID d'entité qui peuvent être enregistrés et revisités pour une utilisation ultérieure sans avoir à resélectionner manuellement les ID d'entité. Vous pouvez créer des ensembles enregistrés de participants, d'échantillons biologiques et de fichiers en haut du tableau des résultats dans la ",
          popoverContentLink: 'page Exploration des données',
          noSaved: 'Vous n’avez aucun ensemble enregistré',
          lastSaved: 'Dernier enregistrement : il y a {date}',
          files: 'Fichiers',
          participants: 'Participants',
          biospecimens: 'Biospécimens',
          failedFetch: 'Échec de la récupération des ensembles enregistrés',
        },
      },
    },
    variants: {
      title: 'Variants',
      noDataVariant: 'Aucune donnée disponible pour ce variant',
      sidemenu: {
        participant: 'Participant',
        variant: 'Variant',
        gene: 'Gène',
        frequency: 'Fréquence',
        pathogenicity: 'Pathogénicités',
      },
      table: {
        consequences: 'Conséquences',
        clinvar: 'Clinvar',
        type: 'Type',
        variant_class: 'Variant class',
        variant_id: 'Variant ID',
        gnomAd: 'GnomAD',
        genome_build: 'Genome build',
        dbsnp: 'dbSNP',
        variant: 'Variant',
      },
      summary: {
        summary: 'Resumé',
        type: 'Type',
        chromosome: 'Chromosome',
        position: 'Position',
        cytobande: 'Cytobande',
        altAllele: 'Allèle ALT',
        refAllele: 'Allèle REF',
        alternativeAllele: 'Allèle alternatif',
        referenceAllele: 'Allèle de référence',
        referenceGenome: 'Génome référence',
        studies: 'Études',
        participants: 'Participants',
        genes: 'Gènes',
        omim: 'OMIM',
        clinVar: 'ClinVar',
        gnomadGenome311: 'gnomAD Genome (v3.1.1)',
        dbSNP: 'dbSNP',
        gnomAD: 'gnomAD',
      },
      consequences: {
        consequence: 'Conséquence',
        consequences: 'Conséquences',
        geneConsequences: 'Conséquences géniques',
        impactTag: {
          modifier: 'MODIFIER',
          low: 'BAS',
          moderate: 'MODÉRÉ',
          high: 'HAUT',
        },
        AAColumn: 'AA',
        AAColumnTooltip: 'Substitution acide aminé',
        CDNAChangeColumn: 'ADN codant',
        conservationColumn: 'Conservation',
        strand: 'Brin',
        vep: 'VEP',
        prediction: 'Prédiction',
        transcript: 'Transcrit',
        refSeq: 'RefSeq',
        gene: 'Gène',
        omim: 'OMIM',
        hidetranscript: 'Voir moins',
        showtranscript: '{count} autre(s) transcript(s)',
        canonical: 'Transcrit canonique',
      },
      frequencies: {
        frequency: 'Fréquence',
        frequencies: 'Fréquences',
        frequencyTooltip: 'Fréquence du variant dans les études du CQDG',
        CQDGStudies: 'Études du CQDG',
        publicCohorts: 'Cohortes publiques',
        studies: 'Études',
        domain: 'Domaine',
        participants: 'Participants',
        participantsTooltip: '# de participants affectés dans les études du CQDG',
        altAlleles: 'Allèles ALT',
        altAllelesTooltip: 'Nombre d’allèles alternatifs',
        altRef: 'Allèles (ALT + REF)',
        altRefTooltip: 'Allèles alternatifs + Allèles de référence',
        homozygotes: 'Homozygotes',
        homozygotesTooltip: 'Nombre de variants homozygotes',
        total: 'Total',
        cohort: 'Cohorte',
      },
      pathogenicity: {
        pathogenicity: 'Pathogénicité',
        pathogenicities: 'Pathogénicités',
        clinVar: 'ClinVar',
        genePhenotype: 'Gène - Phénotype',
        condition: 'Condition',
        gene: 'Gène',
        inheritance: 'Héritage',
        source: 'Source',
      },
    },
    studies: {
      title: 'Études',
      code: 'Code',
      name: 'Nom',
      domain: 'Domaine',
      population: 'Population',
      participants: 'Participants',
      families: 'Familles',
      genomics: 'Génomique',
      transcriptomics: 'Transcriptomique',
      imaging: 'Imagerie',
      files: 'Fichiers',
      accessLimitation: 'Restriction d’accès',
      accessRequirement: 'Exigence d’accès',
      sampleAvailability: 'Disponibilité des échantillons',
      description: 'Description',
    },
    dataExploration: {
      title: 'Exploration',
      sidemenu: {
        participant: 'Participant',
        biospecimen: 'Biospécimen',
        datafiles: 'Fichier de données',
      },
      hpoTree: {
        modal: {
          title: 'Navigateur de phénotype observé (HPO)',
          okText: 'Appliquer',
        },
        searchPlaceholder: "Recherche par terme d'ontologie - min 3 caractères",
        emptySelection:
          'Sélectionnez des éléments dans le volet de gauche afin de les ajouter à votre requête.',
        tags: {
          exact: 'Participants avec ce terme exact',
          all: 'Participants y compris les termes descendants',
        },
      },
      mondoTree: {
        modal: {
          title: 'Navigateur de diagnostic (MONDO)',
          okText: 'Appliquer',
        },
        searchPlaceholder: "Recherche par terme d'ontologie - min 3 caractères",
        emptySelection:
          'Sélectionnez des éléments dans le volet de gauche afin de les ajouter à votre requête.',
        tags: {
          exact: 'Participants avec ce terme exact',
          all: 'Participants y compris les termes descendants',
        },
      },
      icdTree: {
        modal: {
          title: 'Navigateur de diagnostic (ICD-10)',
          okText: 'Appliquer',
        },
        searchPlaceholder: "Recherche par terme d'ontologie - min 3 caractères",
        emptySelection:
          'Sélectionnez des éléments dans le volet de gauche afin de les ajouter à votre requête.',
        tags: {
          exact: 'Participants avec ce terme exact',
          all: 'Participants y compris les termes descendants',
        },
      },
      tabs: {
        summary: {
          title: 'Sommaire',
          sociodemographics: {
            cardTitle: 'Profils sociodémographiques',
            genderTitle: 'Genre',
            ethnicityTitle: 'Ethnicité',
            compositionFamilyTitle: 'Composition familiale',
          },
          availableData: {
            dataCategoryTitle: 'Participants par catégories de données',
            dataTypeTitle: 'Participants par types de données',
            studiesTitle: 'Participants par étude',
            axis: '# de participants',
            dataCategory: 'Catégorie de données',
            dataType: 'Type de données',
          },
          observed_phenotype_tagged: {
            cardTitle: 'Phénotypes observés (HPO)',
            phenotypeTree: {
              nbParticipant:
                '{count} participants (y compris les termes descendants sur ce chemin)',
              addTermToQuery: 'Ajouter un terme à la requête active',
              currentPath: 'Chemin actuel',
            },
            empty: 'Aucun phénotype observé signalé pour ces participants',
          },
          mondo: {
            cardTitle: 'Diagnostic (MONDO)',
            phenotypeTree: {
              nbParticipant:
                '{count} participants (y compris les termes descendants sur ce chemin)',
              addTermToQuery: 'Ajouter un terme à la requête active',
              currentPath: 'Chemin actuel',
            },
            empty: 'Aucun diagnostic signalé pour ces participants',
          },
          studiespie: {
            cardTitle: 'Études',
            domainTitle: 'Études par domaine',
            popTitle: 'Études par type population',
            partTitle: 'Participants par étude',
          },
        },
        participants: {
          title: 'Participants ({count})',
          participant: 'Participant',
          study_code: 'Études',
          proband: 'Proband',
          gender: 'Genre',
          familyHistory: 'Historique familiale',
          ageAtRecruitment: 'Âge',
          ageAtRecruitmentTooltip: 'Âge au recrutement (jours)',
          ageAtDiagnosis: 'Âge au diagnostic',
          diagnosis: 'Diagnostic (MONDO)',
          phenotype: 'Phénotype (HPO)',
          files: 'Fichiers',
          ethnicity: 'Ethnicité',
          biospecimen: 'Biospecimen',
          vitalStatus: 'Statut vital',
          submitterParticipantId: 'Participant externe',
          ageAtDeath: 'Âge au décés',
          selectedParticipants: 'Participants séléctionnés',
          selectedParticipantsFamilies: 'Participants séléctionnés et familles',
          downloadClinicalData: 'Télécharger les données cliniques',
          icdTagged: 'Diagnostic (ICD)',
          diagnosisSourceText: 'Diagnostic (texte source)',
        },
        biospecimens: {
          title: 'Biospécimens ({count})',
          biospecimen_id: 'Biospécimen',
          sample_id: 'Échantillon',
          participant_id: 'Participant',
          study_code: 'Étude',
          sample_type: "Type d'échantillon",
          biospecimen_tissue_source: 'Tissue',
          age_biospecimen_collection: 'Âge',
          age_biospecimen_collectionTooltip: 'Âge au prélèvement du biospécimen',
          files: 'Fichiers',
          downloadSampleData: "Télécharger les données d'échantillon",
        },
        datafiles: {
          title: 'Fichiers de données ({count})',
          fileAuthorization: 'Autorisation du fichier',
          dataAccess: 'Accès aux données',
          file: 'Fichier',
          study_code: 'Étude',
          dataCategory: 'Catégorie de données',
          dataType: 'Type de données',
          experimentalStrategy: 'Stratégie expérimentale',
          accessUrl: 'Accès Url',
          format: 'Format',
          size: 'Taille',
          platform: 'Platforme',
          name: 'Nom du fichier',
          participants: 'Participants',
          biospecimens: 'Biospécimens',
          controlled: 'Controllé',
          authorized: 'Autorisé',
          sample: 'Échantillon',
        },
      },
      participantsSelected: 'participants séléctionnés',
      participantSelected: 'participant séléctionné',
      saveParticipantsSet: "Enregistrer l'ensemble de participants",
      participantCount: 'éléments à la fois. Les 10 000 premiers seront traités.',
      filesSelected: 'fichiers séléctionnés',
      fileSelected: 'fichier séléctionné',
      saveFilesSet: "Enregistrer l'ensemble de fichiers",
      biospecimensSelected: 'Biospecimens séléctionnés',
      biospecimenSelected: 'Biospecimen séléctionné',
      saveBiospecimensSet: "Enregistrer l'ensemble de biospecimens",
      searchByBiospecimenId: 'Rechercher par ID biospecimen',
      searchByBiospecimenSampleId: 'Recherche par ID d’échantillon',
      noBiospecimenFound: 'Aucun biospecimen trouvé',
      noBiospecimenSetsFound: 'Aucun ensemble de biospecimen trouvé',
      noBiospecimenCollectionFound: 'Aucune ID collection trouvé',
      savedBiospecimenSets: 'Ensemble d’échantillons',
      saveAsNewSet: 'Enregistrer un nouvel ensemble',
      addToExistingSet: 'Ajouter à un ensemble existant',
      removeFromExistingSet: "Supprimer d'un ensemble existant",
      addToSet: "Ajouter à l'ensemble",
      addTypeSet: "Ajouter à l'ensemble de {type}",
      removeFromSet: "Retirer de l'ensemble",
      removeTypeSet: "Retirer de l'ensemble de {type}",
      set: 'Ensemble',
      chooseSet: 'Choisissez un ensemble',
    },
    join: {
      cancel: 'Annuler',
      next: 'Suivant',
      back: 'Retour',
      submit: 'Soumettre',
      disclaimers: {
        title: "Processus d'inscription au portail CQDG",
        description:
          "Le portail CQDG est le point d'entrée principal du hub de données CQDG. Le portail CQDG permet de rechercher, de visualiser et d'accéder aux données pertinentes pour CQDG. Certains ensembles de données peuvent nécessiter des approbations supplémentaires (par exemple, dbGaP) et des conditions d'accès et d'utilisation.",
        terms: {
          title: 'Termes et conditions du portail CQDG',
          lastUpdate: 'Dernière mise à jour: {date}',
          bullets: {
            1: "Mon objectif d'utilisation des données du portail CQDG est exempt de discrimination fondée sur la race, l'origine ethnique, la nationalité, le sexe, l'âge, les capacités physiques et/ou mentales, l'orientation sexuelle, l'identité ou l'expression de genre, la religion ou tout autre des motifs qui porteraient atteinte aux droits d'un individu.",
            2: "Je reconnaîtrai des ensembles de données spécifiques et/ou des numéros d'accès applicables ainsi que le hub de données CQDG dans ma diffusion des résultats de la recherche, selon le support ou le type de diffusion.",
            3: 'Je partagerai ou distribuerai uniquement les données du portail CQDG selon des conditions conformes à cet accord, et les données ou les dérivés des données ne peuvent être vendus, en tout ou en partie, à une personne à tout moment et à quelque fin que ce soit.',
            4: "Je respecterai la vie privée des participants à la recherche et je ne tenterai pas d'identifier ou de contacter des participants individuels ou des groupes auprès desquels des données ont été collectées ou de générer des informations qui pourraient permettre de déterminer facilement l'identité des participants.",
            5: "J'accepte de fournir une brève déclaration concernant mon utilisation prévue des données sur le portail du CQDG avec mon nom et mon affiliation qui seront affichés publiquement à des fins de transparence et de collaboration.",
            6: "Je comprends que la participation à la communauté du CQDG est volontaire et peut être résiliée par l'administrateur du portail du CQDG. Je signalerai toute violation réelle ou présumée de cet accord, même involontaire, à l'administrateur du portail du CQDG. Je comprends que l'administrateur du portail du CQDG peut prendre des mesures pour remédier à toute violation réelle ou présumée et/ou signaler un tel comportement aux autorités compétentes. Je comprends également que l'administrateur du portail du CQDG peut immédiatement suspendre ou résilier mon accès au portail du CQDG s'il y a une violation réelle ou présumée de cet accord.",
          },
          checkbox: "J'ai lu et j'accepte les termes et conditions du portail CQDG",
        },
        disclaimer: {
          title: 'Avis de non-responsabilité du portail CQDG',
          bullets: {
            1: 'Les données disponibles sur le portail CQDG sont fournies telles quelles et peuvent changer au fil du temps.',
            2: "CQDG ne garantit ni n'assume aucune responsabilité légale ou responsabilité pour les informations, appareils, produits ou processus contenus dans le portail CQDG.",
            3: "Le contenu fourni sur le portail CQDG est à titre informatif uniquement et n'est pas destiné à se substituer à un jugement, un conseil, un diagnostic ou un traitement médical professionnel indépendant.",
          },
          checkbox: "J'ai lu et compris les clauses de non-responsabilité du portail CQDG",
        },
        errors:
          'Veuillez accepter les termes et conditions et les clauses de non-responsabilité du portail.',
      },
      registration: {
        notice:
          'Les informations fournies ici seront partagées avec la communauté CQDG sur le portail CQDG. Tous les champs sont obligatoires, sauf indication contraire.',
        sections: {
          identification: 'Identification',
          roleAndAffiliation: 'Rôle et affiliation',
          researchAndDataUse: 'Recherche et utilisation des données',
        },
        labels: {
          firstName: 'Prénom',
          lastName: 'Nom de famille',
          haveAUserID: "J'ai un identifiant eRA Commons:",
          enterUserId: 'Veuillez saisir votre identifiant eRA Commons',
          commercialUseReason:
            'Veuillez fournir au moins 1 à 2 phrases pour décrire votre utilisation commerciale:',
          fullName: 'Full name',
          email: 'Email',
          iAmA: 'Je suis un/une:',
          pleaseDescribe: "Décrivez s'il vous plait",
          iAmAffiliatedWith: 'je suis affilié à:',
          intendToUser: "J'ai l'intention d'utiliser les données du portail CQDG pour:",
          dataUseStatement: "Déclaration d'utilisation des données",
          researchAreaDescribe:
            "Mon domaine de recherche ou mon domaine d'intérêt peut être décrit comme:",
        },
        placeHolders: {
          firstLast: 'Premier Dernier',
        },
        helps: {
          checkAllThatApply: 'Cochez toutes les cases',
          describeUseBelow: "À d'autres fins, vous devez décrire votre utilisation ci-dessous",
          provideBriefDescription:
            'Fournissez une brève description et un lien vers votre biographie professionnelle ou le site Web de votre organisation, si disponible',
          provideOrgAffiliation: 'Fournir une affiliation institutionnelle ou organisationnelle',
        },
        noticeNotPublicInfo: 'Ces informations ne seront pas rendues publiques.',
        nameAndEmailOfIndividual:
          "Veuillez fournir le nom et l'adresse e-mail d'une personne de votre institution, organisation ou similaire qui est au courant de l'utilisation que vous comptez faire des données (nous ne prévoyons pas de contacter cette personne, sauf dans les cas où nous devons vérifier votre identité).",
        roleOptions: {
          1: 'Chercheur dans une institution académique ou à but non lucratif',
          2: "Représentant d'une entité à but lucratif ou commerciale",
          3: "Développeur d'outils ou d'algorithmes",
          4: 'Clinicien',
          5: 'Membre de la communauté',
          6: 'Employé fédéral',
        },
        usageOptions: {
          1: 'En savoir plus sur le syndrome de Down et ses effets sur la santé, sa prise en charge et/ou son traitement',
          2: "M'aider à concevoir une nouvelle étude de recherche",
          3: 'Identifier les ensembles de données que je souhaite analyser',
          4: 'Fins commerciales',
        },
        userIdOptions: {
          1: 'Oui',
          2: 'Non',
        },
        optionsOther: 'Autre',
        noAffiliationOption: "Je n'ai pas d'affiliation institutionnelle.",
      },
    },
  },
  facets: {
    // Participant
    participant_id: 'ID de participant',
    study: {
      study_code: "Code de l'étude",
    },
    mondo: {
      name: 'Diagnostic (MONDO)',
    },
    mondo_tagged: {
      name: 'Diagnostic (MONDO)',
      source_text: 'Diagnostic (texte source)',
      age_at_event: 'Âge au diagnostic',
    },
    observed_phenotypes: {
      name: 'Phénotype (HPO)',
    },
    observed_phenotype_tagged: {
      name: 'Phénotype (HPO)',
      source_text: 'Phénotype (texte source)',
    },
    icd_tagged: {
      name: 'Diagnostic (ICD-10)',
    },
    age_at_recruitment: 'Âge au recrutement',
    gender: 'Genre',
    ethnicity: 'Ethnicité',

    // Biospecimen
    biospecimen_tissue_source: 'Tissue',
    age_biospecimen_collection: 'Âge au  prélèvement du biospécimen (jours)',
    sample_type: "Type d'échantillon",
    sample_id: "ID d'échantillon",

    // File
    data_category: 'Catégorie de données',
    data_type: 'Type de données',
    file_format: 'Format',
    file_id: 'ID de fichier',
    sequencing_experiment: {
      experimental_strategy: 'Stratégie expérimentale',
    },

    //Variants
    variant_class: 'Variant class',
    variant_external_reference: 'Référence externe',
    chromosome: 'Chromosome',
    zygosity: 'Zygosité',
    transmissions: 'Transmissions',
    consequences: {
      consequences: 'Conséquences',
      biotype: 'Biotype',
    },

    //Genes
    gene_external_reference: 'Gene External reference',
    gene: {
      panels: 'Gene Panels',
    },
    genes: {
      name: 'Name',
      hpo: {
        hpo_term_label: 'Term label',
      },
      orphanet: {
        panel: 'Orphanet panel',
      },
      omim: {
        name: 'Omim',
      },
      ddd: {
        disease_name: 'DDD Disease Name',
      },
      cosmic: {
        tumour_types_germline: 'Cosmic Tumour Types Germline',
      },
    },

    // Studies
    study_code: 'Rechercher par étude',
    domain: 'Domaine',
    population: 'Population',
    data_access_codes: {
      access_limitations: 'Restriction d’accès',
      access_requirements: 'Exigence d’accès',
    },
  },
};

export default fr;
