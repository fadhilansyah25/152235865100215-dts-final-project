import { gql } from "@apollo/client";

export const GET_WATCHLIST = gql`
  subscription watchlist_coin_byId($firebaseuid: bpchar!) {
    coinflip_coin_watchlist(
      where: { firebaseuid: { _eq: $firebaseuid } }
      order_by: { created_at: asc }
    ) {
      id
      firebaseuid
      coinId
      iconUrl
      name
      symbol
      created_at
      updated_at
    }
  }
`;

export const INSERT_WATCHLIST = gql`
  mutation insert_watchlist(
    $firebaseuid: bpchar!
    $iconUrl: bpchar!
    $name: bpchar!
    $symbol: bpchar!
    $coinId: bpchar!
  ) {
    insert_coinflip_coin_watchlist(
      objects: {
        firebaseuid: $firebaseuid
        iconUrl: $iconUrl
        name: $name
        symbol: $symbol
        coinId: $coinId
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_WATCHLIST = gql`
  mutation delete_watchlist($id: uuid!) {
    delete_coinflip_coin_watchlist_by_pk(id: $id) {
      id
    }
  }
`;
