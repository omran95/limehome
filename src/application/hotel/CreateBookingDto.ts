import { IsNotEmpty, IsEmail, IsISO8601 } from 'class-validator';

export class CreateBookingDto {
  @IsISO8601()
  public checkinDate: string;

  @IsISO8601()
  public checkoutDate: string;

  @IsNotEmpty()
  public amount: number;

  @IsNotEmpty()
  public guestName: string;

  @IsEmail()
  public guestEmail: string;

  @IsNotEmpty()
  public guestPhoneNumber: string;
}
