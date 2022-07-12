import { IsLatLong } from 'class-validator';

export class AddHotelsDto {
  @IsLatLong()
  public location: string;
}
