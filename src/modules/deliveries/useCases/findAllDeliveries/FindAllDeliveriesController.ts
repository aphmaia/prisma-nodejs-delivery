import { Request, Response } from "express";
import { FindAllDeliveriesUseCase } from "./FindAllDeliveriesUseCase";



export class FindAllDeliveriesController {
  async handle(request: Request, response: Response){

    const findAllDeliveriesUseCase = new FindAllDeliveriesUseCase();

    const deliveries = await findAllDeliveriesUseCase.execute(); 
    
    return response.json(deliveries);


  }
}