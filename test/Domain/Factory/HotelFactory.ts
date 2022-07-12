import { Hotel } from '../../../src/domain/Hotel';
import { Address } from '../../../src/domain/valueObjects/Address';
import { Location } from '../../../src/domain/valueObjects/Location';

export class HotelFactory {
  static build(): Hotel {
    return new Hotel(
      'dummy',
      new Location('42.36309', '71.05495'),
      [],
      new Address('dummy', 'dummy street', 'dummyPostal', 'dummyHouseNumber'),
    );
  }
}
