import { DateInterval } from '../valueObjects/DateInterval';
import { Guest } from '../valueObjects/Guest';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Hotel } from '../Hotel';
import { Invariant } from '../Invariant';

export const BOOKING_CHECKIN_DATE_CANNOT_BE_IN_THE_PAST =
  'Booking checkin date can not be in the past';

export const BOOKING_CHECKOUT_DATE_CANNOT_PERCEDE_CHECKIN_DATE =
  'Booking checkout date can not precede checkin date';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  // date format is YYYY-MM-DD which is international standard date format
  @Column()
  private checkinDate: string;

  @Column()
  private checkoutDate: string;

  private dateInterval: DateInterval;

  @Column(() => Guest)
  private guest: Guest;

  @Column()
  private amount: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.bookings, {
    onDelete: 'CASCADE',
  })
  hotel: Hotel;

  constructor(
    checkinDate: string,
    checkoutDate: string,
    guest: Guest,
    amount: number,
  ) {
    this.setBookingDates(checkinDate, checkoutDate);
    this.guest = guest;
    this.amount = amount;
    this.setDateInterval();
  }

  private setBookingDates(checkinDate: string, checkoutDate: string) {
    const checkinDateFormatted = new Date(checkinDate);
    const checkoutDateFormatted = new Date(checkoutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (checkinDateFormatted < today) {
      new Invariant(BOOKING_CHECKIN_DATE_CANNOT_BE_IN_THE_PAST).throw();
    }
    if (checkoutDateFormatted < checkinDateFormatted) {
      new Invariant(BOOKING_CHECKOUT_DATE_CANNOT_PERCEDE_CHECKIN_DATE).throw();
    }
    this.checkinDate = checkinDate;
    this.checkoutDate = checkoutDate;
  }

  public getCheckinDate(): string {
    return this.checkinDate;
  }

  public getCheckoutDate(): string {
    return this.checkoutDate;
  }

  public getGuest(): Guest {
    return this.guest;
  }

  public getAmount(): number {
    return this.amount;
  }

  private setDateInterval() {
    this.dateInterval = new DateInterval(this.checkinDate, this.checkoutDate);
  }

  public getAllIncludedDates(): string[] {
    return this.dateInterval.getAllIncludedDates();
  }

  public hasDate(date: string): boolean {
    const currentBookingCheckinDate = Date.parse(this.checkinDate);
    const currentBookingCheckoutDate = Date.parse(this.checkoutDate);

    const dateFormatted = Date.parse(date);

    if (
      dateFormatted >= currentBookingCheckinDate &&
      dateFormatted <= currentBookingCheckoutDate
    ) {
      return true;
    }
    return false;
  }
}
