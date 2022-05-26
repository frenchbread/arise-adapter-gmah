import {
  GQLHotelResponseData,
  GQLReservationResponse,
} from "src/infrastructure/http/utils/types";
import { getMultiplier } from "src/infrastructure/http/utils/num";

export const sanitizeGQLRoomsResponseData = (data: GQLHotelResponseData) => {
  return data.properties.edges.map((edge) => {
    const { id, name, url, country, photos, rooms } = edge.node;

    return {
      id,
      partner_ref: id,
      name,
      url,
      country,
      photos,
      rooms: rooms.edges.map(({ node }) => {
        const { id, name, description, photos, price, remaining } = node;
        return {
          partner_ref: id,
          name,
          description,
          photos: photos?.map(({ url }) => url),
          price: {
            currency: price.currency,
            amount: price.amount / getMultiplier(price.decimalPlaces),
          },
          remaining,
        };
      }),
    };
  });
};

export const sanitizeGQLReservationResponse = async (
  data: GQLReservationResponse
) => {
  const { id, checkIn, checkOut, property, contactPerson } =
    data.createReservation;

  return {
    partner_ref: id,
    hotel: {
      id: property.id,
      partner_ref: property.id,
      name: property.name,
      country: property.country,
      url: property.url,
      photos: property.photos,
    },
    start_date: checkIn,
    end_date: checkOut,
    traveler: {
      first_name: contactPerson.firstName,
      last_name: contactPerson.lastName,
    },
  };
};
