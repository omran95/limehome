import { Hotel } from 'src/domain/Hotel';

export class HotelsResponseDto {
  private hotels: Hotel[];
  constructor(hotels: Hotel[]) {
    this.hotels = hotels;
  }
  getDto(): any[] {
    return this.hotels.map((hotel: Hotel) => ({
      name: hotel.getName(),
      address: hotel.getAddress(),
      location: hotel.getLocation(),
      ...(hotel.id ? { id: hotel.getID() } : {}),
    }));
  }
}
