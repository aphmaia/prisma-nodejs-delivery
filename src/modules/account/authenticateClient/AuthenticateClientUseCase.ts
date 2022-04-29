import { prisma } from "../../../database/prismaClient"; 
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken"

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

    // Gerar token
    const token = await sign({ username }, "a3dcb4d229de6fde0db5686dee47145d", {
      subject: client.id,
      expiresIn: "1d"
    });

    return token;
  }
}