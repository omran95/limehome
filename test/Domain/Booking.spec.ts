import {
  BOOKING_CHECKIN_DATE_CANNOT_BE_IN_THE_PAST,
  BOOKING_CHECKOUT_DATE_CANNOT_PERCEDE_CHECKIN_DATE,
} from '../../src/domain/entities/Booking';
import { BookingFactory } from './Factory/BookingFactory';

describe('Booking Domain Model', () => {
  describe('create new booking', () => {
    it('should create new booking with valid checkin & checkout dates', () => {
      const checkinDate = '2022-09-10';
      const checkoutDate = '2022-09-12';
      const booking = BookingFactory.build(checkinDate, checkoutDate);
      expect(booking.getCheckinDate()).toEqual(checkinDate);
      expect(booking.getCheckoutDate()).toEqual(checkoutDate);
    });
    it('should fail creating booking if checkin date is in the past', () => {
      const checkinDate = '2022-07-10';
      const checkoutDate = '2022-09-12';
      expect(() => {
        BookingFactory.build(checkinDate, checkoutDate);
      }).toThrowError(BOOKING_CHECKIN_DATE_CANNOT_BE_IN_THE_PAST);
    });
    it('should fail creating booking if checkin out is before checkin date', () => {
      const checkinDate = '2022-09-10';
      const checkoutDate = '2022-09-08';
      expect(() => {
        BookingFactory.build(checkinDate, checkoutDate);
      }).toThrowError(BOOKING_CHECKOUT_DATE_CANNOT_PERCEDE_CHECKIN_DATE);
    });
  });
});
