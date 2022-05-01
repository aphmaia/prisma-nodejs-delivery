import { prisma } from "../../../../database/prismaClient"; 


export class FindAllDeliveriesUseCase {
  async execute(){

    const deliveries = await prisma.deliveries.findMany();


    return deliveries;

  }
}