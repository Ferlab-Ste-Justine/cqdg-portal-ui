import { gql } from '@apollo/client';

export const GET_FILES = gql`
  query getFiles($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort], $searchAfter: JSON) {
    File {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort, searchAfter: $searchAfter) {
        total
        edges {
          searchAfter
          node {
            id
            file_id
            file_format
            file_size
            file_name
            file_hash
            ferload_url
            user_authorized
            data_access
            participants {
              hits {
                total
                edges {
                  node {
                    participant_id
                    family_id
                  }
                }
              }
            }
            biospecimens {
              hits {
                total
                edges {
                  node {
                    biospecimen_tissue_source
                    sample_id
                    sample_type
                    biospecimen_id
                    participant {
                      participant_id
                      study_code
                    }
                  }
                }
              }
            }
            study_code
            study_id
            study {
              study_code
              name
            }
            data_category
            data_type
            dataset
            sequencing_experiment {
              experimental_strategy
              experimental_strategy_1 {
                code
                display
              }
              type_of_sequencing
              read_length
              platform
              capture_kit
              sequencer_id
              run_name
              labAliquotID
              bio_informatic_analysis
              workflow_name
              genome_build
              analysis_id
              source {
                code
                display
              }
              selection {
                code
                display
              }
              target_loci
              protocol
            }
          }
        }
      }
    }
  }
`;

export const MATCH_FILES = gql`
  query matchFiles($sqon: JSON, $first: Int, $offset: Int) {
    File {
      hits(filters: $sqon, first: $first, offset: $offset) {
        edges {
          node {
            file_id
            study_code
          }
        }
      }
    }
  }
`;

export const GET_FILE_BY_ID = gql`
  query getFileById($sqon: JSON) {
    File {
      hits(filters: $sqon) {
        edges {
          node {
            id
            file_id
          }
        }
      }
    }
  }
`;

export const GET_FILES_COUNT = gql`
  query getFileCount($sqon: JSON) {
    File {
      hits(filters: $sqon) {
        total
      }
    }
  }
`;

export const GET_FILES_CAVATICA = gql`
  query getFiles($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort], $searchAfter: JSON) {
    File {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort, searchAfter: $searchAfter) {
        total
        edges {
          node {
            file_id
            user_authorized
            study {
              study_code
              name
            }
          }
        }
      }
    }
  }
`;
