import { gql } from "@urql/core";

export const getAvailableRoomsQuery = gql`
  query getAvailableRooms(
    $partner: String!
    $externalIds: [String!]!
    $startDate: String!
    $endDate: String!
    $adults: Int!
    $children: [Int!]!
  ) {
    properties(
      query: {
        partnerExternalRefs: { partner: $partner, externalIds: $externalIds }
      }
    ) {
      edges {
        node {
          id
          name
          country
          url
          photos
          partnerReferences {
            partner
            externalId
          }
          rooms(
            startDate: $startDate
            endDate: $endDate
            adults: $adults
            children: $children
          ) {
            edges {
              node {
                id
                name
                description
                photos {
                  url
                  caption
                }
                price {
                  currency
                  amount
                  decimalPlaces
                }
                remaining
              }
            }
          }
        }
      }
    }
  }
`;

export const addReservationQuery = gql`
  mutation addReservation(
    $hotelId: String!
    $roomId: String!
    $checkIn: String!
    $checkOut: String!
    $adults: Int!
    $children: [Int!]!
    $currency: Currency!
    $amount: Int!
    $decimalPlaces: Int!
    $firstName: String!
    $lastName: String!
  ) {
    createReservation(
      payload: {
        hotelId: $hotelId
        roomId: $roomId
        checkIn: $checkIn
        checkOut: $checkOut
        adults: $adults
        childrenAges: $children
        price: {
          currency: $currency
          amount: $amount
          decimalPlaces: $decimalPlaces
        }
        contactPerson: { firstName: $firstName, lastName: $lastName }
      }
    ) {
      id
      checkIn
      checkOut
      property {
        id
        name
        country
        url
        photos
      }
      contactPerson {
        firstName
        lastName
      }
    }
  }
`;
