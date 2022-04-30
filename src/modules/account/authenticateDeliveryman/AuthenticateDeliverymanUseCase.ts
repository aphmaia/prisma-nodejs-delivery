import { prisma } from "../../../database/prismaClient"; 
import { compare } from "bcrypt";
import { Secret, sign } from "jsonwebtoken"
import * as dotenv from 'dotenv';

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}


export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman){
    // Receber username e password

    // Verificar username cadastrado
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    });

    if(!deliveryman){
      throw new Error("Username or password invalid!")
    }

    // Verificar password match
    const passwordMatch = await compare(password, deliveryman.password);

    if(!passwordMatch){
      throw new Error("Username or password invalid!")
    }

    dotenv.config();  

    // Gerar token
    const token = await sign({ username }, String(process.env.AUTHENTICATE_KEY_DELIVERYMAN), {
      subject: deliveryman.id,
      expiresIn: "1d"
    });

    return token;
  }
}