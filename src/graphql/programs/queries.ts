import { gql } from '@apollo/client';

export const GET_PROGRAMS = gql`
  query getPrograms($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    Program {
      hits(offset: $offset, sort: $sort, first: $first, filters: $sqon) {
        total
        edges {
          node {
            program_id
            program_name_en
            program_name_fr
            description_en
            description_fr
            contact_email
            study_codes
            participants_count
          }
        }
      }
    }
  }
`;
