import { ONE_NIGHT_CANNOT_HAVE_MORE_THAN_TEN_BOOKINGS } from '../../src/domain/Hotel';
import { BookingFactory } from './Factory/BookingFactory';
import { HotelFactory } from './Factory/HotelFactory';

describe('Hotel Domain Model', () => {
  describe('addBooking', () => {
    it('should successfully add booking', () => {
      const hotel = HotelFactory.build();
      const booking = BookingFactory.build('2022-08-10', '2022-08-12');
      hotel.addBooking(booking);
      expect(hotel.getBookings()).toHaveLength(1);
    });
    it('should fail to add booking with a date that has 10 bookings', () => {
      const hotel = HotelFactory.build();
      for (let i = 0; i < 10; i++) {
        const booking = BookingFactory.build('2022-08-10', '2022-08-12');
        hotel.addBooking(booking);
      }
      const booking = BookingFactory.build('2022-08-12', '2022-08-13');
      expect(() => {
        hotel.addBooking(booking);
      }).toThrowError(ONE_NIGHT_CANNOT_HAVE_MORE_THAN_TEN_BOOKINGS);
    });
  });
});
