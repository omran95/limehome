import { Booking } from './entities/Booking';
import { Address } from './valueObjects/Address';
import { Location } from './valueObjects/Location';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  AfterInsert,
  AfterLoad,
  AfterUpdate,
} from 'typeorm';
import { Invariant } from './Invariant';

export const MAX_BOOKINGS_PER_NIGHT = 10;
export const ONE_NIGHT_CANNOT_HAVE_MORE_THAN_TEN_BOOKINGS =
  "Hotel can't have more than 10 bookings per night";

@Entity()
export class Hotel {
  constructor(
    name: string,
    location: Location,
    bookings: Booking[],
    address: Address,
  ) {
    this.name = name;
    this.location = location;
    this.bookings = bookings;
    this.address = address;
  }

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  private name: string;

  @Column(() => Location)
  private location: Location;

  @OneToMany(() => Booking, (booking) => booking.hotel, {
    cascade: true,
    eager: true,
  })
  bookings: Booking[];

  @Column(() => Address)
  private address: Address;

  getID(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getAddress(): Address {
    return this.address;
  }

  getLocation(): Location {
    return this.location;
  }

  getBookings(): Booking[] {
    return this.bookings;
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  async nullChecks() {
    if (!this.bookings) {
      this.bookings = [];
    }
  }

  private getAllBookingsAtDate(date: string): Booking[] {
    return this.bookings.filter((booking: Booking) => booking.hasDate(date));
  }

  private isValidBooking(booking: Booking): boolean {
    const allIncludedDates = booking.getAllIncludedDates();
    for (
      let i = 0, currentDate = allIncludedDates[i];
      i < allIncludedDates.length;
      i++
    ) {
      const allCurrentBookingsAtCurrentDay =
        this.getAllBookingsAtDate(currentDate);
      if (allCurrentBookingsAtCurrentDay.length > MAX_BOOKINGS_PER_NIGHT - 1) {
        return false;
      }
    }
    return true;
  }

  addBooking(booking: Booking) {
    if (!this.isValidBooking(booking)) {
      new Invariant(ONE_NIGHT_CANNOT_HAVE_MORE_THAN_TEN_BOOKINGS).throw();
    }
    this.bookings.push(booking);
  }
}
