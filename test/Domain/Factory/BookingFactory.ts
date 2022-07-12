import { Booking } from '../../../src/domain/entities/Booking';
import { Guest } from '../../../src/domain/valueObjects/Guest';

export class BookingFactory {
  static build(checkinDate: string, checkoutDate: string): Booking {
    return new Booking(
      checkinDate,
      checkoutDate,
      new Guest('guest', 'email', 'phone'),
      10,
    );
  }
}
