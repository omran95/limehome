import { Column } from 'typeorm';

export class Address {
  @Column()
  private district: string;
  @Column()
  private street: string;
  @Column()
  private postalCode: string;
  @Column()
  private houseNumber: string;

  constructor(
    district: string,
    street: string,
    postalCode: string,
    houseNumber: string,
  ) {
    this.district = district;
    this.street = street;
    this.postalCode = postalCode;
    this.houseNumber = houseNumber;
  }

  public getDistrict(): string {
    return this.district;
  }
  public getStreet(): string {
    return this.street;
  }
  public getPostalCode(): string {
    return this.postalCode;
  }
  public getHouseNumber(): string {
    return this.houseNumber;
  }
}
