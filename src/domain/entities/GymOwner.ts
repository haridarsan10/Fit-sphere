export type GymOwnerStatus = "PENDING" | "ACTIVE";

export default class GymOwner {
  public readonly id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public phoneNumber: string;
  public status: GymOwnerStatus;

  constructor(params: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    status?: GymOwnerStatus;
  }) {
    this.id = params.id;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.email = params.email;
    this.password = params.password;
    this.phoneNumber = params.phoneNumber;
    this.status = params.status ?? "PENDING";
  }

  activate() {
    this.status = "ACTIVE";
  }
}
