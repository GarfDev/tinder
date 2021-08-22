export interface PeopleFetchProperities {
  limit: number;
  page: number;
}

export interface Person {
  uuid: string;
  title: string;
  firstName: string;
  lastName: string;
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
  dateOfBirth: string;
  phone: string;
  location: PersonLocation;
  registerDate: string;
  updatedDate: string;
}

export * from "./constants";
