import express from "express";
import dotenv from "dotenv";
import authRoute from "./modules/auth/presentation/routes/authRoute.js";
import MongoAccountRepository from "./modules/auth/infrastructure/MongoAccountRepository.js";
import Register from "./modules/auth/application/use-cases/Register.js";
import BcryptPasswordHasher from "./infrastructure/services/BcryptPasswordHasher.js";
import authController from "./modules/auth/presentation/controller/authController.js";
import SendOtp from "./modules/auth/application/use-cases/SendOtp.js";
import VerifyOtp from "./modules/auth/application/use-cases/VerifyOtp.js";
import { connectDB } from "./infrastructure/database/MongoConnection.js";


dotenv.config();

const app = express();

connectDB()

app.use(express.json());

//repositories
const accRepository=new MongoAccountRepository()

//services
const passwordHasher=new BcryptPasswordHasher()

//useCases
const registerUsecase=new Register(accRepository,passwordHasher)

//controller
const AuthController=new authController(registerUsecase)


app.get("/", (req, res) => {
  res.send("Backend running");

});

const PORT = process.env.PORT || 5000;

app.use('/api/auth',authRoute(AuthController))



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});