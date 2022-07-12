import { IsLatLong } from 'class-validator';

export class DiscoverDto {
  @IsLatLong()
  public location: string;
}
