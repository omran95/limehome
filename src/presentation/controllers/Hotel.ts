import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AddHotelsDto } from 'src/application/hotel/AddHotelsDto';
import { CreateBookingDto } from 'src/application/hotel/CreateBookingDto';
import { DiscoverDto } from 'src/application/hotel/DiscoverDto';
import { HotelApplicationService } from 'src/application/hotel/HotelApplicationService';

@Controller('hotels')
export class HotelsController {
  constructor(private hotelApplicationService: HotelApplicationService) {}

  @Get('discover')
  async discover(@Query() discoverDto: DiscoverDto) {
    try {
      const hotelsResponseDto = await this.hotelApplicationService.discover(
        discoverDto,
      );
      return hotelsResponseDto.getDto();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'location must be provided!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async getHotles() {
    const hotelsResponseDto = await this.hotelApplicationService.getHotels();
    return hotelsResponseDto.getDto();
  }

  @Post()
  async addHotels(@Query() addHotelsDto: AddHotelsDto) {
    try {
      const hotelsResponseDto =
        await this.hotelApplicationService.createHotelsByLatLng(addHotelsDto);
      const createdHotels = hotelsResponseDto.getDto();
      return { message: 'hotels added successfully!', hotels: createdHotels };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get(':hotelId/bookings')
  async getBookings(@Param('hotelId') hotelID) {
    try {
      const bookingsDto = await this.hotelApplicationService.getBookings(
        hotelID,
      );
      return bookingsDto.getDto();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':hotelId/bookings')
  async addBooking(
    @Param('hotelId') hotelID,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    try {
      await this.hotelApplicationService.createBooking(
        hotelID,
        createBookingDto,
      );
      return { message: 'Booking created successfully!' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
