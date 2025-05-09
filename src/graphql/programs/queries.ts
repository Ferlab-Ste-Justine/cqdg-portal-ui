import { gql } from '@apollo/client';

export const GET_PROGRAMS = gql`
  query getPrograms($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    Program {
      hits(offset: $offset, sort: $sort, first: $first, filters: $sqon) {
        total
        edges {
          node {
            program_id
            name_en
            name_fr
            description_en
            description_fr
            website
            citation_statement
            logo_url
            contacts {
              name
              email
              institution
            }
            managers {
              name
              picture_url
              role_fr
              role_en
              institution
            }
            partners {
              name
              logo_url
              rank
            }
            study_codes
            studies {
              study_code
              name
              description
              participant_count
            }
          }
        }
      }
    }
  }
`;
