import { Booking } from 'src/domain/entities/Booking';

export class GetBookingsDto {
  private bookings: Booking[];
  constructor(bookings: Booking[]) {
    this.bookings = bookings;
  }
  getDto(): any[] {
    return this.bookings.map((booking: Booking) => ({
      id: booking.getID(),
      checkinDate: booking.getCheckinDate(),
      checkoutDate: booking.getCheckoutDate(),
      amount: booking.getAmount(),
      guest: booking.getGuest(),
    }));
  }
}
