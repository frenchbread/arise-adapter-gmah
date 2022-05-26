export type AvailabilitiesQueryParams = {
  hotel_id: string;
  check_in: string;
  check_out: string;
  children: string;
  adults: string;
};

export type PrimaryContact = {
  first_name: string;
  last_name: string;
  address_lines: string[];
};

export type RoomPrice = {
  currency: string;
  amount: number;
  decimalPlaces: number;
};

export type ReservationBodyParams = {
  hotel_partner_ref: string;
  room_type_partner_ref: string;
  primary_contact: PrimaryContact;
  check_in: string;
  check_out: string;
  adults: number;
  children: number[];
  price: RoomPrice;
};

export type PartnerReference = {
  partner: string;
  externalId: string;
};

export type Room = {
  id: string;
  name: string;
  description: string;
  photos: {
    url: string;
    caption: string;
  }[];
  price: RoomPrice;
  remaining: number;
};

export type HotelData = {
  id: string;
  name: string;
  country: string;
  url: string;
  photos: string[];
  partnerReferences: PartnerReference[];
  rooms: GQLRoom;
};

export type GQLRoom = {
  edges: {
    node: Room;
  }[];
};

export type GQLHotelResponseData = {
  properties: {
    edges: {
      node: HotelData;
    }[];
  };
};

export type Property = {
  id: string;
  name: string;
  country: string;
  url: string;
  photos: string[];
};

export type ContactPerson = {
  firstName: string;
  lastName: string;
};

export type GQLReservationResponse = {
  createReservation: {
    id: string;
    checkIn: string;
    checkOut: string;
    property: Property;
    contactPerson: ContactPerson;
  };
};
