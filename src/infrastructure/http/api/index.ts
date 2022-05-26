import { OperationResult } from "@urql/core";
import { client } from "./client";
import { PARTNERS } from "src/infrastructure/http/utils/partnerNames";
import {
  addReservationQuery,
  getAvailableRoomsQuery,
} from "src/infrastructure/http/utils/queries";
import {
  AvailabilitiesQueryParams,
  ReservationBodyParams,
} from "src/infrastructure/http/utils/types";
import {
  getDecimalPlaces,
  getMultiplier,
} from "src/infrastructure/http/utils/num";

export default {
  getAvailableRooms({
    hotel_id,
    check_in,
    check_out,
    adults,
    children,
  }: AvailabilitiesQueryParams) {
    return client
      .query(getAvailableRoomsQuery, {
        partner: PARTNERS.GMAH,
        externalIds: (hotel_id as string).split(","),
        startDate: check_in,
        endDate: check_out,
        adults: parseInt(adults),
        children: (children as string).split(",").map((val) => parseInt(val)),
      })
      .toPromise()
      .then((res: OperationResult) => res.data);
  },

  addReservation({
    hotel_partner_ref,
    room_type_partner_ref,
    primary_contact,
    check_in,
    check_out,
    adults,
    children,
    price,
  }: ReservationBodyParams) {
    return client
      .mutation(addReservationQuery, {
        hotelId: hotel_partner_ref,
        roomId: room_type_partner_ref,
        checkIn: check_in,
        checkOut: check_out,
        adults,
        children,
        currency: price.currency,
        amount: price.amount * getMultiplier(getDecimalPlaces(price.amount)),
        decimalPlaces: getDecimalPlaces(price.amount),
        firstName: primary_contact.first_name,
        lastName: primary_contact.last_name,
      })
      .toPromise()
      .then((res: OperationResult) => res.data);
  },
};
