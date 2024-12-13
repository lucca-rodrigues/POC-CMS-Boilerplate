import { User } from "./entity/user.entity";
import { userRepository } from "infra/repository";
import { ErrorHandler } from "infra/errorHandlers";
import { IContractUserUseCases } from "interfaces/contracts";
import XLSX from "xlsx";
import { UserExcelData } from "./interfaces";
import { encodingUTF8 } from "./functions";

export default class UserUseCases implements IContractUserUseCases<User> {
  constructor() {}

  async getAll(): Promise<User[]> {
    try {
      return await userRepository.find();
    } catch (error: unknown) {
      throw ErrorHandler.InternalServerError(error);
    }
  }

  async getOne(id: string): Promise<User> {
    try {
      const user = await userRepository.findOneBy({ id });
      if (!user) {
        throw ErrorHandler.NotFound("User not found");
      }
      return user;
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "User not found") {
        throw error;
      }
      throw ErrorHandler.InternalServerError(error);
    }
  }

  async create(data: Partial<User>): Promise<User> {
    try {
      return await userRepository.save(data);
    } catch (error: unknown) {
      throw ErrorHandler.InternalServerError(error);
    }
  }

  async upload(file: Express.Multer.File | null): Promise<User[]> {
    if (!file) {
      throw ErrorHandler.BadRequest("No file uploaded");
    }

    try {
      const workbook = XLSX.read(file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json<UserExcelData>(sheet);

      const users = await Promise.all(
        data.map(async (userData: UserExcelData) => {
          const user: Partial<User> = {
            name: encodingUTF8(userData.Nome),
          };
          return await userRepository.save(user);
        })
      );

      return users;
    } catch (error: unknown) {
      throw ErrorHandler.UploadFailed();
    }
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    try {
      const user = await this.getOne(id);
      await userRepository.update(id, data);
      return { ...user, ...data };
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "User not found") {
        throw error;
      }
      throw ErrorHandler.InternalServerError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.getOne(id);
      await userRepository.delete(id);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "User not found") {
        throw error;
      }
      throw ErrorHandler.InternalServerError(error);
    }
  }
}
