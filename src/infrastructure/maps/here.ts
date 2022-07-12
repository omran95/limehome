import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Hotel } from 'src/domain/Hotel';
import { IMaps } from 'src/domain/IMaps';
import { Address } from 'src/domain/valueObjects/Address';
import { Location } from 'src/domain/valueObjects/Location';

@Injectable()
export class Here implements IMaps {
  constructor(private readonly httpService: HttpService) {}
  public async getHotelsNearLocation(location: Location): Promise<Hotel[]> {
    const {
      data: { items: hotelsNearLocation = [] },
    } = await this.httpService
      .get(
        `https://discover.search.hereapi.com/v1/discover?in=circle:${location.getLocationFormatted()};r=500&q=hotels&apiKey=${
          process.env.HERE_API_KEY
        }`,
      )
      .toPromise();
    return hotelsNearLocation.map((hotel) => {
      const {
        title: name,
        position: { lat, lng },
        address: { district, street, postalCode, houseNumber },
      } = hotel;
      const address = new Address(district, street, postalCode, houseNumber);
      const location = new Location(lat, lng);
      const newHotel = new Hotel(name, location, [], address);
      return newHotel;
    });
  }
}
