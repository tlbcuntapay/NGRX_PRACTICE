export class User {
  constructor(
    private email: string,
    private token: string,
    private localId: string,
    private expirationDate: Date
  ) {}

  get expDate(): Date {
    return this.expirationDate;
  }

  get userToken(): string {
    return this.token;
  }
}
