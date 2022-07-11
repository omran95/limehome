import { Column } from 'typeorm';

export class Guest {
  @Column()
  private name: string;
  @Column()
  private email: string;
  @Column()
  private phoneNumber: string;

  constructor(name: string, email: string, phoneNumber: string) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  public getName(): string {
    return this.name;
  }
  public getEmail(): string {
    return this.email;
  }
  public getPhoneNumber(): string {
    return this.phoneNumber;
  }
}
