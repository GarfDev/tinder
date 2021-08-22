import { nanoid } from "nanoid";
import faker from "faker";
import { IPersonDetail } from "~models/user/types";

/**
 * Utils
 */

const generateGender = () => (Math.random() >= 0.5 ? "male" : "female");

/**
 * Main
 */

const generateUser = (preDetail: Partial<IPersonDetail>): IPersonDetail => {
  const user: IPersonDetail = {
    uuid: nanoid(),
    title: faker.lorem.words(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    gender: generateGender(),
    email: faker.internet.email(),
    dateOfBirth: faker.date.past(10),
    phone: faker.phone.phoneNumber(),
    location: {
      street: faker.address.streetName(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
      timezone: faker.lorem.word(),
    },
    registerDate: faker.date.past(),
    updatedDate: faker.date.past(),
  };

  /**
   * Apply Preset Details
   */
  Object.keys(preDetail).forEach((key) => {
    /* To resolve type-error while checking */
    if (!(preDetail as any)[key]) return;
    (user as any)[key] = (preDetail as any)[key];
  });

  return user;
};

export default generateUser;
