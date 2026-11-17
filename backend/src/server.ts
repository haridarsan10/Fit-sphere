import express from "express";
import dotenv from "dotenv";

//Routes
import authRoute from "./modules/auth/presentation/routes/authRoute.js";
import gymRoute from "./modules/gym/presentation/routes/gymRoute.js";

//Repositories
import MongoOtpRepository from "./modules/auth/infrastructure/MongoOtpRepository.js";
import MongoAccountRepository from "./modules/auth/infrastructure/MongoAccountRepository.js";
import MongoGymRepository from "./modules/gym/infrastructure/MongoGymRepository.js";


//Use-cases
import Register from "./modules/auth/application/use-cases/Register.js";
import VerifyOtp from "./modules/auth/application/use-cases/VerifyOtp.js";
import Login from "./modules/auth/application/use-cases/Login.js";
import SendOtp from "./modules/auth/application/use-cases/SendOtp.js";

import AddGym from "./modules/gym/application/use-cases/AddGym.js";
import GetGyms from "./modules/gym/application/use-cases/GetGyms.js";

//Services
import BcryptPasswordHasher from "./infrastructure/services/BcryptPasswordHasher.js";
import EmailOtpService from "./infrastructure/services/EmailOtpService.js";
import OtpGeneratorService from "./infrastructure/services/OtpGeneratorService.js";
import JwtTokenService from "./infrastructure/services/JwtTokenService.js";

//Controller
import authController from "./modules/auth/presentation/controller/authController.js";
import gymController from "./modules/gym/presentation/controller/GymController.js";

//Infrastructure
import { connectDB } from "./infrastructure/database/connect/MongoConnection.js";


dotenv.config();

const app = express();

connectDB()

app.use(express.json());

//repositories
const accRepository=new MongoAccountRepository()
const otpRepo=new MongoOtpRepository()
const gymRepo=new MongoGymRepository()


//services
const passwordHasher=new BcryptPasswordHasher()
const otpService=new EmailOtpService()
const otpGenerator=new OtpGeneratorService()
const tokenService=new JwtTokenService()

//useCases
const sendOtp=new SendOtp(otpRepo,accRepository,otpService,otpGenerator)
const registerUsecase=new Register(accRepository,passwordHasher,sendOtp)
const verifyOtp=new VerifyOtp(accRepository,otpRepo)
const loginUsecase=new Login(accRepository,passwordHasher,tokenService)

const addGymUseCase= new AddGym(gymRepo)
const getGymUseCase= new GetGyms(gymRepo)

//controller
const AuthController=new authController(verifyOtp,registerUsecase,loginUsecase)
const GymController=new gymController(addGymUseCase,getGymUseCase)

app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 5000;

app.use('/api',authRoute(AuthController))
app.use('/api/gym',gymRoute(GymController,tokenService))


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});