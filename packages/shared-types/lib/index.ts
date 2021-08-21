export interface PeopleFetchProperities {
  limit: number;
  page: number;
}

export interface Person {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
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
