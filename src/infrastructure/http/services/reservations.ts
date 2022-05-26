import api from "src/infrastructure/http/api";
import { sanitizeGQLReservationResponse } from "src/infrastructure/http/utils/mappers";
import { ReservationBodyParams } from "src/infrastructure/http/utils/types";

export default async function addReservation(params: ReservationBodyParams) {
  const reservationGQLResponse = await api.addReservation(params);

  return sanitizeGQLReservationResponse(reservationGQLResponse);
}
