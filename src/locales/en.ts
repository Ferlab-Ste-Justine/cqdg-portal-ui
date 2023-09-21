/* eslint-disable max-len */
import translations from './en.json';

const en = {
  ...translations,
  entities: {
    study: {
      study_code: 'Study Code',
      study: 'Study',
      studies: 'Studies',
      studyAuto: '{count, plural, =0 {Study} =1 {Study} other {Studies}}',
      access_limitations: 'Access Limitations',
      access_limitation: 'Access Limitation',
      access_requirements: 'Access Requirements',
      access_requirement: 'Access Requirement',
      access_authority: 'Access Authority',
      domain: 'Domain',
      population: 'Population',
      data_access_codes: {
        access_limitations: 'Access Limitation',
        access_requirements: 'Access Requirement',
      },
      statistic: 'Summary Statistic',
      statistics: 'Summary Statistics',
      data_access: 'Data Access',
      dataset: 'Dataset',
      name: 'Name',
      file: 'File',
      keywords: 'Keywords',
      description: 'Description',
      restrictedTitle: 'Study restricted',
      restrictedContent: 'The data of this study is not accessible for exploration.',
    },
    biospecimen: {
      sample_id: 'Sample ID',
      sample: 'Sample',
      samples: 'Samples',
      samplesAuto: '{count, plural, =0 {Sample} =1 {Sample} other {Samples}}',
      sample_type: 'Sample Type',
      biospecimensAuto: '{count, plural, =0 {Biospecimen} =1 {Biospecimen} other {Biospecimens}}',
      biospecimens: 'Biospecimens',
      biospecimen: 'Biospecimen',
      biospecimen_tissue_source: 'Tissue',
      biospecimen_id: 'Biospecimen ID',
      age_biospecimen_collection: 'Age',
      age_biospecimen_collection_tooltip: 'Age at Biospecimen Collection (days)',
    },
    participant: {
      participant_id: 'Participant ID',
      participant_2_id: 'Participant ID',
      submitter_participant_id: 'Ext. Participant ID',
      submitter_participant_id_tooltip: 'Submitter Participant ID',
      participant: 'Participant',
      participants: 'Participants',
      id: 'ID',
      participantAuto: '{count, plural, =0 {Participant} =1 {Participant} other {Participants}}',
      participantsSamples: 'Participants / Samples',
      participantSample: 'Participant / Sample',
      profile: 'Profile',
      family: 'Family',
      families: 'Families',
      diagnosis: 'Diagnosis',
      diagnoses: 'Diagnoses',
      diagnosis_mondo: 'Diagnosis (MONDO)',
      diagnosis_icd: 'Diagnosis (ICD-10)',
      diagnosis_source_text: 'Diagnosis (Source Text)',
      age_at_diagnosis: 'Age',
      age_at_diagnosis_tooltip: 'Age at Diagnosis (days)',
      age_at_phenotype: 'Age',
      age_at_phenotype_tooltip: 'Age at Phenotype (days)',
      phenotype: 'Phenotype',
      phenotypes: 'Phenotypes',
      phenotype_hpo: 'Phenotype (HPO)',
      family_type: 'Family Type',
      family_position: 'Family Position',
      family_id: 'Family ID',
      gender: 'Gender',
      ethnicity: 'Ethnicity',
      age_at_recruitment: 'Age at Recruitment (days)',
      vital_status: 'Vital Status',
      age_at_outcome: 'Age at Outcome (days)',
      age_of_death: 'Age at Death (days)',
      cause_of_death: 'Cause of Death',
      disease_status: 'Disease Status',
      cancer: 'Cancer',
      mondo_term: 'MONDO Term',
      mondo_term_tooltip: '# of participants with the exact MONDO term',
      phenotype_code: 'Phenotype (HPO)',
      phenotype_source_text: 'Phenotype (Source Text)',
      interpretation: 'Interpretation',
      hpo_term: 'HPO Term',
      hpo_term_tooltip: '# of participants with the exact HPO term',
      observed: 'Observed',
      not_observed: 'Not Observed',
    },
    file: {
      file: 'File',
      files: 'Files',
      datafile: 'Data File',
      datafiles: 'Data Files',
      filesAuto: '{count, plural, =0 {File} =1 {File} other {Files}}',
      identifiant: 'ID',
      file_id: 'File ID',
      file_2_id: 'File ID',
      file_name: 'Name',
      file_format: 'Format',
      file_size: 'Size',
      ferload_url: 'URL',
      file_hash: 'Hash',
      analysis: 'Analysis',
      type: 'Type',
      data_type: 'Data Type',
      category: 'Category',
      data_category: 'Data Category',
      data_access: 'Data Access',
      experimentalProcedure: 'Experimental Procedure',
      analysisProperties: 'Analysis Properties',
      sequencing_experiment: {
        experimental_strategy: 'Experimental Strategy',
        type_of_sequencing: 'Sequencing Type',
        read_length: 'Read Length',
        platform: 'Platform',
        capture_kit: 'Capture Kit',
        sequencer_id: 'Sequencer',
        run_date: 'Date (yyyy-mm-dd)',
        run_name: 'Run',
        labAliquotID: 'Aliquot',
        bio_informatic_analysis: 'Analysis Type',
        workflow_name: 'Pipeline',
        workflow_version: 'Version',
        genome_build: 'Genome Build',
        analysis_id: 'Analysis ID',
        identifiant: 'ID',
      },
      analysisFiles: 'Files Generated by the Analysis',
      numberByExperimentalStrategy: 'File counts by Experimental Strategy',
      numberByDataTypes: 'File counts by Data Type',
      'n=2': '(n={count})',
      nTooltipParticipant: 'Total number of files associated with the participant',
      nTooltipFile: 'Total number of files in the study',
    },
    variant: {
      title: 'Variants',
      variant: 'Variant',
      variants: 'Variants',
      variantAuto: '{count, plural, =0 {Variant} =1 {Variant} other {Variants}}',
      noDataVariant: 'No data available for this variant',
      type: 'Type',
      variant_class: 'Variant Type',
      variant_external_reference: 'External Reference',
      variant_id: 'Variant ID',
      biotype: 'Gene Type',
      zygosity: 'Zygosity',
      panels: 'Gene Panels',
      gnomAd: 'GnomAD',
      gnomAdTooltip: 'gnomAD 3.1.1 Allele Frequency',
      gnomadGenome311: 'gnomAD Genome (v3.1.1)',
      gnomadGenome3: 'gnomAD Genome (v3.1.2)',
      genome_build: 'Genome build',
      dbsnp: 'dbSNP',
      chromosome: 'Chromosome',
      position: 'Position',
      cytoband: 'Cytoband',
      altAllele: 'ALT Allele',
      refAllele: 'REF Allele',
      alternativeAllele: 'Alternative allele',
      referenceAllele: 'Reference allele',
      referenceGenome: 'Reference Genome',
      genes: 'Genes',
      gene: 'Gene',
      genePhenotype: 'Gene - Phenotype',
      homozygotes: {
        title: 'Homo.',
        tooltip: '# of Homozygotes',
      },
      alt: {
        title: 'ALT',
        tooltip: '# of Alternative alleles',
      },
      frequence: {
        title: 'Freq.',
        tooltip: 'Frequency of the variant across CQDG cohorts',
      },
      participant: {
        title: 'Part.',
        tooltip: '# of affected participants across CQDG cohorts',
      },
      consequences: {
        consequence: 'Consequence',
        consequences: 'Consequences',
        geneConsequences: 'Gene Consequences',
        impactTag: {
          modifier: 'MODIFIER',
          low: 'LOW',
          moderate: 'MODERATE',
          high: 'HIGH',
        },
        predictions: {
          predictions: 'Predictions',
          sift: 'Sift',
          polyphen2: 'Polyphen2',
          fathmm: 'Fathmm',
          cadd: 'Cadd',
          dann: 'Dann',
          lrt: 'Lrt',
          revel: 'Revel',
        },
        aaColumn: 'AA',
        aaColumnTooltip: 'Amino acid substitution',
        cdnaChangeColumn: 'Coding DNA',
        conservationColumn: 'Conservation',
        strand: 'Strand',
        vep: 'VEP',
        transcript: 'Transcript',
        refSeq: 'RefSeq',
        omim: 'OMIM',
        hidetranscript: 'Show less',
        showtranscript: '{count} other transcripts',
        canonical: 'Canonical transcript',
      },
      frequencies: {
        frequency: 'Frequency',
        frequencies: 'Frequencies',
        frequencyTooltip: 'Frequency of the variant across CQDG studies',
        CQDGStudies: 'CQDG Studies',
        publicCohorts: 'Public Cohorts',
        studies: 'Studies',
        domain: 'Domain',
        participants: 'Participants',
        participantsTooltip: '# of affected participants across CQDG studies',
        altAlleles: 'ALT Alleles',
        altAllelesTooltip: 'Number of alternative alleles',
        altRef: 'Alleles (ALT + REF)',
        altRefTooltip: 'Alternative alleles + Reference alleles',
        homozygotes: 'Homozygotes',
        homozygotesTooltip: 'Number of homozygote variants',
        total: 'Total',
        cohort: 'Cohort',
      },
      pathogenicity: {
        pathogenicity: 'Pathogenicity',
        pathogenicities: 'Pathogenicities',
        clinVar: 'ClinVar',
        condition: 'Condition',
        inheritance: 'Inheritance',
        source: 'Source',
      },
    },
  },
  global: {
    yes: 'Yes',
    no: 'No',
    other: 'Other',
    delete: 'Delete',
    summary: 'Summary',
    viewInDataExploration: 'View in Data Exploration',
    search: {
      genes: {
        emptyText: 'No gene found',
        placeholder: 'e.g. BRAF, ENSG00000157764',
        title: 'Search by gene',
        tooltip: 'Enter a Gene Symbol, Gene Alias or Ensemble ID',
      },
      variants: {
        emptyText: 'No variant found',
        placeholder: 'e.g. 10-100063679-T-C, rs341',
        title: 'Search by variant',
        tooltip:
          'Enter Variant Locus, Gene Symbol, Gene Alias, Gene AA Change, dbSNP ID, Clinvar ID, Ensembl ID, refseq ID',
      },
      study: {
        emptyText: 'No study found',
        placeholder: 'e.g. T-DEE, Developmental and Epileptic Encephalopathies',
        title: 'Search by study',
        tooltip: 'Search by study code or study name',
      },
    },
    filters: {
      actions: {
        all: 'All',
        none: 'None',
        clear: 'Clear',
        less: 'Less',
        more: 'More',
        apply: 'Apply',
        dictionnary: 'Dictionnary',
        cancel: 'Cancel',
      },
      operators: {
        allOf: 'All of',
        anyOf: 'Any of',
        noneOf: 'None of',
        between: 'Between',
        lessthan: 'Less than',
        lessthanorequal: 'Less than or equal',
        greaterthan: 'Greater than',
        greaterthanorequal: 'Greater than or equal',
      },
      range: {
        is: 'Is',
        from: 'From',
        to: 'To',
        actualInterval: 'Actual interval: ',
      },
      messages: {
        empty: 'No values found',
      },
      checkbox: {
        placeholder: 'Search...',
      },
    },
    forms: {
      errors: {
        minCharacters: 'characters minimum',
        requiredField: 'This field is required',
        enterValidEmail: 'Enter a valid email',
      },
    },
    errors: {
      403: 'Sorry, you are not authorized to access this page.',
      404: 'Sorry, the page you visited does not exist.',
      500: 'Sorry, something went wrong.',
      backHome: 'Back home',
    },
    notification: {
      genericError: 'An error occured',
    },
    proTable: {
      results: 'Results',
      noResults: 'No Result',
      of: 'of',
      selected: 'item selected',
      selectedPlural: 'items selected',
      selectAllResults: 'Select all results',
      clear: 'Clear',
      tableExport: 'Export as TSV',
      reset: 'Reset',
      columns: 'Columns',
      first: 'First',
      previous: 'Previous',
      next: 'Next',
      view: '{value} / view',
    },
    seeLess: 'See less',
    seeMore: 'See more',
  },
  api: {
    savedFilter: {
      error: {
        title: 'Error',
        messageUpdate: 'Unable to update filter',
        messageDelete: 'Unable to delete filter',
      },
    },
    savedSet: {
      error: {
        title: 'Error',
        messageUpdate: 'Unable to update set',
        messageDelete: 'Unable to delete set',
        messageCreate: 'Unable to create set',
      },
      success: {
        titleCreate: 'Your set has been saved.',
        messageCreate: 'You can add your sets to a query from the sidebar or the dashboard.',
        titleUpdate: 'Success',
        messageUpdate: 'Your set has been updated.',
        titleDelete: 'Success',
        messageDelete: 'Your set has been deleted.',
      },
    },
    report: {
      error: {
        title: 'Error',
        message: 'We were unable to generate the report at this time. Please try again later or ',
        support: 'contact support',
        tooMuchFilesTitle: 'Maximum number exceeded',
        tooMuchFiles:
          'A maximum of 10,000 files can be inlcuded at a time. Please narrow your selection and try again.',
      },
      inProgress: {
        title: 'Processing',
        fetchReport: 'Fetching Report, please wait',
      },
      onSuccess: {
        title: 'Success',
        fetchReport: 'Report downloaded successfully',
      },
      clinicalData: {
        download: 'Download clinical data',
        family:
          '{count, plural, =0 {Selected participant & family} =1 {Selected participant & family} other {Selected participants & families}}',
        participant:
          '{count, plural, =0 {Selected participant} =1 {Selected participant} other {Selected participants}}',
      },
      sampleData: {
        download: 'Download sample data',
      },
      fileManifest: {
        button: 'Manifest',
        title: 'File manifest',
        okText: 'Download',
        cancel: 'Cancel',
        text: `Download a manifest of the selected files which can be used with CQDG's bulk download tool*. This manifest also includes additional information, including the participants and samples associated with these files.`,
        subText: '*In development and will be available soon.',
        textCheckbox: `Include data files of the same type for the participants' related family members for this selection.`,
      },
      requestAccess: {
        button: 'Request access',
        title: 'Request access',
        okText: 'Download',
        cancel: 'Cancel',
        text: `Download the documents required by the studies for your data access request. These documents provide information on the conditions of authorized data use as well as a complete list of the selected files per each study. Read more on `,
        textLink: `Applying for data access`,
        textCheckbox: `Include the files of the same type for related family members in this selection.`,
      },
    },
    noData: 'No data',
  },
  components: {
    search: {
      selectSavedSet: 'Select a saved set',
      searchByParticipantId: 'Search by participant ID',
      savedParticipantSets: 'Saved participant sets',
      noParticipantFound: 'No participant found',
      noParticipantSetFound: 'No participant sets found',
      participantPlaceholder: 'e.g. PT0483333',
      searchBySampleId: 'Search by sample ID',
      savedSampleSets: 'Saved sample sets',
      noSampleFound: 'No sample found',
      noSampleSetFound: 'No sample sets found',
      samplePlaceholder: 'e.g. SR0230956',

      searchByFileId: 'Search by file ID',
      noFileFound: 'No file found',
      filePlaceholder: 'e.g. FI0080837',
      noFileSetFound: 'No file set found',

      savedFileSets: 'Saved file sets',
    },
    uploadIds: {
      participant: 'participant',
      participantID: 'Participant ID',
      participantPlaceholder: 'e.g. PT0483333',
      sampleTitle: 'Upload a sample list',
      sample: 'sample',
      sampleID: 'Sample ID',
      samplePlaceholder: 'e.g. SR0230956',
      file: 'file',
      fileID: 'File ID',
      filePlaceholder: 'e.g. FI0080837',
      title: 'Upload a {entity} list',
      submittedColTitle: 'Submitted {entity} identifiers',
      uploadBtnText: 'Upload a {entity} list',
      mappedTo: 'Mapped To',
      collapseTitle: 'Summary Table  ({matchCount} matched, {unMatchCount} unmatched)',
      inputLabel: 'Copy-paste a list of identifiers or upload a file',
      match: 'Matched ({count})',
      unmatch: 'Unmatched ({count})',
      tableMessage:
        '{submittedCount} submitted identifiers mapped to {mappedCount} unique system identifiers',
      matchTable: {
        idcol: '{entity} ID',
        participant: {
          matchcol: 'Participant ID',
          mappedcol: 'Study Code',
        },
        file: {
          matchcol: 'File ID',
          mappedcol: 'Study Code',
        },
        biospecimen: {
          matchcol: 'Sample ID',
          mappedcol: 'Study Code',
        },
      },
      pillTitle: 'Uploaded List',
      upload: {
        fileBtn: 'Upload a file',
        btn: 'Upload',
      },
      clearBtn: 'Clear',
      cancelBtn: 'Cancel',
      emptyTable: 'No data',
      popover: {
        title: 'Identifiers and File Formats',
        identifiers: 'Identifiers',
        separatedBy: {
          title: 'Separated by',
          values: 'comma, space, new line',
        },
        uploadFileFormats: 'Upload file formats',
      },
    },
    gene: {
      title: 'Upload a gene list',
      submittedColTitle: 'Submitted gene identifiers',
      uploadBtnText: 'Upload a gene list',
      mappedTo: 'Mapped To',
      collapseTitle: 'Summary Table  ({matchCount} matched, {unMatchCount} unmatched)',
      inputLabel: 'Copy-paste a list of identifiers or upload a file',
      match: 'Matched ({count})',
      unmatch: 'Unmatched ({count})',
      tableMessage:
        '{submittedCount} submitted identifiers mapped to {mappedCount} unique system identifiers',
      matchTableIdcolTitle: 'Gene ID',
      matchTableMatchcolTitle: 'ID ENSEMBL',
      matchTableMappedcolTitle: 'Symbol',
      pillTitle: 'Uploaded List',
      uploadBtn: 'Upload',
      uploadFileBtn: 'Upload a file',
      clearBtn: 'Clear',
      cancelBtn: 'Cancel',
      emptyTable: 'No data',
    },
    filterList: {
      collapseAll: 'Collapse all',
      expandAll: 'Expand all',
    },
    querybuilder: {
      defaultTitle: 'Untitled Filter',
      header: {
        modal: {
          edit: {
            title: 'Save this filter',
            okText: 'Save',
            cancelText: 'Cancel',
            input: {
              label: 'Filter name',
              placeholder: 'Untitled filter',
              maximumLength: 'characters maximum',
            },
          },
          saveThisFilter: 'Save this filter',
          confirmUnsaved: {
            title: 'Unsaved changes',
            openSavedFilter: {
              okText: 'Continue',
              cancelText: 'Cancel',
              content: 'You are about to open a saved filter; all modifications will be lost.',
            },
            createNewFilter: {
              okText: 'Create',
              cancelText: 'Cancel',
              content: 'You are about to create a new filter; all modifications will be lost.',
            },
          },
        },
        popupConfirm: {
          delete: {
            title: 'Permanently delete this filter?',
            okText: 'Delete filter',
            cancelText: 'Cancel',
            content: 'You are about to permanently delete this filter and all of its queries.',
          },
        },
        tooltips: {
          newQueryBuilder: 'New filter',
          save: 'Save filter',
          saveChanges: 'Save changes',
          delete: 'Delete',
          duplicateQueryBuilder: 'Duplicate filter',
          share: 'Share (Copy url)',
          setAsDefaultFilter: 'Set as default filter',
          unsetDefaultFilter: 'Unset default filter',
          undoChanges: 'Discard unsaved changes',
          noSavedFilters: 'You have no saved filters',
        },
        myFiltersDropdown: {
          title: 'My filters',
          manageMyFilter: 'Manage my filters',
        },
        duplicateFilterTitleSuffix: 'COPY',
      },
      query: {
        combine: {
          and: 'and',
          or: 'or',
        },
        noQuery: 'Use the search tools & facets on the left to build a query',
      },
      actions: {
        new: 'New',
        changeOperatorTo: 'Change operator to',
        addQuery: 'New query',
        combine: 'Combine',
        labels: 'Labels',
        delete: {
          title: 'Delete this query?',
          titleSelected: 'Delete this query?',
          cancel: 'Cancel',
          confirm: 'Delete',
        },
        clear: {
          title: 'Delete all queries?',
          cancel: 'Cancel',
          confirm: 'Delete',
          buttonTitle: 'Clear all',
          description: 'You are about to delete all your queries. They will be lost forever.',
        },
      },
    },
    savedSets: {
      modal: {
        edit: {
          title: 'Edit set',
          okText: 'Save',
          cancelText: 'Cancel',
          input: {
            label: 'Set name',
            placeholder: 'Enter the name of your new set',
            maximumLength: 'characters maximum',
          },
          setAlreadyExists: 'A set with this name already exists',
        },
        add: {
          title: 'Add to a {type} set',
          okText: 'Add to set',
          cancelText: 'Cancel',
          enterName: 'Enter the name of your new set',
          name: 'Set name',
        },
        remove: {
          title: 'Remove from a {type} set',
          okText: 'Remove from set',
          cancelText: 'Cancel',
        },
      },
      popupConfirm: {
        delete: {
          title: 'Permanently delete this set?',
          okText: 'Delete set',
          cancelText: 'Cancel',
          content: 'You are about to permanently delete this set.',
        },
      },
    },
    dataRelease: {
      title: 'Available Data',
      dataReleaseLink: 'Data release v1.0',
      dataExploration: 'Data Exploration',
    },
  },
  layout: {
    main: {
      menu: {
        dashboard: 'Dashboard',
        studies: 'Studies',
        explore: 'Data Exploration',
        website: 'Website',
        documentation: 'Documentation',
        community: 'Community',
      },
    },
    user: {
      menu: {
        settings: 'Profile settings',
        logout: 'Logout',
        signedWith: 'Signed in with',
      },
    },
  },
  screen: {
    loginPage: {
      title: 'Data Portal',
      resume:
        'The Quebec Center for Genomic Data is a platform for the harmonization and dissemination of genomic data generated by clinical and research studies in Quebec.',
      login: 'Login',
      signup: 'Sign up',
    },
    memberProfile: {
      notFound: 'User not found',
      rolesTitle: 'Roles',
      noRoles: 'No roles',
      usageTitle: 'Intended Use of the CQDG Portal Data',
      researchDomainsTitle: 'Research domains or domains of interest',
      noUsage: 'No intended usages',
      noResearchDomain: 'No research domain',
      editProfileBtn: 'Edit Profile',
      communityBtn: 'Community',
    },
    community: {
      title: 'CQDG Community',
      resultsMember: 'Members',
      noMember: 'No member',
      search: {
        filters: 'Filters',
        inputPlaceholder: 'e.g. Watson, Linda Children’s Hospital of Philadelphia',
        selectPlaceholder: 'Select',
        role: 'Role',
        dataUse: 'Data use',
        researchDomain: 'Research Domain',
        clearFilters: 'Clear filters',
        barPlaceholder: 'Search by name or affiliation',
        noResult: 'No result',
        sorter: {
          newest: 'Newest first',
          oldest: 'Oldest first',
          lastnameAlpha: 'Alphabetical (last name)',
        },
      },
    },
    profileSettings: {
      title: 'Profile settings',
      viewProfile: 'View profile',
      cards: {
        deleteAccount: {
          title: 'Delete Account',
          button: 'Delete my account',
          notice:
            'You will no longer be able to sign into the CQDG data portal. All of your saved sets and queries will be lost. You can create a new account at any time.',
          confirm: {
            content: 'Are you sure you want to permanently delete this account?',
          },
        },
        identification: {
          title: 'Identification',
          alert:
            'You are authenticated with <strong>{provider}</strong> using <strong>{email}</strong>. This email is never shown to the public and cannot be changed.',
          firstName: 'First Name',
          yourFirstName: 'Your First Name',
          lastName: 'Last Name',
          yourLastName: 'Your Last Name',
          publicEmail: 'Public Email',
          publicEmailNotice:
            'This email will be displayed on your profile page and accessible to all logged-in users of the portal.',
          editPhotoModalTitle: 'Edit photo',
          uploadImageError: 'Unable to upload your image at the moment',
          removePhotoModalTitle: 'Remove profile photo?',
          removePhotoModalButton: 'Yes remove photo',
          removePhotoModalMessage:
            'Are you sure you want to remove your photo? We will replace it with a default avatar.',
          uploadPhotoButton: 'Upload photo',
          removePhotoButton: 'Remove photo',
        },
        roleAffiliation: {
          title: 'Role & Affiliation',
          iama: 'I am a',
          checkAllThatApply: 'Check all that apply',
          provideAffiliation: 'Provide institutional or organizational affiliation',
          affiliatedWith: 'I am affiliated with',
          dontHaveAffiliation: 'I do not have an institutional affiliation',
          describeResearchArea: 'My research area or area of interest may best be described as',
          provideABriefLink:
            'Provide a brief description and a link to your professional biography or organization website, if available',
        },
        researchDomain: {
          title: 'Research Domain',
          label: 'Research domains or domains of interest',
          checkAll: 'Check all that apply',
        },
        saveChanges: 'Save changes',
        discardChanges: 'Discard changes',
      },
      roleOptions: {
        researcher_in_academic_or_non_profit_institution:
          'Researcher in an academic or non-profit institution',
        representative_of_commercial_or_for_profit_company:
          'Representative of a commercial or for-profit company',
        bioinformatician_software_developer: 'Bioinformatician, software developer',
        clinician: 'Clinician',
        employee_in_governmental_agency: 'Employee in a governmental agency',
        other: 'Other',
      },
      researchDomainOptions: {
        aging: 'Aging',
        bioinformatics: 'Bioinformatics',
        birth_defects: 'Birth Defects',
        cancer: 'Cancer',
        circulatory_respiratory_health: 'Circulatory and Respiratory Health',
        general_health: 'General Health',
        infection_immunity: 'Infection and Immunity',
        musculoskeletal_health_arthritis: 'Musculoskeletal Health and Arthritis',
        neurodevelopmental_conditions: 'Neurodevelopmental Conditions',
        neurosciences_mental_health_addiction: 'Neurosciences, Mental Health and Addiction',
        nutrition_metabolism_diabetes: 'Nutrition, Metabolism and Diabetes',
        population_genomics: 'Population Genomics',
        rare_diseases: 'Rare Diseases',
        not_applicable: 'Not Applicable',
        other: 'Other',
      },
    },
    dashboard: {
      hello: 'Hello',
      cards: {
        error: {
          title: 'Connection error',
          subtitle:
            'We are currently unable to connect to this service. Please refresh the page and try again. If the problem persists, please',
          contactSupport: 'contact support',
          pleaseRefresh: 'Please refresh and try again or ',
        },
        savedFilters: {
          title: 'Saved Filters',
          popoverTitle: 'Managing Saved Filters',
          popoverContent:
            'A saved filter is a virtual query created by applying one or more filters to a search query. They can be saved and revisited for later use without having to manually reselect filters in the sidebar. You can create saved filters using the Query Management tool above the table of results in the ',
          popoverContentLink: 'Data Exploration page',
          noSaved: 'You have no saved filters',
          lastSaved: 'Last saved: {date} ago',
          dataExploration: 'Data Exploration',
          variants: 'Variants',
          failedFetch: 'Failed to fetch filters saved',
        },
        savedSets: {
          title: 'Saved Sets',
          popoverTitle: 'Managing Saved Sets',
          popoverContent:
            'A saved set is a set of one or more entity IDs that can be saved and revisited for later use without having to manually reselect entity IDs. You can create Participant, Biospecimen, and File saved sets at the top of the table of results in the ',
          popoverContentLink: 'Data Exploration page',
          noSaved: 'You have no saved sets',
          lastSaved: 'Last saved: {date} ago',
          files: 'Files',
          participants: 'Participants',
          biospecimens: 'Biospecimens',
          failedFetch: 'Failed to fetch sets saved',
        },
      },
    },
    variants: {
      title: 'Variants',
      noDataVariant: 'No data available for this variant',
      sidemenu: {
        participant: 'Participant',
        variant: 'Variant',
        gene: 'Gene',
        frequency: 'Frequency',
        pathogenicity: 'Pathogenicities',
      },
    },
    studies: {
      title: 'Studies',
      code: 'Code',
      name: 'Name',
      domain: 'Domain',
      population: 'Population',
      participants: 'Participants',
      families: 'Families',
      genomics: 'Genomics',
      transcriptomics: 'Transcriptomics',
      imaging: 'Imaging',
      files: 'Files',
      accessLimitation: 'Access Limitation',
      accessRequirement: 'Access Requirement',
      sampleAvailability: 'Sample Availability',
      description: 'Description',
    },
    dataExploration: {
      title: 'Data Exploration',
      sidemenu: {
        participant: 'Participant',
        biospecimen: 'Biospecimen',
        datafiles: 'Data File',
      },
      hpoTree: {
        modal: {
          title: 'Observed Phenotype (HPO) Browser',
          okText: 'Apply',
          cancelText: 'Cancel',
        },
        searchPlaceholder: 'Search for ontology term - min 3 characters',
        emptySelection: 'Select items from the left-hand pane in order to add to your query.',
        tags: {
          exact: 'Participants with this exact term',
          all: 'Participants including descendant terms',
        },
      },
      mondoTree: {
        modal: {
          title: 'Diagnosis (MONDO) Browser',
          okText: 'Apply',
          cancelText: 'Cancel',
        },
        searchPlaceholder: 'Search for ontology term - min 3 characters',
        emptySelection: 'Select items from the left-hand pane in order to add to your query.',
        tags: {
          exact: 'Participants with this exact term',
          all: 'Participants including descendant terms',
        },
      },
      icdTree: {
        modal: {
          title: 'Diagnosis (ICD-10) Browser',
          okText: 'Apply',
          cancelText: 'Cancel',
        },
        searchPlaceholder: 'Search for ontology term - min 3 characters',
        emptySelection: 'Select items from the left-hand pane in order to add to your query.',
        tags: {
          exact: 'Participants with this exact term',
          all: 'Participants including descendant terms',
        },
      },
      tabs: {
        summary: {
          title: 'Summary',
          global: {
            nbParticipant: '{count} participants (including descendant terms on this path)',
            addTermToQuery: 'Add term to active query',
            currentPath: 'Current Path',
            centerSubtitleFormatter: 'Participants with',
          },
          download: {
            fileNameTemplate: 'cqdg-%name-%type-%date%extension',
            fileNameDateFormat: 'yyyy-MM-dd',
            download: 'Download',
            preview: 'Download preview - ',
            data: 'Download data',
            svg: 'Download SVG',
            png: 'Download PNG',
            removeChart: 'Remove chart',
          },
          columnSelector: {
            reset: 'Reset',
            tooltip: 'Charts',
          },
          observed_phenotypes: {
            cardTitle: 'Observed Phenotypes (HPO)',
            phenotypeTree: {
              nbParticipant: '{count} participants (including descendant terms on this path)',
              addTermToQuery: 'Add term to active query',
              currentPath: 'Current Path',
            },
            empty: 'No observed phenotypes reported for these participants',
          },
          mondo: {
            cardTitle: 'Diagnosis (MONDO)',
            phenotypeTree: {
              nbParticipant: '{count} participants (including descendant terms on this path)',
              addTermToQuery: 'Add term to active query',
              currentPath: 'Current Path',
            },
            empty: 'No diagnoses reported for these participants',
          },
          demographic: {
            cardTitle: 'Demographics',
            genderTitle: 'Gender',
            familyComposition: 'Family Composition',
            ethnicityTitle: 'Ethnicity',
          },
          ageAtDiagnosis: {
            cardTitle: 'Age at Diagnosis',
            _0to1: 'Newborn',
            _1to5: '[1, 5]',
            _5to10: '[5, 10]',
            _10to15: '[10, 15]',
            _15to18: '[15, 18]',
            _18plus: 'Adult',
          },
          studies: {
            cardTitle: 'Studies',
          },
          availableData: {
            dataCategoryTitle: 'Participants by Data Category',
            dataTypeTitle: 'Participants by Data Type',
            studiesTitle: 'Participants by Study',
            axis: '# of participants',
            dataCategory: 'Data Category',
            dataType: 'Data Type',
          },
          studiespie: {
            cardTitle: 'Studies',
            domainTitle: 'Studies by Domain',
            popTitle: 'Studies by Population Type',
            partTitle: 'Participants by Study',
          },
        },
        participants: {
          title: 'Participants ({count})',
          participant: 'Participant',
          study_code: 'Study',
          proband: 'Proband',
          gender: 'Gender',
          familyHistory: 'Family History',
          ageAtRecruitment: 'Age',
          ageAtRecruitmentTooltip: 'Age at Recruitment (days)',
          ageAtDiagnosis: 'Age at Diagnosis',
          ageAtObservedPhenotype: 'Age at Observed Phenotype (days)',
          diagnosis: 'Diagnosis (MONDO)',
          phenotype: 'Phenotype (HPO)',
          files: 'Files',
          ethnicity: 'Ethnicity',
          biospecimen: 'Biospecimen',
          vitalStatus: 'Vital Status',
          submitterParticipantId: 'External Participant',
          ageAtDeath: 'Age at death',
          downloadClinicalData: 'Download clinical data',
          icdTagged: 'Diagnosis (ICD)',
          diagnosisSourceText: 'Diagnosis (Source Text)',
        },
        biospecimens: {
          title: 'Biospecimens ({count})',
          biospecimen_id: 'Biospecimen',
          sample_id: 'Sample',
          participant_id: 'Participant',
          study_code: 'Study',
          sample_type: 'Sample Type',
          biospecimen_tissue_source: 'Tissue',
          age_biospecimen_collection: 'Age',
          age_biospecimen_collectionTooltip: 'Age at Biospecimen Collection (days)',
          files: 'Files',
        },
        datafiles: {
          title: 'Data Files ({count})',
          fileAuthorization: 'File Authorization',
          dataAccess: 'Data Access',
          file: 'File',
          study_code: 'Study',
          dataCategory: 'Data Category',
          dataType: 'Data Type',
          experimentalStrategy: 'Experimental Strategy',
          accessUrl: 'Access Url',
          format: 'Format',
          size: 'Size',
          name: 'File Name',
          platform: 'Platform',
          participants: 'Participants',
          biospecimens: 'Biospecimens',
          controlled: 'Controlled',
          authorized: 'Authorized',
          registered: 'Registered',
          sample: 'Sample',
        },
      },
      participantsSelected: 'participants selected',
      participantSelected: 'participant selected',
      saveParticipantsSet: 'Save participant set',
      participantCount: 'items at a time. The first 10,000 will be processed.',
      filesSelected: 'files selected',
      fileSelected: 'file selected',
      saveFilesSet: 'Save file set',
      biospecimensSelected: 'biospecimens selected',
      biospecimenSelected: 'biospecimen selected',
      saveBiospecimensSet: 'Save biospecimen set',
      variantsSelected: 'variants selected',
      variantSelected: 'variant selected',
      saveVariantsSet: 'Save variant set',
      searchByBiospecimenId: 'Search by biospecimen ID',
      saveAsNewSet: 'Save as new set',
      addToExistingSet: 'Add to existing set',
      removeFromExistingSet: 'Remove from existing set',
      addToSet: 'Add to set',
      addTypeSet: 'Add to a {type} set',
      removeFromSet: 'Remove from set',
      removeTypeSet: 'Remove from a {type} set',
      set: 'Set',
      chooseSet: 'Choose a set',
    },
  },
};

export default en;
