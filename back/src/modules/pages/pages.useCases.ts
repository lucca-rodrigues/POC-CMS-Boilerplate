import { Pages } from "./entity/pages.entity";
import { pagesRepository } from "infra/repository";
import IContractUseCases from "interfaces/contracts";
import { ErrorHandler } from "infra/errorHandlers";

export default class PagesUseCases implements IContractUseCases<Pages> {
  constructor() {}

  async getAll(): Promise<Pages[]> {
    try {
      return await pagesRepository.find();
    } catch (error: unknown) {
      throw ErrorHandler.InternalServerError(error);
    }
  }

  async getOne(id: string): Promise<Pages> {
    try {
      const pages = await pagesRepository.findOneBy({ id });
      if (!pages) {
        throw ErrorHandler.NotFound("Pages not found");
      }
      return pages;
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "Pages not found") {
        throw error;
      }
      throw ErrorHandler.InternalServerError(error);
    }
  }

  async create(data: Partial<Pages>): Promise<Pages> {
    try {
      return await pagesRepository.save(data);
    } catch (error: unknown) {
      throw ErrorHandler.InternalServerError(error);
    }
  }

  async update(id: string, data: Partial<Pages>): Promise<Pages> {
    try {
      const pages = await this.getOne(id);
      await pagesRepository.update(id, data);
      return { ...pages, ...data };
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "Pages not found") {
        throw error;
      }
      throw ErrorHandler.InternalServerError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.getOne(id);
      await pagesRepository.delete(id);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "Pages not found") {
        throw error;
      }
      throw ErrorHandler.InternalServerError(error);
    }
  }
}
