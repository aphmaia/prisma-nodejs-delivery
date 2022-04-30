import { prisma } from "../../../database/prismaClient"; 
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken"

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

    // Gerar token
    const token = await sign({ username }, "a3dcb4d229de6fde0db9856dee47145d", {
      subject: deliveryman.id,
      expiresIn: "1d"
    });

    return token;
  }
}