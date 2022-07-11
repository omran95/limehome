export class DateInterval {
  private startDate: string;
  private endDate: string;

  constructor(startDate: string, endDate: string) {
    this.startDate = startDate;
    this.endDate = endDate;
  }

  public getAllIncludedDates(): string[] {
    const dates: string[] = [];

    const currentDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().substring(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
}
