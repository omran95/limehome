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
import { DiscoverDto } from './DiscoverDto';
import { AddHotelsDto } from './AddHotelsDto';

@Injectable()
export class HotelApplicationService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepo: Repository<Hotel>,
    @Inject('IMaps') private readonly mapsAPI: IMaps,
  ) {}
  async discover(discoverDto: DiscoverDto): Promise<HotelsResponseDto> {
    const { location } = discoverDto;
    const [lat, lng] = location.split(',');
    const hotelsLocatoin: Location = new Location(lat, lng);
    const hotelsNearLocation = await this.mapsAPI.getHotelsNearLocation(
      hotelsLocatoin,
    );
    return new HotelsResponseDto(hotelsNearLocation);
  }

  async getHotels(): Promise<HotelsResponseDto> {
    const hotels = await this.hotelRepo.find();
    return new HotelsResponseDto(hotels);
  }

  async createHotelsByLatLng(
    addHotelsDto: AddHotelsDto,
  ): Promise<HotelsResponseDto> {
    const { location } = addHotelsDto;
    const [lat, lng] = location.split(',');
    const hotelsLocatoin: Location = new Location(lat, lng);
    const hotelsNearLocation = await this.mapsAPI.getHotelsNearLocation(
      hotelsLocatoin,
    );
    if (hotelsNearLocation.length === 0) {
      throw new Error("Didn't find any hotels with this location");
    }
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
    hotel.addBooking(booking);
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
