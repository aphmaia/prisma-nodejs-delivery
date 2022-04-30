
import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase { 
    async execute({password, username}: ICreateDeliveryman) {
      //Validar se o usuário existe
      const deliverymanExists = await prisma.deliveryman.findFirst({
        where: {
          username: {
            equals: username,
            mode: "insensitive"
          }
        }
      });
  
      if(deliverymanExists) { 
        throw new Error("Deliveryman already exists");
      }
  
      //Criptografar o password
      const hashPassword = await hash(password, 10);
  
      //Salvar o deliveryman
      const deliveryman = await prisma.deliveryman.create({
        data: {
          username,
          password: hashPassword
        }
      });
  
      return deliveryman;
      
    }
  }