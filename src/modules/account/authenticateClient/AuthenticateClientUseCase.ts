import { prisma } from "../../../database/prismaClient"; 
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken"
import * as dotenv from 'dotenv';

interface IAuthenticateClient {
  username: string;
  password: string;
} 


export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient){
    // Receber username e password

    // Verificar username cadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    });

    if(!client){
      throw new Error("Username or password invalid!")
    }

    // Verificar password match
    const passwordMatch = await compare(password, client.password);

    if(!passwordMatch){
      throw new Error("Username or password invalid!")
    } 

    dotenv.config();

    // Gerar token
    const token = await sign({ username }, String(process.env.AUTHENTICATE_KEY_CLIENT), {
      subject: client.id,
      expiresIn: "1d"
    });

    return token;
  }
}