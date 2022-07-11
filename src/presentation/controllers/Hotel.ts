import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateBookingDto } from 'src/application/hotel/CreateBookingDto';
import { HotelApplicationService } from 'src/application/hotel/HotelApplicationService';

@Controller('hotels')
export class HotelsController {
  constructor(private hotelApplicationService: HotelApplicationService) {}

  @Get()
  async discover(@Query('location') location: string) {
    if (!location) {
      throw new Error('location must be provided!');
    }
    const [lat, lng] = location.split(',');
    const hotelsResponseDto =
      await this.hotelApplicationService.getHotelsByLatLng(lat, lng);
    return hotelsResponseDto.getDto();
  }

  @Post()
  async addHotels(@Query('location') location: string) {
    if (!location) {
      throw new Error('location must be provided!');
    }
    const [lat, lng] = location.split(',');
    const hotelsResponseDto =
      await this.hotelApplicationService.createHotelsByLatLng(lat, lng);
    return hotelsResponseDto.getDto();
  }
  @Get(':hotelId/bookings')
  async getBookings(@Param('hotelId') hotelID) {
    const bookingsDto = await this.hotelApplicationService.getBookings(hotelID);
    return bookingsDto.getDto();
  }

  @Post(':hotelId/bookings')
  async addBooking(
    @Param('hotelId') hotelID,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    await this.hotelApplicationService.createBooking(hotelID, createBookingDto);
    return { message: 'Booking created successfully!' };
  }
}
