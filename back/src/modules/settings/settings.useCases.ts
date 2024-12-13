import { Settings } from "./entity/settings.entity";
import { settingsRepository } from "infra/repository";
import IContractUseCases from "interfaces/contracts";
import { ErrorHandler } from "infra/errorHandlers";

export default class SettingsUseCases implements IContractUseCases<Settings> {
  constructor() {}

  async getAll(): Promise<Settings[]> {
    try {
      return await settingsRepository.find();
    } catch (error: unknown) {
      throw ErrorHandler.InternalServerError(error);
    }
  }

  async getOne(id: string): Promise<Settings> {
    try {
      const settings = await settingsRepository.findOneBy({ id });
      if (!settings) {
        throw ErrorHandler.NotFound("Settings not found");
      }
      return settings;
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "Settings not found") {
        throw error;
      }
      throw ErrorHandler.InternalServerError(error);
    }
  }

  async create(data: Partial<Settings>): Promise<Settings> {
    try {
      return await settingsRepository.save(data);
    } catch (error: unknown) {
      throw ErrorHandler.InternalServerError(error);
    }
  }

  async update(id: string, data: Partial<Settings>): Promise<Settings> {
    try {
      const settings = await this.getOne(id);
      await settingsRepository.update(id, data);
      return { ...settings, ...data };
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "Settings not found") {
        throw error;
      }
      throw ErrorHandler.InternalServerError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.getOne(id);
      await settingsRepository.delete(id);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "Settings not found") {
        throw error;
      }
      throw ErrorHandler.InternalServerError(error);
    }
  }
}
