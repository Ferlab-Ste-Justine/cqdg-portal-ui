/* eslint-disable max-len */
import translations from './en.json';

const en = {
  ...translations,
  entities: {
    biospecimen: {
      sample_id: 'Sample',
    },
    file: {
      file_id: 'ID',
      file_name: 'Name',
      file_format: 'Format',
      file_size: 'Size',
      ferload_url: 'URL',
      file_hash: 'Hash',
      summary: 'Summary',
      study: 'Study',
      participants: 'Participants',
      samples: 'Samples',
      analysis: 'Analysis',
      dataType: 'Data Type',
      data_type: 'Type',
      data_category: 'Category',
      participantsSamples: 'Biospecimens / Samples',
      experimentalProcedure: 'Experimental Procedure',
      analysisProperties: 'Analysis Properties',
      sequencing_experiment: {
        experimental_strategy: 'Experimental Strategy',
        type_of_sequencing: 'Sequencing Type',
        read_length: 'Read Length',
        platform: 'Platform',
        capture_kit: 'Capture Kit',
        sequencer_id: 'Sequencer',
        run_date: 'Date',
        run_name: 'Run',
        labAliquotID: 'Aliquot',
        bio_informatic_analysis: 'ID',
        workflow_name: 'Pipeline',
        workflow_version: 'Version',
        genome_build: 'Genome Build',
      },
      analysisFiles: 'Files Generated by the Analysis',
    },
  },
  global: {
    yes: 'Yes',
    no: 'No',
    search: {
      genes: {
        emptyText: 'No gene found',
        placeholder: 'e.g. BRAF, ENSG00000157764',
        title: 'Search by gene',
        tooltip: 'Enter a Gene Symbol, Gene Alias ​​or Ensemble ID',
      },
      variants: {
        emptyText: 'No variant found',
        placeholder: 'e.g. 10-100063679-T-C, rs341',
        title: 'Search by variant',
        tooltip:
          'Enter Variant Locus, Gene Symbol, Gene Alias, Gene AA Change, dbSNP ID, Clinvar ID, Ensembl ID, refseq ID',
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
      },
      operators: {
        between: 'Between',
        lessthan: 'Less than',
        lessthanorequal: 'Less than or equal',
        greaterthan: 'Greater than',
        greaterthanorequal: 'Greater than or equal',
      },
      range: {
        is: 'Is',
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
      noResults: 'No Results',
      of: 'of',
      selected: 'item selected',
      selectedPlural: 'items selected',
      selectAllResults: 'Select all results',
      clear: 'Clear',
      tableExport: 'Export as TSV',
      reset: 'Reset',
      columns: 'Columns',
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
      },
      inProgress: {
        title: 'Processing',
        fetchReport: 'Fetching Report, please wait',
      },
      onSuccess: {
        title: 'Success',
        fetchReport: 'Report downloaded successfully',
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
      filePlaceholder: 'e.g. FI001CSF26',
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
    table: {
      itemCount: {
        singlePage: '{count, plural, =0 {No result} other {<strong>#</strong> results}}',
        multiplePages:
          'Results <strong>{from}</strong> - <strong>{to}</strong> of <strong>{total}</strong>',
      },
    },
    suggester: {
      error: {
        title: 'Error',
        description: 'An error occurred while fetching suggestions',
      },
      noResultsFound: 'No results found',
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
      studies: 'Studies',
      participants: 'Participants',
      biospecimens: 'Biospecimens',
      datafiles: 'Data Files',
    },
  },
  layout: {
    main: {
      menu: {
        dashboard: 'Dashboard',
        studies: 'Studies',
        explore: 'Data Exploration',
        variants: 'Variants',
        participants: 'Participants',
        biospecimen: 'Biospecimen',
        datafiles: 'Data Files',
        website: 'Website',
        documentation: 'Documentation',
        community: 'Community',
      },
    },
    user: {
      menu: {
        myprofile: 'My Profile',
        settings: 'Settings',
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
      table: {
        consequences: 'Consequences',
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
        summary: 'Summary',
        type: 'Type',
        chromosome: 'Chromosome',
        position: 'Position',
        cytobande: 'Cytobande',
        altAllele: 'ALT Allele',
        refAllele: 'REF Allele',
        alternativeAllele: 'Alternative allele',
        referenceAllele: 'Reference allele',
        referenceGenome: 'Reference Genome',
        studies: 'Studies',
        participants: 'Participants',
        genes: 'Genes',
        omim: 'OMIM',
        clinVar: 'ClinVar',
        gnomadGenome311: 'gnomAD Genome (v3.1.1)',
        dbSNP: 'dbSNP',
        gnomAD: 'gnomAD',
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
        AAColumn: 'AA',
        AAColumnTooltip: 'Amino acid substitution',
        CDNAChangeColumn: 'Coding DNA',
        conservationColumn: 'Conservation',
        strand: 'Strand',
        vep: 'VEP',
        prediction: 'Prediction',
        transcript: 'Transcript',
        refSeq: 'RefSeq',
        gene: 'Gene',
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
        genePhenotype: 'Gene - Phenotype',
        condition: 'Condition',
        gene: 'Gene',
        inheritance: 'Inheritance',
        source: 'Source',
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
          sociodemographics: {
            cardTitle: 'Sociodemographics',
            genderTitle: 'Gender',
            ethnicityTitle: 'Ethnicity',
            compositionFamilyTitle: 'Family Composition',
          },
          availableData: {
            dataCategoryTitle: 'Participants by Data Category',
            dataTypeTitle: 'Participants by Data Type',
            studiesTitle: 'Participants by Study',
            axis: '# of participants',
            dataCategory: 'Data Category',
            dataType: 'Data Type',
          },
          observed_phenotype_tagged: {
            cardTitle: 'Observed Phenotypes (HPO)',
            phenotypeTree: {
              nbParticipant: '{count} participants (including descendant terms on this path)',
              addTermToQuery: 'Add term to active query',
              currentPath: 'Current Path',
            },
            empty: 'No observed phenotypes reported for these participants',
          },
          mondo: {
            cardTitle: ' Diagnosis (MONDO)',
            phenotypeTree: {
              nbParticipant: '{count} participants (including descendant terms on this path)',
              addTermToQuery: 'Add term to active query',
              currentPath: 'Current Path',
            },
            empty: 'No diagnoses reported for these participants',
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
          diagnosis: 'Diagnosis (MONDO)',
          phenotype: 'Phenotype (HPO)',
          files: 'Files',
          ethnicity: 'Ethnicity',
          biospecimen: 'Biospecimen',
          vitalStatus: 'Vital Status',
          submitterParticipantId: 'External Participant',
          ageAtDeath: 'Age at death',
          selectedParticipants: 'Selected participants',
          selectedParticipantsFamilies: 'Selected participants & families',
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
          age_biospecimen_collectionTooltip: 'Age at Biospecimen Collection',
          files: 'Files',
          downloadSampleData: 'Download sample data',
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
          sample: 'Sample',
        },
      },
      participantsSelected: 'participants selected',
      participantSelected: 'participant selected',
      saveParticipantsSet: 'Save participants set',
      participantCount: 'items at a time. The first 10,000 will be processed.',
      filesSelected: 'files selected',
      fileSelected: 'file selected',
      saveFilesSet: 'Save files set',
      biospecimensSelected: 'Biospecimens selected',
      biospecimenSelected: 'Biospecimen selected',
      saveBiospecimensSet: 'Save biospecimens set',
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
    join: {
      cancel: 'Cancel',
      next: 'Next',
      back: 'Back',
      submit: 'Submit',
      disclaimers: {
        title: 'INCLUDE Portal Registration Process',
        description:
          'The INCLUDE Portal is the primary entry point to the INCLUDE Data Hub. The INCLUDE Portal enables searching, visualizing, and accessing INCLUDE-relevant data. Some datasets may require additional approvals (e.g., dbGaP) and terms and conditions of access and use.',
        terms: {
          title: 'INCLUDE Portal Terms & Conditions',
          lastUpdate: 'Last Update: {date}',
          bullets: {
            1: 'My purpose for the use of INCLUDE Portal data is free from discrimination on the grounds of race, ethnicity, nationality, gender, age, physical and/or mental ability, sexual orientation, gender identity or expression, religion, or any other grounds that would impinge on an individual’s rights.',
            2: 'I will acknowledge specific dataset(s) and/or applicable accession number(s) as well as the INCLUDE Data Hub in my dissemination of research findings, as applicable to the medium or type of dissemination.',
            3: 'I will only share or distribute INCLUDE Portal data under terms consistent with this agreement, and the data or derivatives of the data may not be sold, in whole or in part, to any individual at any point in time for any purpose.',
            4: 'I will respect the privacy of research participants, and I will make no attempt to identify or contact individual participants or groups from whom data were collected or to generate information that could allow participants’ identities to be readily ascertained.',
            5: 'I agree to provide a brief statement regarding my intended use of the data on the INCLUDE Portal with my name and affiliation which will be publicly displayed for the purpose of transparency and collaboration.',
            6: 'I understand that participation in the INCLUDE community is voluntary and may be terminated by the INCLUDE Portal Administrator. I will report any actual or suspected violation of this agreement, even if unintentional, to the INCLUDE Portal Administrator. I understand that the INCLUDE Portal Administrator may take action to remedy any actual or suspected violation and/or report such behavior to the appropriate authorities.  I also understand that the INCLUDE Portal Administrator may immediately suspend or terminate my access to the INCLUDE Portal if there is an actual or suspected violation of this agreement.',
          },
          checkbox: 'I have read and agree to the INCLUDE Portal Terms and Conditions',
        },
        disclaimer: {
          title: 'INCLUDE Portal Disclaimers',
          bullets: {
            1: 'Data available in the INCLUDE Portal is provided on an AS-IS basis and may change over time.',
            2: 'The INCLUDE DCC does not warrant or assume any legal liability or responsibility for information, apparatus, product, or process contained in the INCLUDE Portal.',
            3: 'Content provided on the INCLUDE Portal is for informational purposes only and is not intended to be a substitute for independent professional medical judgment, advice, diagnosis, or treatment.',
          },
          checkbox: 'I have read and understand the INCLUDE Portal Disclaimers',
        },
        errors: 'Please accept the terms & conditions and portal disclaimers.',
      },
      registration: {
        notice:
          'Information provided here will be shared with the INCLUDE community on the INCLUDE Portal. All fields are required unless specified as optional.',
        sections: {
          identification: 'Identification',
          roleAndAffiliation: 'Role & Affiliation',
          researchAndDataUse: 'Research & Data Use',
        },
        labels: {
          firstName: 'First Name',
          lastName: 'Last Name',
          haveAUserID: 'I have an eRA Commons ID:',
          enterUserId: 'Please enter your eRA Commons ID',
          commercialUseReason:
            'Please provide a minimum of 1-2 sentences to describe your commercial use:',
          fullName: 'Full name',
          email: 'Email',
          iAmA: 'I am a:',
          pleaseDescribe: 'Please describe',
          iAmAffiliatedWith: 'I am affiliated with:',
          intendToUser: 'I intend to use the INCLUDE Portal data for:',
          dataUseStatement: 'Data use statement',
          researchAreaDescribe: 'My research area or area of interest may best be described as:',
        },
        placeHolders: {
          firstLast: 'First Last',
        },
        helps: {
          checkAllThatApply: 'Check all that apply',
          describeUseBelow: 'For other purpose, you must describe your use below',
          provideBriefDescription:
            'Provide a brief description and a link to your professional biography or organization website, if available',
          provideOrgAffiliation: 'Provide institutional or organizational affiliation',
        },
        noticeNotPublicInfo: 'This information will not be made public.',
        nameAndEmailOfIndividual:
          'Please provide the name and email address of an individual at your institution, organization, or similar who is aware of your intended use of the data (We do not expect to contact this individual except in cases where we need to verify your identity).',
        roleOptions: {
          1: 'Researcher at an academic or not-for-profit institution',
          2: 'Representative from a For-Profit or Commercial Entity',
          3: 'Tool or Algorithm Developer',
          4: 'Clinician',
          5: 'Community member',
          6: 'Federal Employee',
        },
        usageOptions: {
          1: 'Learning more about Down syndrome and its health outcomes, management, and/or treatment',
          2: 'Helping me design a new research study',
          3: 'Identifying datasets that I want to analyze',
          4: 'Commercial purposes',
        },
        userIdOptions: {
          1: 'Yes',
          2: 'No',
        },
        optionsOther: 'Other',
        noAffiliationOption: 'I do not have an institutional affiliation.',
      },
    },
  },
  facets: {
    // Participant
    participant_id: 'Participant ID',
    study: {
      study_code: 'Study Code',
    },
    mondo: {
      name: 'Diagnosis (MONDO)',
    },
    mondo_tagged: {
      name: 'Diagnosis (MONDO)',
      source_text: 'Diagnosis (Source Text)',
      age_at_event: 'Age at Diagnosis',
    },
    observed_phenotypes: {
      name: 'Phenotype (HPO)',
    },
    observed_phenotype_tagged: {
      name: 'Phenotype (HPO)',
      source_text: 'Phenotype (Source Text)',
    },
    icd_tagged: {
      name: 'Diagnosis (ICD-10)',
    },
    age_at_recruitment: 'Age at Recruitment',
    gender: 'Gender',
    ethnicity: 'Ethnicity',

    // Biospecimen
    biospecimen_tissue_source: 'Tissue',
    age_biospecimen_collection: 'Age at Biospecimen Collection (days)',
    sample_type: 'Sample Type',
    sample_id: 'Sample ID',

    // File
    data_category: 'Data Category',
    data_type: 'Data Type',
    file_format: 'Format',
    file_id: 'File ID',
    sequencing_experiment: {
      experimental_strategy: 'Experimental Strategy',
    },

    //Variants
    variant_class: 'Variant class',

    variant_external_reference: 'External reference',
    chromosome: 'Chromosome',
    zygosity: 'Zygosity',
    transmissions: 'Transmissions',
    consequences: {
      consequences: 'Consequences',
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
    study_code: 'Search by study',
    domain: 'Domain',
    population: 'Population',
    data_access_codes: {
      access_limitations: 'Access Limitation',
      access_requirements: 'Access Requirement',
    },
  },
};

export default en;
