import { Request, Response } from "express";
import IContractUseCases from "interfaces/contracts";
import { PagesDto } from "modules/pages/dto/pages.dto";

export default class PagesService {
  private contractUseCases: IContractUseCases<PagesDto>;

  constructor(contractUseCases: IContractUseCases<PagesDto>) {
    this.contractUseCases = contractUseCases;
  }

  async getAll(req: Request, res: Response) {
    const response = await this.contractUseCases.getAll(req?.query);
    return res.json(response);
  }

  async getOne(req: Request, res: Response) {
    const response = await this.contractUseCases.getOne(req?.params?.id);
    return res.json(response);
  }

  async create(req: Request, res: Response) {
    const data = req.body as PagesDto;
    const response = await this.contractUseCases.create(data);
    return res.json(response);
  }

  async update(req: Request, res: Response) {
    const data = req.body as PagesDto;
    const userId = req.params.id;
    const response = await this.contractUseCases.update(userId, data);
    return res.json(response);
  }

  async delete(req: Request, res: Response) {
    const response = await this.contractUseCases.delete(req?.params?.id);
    return res.status(204).json(response);
  }
}
