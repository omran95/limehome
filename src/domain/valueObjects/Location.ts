import { Column } from 'typeorm';

export class Location {
  @Column()
  private lat: string;
  @Column()
  private lng: string;

  constructor(lat: string, lng: string) {
    this.lat = lat;
    this.lng = lng;
  }

  getLocationFormatted(): string {
    return `${this.lat},${this.lng}`;
  }
}
