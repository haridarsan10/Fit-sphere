import GymOwner from "../../domain/entities/GymOwner";
import GymOwnerRepository from "../../domain/repositories/GymOwnerRepository";
import PasswordHasher from "../../../auth/application/services/PasswordHasher";
import { v4 as uuidv4 } from "uuid";

type RegisterGymOwnerInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export default class RegisterGymOwner {
  constructor(
    private gymOwnerRepository: GymOwnerRepository,
    private passwordHasher: PasswordHasher
  ) {}

  async execute(data: RegisterGymOwnerInput) {
    const existingOwner = await this.gymOwnerRepository.findByEmail(data.email);
    if (existingOwner) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await this.passwordHasher.hash(data.password);

    const owner = new GymOwner({
      id: uuidv4(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      phoneNumber: data.phoneNumber,
      status: "PENDING",
    });

    await this.gymOwnerRepository.save(owner);

    return {
      message: "Gym owner registered successfully.",
    };
  }
}