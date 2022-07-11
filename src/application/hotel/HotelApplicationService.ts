import { Injectable, Inject } from '@nestjs/common';
import { IMaps } from 'src/domain/IMaps';
import { Location } from 'src/domain/valueObjects/Location';
import { HotelsResponseDto } from './HotelsResponseDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from 'src/domain/Hotel';
import { CreateBookingDto } from './CreateBookingDto';
import { Booking } from 'src/domain/entities/Booking';
import { Guest } from 'src/domain/valueObjects/Guest';
import { GetBookingsDto } from './GetBookingsDto';

@Injectable()
export class HotelApplicationService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepo: Repository<Hotel>,
    @Inject('IMaps') private readonly mapsAPI: IMaps,
  ) {}
  async getHotelsByLatLng(
    lat: string,
    lng: string,
  ): Promise<HotelsResponseDto> {
    const location: Location = new Location(lat, lng);
    const hotelsNearLocation = await this.mapsAPI.getHotelsNearLocation(
      location,
    );
    return new HotelsResponseDto(hotelsNearLocation);
  }
  async createHotelsByLatLng(
    lat: string,
    lng: string,
  ): Promise<HotelsResponseDto> {
    const location: Location = new Location(lat, lng);
    const hotelsNearLocation = await this.mapsAPI.getHotelsNearLocation(
      location,
    );
    await this.hotelRepo.save(hotelsNearLocation);
    return new HotelsResponseDto(hotelsNearLocation);
  }
  async createBooking(hotelID: string, createBookingDto: CreateBookingDto) {
    const {
      checkinDate,
      checkoutDate,
      amount,
      guestName,
      guestEmail,
      guestPhoneNumber,
    } = createBookingDto;
    const hotel = await this.hotelRepo.findOneBy({ id: hotelID });
    if (!hotel) {
      throw new Error("Hotel doesn't exist");
    }
    const bookingGuest = new Guest(guestName, guestEmail, guestPhoneNumber);
    const booking = new Booking(
      checkinDate,
      checkoutDate,
      bookingGuest,
      amount,
    );
    hotel.addBoking(booking);
    await this.hotelRepo.save(hotel);
  }
  async getBookings(hotelID: string): Promise<GetBookingsDto> {
    const hotel = await this.hotelRepo.findOneBy({ id: hotelID });
    if (!hotel) {
      throw new Error("Hotel doesn't exist");
    }
    return new GetBookingsDto(hotel.getBookings());
  }
}
