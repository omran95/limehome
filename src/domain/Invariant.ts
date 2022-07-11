export class Invariant {
  invariant: string;
  constructor(invariant: string) {
    this.invariant = invariant;
  }
  throw() {
    throw new Error(`Invariant: ${this.invariant}`);
  }
}
