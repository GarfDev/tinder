export interface PeopleFetchProperities {
  limit: number;
  page: number;
}

export interface Person {
  uuid: string;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface PersonLocation {
  street: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
}

export interface PersonDetail extends Person {
  gender: string;
  email: string;
  phone: string;
  location: PersonLocation;
  registerDate: string;
  updatedDate: string;
}

export * from "./constants";
