import express from "express";
import dotenv from "dotenv";

//Routes
import authRoute from "./modules/auth/presentation/routes/authRoute.js";

//Repositories
import MongoOtpRepository from "./modules/auth/infrastructure/MongoOtpRepository.js";
import MongoAccountRepository from "./modules/auth/infrastructure/MongoAccountRepository.js";

//Use-cases
import Register from "./modules/auth/application/use-cases/Register.js";
import VerifyOtp from "./modules/auth/application/use-cases/VerifyOtp.js";

//Services
import BcryptPasswordHasher from "./infrastructure/services/BcryptPasswordHasher.js";
import EmailOtpService from "./infrastructure/services/EmailOtpService.js";
import OtpGeneratorService from "./infrastructure/services/OtpGeneratorService.js";
import SendOtp from "./modules/auth/application/use-cases/SendOtp.js";


//Controller
import authController from "./modules/auth/presentation/controller/authController.js";

//Infrastructure
import { connectDB } from "./infrastructure/database/MongoConnection.js";


dotenv.config();

const app = express();

connectDB()

app.use(express.json());

//repositories
const accRepository=new MongoAccountRepository()
const otpRepo=new MongoOtpRepository()


//services
const passwordHasher=new BcryptPasswordHasher()
const otpService=new EmailOtpService()
const otpGenerator=new OtpGeneratorService()

//useCases
const sendOtp=new SendOtp(otpRepo,accRepository,otpService,otpGenerator)
const registerUsecase=new Register(accRepository,passwordHasher,sendOtp)
const verifyOtp=new VerifyOtp(accRepository,otpRepo)

//controller
const AuthController=new authController(verifyOtp,registerUsecase)


app.get("/", (req, res) => {
  res.send("Backend running");

});

const PORT = process.env.PORT || 5000;

app.use('/api/auth',authRoute(AuthController))



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});