/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import UserUseCases from "./user.useCases";
import { UserDto } from "./dto/user.dto";

export default class UserServices {
  constructor(private userUseCases: UserUseCases) {}

  async getAll(req: Request, res: Response) {
    const response = await this.userUseCases.getAll();
    return res.json(response);
  }

  async getOne(req: Request, res: Response) {
    const response = await this.userUseCases.getOne(req?.params?.id);
    return res.json(response);
  }

  async create(req: Request, res: Response) {
    const data = req.body as UserDto;
    const response = await this.userUseCases.create(data);
    return res.json(response);
  }

  async upload(req: Request, res: Response): Promise<void> {
    const response = await this.userUseCases.upload(req.file as any);
    res.status(200).json(response);
  }

  async update(req: Request, res: Response) {
    const data = req.body as UserDto;
    const userId = req.params.id;
    const response = await this.userUseCases.update(userId, data);
    return res.status(200).json(response);
  }

  async delete(req: Request, res: Response) {
    const response = await this.userUseCases.delete(req?.params?.id);
    return res.status(204).json(response);
  }
}
