import api from "src/infrastructure/http/api";
import { sanitizeGQLRoomsResponseData } from "src/infrastructure/http/utils/mappers";
import { AvailabilitiesQueryParams } from "src/infrastructure/http/utils/types";

export default async function getAvailabilities(
  params: AvailabilitiesQueryParams
) {
  const roomsGQL = await api.getAvailableRooms(params);

  return sanitizeGQLRoomsResponseData(roomsGQL);
}
