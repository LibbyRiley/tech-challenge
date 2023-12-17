import { gql } from "@apollo/client";

export const GET_INFO = gql`
  query {
    episodesByIds(ids: [1, 2, 3, 4, 5, 6]) {
      id
      name
      air_date
      episode
      created
    }
  }
`;
